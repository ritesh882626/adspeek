/**
 * DocSetup.gs  (Module 2)
 * AdsPeek menu:
 *   "Set up documents and email"       first-time setup (never overwrites existing templates)
 *   "Rebuild document templates"       creates fresh templates in the current design and switches to them
 *
 * Design: minimal black-and-white (large title, thin dividing lines, generous white space),
 * AdsPeek logo, optional partner badges on proposals.
 */

function setupDocuments() {
  const K = DOCS_CONFIG.SETTING_KEYS;
  const report = [];

  // 1. Settings rows
  const existing = getSettingsMap_();
  DOCS_CONFIG.SETTING_DEFAULTS.forEach(function (row) {
    if (!(row[0] in existing)) { docSetSetting_(row[0], row[1], row[2]); report.push('Added setting: ' + row[0]); }
  });

  // 2. Submissions columns
  const added = docEnsureColumns_(CONFIG.SHEETS.SUBMISSIONS, DOCS_CONFIG.NEW_SUB_COLUMNS);
  if (added) report.push('Added ' + added + ' column(s) to Submissions.');

  // 3. Folder
  const folder = ensureDocumentsFolder_(report);

  // 4. Templates (only the ones that are missing)
  const settings = getSettingsMap_();
  [
    { key: K.PROPOSAL_TEMPLATE, build: createProposalTemplate_, label: 'proposal' },
    { key: K.QUOTATION_TEMPLATE, build: createQuotationTemplate_, label: 'quotation' },
    { key: K.INVOICE_TEMPLATE, build: createInvoiceTemplate_, label: 'invoice' }
  ].forEach(function (t) {
    const id = toStr_(settings[t.key]);
    if (!id || !docDriveItemExists_(id, false)) {
      const newId = t.build(folder);
      docSetSetting_(t.key, newId);
      report.push('Created ' + t.label + ' template: https://docs.google.com/document/d/' + newId + '/edit');
    }
  });

  // 5. Safety trigger (retries anything still Pending every 10 minutes)
  if (ensureSafetyTrigger_()) report.push('Created a 10-minute retry trigger.');

  clearCatalogCache_();
  docShowSetupReport_('Documents and email setup', report.length ? report : ['Everything was already set up.'],
    'Next: fill in "Bank details" in Settings, then run testDocumentsForLatest to preview documents.');
}

/** Menu: build new templates in the current design and switch to them (old ones are kept, renamed OLD). */
function rebuildDocumentTemplates() {
  const K = DOCS_CONFIG.SETTING_KEYS;
  try {
    const ui = SpreadsheetApp.getUi();
    const ok = ui.alert('Rebuild document templates',
      'This creates new proposal, quotation and invoice templates in the latest design and switches the system to them. ' +
      'Your current templates are kept in Drive with "OLD" added to their names. Continue?', ui.ButtonSet.YES_NO);
    if (ok !== ui.Button.YES) return;
  } catch (e) { /* run from editor */ }

  setupDocumentsSettingsOnly_();
  const report = [];
  const folder = ensureDocumentsFolder_(report);
  const settings = getSettingsMap_();
  [
    { key: K.PROPOSAL_TEMPLATE, build: createProposalTemplate_, label: 'Proposal' },
    { key: K.QUOTATION_TEMPLATE, build: createQuotationTemplate_, label: 'Quotation' },
    { key: K.INVOICE_TEMPLATE, build: createInvoiceTemplate_, label: 'Invoice' }
  ].forEach(function (t) {
    const oldId = toStr_(settings[t.key]);
    if (oldId && docDriveItemExists_(oldId, false)) {
      const f = DriveApp.getFileById(oldId);
      if (f.getName().indexOf('OLD - ') !== 0) f.setName('OLD - ' + f.getName());
    }
    const newId = t.build(folder);
    docSetSetting_(t.key, newId);
    report.push(t.label + ' template: https://docs.google.com/document/d/' + newId + '/edit');
  });
  docShowSetupReport_('New templates created', report, 'Run testDocumentsForLatest to preview them with real data.');
}

