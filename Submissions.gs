/**
 * Submissions.gs
 * Handles saving submissions (public estimates and staff quotes) to the master sheet.
 *
 * Public API (callable from the form with google.script.run):
 *   saveSubmission(payload, staffToken) -> Result object
 *
 * Internal helpers:
 *   nextSubmissionId_(mode, prefix) -> string
 */

/**
 * Validates, recalculates, and saves a quote or estimate to Submissions and Submission_Lines.
 * @param {Object} payload Submission payload from the form
 * @param {string} [staffToken] Optional staff authentication token
 * @return {Object} Summary result { submissionId, expectedPrice, finalPrice, discountPct, taxType, gstAmount, grandTotal, quoteOnRequestItems }
 */
function saveSubmission(payload, staffToken) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid submission payload.');
  }

  // 1. Bot check: honeypot must be completely empty
  if (payload.honeypot && String(payload.honeypot).trim() !== '') {
    throw new Error('Submission rejected by spam filter.');
  }

  // 2. Authentication check
  const isStaff = isStaffSession_(staffToken);
  const mode = isStaff ? 'Staff' : 'Public';

  // 3. Client details validation
  const client = payload.client || {};
  const clientName = toStr_(client.name);
  if (!clientName) {
    throw new Error('Full name is required.');
  }

  const mobile = toStr_(client.mobile).replace(/\D/g, '');
  if (!CONFIG.REGEX.MOBILE.test(mobile)) {
    throw new Error('A valid 10-digit Indian mobile number starting with 6-9 is required.');
  }

  const email = toStr_(client.email);
  if (!CONFIG.REGEX.EMAIL.test(email)) {
    throw new Error('A valid email address is required.');
  }

  const gstin = toStr_(client.gstin).toUpperCase();
  if (gstin && !CONFIG.REGEX.GSTIN.test(gstin)) {
    throw new Error('Invalid 15-character GSTIN format.');
  }

  const stateCode = toStateCode_(gstin ? stateCodeFromGstin(gstin) : client.stateCode);

  // 4. Public spam limit: max 3 submissions per mobile number per day
  if (!isStaff) {
    checkSpamLimit_(mobile);
  }

  // 5. Load catalog and validate service
  const catalog = buildCatalog_(isStaff);
  const serviceId = toStr_(payload.serviceId) || 'SHOPIFY';
  const service = catalog.services.find(function(s) { return s.id === serviceId; });
  if (!service) {
    throw new Error('Service "' + serviceId + '" does not exist.');
  }
  if (!service.active) {
    throw new Error('Service "' + service.name + '" is currently inactive.');
  }

  // 6. Validate selected components
  const selections = Array.isArray(payload.selections) ? payload.selections : [];
  const compMap = {};
  catalog.components.forEach(function(c) { compMap[c.id] = c; });

  selections.forEach(function(sel) {
    if (!sel || !sel.componentId) return;
    const comp = compMap[sel.componentId];
    if (!comp) {
      throw new Error('Component "' + sel.componentId + '" is not available.');
    }
    if (comp.serviceId !== serviceId) {
      throw new Error('Component "' + comp.name + '" does not belong to service ' + serviceId + '.');
    }
    if (!isStaff && comp.visibleTo === 'Staff') {
      throw new Error('Component "' + comp.name + '" requires staff authorization.');
    }
    const qty = Number(sel.qty);
    if (comp.minQty !== null && comp.minQty !== undefined && qty < comp.minQty) {
      throw new Error('Quantity for "' + comp.name + '" cannot be less than ' + comp.minQty + '.');
    }
    if (comp.maxQty !== null && comp.maxQty !== undefined && qty > comp.maxQty) {
      throw new Error('Quantity for "' + comp.name + '" cannot exceed ' + comp.maxQty + '.');
    }
  });

  // 7. Recalculate quote server-side (never trust client amounts)
  const engine = getPricingEngine_();
  const quoteResult = engine.computeQuote(catalog, payload, isStaff);

  // 8. Staff discount validation
  const discountReason = toStr_(payload.discountReason);
  const staffName = toStr_(payload.staffName);
  if (isStaff) {
    const maxDiscount = Number(catalog.settings.maxStaffDiscount) || 0.15;
    if ((quoteResult.discountPct / 100) > maxDiscount && !discountReason) {
      throw new Error('Reason for discount is required when discount exceeds ' + Math.round(maxDiscount * 100) + '%.');
    }
  }

  // 9. Atomic lock for ID generation and row writing
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000); // 15 seconds
  } catch (lockErr) {
    throw new Error('Server busy processing another request. Please try again in a few seconds.');
  }

  let submissionId = '';
  try {
    const settingsMap = getSettingsMap_();
    const prefix = isStaff
      ? (toStr_(settingsMap[CONFIG.SETTING_KEYS.QUOTE_PREFIX]) || 'QT')
      : (toStr_(settingsMap[CONFIG.SETTING_KEYS.ESTIMATE_PREFIX]) || 'EST');

    submissionId = nextSubmissionId_(mode, prefix);

    // 10. Write row to Submissions sheet
    const subSheet = getSheet_(CONFIG.SHEETS.SUBMISSIONS);
    const subHeaders = getSheetHeaders_(subSheet);
    const now = new Date();
    const status = isStaff ? 'Quote draft' : 'Estimate requested';

    const subRowObj = {
      'Submission ID': "'" + submissionId,
      'Timestamp': now,
      'Mode': mode,
      'Staff name': staffName,
      'Service ID': serviceId,
      'Client name': clientName,
      'Business name': toStr_(client.businessName),
      'Mobile': "'" + mobile,
      'Email': email,
      'GSTIN': gstin ? "'" + gstin : '',
      'Address': toStr_(client.address),
      'State code': stateCode ? "'" + stateCode : '',
      'Expected price (₹)': quoteResult.expectedPrice,
      'Final price (₹)': quoteResult.finalPrice,
      'Discount %': quoteResult.discountPct > 0 ? (quoteResult.discountPct / 100) : 0,
      'Discount reason': discountReason,
      'Tax type': quoteResult.taxType,
      'GST amount (₹)': quoteResult.gstAmount,
      'Grand total (₹)': quoteResult.grandTotal,
      'Status': status,
      'Proposal link': '',
      'Notes': client.whatsappOptIn ? 'WhatsApp updates opted-in' : ''
    };

    appendRowByHeaders_(subSheet, subHeaders, subRowObj);

    // 11. Write rows to Submission_Lines sheet
    const linesSheet = getSheet_(CONFIG.SHEETS.LINES);
    const linesHeaders = getSheetHeaders_(linesSheet);

    const lineRows = quoteResult.lines.map(function(line) {
      return {
        'Submission ID': "'" + submissionId,
        'Component ID': "'" + line.componentId,
        'Name': line.name,
        'Step': line.step,
        'Type': line.type,
        'Qty': line.qty,
        'Included qty': line.includedQty,
        'Chargeable qty': line.chargeableQty,
        'Rate (₹)': line.rate,
        'Batch size': line.batchSize,
        'Expected amount (₹)': line.expectedAmount,
        'Final amount (₹)': line.finalAmount !== undefined ? line.finalAmount : line.expectedAmount,
        'Discountable': line.discountable ? 'Yes' : 'No'
      };
    });

    appendRowsByHeaders_(linesSheet, linesHeaders, lineRows);

  } finally {
    lock.releaseLock();
  }

  // 12. Trigger post-submission hook (errors must not fail the save)
  try {
    if (typeof onSubmissionSaved_ === 'function') {
      onSubmissionSaved_(submissionId, mode);
    }
  } catch (hookErr) {
    console.warn('onSubmissionSaved_ hook encountered an error: ' + hookErr.message);
  }

  return {
    submissionId: submissionId,
    expectedPrice: quoteResult.expectedPrice,
    finalPrice: quoteResult.finalPrice,
    discountPct: quoteResult.discountPct,
    taxType: quoteResult.taxType,
    gstAmount: quoteResult.gstAmount,
    grandTotal: quoteResult.grandTotal,
    quoteOnRequestItems: quoteResult.quoteOnRequestItems
  };
}

