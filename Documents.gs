/**
 * Documents.gs  (Module 2)
 * Builds the proposal and quotation for one submission from the Google Docs templates,
 * saves editable Docs + PDFs in the documents folder, and returns the PDFs for emailing.
 *
 *   generateDocuments_(submissionId) -> { proposal: {docUrl, pdfUrl, pdfBlob, number},
 *                                         quotation: {docUrl, pdfUrl, pdfBlob, number},
 *                                         data: <document data> }
 */

function generateDocuments_(submissionId) {
  const K = DOCS_CONFIG.SETTING_KEYS;
  const settings = getSettingsMap_();
  const proposalTpl = toStr_(settings[K.PROPOSAL_TEMPLATE]);
  const quotationTpl = toStr_(settings[K.QUOTATION_TEMPLATE]);
  const folderId = toStr_(settings[K.OUTPUT_FOLDER]);
  if (!proposalTpl || !quotationTpl || !folderId) {
    throw new Error('Documents are not set up. Run AdsPeek > Set up documents and email.');
  }

  const data = buildDocumentData_(submissionId, settings);
  const root = DriveApp.getFolderById(folderId);
  const proposalFolder = getOutputFolder_(root, data.createdAt, 'Proposals');
  const quotationFolder = getOutputFolder_(root, data.createdAt, 'Quotations');

  const proposal = fillTemplate_(proposalTpl, proposalFolder, data.proposalNumber.replace(/\//g, '-') + ' - ' + data.fileLabel, data, 'proposal');
  const quotation = fillTemplate_(quotationTpl, quotationFolder, data.quotationNumber.replace(/\//g, '-') + ' - ' + data.fileLabel, data, 'quotation');
  proposal.number = data.proposalNumber;
  quotation.number = data.quotationNumber;
  return { proposal: proposal, quotation: quotation, data: data };
}

/**
 * Month-wise storage:  <root>/2026-11 November/Proposals | Quotations | Invoices
 * An older folder named just "2026-11" is renamed and reused.
 */
function getOutputFolder_(root, date, kind) {
  const short = Utilities.formatDate(date, DOCS_CONFIG.TZ, 'yyyy-MM');
  const full = short + ' ' + Utilities.formatDate(date, DOCS_CONFIG.TZ, 'MMMM');
  let month;
  const itFull = root.getFoldersByName(full);
  if (itFull.hasNext()) {
    month = itFull.next();
  } else {
    const itShort = root.getFoldersByName(short);
    month = itShort.hasNext() ? itShort.next().setName(full) : root.createFolder(full);
  }
  return kind ? docSubFolder_(month, kind) : month;
}

/** Plural of a unit: category -> categories, box -> boxes, product -> products. */
function docPlural_(unit, qty) {
  if (!unit || qty === 1) return unit || '';
  if (/[^aeiou]y$/i.test(unit)) return unit.slice(0, -1) + 'ies';
  if (/(s|x|z|ch|sh)$/i.test(unit)) return unit + 'es';
  return unit + 's';
}

/** "A | B" or multi-line text -> clean lines, without [ ] brackets. */
function docSplitLines_(text) {
  return String(text || '').split(/\s*\|\s*|\r?\n/)
    .map(function (s) { return s.replace(/[\[\]]/g, '').replace(/\s+/g, ' ').replace(/\s+:/g, ':').trim(); })
    .filter(function (s) { return s !== ''; });
}

/** Collects everything the templates need for one submission. */
function buildDocumentData_(submissionId, settings) {
  const SUB = DOCS_CONFIG.SUB;
  const L = DOCS_CONFIG.LINE;
  const K = CONFIG.SETTING_KEYS;
  const DK = DOCS_CONFIG.SETTING_KEYS;

  const sub = docFindSubmission_(submissionId);
  if (!sub) throw new Error('Submission ' + submissionId + ' not found.');

  const lines = getSheetObjects_(CONFIG.SHEETS.LINES).rows
    .filter(function (r) { return toStr_(r[L.ID]) === submissionId; });
  if (lines.length === 0) throw new Error('No line items found for ' + submissionId + '.');

  // Component details (descriptions, units, monthly costs) from the catalog, staff view
  const catalog = buildCatalog_(true);
  const compById = {};
  catalog.components.forEach(function (c) { compById[c.id] = c; });
  const serviceId = toStr_(sub[SUB.SERVICE]);
  const service = catalog.services.filter(function (s) { return s.id === serviceId; })[0] || { name: serviceId };

  const createdAt = (sub[SUB.TIMESTAMP] instanceof Date) ? sub[SUB.TIMESTAMP] : new Date();
  const validityDays = toNum_(settings[K.VALIDITY_DAYS], 15);
  const finalPrice = toNum_(sub[SUB.FINAL], 0);
  const gst = toNum_(sub[SUB.GST], 0);
  const grand = toNum_(sub[SUB.GRAND], finalPrice + gst);
  const taxType = toStr_(sub[SUB.TAX_TYPE]) || 'IGST';
  const gstPct = Math.round(toFraction_(settings[K.GST_RATE], 0.18) * 100);

  let taxLines, taxRows;
  if (taxType.indexOf('CGST') !== -1) {
    const half = Math.round(gst * 100 / 2) / 100;
    taxRows = [
      { label: 'CGST @ ' + (gstPct / 2) + '%', value: docFormatINR_(half, 2) },
      { label: 'SGST @ ' + (gstPct / 2) + '%', value: docFormatINR_(gst - half, 2) }
    ];
  } else {
    taxRows = [{ label: 'IGST @ ' + gstPct + '%', value: docFormatINR_(gst, 2) }, { label: '', value: '' }];
  }
  taxLines = taxRows.filter(function (t) { return t.label; }).map(function (t) { return t.label + ': ' + t.value; }).join('   |   ');

  // Line items: base first, then by step order
  const stepOrder = ['Base', 'Catalogue', 'Pages', 'Features', 'Integrations', 'Custom'];
  const items = lines.map(function (r) {
    const id = toStr_(r[L.COMPONENT]);
    const comp = compById[id] || {};
    const type = toStr_(r[L.TYPE]);
    const qty = toNum_(r[L.QTY], 1);
    const amount = toNum_(r[L.FINAL_AMOUNT], toNum_(r[L.EXPECTED_AMOUNT], 0));
    const onRequest = type === 'Quote on request';
    let qtyLabel = '1';
    if (type === 'Quantity' || type === 'Optional + Qty') qtyLabel = qty + (comp.unit ? ' ' + docPlural_(comp.unit, qty) : '');
    return {
      id: id,
      name: id === 'SERVICE-BASE' ? (service.name + ': base package') : (toStr_(r[L.NAME]) || comp.name || id),
      step: toStr_(r[L.STEP]),
      details: id === 'SERVICE-BASE' ? 'Store setup, homepage, essential pages, payments, shipping, SEO setup, testing and launch.' : (comp.description || ''),
      qtyLabel: qtyLabel,
      amount: amount,
      onRequest: onRequest,
      included: !onRequest && amount === 0 && id !== 'SERVICE-BASE',
      monthlyCost: comp.monthlyCost || ''
    };
  }).sort(function (a, b) {
    return stepOrder.indexOf(a.step) - stepOrder.indexOf(b.step);
  });

  // Included items of the service (Base step or Included type)
  const included = catalog.components
    .filter(function (c) { return c.serviceId === serviceId && (c.step === 'Base' || c.type === 'Included'); })
    .map(function (c) { return c.name; });

  const monthly = items.filter(function (i) { return i.monthlyCost && !/^free$/i.test(i.monthlyCost); })
    .map(function (i) { return i.name + ': ' + i.monthlyCost; });

  const milestones = docSplitMilestones_(grand, docParseMilestones_(settings[DK.MILESTONES]));
  const business = toStr_(sub[SUB.BUSINESS]) || toStr_(sub[SUB.CLIENT]) || 'Client';

  return {
    submissionId: submissionId,
    row: sub._row,
    mode: toStr_(sub[SUB.MODE]) || 'Public',
    createdAt: createdAt,
    proposalNumber: 'PO/' + submissionId,
    quotationNumber: 'QTN/' + submissionId,
    fileLabel: business.replace(/[\\/:*?"<>|]/g, ' ').trim(),
    client: {
      name: toStr_(sub[SUB.CLIENT]),
      business: business,
      email: toStr_(sub[SUB.EMAIL]),
      mobile: toStr_(sub[SUB.MOBILE]),
      gstin: toStr_(sub[SUB.GSTIN]) || 'Not provided',
      address: toStr_(sub[SUB.ADDRESS])
    },
    serviceName: service.name,
    items: items,
    included: included,
    monthly: monthly,
    milestones: milestones,
    finalPrice: finalPrice,
    gst: gst,
    grand: grand,
    taxLines: taxLines,
    taxRows: taxRows,
    validUntil: docAddDays_(createdAt, validityDays),
    deliveryDays: toNum_(settings[DK.DELIVERY_DAYS], 20),
    bankDetails: toStr_(settings[DK.BANK_DETAILS]) || '[Bank details to be added]',
    company: {
      name: toStr_(settings[K.COMPANY_NAME]) || 'AdsPeek Marketing Agency',
      address: toStr_(settings[K.COMPANY_ADDRESS]),
      gstin: toStr_(settings[K.COMPANY_GSTIN]),
      website: toStr_(settings[DK.WEBSITE]) || 'adspeek.in',
      sac: toStr_(settings[DK.SAC_CODE]) || '998314'
    }
  };
}

/** Finds a submission row by ID. Returns the row object (with _row) or null. */
function docFindSubmission_(submissionId) {
  const rows = getSheetObjects_(CONFIG.SHEETS.SUBMISSIONS).rows;
  for (let i = rows.length - 1; i >= 0; i--) {
    if (toStr_(rows[i][DOCS_CONFIG.SUB.ID]) === submissionId) return rows[i];
  }
  return null;
}

/** Copies a template, fills it, saves a PDF next to it. */
function fillTemplate_(templateId, folder, fileName, data, kind) {
  const copy = DriveApp.getFileById(templateId).makeCopy(fileName, folder);
  const doc = DocumentApp.openById(copy.getId());
  const body = doc.getBody();

  const onRequestItems = data.items.filter(function (i) { return i.onRequest; }).map(function (i) { return i.name; });
  const projectSummary = 'This ' + (kind === 'proposal' ? 'proposal' : 'quotation') + ' covers a ' + data.serviceName +
    ' project for ' + data.client.business + ', built from the package selected on ' + docFormatDateIN_(data.createdAt) + '.';

  const values = {
    COMPANY_NAME: data.company.name,
    COMPANY_ADDRESS: data.company.address,
    COMPANY_GSTIN: data.company.gstin,
    COMPANY_WEBSITE: data.company.website,
    SAC_CODE: data.company.sac,
    TAX_LABEL_1: data.taxRows[0].label,
    TAX_VALUE_1: data.taxRows[0].value,
    TAX_LABEL_2: data.taxRows[1] ? data.taxRows[1].label : '',
    TAX_VALUE_2: data.taxRows[1] ? data.taxRows[1].value : '',
    DOC_NUMBER: kind === 'proposal' ? data.proposalNumber : data.quotationNumber,
    PROPOSAL_NUMBER: data.proposalNumber,
    QUOTATION_NUMBER: data.quotationNumber,
    DATE: docFormatDateIN_(data.createdAt),
    VALID_UNTIL: docFormatDateIN_(data.validUntil),
    SUBMISSION_ID: data.submissionId,
    BUSINESS_NAME: data.client.business,
    CLIENT_NAME: data.client.name,
    CLIENT_EMAIL: data.client.email,
    CLIENT_MOBILE: data.client.mobile ? '+91 ' + data.client.mobile : '',
    CLIENT_GSTIN: data.client.gstin,
    CLIENT_ADDRESS: data.client.address,
    SERVICE_NAME: data.serviceName,
    PROJECT_SUMMARY: projectSummary,
    FINAL_PRICE: docFormatINR_(data.finalPrice, 2),
    TAX_LINES: data.taxLines,
    GRAND_TOTAL: docFormatINR_(data.grand, 2),
    DELIVERY_DAYS: data.deliveryDays,
    BANK_DETAILS: data.bankDetails,
    ON_REQUEST_NOTE: onRequestItems.length ? ('Priced after consultation (not included above): ' + onRequestItems.join(', ') + '.') : ''
  };

  // Tables and lists first (they replace whole marker paragraphs)
  const amountText = function (it) {
    if (it.onRequest) return 'On request';
    if (it.included) return 'Included';
    return docFormatINR_(it.amount, 0);
  };
  replaceMarkerWithTable_(body, '{{SCOPE_TABLE}}',
    ['#', 'Deliverable', 'Qty'],
    data.items.map(function (it, i) { return { cells: [String(i + 1), it.name, it.onRequest ? 'On request' : it.qtyLabel], details: it.details }; }),
    [28, 369, 90], ['center', 'left', 'center'], 1);

  replaceMarkerWithTable_(body, '{{PRICE_TABLE}}',
    ['#', 'Item description', 'Qty', 'Amount'],
    data.items.map(function (it, i) {
      return { cells: [String(i + 1), it.name, it.onRequest ? '-' : it.qtyLabel, amountText(it)], details: it.details, muteLast: it.included || it.onRequest };
    }),
    [28, 279, 85, 95], ['center', 'left', 'center', 'right'], 1);

  replaceMarkerWithTable_(body, '{{MILESTONE_TABLE}}',
    ['#', 'Milestone', 'Share', 'Amount (incl. GST)'],
    data.milestones.map(function (m, i) { return { cells: [String(i + 1), m.name, m.pct + '%', docFormatINR_(m.amount, 2)] }; }),
    [28, 279, 70, 110], ['center', 'left', 'center', 'right'], 1);

  replaceMarkerWithList_(body, '{{INCLUDED_LIST}}', data.included);
  replaceMarkerWithList_(body, '{{MONTHLY_COSTS}}',
    data.monthly.length ? data.monthly : ['No monthly tool costs for the selected package (Shopify plan and domain are billed by Shopify).']);
  replaceMarkerWithLines_(body, '{{BANK_DETAILS}}', docSplitLines_(data.bankDetails));

  // Paragraphs that contain only a placeholder with no value are removed
  Object.keys(values).forEach(function (key) {
    if (String(values[key] === null || values[key] === undefined ? '' : values[key]).trim() === '') {
      removeParagraphsWithOnly_(body, '{{' + key + '}}');
    }
  });

  // Simple text placeholders (body and footer)
  const footer = doc.getFooter();
  Object.keys(values).forEach(function (key) {
    const pattern = docRegexEscape_('{{' + key + '}}');
    const value = docReplacementEscape_(values[key]);
    body.replaceText(pattern, value);
    if (footer) footer.replaceText(pattern, value);
  });
  docTightenEmptyParagraphs_(body);
  doc.saveAndClose();

  const pdfBlob = copy.getAs(MimeType.PDF).setName(fileName + '.pdf');
  const pdfFile = folder.createFile(pdfBlob);
  return { docUrl: copy.getUrl(), pdfUrl: pdfFile.getUrl(), pdfBlob: pdfBlob };
}

/**
 * Replaces the paragraph holding `marker` with ONE bordered table:
 * dark header row, then one row per item (optional grey detail line under the main column).
 * rows: [{ cells: [..], details: 'optional', muteLast: bool }]
 * aligns: 'left' | 'center' | 'right' per column. detailCol: column that gets the detail line.
 */
function replaceMarkerWithTable_(body, marker, header, rows, widths, aligns, detailCol) {
  const found = body.findText(docRegexEscape_(marker));
  if (!found) return;
  const paragraph = found.getElement().getParent();
  const container = paragraph.getParent();
  const index = container.getChildIndex(paragraph);
  const H = DocumentApp.HorizontalAlignment;
  const alignOf = function (c) { return aligns && aligns[c] === 'right' ? H.RIGHT : (aligns && aligns[c] === 'center' ? H.CENTER : H.LEFT); };
  const dc = detailCol === undefined ? 0 : detailCol;

  const data = rows.length ? rows : [{ cells: header.map(function (h, i) { return i === dc ? 'Nothing selected' : ''; }) }];
  const table = container.insertTable(index, [header].concat(data.map(function (r) { return r.cells; })));
  table.setBorderWidth(0.75).setBorderColor(DOC_DS.LINE);

  for (let r = 0; r < table.getNumRows(); r++) {
    const row = table.getRow(r), isHead = r === 0, item = isHead ? null : data[r - 1];
    for (let c = 0; c < row.getNumCells(); c++) {
      const cell = row.getCell(c);
      if (widths && widths[c]) cell.setWidth(widths[c]);
      docPad_(cell, isHead ? 6 : 7, 8, isHead ? 6 : 7, 8);
      cell.setVerticalAlignment(DocumentApp.VerticalAlignment.TOP);
      if (isHead) cell.setBackgroundColor(DOC_DS.HEAD_FILL);
      const muted = !isHead && (c === 0 || (item.muteLast && c === row.getNumCells() - 1));
      docStyleEl_(cell.getChild(0).asParagraph(), {
        size: isHead ? 8 : 9.5,
        bold: isHead || (!isHead && c === dc),
        color: isHead ? DOC_DS.HEAD_TEXT : (muted ? DOC_DS.MUTED : DOC_DS.INK),
        align: alignOf(c)
      });
      if (!isHead && c === dc) {
        if (item.details) {
          docStyleEl_(cell.appendParagraph(item.details), { size: 8, color: DOC_DS.MUTED, before: 2, lineSpacing: 1.15 });
        }
      }
    }
  }
  paragraph.removeFromParent();
}

/** Replaces the paragraph containing marker with a bullet list (or removes it if empty). */
function replaceMarkerWithList_(body, marker, items) {
  const found = body.findText(docRegexEscape_(marker));
  if (!found) return;
  const paragraph = found.getElement().getParent();
  const container = paragraph.getParent();
  let index = container.getChildIndex(paragraph);
  items.forEach(function (text) {
    const li = container.insertListItem(index++, text);
    li.setGlyphType(DocumentApp.GlyphType.BULLET);
    docStyleEl_(li, { size: 9, after: 2, lineSpacing: 1.15 });
  });
  paragraph.removeFromParent();
}

/** Replaces the paragraph containing marker with plain lines, keeping that paragraph's style (works inside table cells). */
function replaceMarkerWithLines_(body, marker, lines) {
  const found = body.findText(docRegexEscape_(marker));
  if (!found) return;
  const paragraph = found.getElement().getParent().asParagraph();
  if (!lines.length) { paragraph.setText('[Add bank details in Settings]'); return; }
  paragraph.setText(lines[0]);
  const container = paragraph.getParent();
  let index = container.getChildIndex(paragraph);
  for (let i = 1; i < lines.length; i++) {
    const p = paragraph.copy();
    p.setText(lines[i]);
    container.insertParagraph(++index, p);
  }
}

/** Removes body paragraphs whose whole text is exactly the given placeholder. */
function removeParagraphsWithOnly_(body, placeholder) {
  for (let i = body.getNumChildren() - 2; i >= 0; i--) {
    const el = body.getChild(i);
    if (el.getType() === DocumentApp.ElementType.PARAGRAPH && el.asParagraph().getText().trim() === placeholder) {
      el.removeFromParent();
    }
  }
}