/** Adds missing Settings rows and Submissions columns only. */
function setupDocumentsSettingsOnly_() {
  const existing = getSettingsMap_();
  DOCS_CONFIG.SETTING_DEFAULTS.forEach(function (row) {
    if (!(row[0] in existing)) docSetSetting_(row[0], row[1], row[2]);
  });
  docEnsureColumns_(CONFIG.SHEETS.SUBMISSIONS, DOCS_CONFIG.NEW_SUB_COLUMNS);
}

function ensureDocumentsFolder_(report) {
  const K = DOCS_CONFIG.SETTING_KEYS;
  const settings = getSettingsMap_();
  let folderId = toStr_(settings[K.OUTPUT_FOLDER]);
  if (!folderId || !docDriveItemExists_(folderId, true)) {
    const folder = DriveApp.createFolder('AdsPeek Proposals, Quotations & Invoices');
    folderId = folder.getId();
    docSetSetting_(K.OUTPUT_FOLDER, folderId);
    report.push('Created Drive folder: ' + folder.getUrl());
  }
  return DriveApp.getFolderById(folderId);
}

function docShowSetupReport_(title, lines, footer) {
  const msg = lines.join('\n') + (footer ? '\n\n' + footer : '');
  console.log(title + '\n' + msg);
  try { SpreadsheetApp.getUi().alert(title, msg, SpreadsheetApp.getUi().ButtonSet.OK); } catch (e) { /* run from editor */ }
}

/** True if the Drive file/folder exists and is not trashed. */
function docDriveItemExists_(id, isFolder) {
  try {
    const item = isFolder ? DriveApp.getFolderById(id) : DriveApp.getFileById(id);
    return !item.isTrashed();
  } catch (e) { return false; }
}

/** Creates the 10-minute safety trigger once. Returns true if created. */
function ensureSafetyTrigger_() {
  const props = PropertiesService.getScriptProperties();
  const savedId = props.getProperty(DOCS_CONFIG.PROPS.SAFETY_TRIGGER_ID);
  const exists = ScriptApp.getProjectTriggers().some(function (t) { return t.getUniqueId() === savedId; });
  if (exists) return false;
  const trigger = ScriptApp.newTrigger(DOCS_CONFIG.QUEUE_HANDLER).timeBased().everyMinutes(10).create();
  props.setProperty(DOCS_CONFIG.PROPS.SAFETY_TRIGGER_ID, trigger.getUniqueId());
  return true;
}

// ======================================================================= design system

const DOC_DS = {
  FONT: 'Inter',
  INK: '#1C1C1C',     // main text
  MUTED: '#6B6B6B',   // secondary text
  LABEL: '#8A8A8A',   // small labels
  CONTENT_WIDTH: 487  // A4 width (595pt) minus 54pt margins
};

/** Applies text styling through attributes (works on Paragraph and ListItem). */
function docStyleEl_(el, opts) {
  const A = DocumentApp.Attribute;
  const st = {};
  st[A.FONT_FAMILY] = opts.font || DOC_DS.FONT;
  if (opts.size) st[A.FONT_SIZE] = opts.size;
  st[A.BOLD] = !!opts.bold;
  st[A.ITALIC] = !!opts.italic;
  st[A.FOREGROUND_COLOR] = opts.color || DOC_DS.INK;
  if (opts.before !== undefined) st[A.SPACING_BEFORE] = opts.before;
  if (opts.after !== undefined) st[A.SPACING_AFTER] = opts.after;
  el.setAttributes(st);
  if (opts.align) el.setAlignment(opts.align);
  if (opts.lineSpacing) el.setLineSpacing(opts.lineSpacing);
  return el;
}

function docNewDoc_(name) {
  const doc = DocumentApp.create(name);
  const body = doc.getBody();
  body.clear();
  body.setMarginTop(48).setMarginBottom(48).setMarginLeft(54).setMarginRight(54);
  body.setPageWidth(595.28).setPageHeight(841.89); // A4
  return doc;
}

function docPara_(body, text, opts) {
  return docStyleEl_(body.appendParagraph(text), Object.assign({ size: 10, after: 3 }, opts || {}));
}

