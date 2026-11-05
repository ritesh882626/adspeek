/**
 * TrackerSetup.gs  (Module 3a)
 * AdsPeek menu > "Set up tracking sheets"
 * Creates Proposals, Payments, Projects and Sales, adds "Lead stage" to Submissions,
 * adds dropdowns + colours, installs the edit + daily triggers, and copies in
 * proposals that were already sent. Safe to run again: it only adds what is missing.
 */

function setupTrackingSheets() {
  const report = [];
  const ss = getSpreadsheet_();

  // 1. Settings rows
  const existing = getSettingsMap_();
  TRACK.SETTING_DEFAULTS.forEach(function (row) {
    if (!(row[0] in existing)) { docSetSetting_(row[0], row[1], row[2]); report.push('Added setting: ' + row[0]); }
  });

  // 2. Lead stage column on Submissions
  if (docEnsureColumns_(CONFIG.SHEETS.SUBMISSIONS, [TRACK.LEAD_STAGE_COL])) report.push('Added "Lead stage" column to Submissions.');
  trkFormatLeadStage_();

  // 3. Sheets
  const cols = trackColumns_();
  Object.keys(cols).forEach(function (name) {
    let sheet = ss.getSheetByName(name);
    if (!sheet) { sheet = ss.insertSheet(name); report.push('Created sheet: ' + name); }
    const added = trkEnsureHeaders_(sheet, cols[name]);
    if (added) report.push(name + ': added ' + added + ' column(s).');
    trkFormatSheet_(sheet, name);
  });
  trkWriteSalesSummary_();

  // 4. Triggers
  trkEnsureTriggers_(report);

  // 5. Proposals already sent
  const copied = trkBackfillProposals_();
  if (copied) report.push('Copied ' + copied + ' proposal(s) already sent into Proposals.');

  docShowSetupReport_('Tracking sheets', report.length ? report : ['Everything was already set up.'],
    'You edit only the yellow columns. Proposals > Status = "Accepted" creates the Sales, Payments and Projects rows.');
}

/** Writes any missing headers (in order) to row 1. Returns how many were added. */
function trkEnsureHeaders_(sheet, headers) {
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const current = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) { return String(h).trim(); });
  if (current.every(function (h) { return h === ''; })) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    return headers.length;
  }
  const missing = headers.filter(function (h) { return current.indexOf(h) === -1; });
  if (missing.length) sheet.getRange(1, sheet.getLastColumn() + 1, 1, missing.length).setValues([missing]);
  return missing.length;
}

function trkColLetter_(n) {
  let s = '';
  while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); }
  return s;
}