/**
 * Checks that a public mobile number has not submitted more than 3 times today (Asia/Kolkata).
 * @param {string} mobile
 */
function checkSpamLimit_(mobile) {
  try {
    const subData = getSheetObjects_(CONFIG.SHEETS.SUBMISSIONS);
    const todayStr = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyyMMdd');

    let count = 0;
    subData.rows.forEach(function(r) {
      if (toStr_(r['Mode']) !== 'Public') return;
      const rowMobile = toStr_(r['Mobile']).replace(/\D/g, '');
      if (rowMobile !== mobile) return;

      const ts = r['Timestamp'];
      if (ts instanceof Date) {
        const rowDateStr = Utilities.formatDate(ts, 'Asia/Kolkata', 'yyyyMMdd');
        if (rowDateStr === todayStr) count++;
      }
    });

    if (count >= 3) {
      throw new Error('Daily limit of 3 estimates reached for this mobile number. Please contact us directly on WhatsApp.');
    }
  } catch (err) {
    if (err.message && err.message.indexOf('Daily limit') !== -1) {
      throw err;
    }
    // If sheet reading failed for checking limit, log and proceed
    console.warn('Spam check note: ' + err.message);
  }
}

/**
 * Generates the next submission ID formatted as PREFIX-DDMMYY-NN.
 * Must be called while holding ScriptLock.
 * @param {string} mode 'Public' or 'Staff'
 * @param {string} prefix e.g. 'EST' or 'QT'
 * @return {string}
 */