function docLabel_(body, text) {
  return docPara_(body, text.toUpperCase(), { size: 8, bold: true, color: DOC_DS.LABEL, before: 18, after: 6 });
}

function docRule_(body) {
  return body.appendHorizontalRule();
}

function docSpacer_(body, size) {
  return docStyleEl_(body.appendParagraph(''), { size: size || 6, after: 0 });
}

function docBullet_(body, text, numbered) {
  const li = body.appendListItem(text);
  li.setGlyphType(numbered ? DocumentApp.GlyphType.NUMBER : DocumentApp.GlyphType.BULLET);
  return docStyleEl_(li, { size: 9.5, after: 2, color: DOC_DS.INK });
}

/** Borderless table with fixed column widths. rows = array of arrays of strings. */
function docPlainTable_(body, rows, widths) {
  const t = body.appendTable(rows);
  t.setBorderWidth(0);
  for (let r = 0; r < t.getNumRows(); r++) {
    for (let c = 0; c < t.getRow(r).getNumCells(); c++) {
      const cell = t.getRow(r).getCell(c);
      if (r === 0 && widths && widths[c]) cell.setWidth(widths[c]);
      cell.setPaddingTop(3).setPaddingBottom(3).setPaddingLeft(0).setPaddingRight(8);
      docStyleCell_(cell, { size: 9.5 });
    }
  }
  return t;
}

/** Styles every paragraph in a cell. */
function docStyleCell_(cell, opts) {
  for (let i = 0; i < cell.getNumChildren(); i++) {
    const ch = cell.getChild(i);
    if (ch.getType() === DocumentApp.ElementType.PARAGRAPH) docStyleEl_(ch.asParagraph(), Object.assign({ after: 1 }, opts));
  }
}

/** Puts several lines into a cell: first line styled 'first', others 'rest'. */
function docFillCell_(cell, lines, first, rest, align) {
  cell.setText(lines[0] || '');
  const p0 = cell.getChild(0).asParagraph();
  docStyleEl_(p0, Object.assign({ after: 1 }, first, align ? { align: align } : {}));
  for (let i = 1; i < lines.length; i++) {
    docStyleEl_(cell.appendParagraph(lines[i]), Object.assign({ after: 1 }, rest, align ? { align: align } : {}));
  }
}

/** Bold label + value inside a cell, e.g. "Date:  05-11-2026". */
function docKvCell_(cell, labelText, valueText) {
  cell.setText(labelText + '  ' + valueText);
  const p = cell.getChild(0).asParagraph();
  docStyleEl_(p, { size: 9.5, after: 0 });
  p.editAsText().setBold(0, labelText.length - 1, true);
}

/** Header: logo left, company name + GSTIN right. */
function docWriteHeader_(doc, body, showPartners) {
  const t = body.appendTable([['', '']]);
  t.setBorderWidth(0);
  const left = t.getRow(0).getCell(0), right = t.getRow(0).getCell(1);
  left.setWidth(200).setPaddingLeft(0).setPaddingTop(0).setPaddingBottom(0);
  right.setPaddingRight(0).setPaddingTop(0).setPaddingBottom(0);

  const img = left.getChild(0).asParagraph().appendInlineImage(getLogoBlob_());
  const h = 30;
  img.setWidth(Math.round(h * img.getWidth() / img.getHeight())).setHeight(h);

  docFillCell_(right, ['{{COMPANY_NAME}}', 'GSTIN {{COMPANY_GSTIN}}', '{{COMPANY_WEBSITE}}'],
    { size: 9, bold: true, color: DOC_DS.INK }, { size: 8.5, color: DOC_DS.MUTED }, DocumentApp.HorizontalAlignment.RIGHT);

  if (showPartners) {
    docSpacer_(body, 4);
    const p = body.appendParagraph('');
    const strip = p.appendInlineImage(getPartnerStripBlob_());
    const w = DOC_DS.CONTENT_WIDTH;
    strip.setHeight(Math.round(w * strip.getHeight() / strip.getWidth())).setWidth(w);
    docStyleEl_(p, { size: 6, after: 0, align: DocumentApp.HorizontalAlignment.CENTER });
  }
}