/** Header styling, widths, number formats, dropdowns and status colours for one sheet. */
function trkFormatSheet_(sheet, name) {
  const meta = docGetSheetMeta_(name);
  const idx = meta.headerIndex;
  const nCols = meta.headers.filter(String).length;
  const maxRows = Math.max(sheet.getMaxRows(), 500);
  if (sheet.getMaxRows() < maxRows) sheet.insertRowsAfter(sheet.getMaxRows(), maxRows - sheet.getMaxRows());
  const rows = maxRows - 1;
  const editable = trackEditable_()[name] || [];

  // Header row
  const head = sheet.getRange(1, 1, 1, nCols);
  head.setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#1C1C1C').setWrap(true).setVerticalAlignment('middle');
  sheet.setRowHeight(1, 36);
  editable.forEach(function (h) {
    if (idx[h]) sheet.getRange(1, idx[h]).setBackground('#F2C94C').setFontColor('#1C1C1C').setNote('You edit this column.');
  });
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(1);
  for (let c = 1; c <= nCols; c++) sheet.setColumnWidth(c, 130);

  // Formats by header name
  const money = '₹#,##0.00', date = 'dd-mm-yyyy';
  meta.headers.forEach(function (h, i) {
    if (!h) return;
    const range = sheet.getRange(2, i + 1, rows, 1);
    if (h.indexOf('(₹)') !== -1) range.setNumberFormat(money);
    else if (h === TRACK.PAY.SHARE) range.setNumberFormat('0%');
    else if (h === TRACK.PRJ.UPDATED) range.setNumberFormat('dd-mm-yyyy hh:mm');
    else if (/ on$|date|Valid until|delivery|Won on|Expected/i.test(h) && h !== TRACK.PRJ.DAYS) range.setNumberFormat(date);
    if (/PDF$/.test(h) || h === TRACK.P.NOTES) sheet.setColumnWidth(i + 1, 170);
  });

  // Dropdowns and date pickers
  const list = function (h, values) {
    if (!idx[h]) return;
    sheet.getRange(2, idx[h], rows, 1).setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(values, true).setAllowInvalid(false).build());
  };
  const datePick = function (h) {
    if (!idx[h]) return;
    sheet.getRange(2, idx[h], rows, 1).setDataValidation(
      SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false).setHelpText('Pick a date').build());
  };
  if (name === TRACK.SHEETS.PROPOSALS) {
    list(TRACK.P.STATUS, objValues_(TRACK.P_STATUS));
    list(TRACK.P.LOST_REASON, TRACK.LOST_REASONS);
    datePick(TRACK.P.FOLLOW_UP);
  } else if (name === TRACK.SHEETS.PAYMENTS) {
    list(TRACK.PAY.METHOD, TRACK.METHODS);
    datePick(TRACK.PAY.RECEIVED_ON); datePick(TRACK.PAY.DUE);
  } else if (name === TRACK.SHEETS.PROJECTS) {
    list(TRACK.PRJ.STAGE, TRACK.STAGES.concat(TRACK.STAGE_EXTRA));
    datePick(TRACK.PRJ.CONTENT_ON); datePick(TRACK.PRJ.REVISED);
  }

  // Status colours
  const statusCol = { Proposals: TRACK.P.STATUS, Payments: TRACK.PAY.STATUS, Projects: TRACK.PRJ.HEALTH, Sales: TRACK.SALE.PAY_STATUS }[name];
  const rules = [];
  if (statusCol && idx[statusCol]) rules.push.apply(rules, trkStatusRules_(sheet.getRange(2, idx[statusCol], rows, 1)));
  if (name === TRACK.SHEETS.PROJECTS && idx[TRACK.PRJ.STAGE]) rules.push.apply(rules, trkStatusRules_(sheet.getRange(2, idx[TRACK.PRJ.STAGE], rows, 1)));
  if (name === TRACK.SHEETS.PAYMENTS && idx[TRACK.PAY.DAYS_OVERDUE]) {
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThan(0)
      .setFontColor('#B42318').setBold(true).setRanges([sheet.getRange(2, idx[TRACK.PAY.DAYS_OVERDUE], rows, 1)]).build());
  }
  if (name === TRACK.SHEETS.PROJECTS && idx[TRACK.PRJ.DELAY]) {
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThan(0)
      .setFontColor('#B42318').setBold(true).setRanges([sheet.getRange(2, idx[TRACK.PRJ.DELAY], rows, 1)]).build());
  }
  sheet.setConditionalFormatRules(rules);
}

function objValues_(obj) { return Object.keys(obj).map(function (k) { return obj[k]; }); }

/** Green / amber / red / grey backgrounds by status text. */
function trkStatusRules_(range) {
  const groups = [
    { bg: '#DCFCE7', fg: '#166534', words: ['Accepted', 'Paid', 'Fully paid', 'Won', 'Delivered', 'Delivered on time', 'On track'] },
    { bg: '#FEF3C7', fg: '#92400E', words: ['Follow-up due', 'Due', 'Partly paid', 'At risk', 'Design approved', 'Ready to launch', 'Proposal sent', 'In progress'] },
    { bg: '#FEE2E2', fg: '#B42318', words: ['Overdue', 'Delayed', 'Delivered late', 'Rejected', 'Lost', 'Not paid'] },
    { bg: '#F3F4F6', fg: '#4B5563', words: ['Expired', 'Cancelled', 'Upcoming', 'On hold', 'Waiting to start', 'Not emailed', 'Onboarding', 'Content received'] }
  ];
  const rules = [];
  groups.forEach(function (g) {
    g.words.forEach(function (w) {
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(w).setBackground(g.bg).setFontColor(g.fg).setRanges([range]).build());
    });
  });
  return rules;
}

/** Lead stage dropdown + colours on Submissions. */
function trkFormatLeadStage_() {
  const meta = docGetSheetMeta_(CONFIG.SHEETS.SUBMISSIONS);
  const col = meta.headerIndex[TRACK.LEAD_STAGE_COL];
  if (!col) return;
  const rows = Math.max(meta.sheet.getMaxRows() - 1, 1);
  const range = meta.sheet.getRange(2, col, rows, 1);
  const rules = meta.sheet.getConditionalFormatRules().filter(function (r) {
    return !r.getRanges().some(function (rg) { return rg.getColumn() === col; });
  });
  meta.sheet.setConditionalFormatRules(rules.concat(trkStatusRules_(range)));
}