function nextSubmissionId_(mode, prefix) {
  const dateStr = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'ddMMyy');
  const searchPattern = prefix + '-' + dateStr + '-';

  const subSheet = getSheet_(CONFIG.SHEETS.SUBMISSIONS);
  const data = subSheet.getDataRange().getValues();
  if (data.length <= 1) {
    return searchPattern + '01';
  }

  const idColIdx = data[0].map(function(h) { return String(h).trim(); }).indexOf('Submission ID');
  const targetCol = idColIdx !== -1 ? idColIdx : 0;

  let maxSerial = 0;
  for (let r = 1; r < data.length; r++) {
    const val = toStr_(data[r][targetCol]);
    if (val.indexOf(searchPattern) === 0) {
      const serialPart = val.substring(searchPattern.length);
      const serialNum = parseInt(serialPart, 10);
      if (!isNaN(serialNum) && serialNum > maxSerial) {
        maxSerial = serialNum;
      }
    }
  }

  const nextSerial = maxSerial + 1;
  const serialStr = ('0' + nextSerial).slice(-2);
  return searchPattern + serialStr;
}

/**
 * Helper: gets trimmed header list of a sheet.
 * @param {Sheet} sheet
 * @return {string[]}
 */
function getSheetHeaders_(sheet) {
  const lastCol = sheet.getLastColumn();
  if (lastCol === 0) return [];
  const row = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  return row.map(function(h) { return String(h).trim(); });
}

/**
 * Appends a single row mapped by header name.
 * @param {Sheet} sheet
 * @param {string[]} headers
 * @param {Object} rowObj
 */
function appendRowByHeaders_(sheet, headers, rowObj) {
  const rowValues = headers.map(function(h) {
    return rowObj.hasOwnProperty(h) ? rowObj[h] : '';
  });
  sheet.appendRow(rowValues);
}

/**
 * Appends multiple rows mapped by header name.
 * @param {Sheet} sheet
 * @param {string[]} headers
 * @param {Object[]} rowObjs
 */
function appendRowsByHeaders_(sheet, headers, rowObjs) {
  if (!rowObjs.length) return;
  const matrix = rowObjs.map(function(obj) {
    return headers.map(function(h) {
      return obj.hasOwnProperty(h) ? obj[h] : '';
    });
  });
  const startRow = sheet.getLastRow() + 1;
  sheet.getRange(startRow, 1, matrix.length, headers.length).setValues(matrix);
}