/** Large title with a small line above it (service name / milestone). */
function docWriteTitle_(body, kicker, title) {
  docPara_(body, kicker, { size: 12, color: DOC_DS.INK, before: 26, after: 0 });
  docPara_(body, title, { size: 54, color: DOC_DS.INK, before: 0, after: 8, lineSpacing: 0.9 });
}

/** Thin-ruled row with three label/value pairs. */
function docWriteInfoRow_(body, pairs) {
  docRule_(body);
  const t = body.appendTable([['', '', '']]);
  t.setBorderWidth(0);
  const widths = [150, 170, 167];
  pairs.forEach(function (pair, i) {
    const cell = t.getRow(0).getCell(i);
    cell.setWidth(widths[i]).setPaddingLeft(0).setPaddingTop(4).setPaddingBottom(4);
    docKvCell_(cell, pair[0], pair[1]);
  });
  docRule_(body);
}

/** Billed-to (left) and From (right) blocks. */
function docWriteParties_(body, leftTitle, extraLeft) {
  const t = body.appendTable([['', '']]);
  t.setBorderWidth(0);
  const left = t.getRow(0).getCell(0), right = t.getRow(0).getCell(1);
  left.setWidth(260).setPaddingLeft(0).setPaddingTop(8);
  right.setPaddingRight(0).setPaddingTop(8);
  docFillCell_(left, [leftTitle, '{{BUSINESS_NAME}}', '{{CLIENT_NAME}}', '{{CLIENT_ADDRESS}}', 'GSTIN: {{CLIENT_GSTIN}}', '{{CLIENT_EMAIL}}  ·  {{CLIENT_MOBILE}}'].concat(extraLeft || []),
    { size: 8, bold: true, color: DOC_DS.LABEL }, { size: 9.5, color: DOC_DS.INK });
  left.getChild(1).asParagraph().editAsText().setBold(true);
  docFillCell_(right, ['FROM', '{{COMPANY_NAME}}', '{{COMPANY_ADDRESS}}', 'GSTIN: {{COMPANY_GSTIN}}'],
    { size: 8, bold: true, color: DOC_DS.LABEL }, { size: 9.5, color: DOC_DS.INK }, DocumentApp.HorizontalAlignment.RIGHT);
  right.getChild(1).asParagraph().editAsText().setBold(true);
}

/** Right-aligned totals block. */
function docWriteTotals_(body, firstLabel, totalLabel) {
  docSpacer_(body, 4);
  const t = body.appendTable([
    ['', firstLabel, '{{FINAL_PRICE}}'],
    ['', '{{TAX_LABEL_1}}', '{{TAX_VALUE_1}}'],
    ['', '{{TAX_LABEL_2}}', '{{TAX_VALUE_2}}']
  ]);
  t.setBorderWidth(0);
  for (let r = 0; r < t.getNumRows(); r++) {
    const row = t.getRow(r);
    if (r === 0) { row.getCell(0).setWidth(237); row.getCell(1).setWidth(140); }
    for (let c = 0; c < 3; c++) {
      const cell = row.getCell(c);
      cell.setPaddingTop(2).setPaddingBottom(2).setPaddingLeft(0).setPaddingRight(0);
      docStyleCell_(cell, { size: 9.5, color: c === 1 ? DOC_DS.MUTED : DOC_DS.INK, align: DocumentApp.HorizontalAlignment.RIGHT });
    }
  }
  docRule_(body);
  const total = body.appendTable([['', totalLabel, '{{GRAND_TOTAL}}']]);
  total.setBorderWidth(0);
  const tr = total.getRow(0);
  tr.getCell(0).setWidth(237); tr.getCell(1).setWidth(140);
  for (let c = 0; c < 3; c++) {
    const cell = tr.getCell(c);
    cell.setPaddingLeft(0).setPaddingRight(0).setPaddingTop(4);
    docStyleCell_(cell, { size: c === 2 ? 18 : 10, bold: c === 2, color: c === 1 ? DOC_DS.MUTED : DOC_DS.INK, align: DocumentApp.HorizontalAlignment.RIGHT });
  }
}

