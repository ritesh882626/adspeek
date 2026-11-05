/**
 * Utils.gs
 * Shared helpers for reading the master sheet.
 */

/** Returns the master spreadsheet (bound sheet, or SPREADSHEET_ID script property as fallback). */
function getSpreadsheet_() {
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) return active;
  const id = PropertiesService.getScriptProperties().getProperty(CONFIG.PROPS.SPREADSHEET_ID);
  if (!id) throw new Error('Master sheet not found. Bind the script to the sheet or set SPREADSHEET_ID.');
  return SpreadsheetApp.openById(id);
}

/** Returns a sheet by name or throws a clear error. */
function getSheet_(name) {
  const sheet = getSpreadsheet_().getSheetByName(name);
  if (!sheet) throw new Error('Sheet "' + name + '" is missing in the master sheet.');
  return sheet;
}

/**
 * Reads a sheet into an array of objects keyed by header name.
 * Skips completely empty rows. Header names are trimmed.
 * @return {{headers: string[], rows: Object[]}}
 */
function getSheetObjects_(sheetName) {
  const values = getSheet_(sheetName).getDataRange().getValues();
  if (values.length === 0) return { headers: [], rows: [] };
  const headers = values[0].map(function (h) { return String(h).trim(); });
  const rows = [];
  for (let r = 1; r < values.length; r++) {
    const row = values[r];
    const isEmpty = row.every(function (v) { return v === '' || v === null; });
    if (isEmpty) continue;
    const obj = { _row: r + 1 };
    headers.forEach(function (h, i) { if (h) obj[h] = row[i]; });
    rows.push(obj);
  }
  return { headers: headers, rows: rows };
}

/** Throws if any required header is missing from a sheet. */
function requireHeaders_(sheetName, headers, required) {
  const missing = required.filter(function (h) { return headers.indexOf(h) === -1; });
  if (missing.length) {
    throw new Error('Sheet "' + sheetName + '" is missing column(s): ' + missing.join(', '));
  }
}

/** Reads the Settings sheet as { key: value }. */
function getSettingsMap_() {
  const data = getSheetObjects_(CONFIG.SHEETS.SETTINGS);
  requireHeaders_(CONFIG.SHEETS.SETTINGS, data.headers,
    [CONFIG.SETTINGS_COLS.KEY, CONFIG.SETTINGS_COLS.VALUE]);
  const map = {};
  data.rows.forEach(function (r) {
    const key = String(r[CONFIG.SETTINGS_COLS.KEY]).trim();
    if (key) map[key] = r[CONFIG.SETTINGS_COLS.VALUE];
  });
  return map;
}

/** "Yes" / "yes" / TRUE → true. */
function isYes_(v) {
  if (v === true) return true;
  return String(v).trim().toLowerCase() === 'yes';
}

/** Converts a cell to a number; empty or invalid → fallback. */
function toNum_(v, fallback) {
  if (v === '' || v === null || v === undefined) return fallback;
  const n = Number(String(v).replace(/[₹,\s]/g, ''));
  return isNaN(n) ? fallback : n;
}

/** Converts a cell to a trimmed string ('' for empty). */
function toStr_(v) {
  if (v === null || v === undefined) return '';
  return String(v).trim();
}

/** Accepts 0.18, 18 or "18%" and returns 0.18. */
function toFraction_(v, fallback) {
  if (v === '' || v === null || v === undefined) return fallback;
  const n = toNum_(String(v).replace('%', ''), fallback);
  return n > 1 ? n / 100 : n;
}

/** Pads a state code like 6 → "06". */
function toStateCode_(v) {
  const s = toStr_(v).replace(/\D/g, '');
  return s ? ('0' + s).slice(-2) : '';
}

/** Short hash of a string, used as catalog version. */
function shortHash_(text) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, text);
  return bytes.slice(0, 6).map(function (b) {
    return ('0' + (b & 0xff).toString(16)).slice(-2);
  }).join('');
}
