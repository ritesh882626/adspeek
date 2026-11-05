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
      f.moveTo(docSubFolder_(getTemplatesFolder_(folder), 'Old templates'));
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

/** Returns (and creates when needed) a named subfolder. */
function docSubFolder_(parent, name) {
  const it = parent.getFoldersByName(name);
  return it.hasNext() ? it.next() : parent.createFolder(name);
}

/** Templates live in "<root>/Templates". */
function getTemplatesFolder_(root) {
  return docSubFolder_(root, 'Templates');
}

// ======================================================================= design system

const DOC_DS = {
  FONT: 'Inter',
  INK: '#1C1C1C',      // main text
  MUTED: '#6B6B6B',    // secondary text
  LABEL: '#8A8A8A',    // small labels
  LINE: '#DADADA',     // table borders
  FILL: '#F4F4F4',     // light panels
  HEAD_FILL: '#1C1C1C',// table header background
  HEAD_TEXT: '#FFFFFF',
  CONTENT_WIDTH: 487   // A4 width (595pt) minus 54pt margins
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
  st[A.SPACING_BEFORE] = opts.before !== undefined ? opts.before : 0;
  st[A.SPACING_AFTER] = opts.after !== undefined ? opts.after : 0;
  st[A.LINE_SPACING] = opts.lineSpacing || 1.1;
  el.setAttributes(st);
  el.setAlignment(opts.align || DocumentApp.HorizontalAlignment.LEFT);
  return el;
}

function docNewDoc_(name) {
  const doc = DocumentApp.create(name);
  const body = doc.getBody();
  body.clear();
  body.setMarginTop(42).setMarginBottom(42).setMarginLeft(54).setMarginRight(54);
  body.setPageWidth(595.28).setPageHeight(841.89); // A4
  return doc;
}

function docPara_(body, text, opts) {
  return docStyleEl_(body.appendParagraph(text), Object.assign({ size: 9.5, after: 3 }, opts || {}));
}

/** Small grey section heading, e.g. "PAYMENT SCHEDULE". */
function docLabel_(body, text) {
  return docPara_(body, text.toUpperCase(), { size: 8, bold: true, color: DOC_DS.LABEL, before: 16, after: 6 });
}