/** Two columns at the bottom: payment details | note. */
function docWriteBottomColumns_(body, leftTitle, leftLines, rightTitle, rightLines) {
  docSpacer_(body, 14);
  const t = body.appendTable([['', ''], ['', '']]);
  t.setBorderWidth(0);
  const widths = [245, 242];
  [[leftTitle, leftLines], [rightTitle, rightLines]].forEach(function (col, i) {
    const head = t.getRow(0).getCell(i), content = t.getRow(1).getCell(i);
    head.setWidth(widths[i]).setPaddingLeft(i === 1 ? 14 : 0).setPaddingBottom(4);
    content.setPaddingLeft(i === 1 ? 14 : 0).setPaddingTop(6);
    docFillCell_(head, [col[0]], { size: 9.5, bold: true, color: DOC_DS.INK }, {});
    docFillCell_(content, col[1], { size: 9.5, color: DOC_DS.INK }, { size: 9.5, color: DOC_DS.INK });
  });
}

/** Footer: company line + website. */
function docWriteFooter_(doc) {
  const footer = doc.addFooter();
  const p = footer.getChild(0).asParagraph();
  p.setText('{{COMPANY_NAME}}  ·  GSTIN {{COMPANY_GSTIN}}  ·  SAC {{SAC_CODE}}  ·  {{COMPANY_WEBSITE}}');
  docStyleEl_(p, { size: 7.5, color: DOC_DS.LABEL, align: DocumentApp.HorizontalAlignment.LEFT });
}

function docSaveTemplate_(doc, folder) {
  doc.saveAndClose();
  DriveApp.getFileById(doc.getId()).moveTo(folder);
  return doc.getId();
}

// ======================================================================= templates

function createProposalTemplate_(folder) {
  const showPartners = isYes_(docGetSetting_(getSettingsMap_(), DOCS_CONFIG.SETTING_KEYS.SHOW_PARTNERS, 'Yes'));
  const doc = docNewDoc_('TEMPLATE - AdsPeek Proposal');
  const body = doc.getBody();
  docWriteHeader_(doc, body, showPartners);
  docWriteTitle_(body, '{{SERVICE_NAME}}', 'Proposal');
  docWriteInfoRow_(body, [['Date:', '{{DATE}}'], ['Valid until:', '{{VALID_UNTIL}}'], ['Proposal no.:', '{{DOC_NUMBER}}']]);
  docWriteParties_(body, 'PREPARED FOR');

  docLabel_(body, 'Project overview');
  docPara_(body, '{{PROJECT_SUMMARY}}', { size: 10, lineSpacing: 1.15 });

  docLabel_(body, 'Scope of work');
  docPara_(body, '{{SCOPE_TABLE}}');

  docLabel_(body, 'Included in every package');
  docPara_(body, '{{INCLUDED_LIST}}');

  docLabel_(body, 'Investment');
  docWriteTotals_(body, 'Project value', 'Total incl. GST');
  docPara_(body, 'The detailed price breakup is in quotation {{QUOTATION_NUMBER}}, sent with this proposal.', { size: 8.5, color: DOC_DS.MUTED, before: 6 });

  docLabel_(body, 'Timeline');
  docPara_(body, 'About {{DELIVERY_DAYS}} working days from the date we receive the advance payment and all content (logo, product details, images and policies). Delays in content or approvals move the launch date by the same number of days.', { size: 10, lineSpacing: 1.15 });

  docLabel_(body, 'Payment terms');
  docPara_(body, '{{MILESTONE_TABLE}}');

  docLabel_(body, 'Not included');
  [
    'Domain and Shopify subscription, paid by the customer.',
    'Product information, descriptions, prices and images, provided by the customer.',
    'Third-party app, tool and payment gateway fees, paid by the customer to each provider. Setting them up is included.'
  ].forEach(function (t) { docBullet_(body, t, true); });
  docPara_(body, '{{MONTHLY_COSTS}}');

  docLabel_(body, 'Terms and conditions');
  [
    'Only the deliverables listed above are included. Anything else is quoted separately as a change request.',
    'Extra revision rounds are charged at ₹2,500 each. Approved work is locked; later changes are change requests.',
    'The store and its content belong to the customer once the full payment is received.',
    'If the customer does not respond for 15 days, the project is paused. The advance is non-refundable once work has started.',
    'This proposal is valid until the date shown above.'
  ].forEach(function (t) { docBullet_(body, t, true); });

  docLabel_(body, 'Acceptance');
  docPara_(body, 'By signing below, both parties agree to the scope, price and terms in this proposal.', { size: 9.5 });
  docSpacer_(body, 10);
  const sign = docPlainTable_(body, [
    ['For {{COMPANY_NAME}}', 'For {{BUSINESS_NAME}}'],
    ['\n\n______________________________', '\n\n______________________________'],
    ['Name and signature', 'Name and signature'],
    ['Date:', 'Date:']
  ], [245, 242]);
  for (let c = 0; c < 2; c++) sign.getRow(0).getCell(c).editAsText().setBold(true);

  docWriteFooter_(doc);
  return docSaveTemplate_(doc, folder);
}

