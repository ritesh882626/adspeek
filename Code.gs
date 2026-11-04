/**
 * Code.gs
 * Entry points only. Keep this file small: future modules (Proposal.gs, Invoice.gs,
 * Mailer.gs, Payments.gs) are added as separate files.
 */

/** Serves the form. */
function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('AdsPeek | Build your package')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/** Lets HTML files include each other: <?!= include('Styles'); ?> */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/** Adds the AdsPeek menu to the sheet. */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('AdsPeek')
    .addItem('Check price sheet', 'menuCheckPriceSheet')
    .addItem('Refresh form prices now', 'menuRefreshForm')
    .addToUi();
}

/** Clears the form cache when prices or settings are edited, so the form shows changes on refresh. */
function onEdit(e) {
  if (!e || !e.range) return;
  const name = e.range.getSheet().getName();
  if (name === CONFIG.SHEETS.SERVICES || name === CONFIG.SHEETS.COMPONENTS || name === CONFIG.SHEETS.SETTINGS) {
    clearCatalogCache_();
  }
}

/** Menu: lists problems in the price sheet. */
function menuCheckPriceSheet() {
  const issues = validateCatalog_();
  const ui = SpreadsheetApp.getUi();
  if (issues.length === 0) {
    ui.alert('Price sheet check', 'No problems found.', ui.ButtonSet.OK);
  } else {
    ui.alert('Price sheet check: ' + issues.length + ' problem(s)', issues.join('\n'), ui.ButtonSet.OK);
  }
}

/** Menu: forces the form to reload prices. */
function menuRefreshForm() {
  clearCatalogCache_();
  SpreadsheetApp.getUi().alert('Done. The form will load the latest prices on its next refresh.');
}