function docBullet_(body, text, numbered) {
  const li = body.appendListItem(text);
  li.setGlyphType(numbered ? DocumentApp.GlyphType.NUMBER : DocumentApp.GlyphType.BULLET);
  return docStyleEl_(li, { size: 9, after: 2, color: DOC_DS.INK, lineSpacing: 1.15 });
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

/** Sets padding on a cell in one call. */
function docPad_(cell, top, right, bottom, left) {
  cell.setPaddingTop(top).setPaddingRight(right).setPaddingBottom(bottom).setPaddingLeft(left);
  return cell;
}

/** Borderless table with no visible frame. */
function docLayoutTable_(body, rows) {
  const t = body.appendTable(rows);
  t.setBorderWidth(0);
  return t;
}

/**
 * Removes the big gaps Google Docs leaves around tables: every empty body paragraph
 * (no text, no image) is shrunk to a 1pt line with no spacing.
 */
function docTightenEmptyParagraphs_(body) {
  const P = DocumentApp.ElementType.PARAGRAPH;
  for (let i = 0; i < body.getNumChildren(); i++) {
    const el = body.getChild(i);
    if (el.getType() !== P) continue;
    const p = el.asParagraph();
    if (p.getText() !== '') continue;
    let hasObject = false;
    for (let c = 0; c < p.getNumChildren(); c++) {
      if (p.getChild(c).getType() !== DocumentApp.ElementType.TEXT) { hasObject = true; break; }
    }
    if (hasObject) continue;
    const A = DocumentApp.Attribute, st = {};
    st[A.FONT_SIZE] = 1; st[A.SPACING_BEFORE] = 0; st[A.SPACING_AFTER] = 0; st[A.LINE_SPACING] = 1;
    p.setAttributes(st);
  }
}

/** Header: logo left, company name + GSTIN + website right. Partner badges below (proposal only). */
function docWriteHeader_(doc, body, showPartners) {
  const t = docLayoutTable_(body, [['', '']]);
  const left = t.getRow(0).getCell(0), right = t.getRow(0).getCell(1);
  docPad_(left, 0, 0, 0, 0).setWidth(200);
  docPad_(right, 0, 0, 0, 0);
  left.setVerticalAlignment(DocumentApp.VerticalAlignment.CENTER);

  const lp = left.getChild(0).asParagraph();
  docStyleEl_(lp, { size: 6 });
  const img = lp.appendInlineImage(getLogoBlob_());
  const h = 28;
  img.setWidth(Math.round(h * img.getWidth() / img.getHeight())).setHeight(h);

  docFillCell_(right, ['{{COMPANY_NAME}}', 'GSTIN {{COMPANY_GSTIN}}', '{{COMPANY_WEBSITE}}'],
    { size: 9, bold: true }, { size: 8, color: DOC_DS.MUTED }, DocumentApp.HorizontalAlignment.RIGHT);

  if (showPartners) {
    const p = body.appendParagraph('');
    const strip = p.appendInlineImage(getPartnerStripBlob_());
    const w = 380;
    strip.setHeight(Math.round(w * strip.getHeight() / strip.getWidth())).setWidth(w);
    docStyleEl_(p, { size: 6, before: 14, align: DocumentApp.HorizontalAlignment.LEFT });
  }
}

/** Title block: small kicker line + large document title. */
function docWriteTitle_(body, kicker, title) {
  docPara_(body, kicker, { size: 10, color: DOC_DS.MUTED, before: 22, after: 2 });
  docPara_(body, title, { size: 32, bold: true, before: 0, after: 12, lineSpacing: 1 });
}

/** Light grey strip with three label/value pairs (date, valid until, number). */
function docWriteInfoRow_(body, pairs) {
  const t = docLayoutTable_(body, [['', '', '']]);
  const widths = [150, 160, 177];
  pairs.forEach(function (pair, i) {
    const cell = t.getRow(0).getCell(i);
    cell.setWidth(widths[i]).setBackgroundColor(DOC_DS.FILL);
    docPad_(cell, 8, 8, 8, i === 0 ? 10 : 8);
    docFillCell_(cell, [pair[0].replace(':', '').toUpperCase(), pair[1]],
      { size: 7.5, bold: true, color: DOC_DS.LABEL }, { size: 10, bold: true });
  });
}

/** Billed-to (left) and From (right) blocks. */
function docWriteParties_(body, leftTitle, extraLeft) {
  const t = docLayoutTable_(body, [['', '']]);
  const left = t.getRow(0).getCell(0), right = t.getRow(0).getCell(1);
  docPad_(left, 14, 10, 0, 0).setWidth(250);
  docPad_(right, 14, 0, 0, 10);
  const label = { size: 7.5, bold: true, color: DOC_DS.LABEL, after: 4 };
  const text = { size: 9, color: DOC_DS.INK, lineSpacing: 1.2 };
  docFillCell_(left, [leftTitle, '{{BUSINESS_NAME}}', '{{CLIENT_NAME}}', '{{CLIENT_ADDRESS}}', 'GSTIN: {{CLIENT_GSTIN}}', '{{CLIENT_EMAIL}}', '{{CLIENT_MOBILE}}'].concat(extraLeft || []), label, text);
  left.getChild(1).asParagraph().editAsText().setBold(true).setFontSize(10);
  docFillCell_(right, ['FROM', '{{COMPANY_NAME}}', '{{COMPANY_ADDRESS}}', 'GSTIN: {{COMPANY_GSTIN}}'], label, text, DocumentApp.HorizontalAlignment.RIGHT);
  right.getChild(1).asParagraph().editAsText().setBold(true).setFontSize(10);
}

/** Right-aligned totals: value, tax rows and a highlighted total row. */
function docWriteTotals_(body, firstLabel, totalLabel) {
  const t = docLayoutTable_(body, [
    ['', firstLabel, '{{FINAL_PRICE}}'],
    ['', '{{TAX_LABEL_1}}', '{{TAX_VALUE_1}}'],
    ['', '{{TAX_LABEL_2}}', '{{TAX_VALUE_2}}'],
    ['', totalLabel, '{{GRAND_TOTAL}}']
  ]);
  const R = DocumentApp.HorizontalAlignment.RIGHT;
  for (let r = 0; r < t.getNumRows(); r++) {
    const row = t.getRow(r), isTotal = r === t.getNumRows() - 1;
    if (r === 0) { row.getCell(0).setWidth(247); row.getCell(1).setWidth(130); }
    for (let c = 0; c < 3; c++) {
      const cell = row.getCell(c);
      docPad_(cell, isTotal ? 8 : 3, c === 2 ? 8 : 6, isTotal ? 8 : 3, 6);
      if (isTotal && c > 0) cell.setBackgroundColor(DOC_DS.HEAD_FILL);
      docStyleCell_(cell, {
        size: isTotal ? (c === 2 ? 12 : 9.5) : 9.5,
        bold: isTotal,
        color: isTotal ? DOC_DS.HEAD_TEXT : (c === 1 ? DOC_DS.MUTED : DOC_DS.INK),
        align: R
      });
    }
  }
}

/** Two columns at the bottom: payment details | notes. Left column holds a {{BANK_DETAILS}} marker line. */
function docWriteBottomColumns_(body, leftTitle, leftLines, rightTitle, rightLines) {
  const t = docLayoutTable_(body, [['', '']]);
  [[leftTitle, leftLines], [rightTitle, rightLines]].forEach(function (col, i) {
    const cell = t.getRow(0).getCell(i);
    cell.setWidth(i === 0 ? 243 : 244).setBackgroundColor(DOC_DS.FILL);
    docPad_(cell, 10, 10, 10, 10);
    docFillCell_(cell, [col[0].toUpperCase()].concat(col[1]),
      { size: 7.5, bold: true, color: DOC_DS.LABEL, after: 5 }, { size: 9, color: DOC_DS.INK, lineSpacing: 1.2, after: 2 });
  });
  // the two cells sit side by side with a white gap between them
  t.setBorderWidth(6).setBorderColor('#FFFFFF');
}

/** Footer: company line + website. */
function docWriteFooter_(doc) {
  const footer = doc.addFooter();
  const p = footer.getChild(0).asParagraph();
  p.setText('{{COMPANY_NAME}}  ·  GSTIN {{COMPANY_GSTIN}}  ·  SAC {{SAC_CODE}}  ·  {{COMPANY_WEBSITE}}');
  docStyleEl_(p, { size: 7, color: DOC_DS.LABEL, align: DocumentApp.HorizontalAlignment.CENTER });
}

/** Small visible gap (a single space, so it is never shrunk by docTightenEmptyParagraphs_). */
function docSpacer_(body, size) {
  return docStyleEl_(body.appendParagraph(' '), { size: size || 6 });
}

/** A marker paragraph that the filling step replaces with a table or list. */
function docMarker_(body, marker) {
  return docPara_(body, marker, { size: 9.5 });
}

function docSaveTemplate_(doc, folder) {
  docTightenEmptyParagraphs_(doc.getBody());
  doc.saveAndClose();
  DriveApp.getFileById(doc.getId()).moveTo(getTemplatesFolder_(folder));
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
  docPara_(body, '{{PROJECT_SUMMARY}}', { size: 9.5, lineSpacing: 1.25 });

  docLabel_(body, 'Scope of work');
  docMarker_(body, '{{SCOPE_TABLE}}');

  docLabel_(body, 'Investment');
  docWriteTotals_(body, 'Project value', 'Total incl. GST');
  docPara_(body, 'The item-wise price breakup is in quotation {{QUOTATION_NUMBER}}, attached with this proposal.', { size: 8, color: DOC_DS.MUTED, before: 6, align: DocumentApp.HorizontalAlignment.RIGHT });

  docLabel_(body, 'Payment terms');
  docMarker_(body, '{{MILESTONE_TABLE}}');

  docLabel_(body, 'Timeline');
  docPara_(body, 'About {{DELIVERY_DAYS}} working days from the date we receive the advance payment and all content (logo, product details, images and policies). Delays in content or approvals move the launch date by the same number of days.', { size: 9.5, lineSpacing: 1.25 });

  docLabel_(body, 'Not included');
  [
    'Domain and Shopify subscription, paid by the customer.',
    'Product information, descriptions, prices and images, provided by the customer.',
    'Third-party app, tool and payment gateway fees, paid by the customer to each provider. Setting them up is included.'
  ].forEach(function (t) { docBullet_(body, t, false); });

  docLabel_(body, 'Monthly costs paid to providers');
  docMarker_(body, '{{MONTHLY_COSTS}}');

  docLabel_(body, 'Terms and conditions');
  [
    'Only the deliverables listed above are included. Anything else is quoted separately as a change request.',
    'Extra revision rounds are charged at ₹2,500 each. Approved work is locked; later changes are change requests.',
    'The store and its content belong to the customer once the full payment is received.',
    'If the customer does not respond for 15 days, the project is paused. The advance is non-refundable once work has started.',
    'This proposal is valid until the date shown above.'
  ].forEach(function (t) { docBullet_(body, t, true); });

  docLabel_(body, 'Acceptance');
  docPara_(body, 'By signing below, both parties agree to the scope, price and terms in this proposal.', { size: 9.5, after: 8 });
  const sign = docLayoutTable_(body, [['For {{COMPANY_NAME}}', 'For {{BUSINESS_NAME}}'], ['', ''], ['Name and signature', 'Name and signature'], ['Date:', 'Date:']]);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 2; c++) {
      const cell = sign.getRow(r).getCell(c);
      if (r === 0) cell.setWidth(c === 0 ? 243 : 244);
      docPad_(cell, r === 1 ? 34 : 3, 10, 3, 0);
      docStyleCell_(cell, { size: 9, bold: r === 0, color: r >= 2 ? DOC_DS.MUTED : DOC_DS.INK });
    }
  }
  sign.getRow(1).getCell(0).setText('______________________________');
  sign.getRow(1).getCell(1).setText('______________________________');
  docStyleCell_(sign.getRow(1).getCell(0), { size: 9, color: DOC_DS.LABEL });
  docStyleCell_(sign.getRow(1).getCell(1), { size: 9, color: DOC_DS.LABEL });

  docWriteFooter_(doc);
  return docSaveTemplate_(doc, folder);
}