function createQuotationTemplate_(folder) {
  const doc = docNewDoc_('TEMPLATE - AdsPeek Quotation');
  const body = doc.getBody();
  docWriteHeader_(doc, body, false);
  docWriteTitle_(body, '{{SERVICE_NAME}}', 'Quotation');
  docWriteInfoRow_(body, [['Date:', '{{DATE}}'], ['Valid until:', '{{VALID_UNTIL}}'], ['Quotation no.:', '{{DOC_NUMBER}}']]);
  docWriteParties_(body, 'TO');
  docSpacer_(body, 6);
  docPara_(body, '{{PRICE_TABLE}}');
  docWriteTotals_(body, 'Subtotal', 'Total due');
  docPara_(body, '{{ON_REQUEST_NOTE}}', { size: 8.5, color: DOC_DS.MUTED, before: 6 });

  docLabel_(body, 'Payment schedule');
  docPara_(body, '{{MILESTONE_TABLE}}');

  docWriteBottomColumns_(body,
    'Payment details', ['Pay via bank transfer or UPI:', '{{BANK_DETAILS}}'],
    'Notes', ['GST is charged at 18% as shown. Third-party app and tool fees are paid to each provider.', 'Scope details are in proposal {{PROPOSAL_NUMBER}}. Valid until {{VALID_UNTIL}}.']);

  docWriteFooter_(doc);
  return docSaveTemplate_(doc, folder);
}

function createInvoiceTemplate_(folder) {
  const doc = docNewDoc_('TEMPLATE - AdsPeek Invoice');
  const body = doc.getBody();
  docWriteHeader_(doc, body, false);
  docWriteTitle_(body, '{{MILESTONE_NAME}}', '{{INVOICE_TITLE}}');
  docWriteInfoRow_(body, [['Invoice no.:', '{{DOC_NUMBER}}'], ['Date:', '{{DATE}}'], ['Due date:', '{{DUE_DATE}}']]);
  docWriteParties_(body, 'BILLED TO', ['Place of supply: {{PLACE_OF_SUPPLY}}']);
  docSpacer_(body, 6);
  docPara_(body, '{{INVOICE_TABLE}}');
  docWriteTotals_(body, 'Taxable value', 'Total amount due');
  docPara_(body, 'Amount in words: {{AMOUNT_IN_WORDS}}', { size: 8.5, color: DOC_DS.MUTED, before: 8, align: DocumentApp.HorizontalAlignment.RIGHT });
  docPara_(body, 'Project: {{PROJECT_REF}}  ·  Quotation: {{QUOTATION_NUMBER}}', { size: 8.5, color: DOC_DS.MUTED, align: DocumentApp.HorizontalAlignment.RIGHT });

  docWriteBottomColumns_(body,
    'Payment details', ['Pay via bank transfer or UPI:', '{{BANK_DETAILS}}', 'Please mention {{DOC_NUMBER}} as the payment reference.'],
    'Thank you!', ['{{THANK_YOU_NOTE}}']);

  docWriteFooter_(doc);
  return docSaveTemplate_(doc, folder);
}