/** Totals and forecast block to the right of the Sales table. */
function trkWriteSalesSummary_() {
  const sales = docGetSheetMeta_(TRACK.SHEETS.SALES);
  const pay = docGetSheetMeta_(TRACK.SHEETS.PAYMENTS);
  const S = TRACK.SALE, PAY = TRACK.PAY;
  const sc = function (h) { return trkColLetter_(sales.headerIndex[h]); };
  const pc = function (h) { return 'Payments!' + trkColLetter_(pay.headerIndex[h]) + '2:' + trkColLetter_(pay.headerIndex[h]); };
  const col = trackColumns_()[TRACK.SHEETS.SALES].length + 2;
  const notCancelled = sc(S.PAY_STATUS) + '2:' + sc(S.PAY_STATUS) + ',"<>' + TRACK.SALE_STATUS.CANCELLED + '"';
  const sumSales = function (h) { return '=SUMIFS(' + sc(h) + '2:' + sc(h) + ',' + notCancelled + ')'; };
  const forecast = function (days) {
    return '=SUMIFS(' + pc(PAY.BALANCE) + ',' + pc(PAY.EXPECTED) + ',"<="&(TODAY()+' + days + '),' + pc(PAY.STATUS) + ',"<>' + TRACK.PAY_STATUS.CANCELLED + '")';
  };
  const rows = [
    ['SUMMARY', ''],
    ['Deals won', '=COUNTIFS(' + sc(S.PROJECT_ID) + '2:' + sc(S.PROJECT_ID) + ',"<>",' + notCancelled + ')'],
    ['Total sales incl. GST', sumSales(S.TOTAL)],
    ['Total sales excl. GST', sumSales(S.VALUE)],
    ['Collected', sumSales(S.RECEIVED)],
    ['Pending', sumSales(S.PENDING)],
    ['Overdue now', '=SUMIFS(' + pc(PAY.BALANCE) + ',' + pc(PAY.DAYS_OVERDUE) + ',">0")'],
    ['Expected in next 30 days', forecast(30)],
    ['Expected in next 60 days', forecast(60)],
    ['Expected in next 90 days', forecast(90)]
  ];
  const sheet = sales.sheet;
  sheet.getRange(1, col, rows.length, 2).setValues(rows);
  sheet.getRange(1, col, 1, 2).setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#1C1C1C');
  sheet.getRange(2, col, rows.length - 1, 1).setFontColor('#4B5563');
  sheet.getRange(2, col + 1, 1, 1).setNumberFormat('0');
  sheet.getRange(3, col + 1, rows.length - 2, 1).setNumberFormat('₹#,##0.00').setFontWeight('bold');
  sheet.setColumnWidth(col, 190); sheet.setColumnWidth(col + 1, 140);
  sheet.setColumnWidth(col - 1, 24);
}

/** Installs the edit trigger and the daily 8 am trigger once. */
function trkEnsureTriggers_(report) {
  const handlers = ScriptApp.getProjectTriggers().map(function (t) { return t.getHandlerFunction(); });
  if (handlers.indexOf(TRACK.HANDLERS.EDIT) === -1) {
    ScriptApp.newTrigger(TRACK.HANDLERS.EDIT).forSpreadsheet(getSpreadsheet_()).onEdit().create();
    report.push('Installed the edit trigger (status changes create rows automatically).');
  }
  if (handlers.indexOf(TRACK.HANDLERS.DAILY) === -1) {
    ScriptApp.newTrigger(TRACK.HANDLERS.DAILY).timeBased().everyDays(1).atHour(8).inTimezone(TRACK.TZ).create();
    report.push('Installed the daily 8 am update (follow-ups, overdue payments, delays).');
  }
}

/** Adds a Proposals row for every submission whose documents were already created. */
function trkBackfillProposals_() {
  const S = DOCS_CONFIG.SUB;
  const have = {};
  trkRows_(TRACK.SHEETS.PROPOSALS).forEach(function (r) { have[toStr_(r[TRACK.P.SUB_ID])] = true; });
  let n = 0;
  getSheetObjects_(CONFIG.SHEETS.SUBMISSIONS).rows.forEach(function (r) {
    const id = toStr_(r[S.ID]);
    if (!id || have[id] || !toStr_(r[S.PROPOSAL_LINK])) return;
    try {
      const sent = toStr_(r[S.EMAIL_STATUS]) === DOCS_CONFIG.EMAIL_STATUS.SENT;
      recordProposal_(id, { proposalPdf: toStr_(r[S.PROPOSAL_LINK]), quotationPdf: toStr_(r[S.QUOTATION_LINK]) }, sent,
        (r[S.EMAILED_AT] instanceof Date) ? r[S.EMAILED_AT] : null);
      n++;
    } catch (e) { console.error('Backfill failed for ' + id + ': ' + e.message); }
  });
  return n;
}