function createQuotationTemplate_(folder) {
  const doc = docNewDoc_('TEMPLATE - AdsPeek Quotation');
  const body = doc.getBody();
  docWriteHeader_(doc, body, false);
  docWriteTitle_(body, '{{SERVICE_NAME}}', 'Quotation');
  docWriteInfoRow_(body, [['Date:', '{{DATE}}'], ['Valid until:', '{{VALID_UNTIL}}'], ['Quotation no.:', '{{DOC_NUMBER}}']]);
  docWriteParties_(body, 'QUOTATION FOR');

  docLabel_(body, 'Price breakup');
  docMarker_(body, '{{PRICE_TABLE}}');
  docSpacer_(body, 4);
  docWriteTotals_(body, 'Subtotal', 'Total due');
  docPara_(body, '{{ON_REQUEST_NOTE}}', { size: 8, color: DOC_DS.MUTED, before: 6 });

  docLabel_(body, 'Payment schedule');
  docMarker_(body, '{{MILESTONE_TABLE}}');

  docSpacer_(body, 10);
  docWriteBottomColumns_(body,
    'Payment details', ['Pay by bank transfer or UPI:', '{{BANK_DETAILS}}'],
    'Notes', ['GST is charged as shown above.', 'Third-party app and tool fees are paid directly to each provider.', 'Scope details are in proposal {{PROPOSAL_NUMBER}}.', 'This quotation is valid until {{VALID_UNTIL}}.']);

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

  docLabel_(body, 'Invoice details');
  docMarker_(body, '{{INVOICE_TABLE}}');
  docSpacer_(body, 4);
  docWriteTotals_(body, 'Taxable value', 'Total amount due');
  docPara_(body, 'Amount in words: {{AMOUNT_IN_WORDS}}', { size: 8, color: DOC_DS.MUTED, before: 8, align: DocumentApp.HorizontalAlignment.RIGHT });
  docPara_(body, 'Project: {{PROJECT_REF}}  ·  Quotation: {{QUOTATION_NUMBER}}', { size: 8, color: DOC_DS.MUTED, align: DocumentApp.HorizontalAlignment.RIGHT });

  docSpacer_(body, 10);
  docWriteBottomColumns_(body,
    'Payment details', ['Pay by bank transfer or UPI:', '{{BANK_DETAILS}}', 'Please mention {{DOC_NUMBER}} as the payment reference.'],
    'Thank you', ['{{THANK_YOU_NOTE}}']);

  docWriteFooter_(doc);
  return docSaveTemplate_(doc, folder);
}
