/**
 * DocUtils.gs  (Module 2)
 * Small helpers for formatting and sheet writes used by documents and emails.
 */

/** Indian number format: 117408.82 -> "1,17,408.82". decimals = 0 or 2. */
function docFormatINR_(value, decimals) {
  const d = decimals === undefined ? 0 : decimals;
  const n = Number(value) || 0;
  const negative = n < 0;
  const fixed = Math.abs(n).toFixed(d);
  const parts = fixed.split('.');
  let int = parts[0];
  if (int.length > 3) {
    const last3 = int.slice(-3);
    const rest = int.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    int = rest + ',' + last3;
  }
  return (negative ? '-' : '') + '₹' + int + (d > 0 ? '.' + parts[1] : '');
}

/** dd-MM-yyyy in India time. */
function docFormatDateIN_(date) {
  return Utilities.formatDate(date, DOCS_CONFIG.TZ, 'dd-MM-yyyy');
}

/** Adds days to a date (returns a new Date). */
function docAddDays_(date, days) {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() + Number(days || 0));
  return d;
}

/** Escapes text for use inside an HTML email. */
function docEscapeHtml_(text) {
  return String(text === null || text === undefined ? '' : text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/**
 * Parses "Name:50 | Name:40 | Name:10" into [{name, pct}].
 * Falls back to 50/40/10 if the setting is missing or doesn't add up to 100.
 */
function docParseMilestones_(text) {
  const fallback = [
    { name: 'Advance to start the project', pct: 50 },
    { name: 'On approval of the design', pct: 40 },
    { name: 'Before the store goes live', pct: 10 }
  ];
  if (!text) return fallback;
  const items = String(text).split('|').map(function (p) {
    const idx = p.lastIndexOf(':');
    if (idx === -1) return null;
    return { name: p.slice(0, idx).trim(), pct: Number(p.slice(idx + 1).trim()) };
  }).filter(function (m) { return m && m.name && !isNaN(m.pct) && m.pct > 0; });
  const total = items.reduce(function (t, m) { return t + m.pct; }, 0);
  return (items.length && Math.abs(total - 100) < 0.001) ? items : fallback;
}

/**
 * Splits a grand total into milestone amounts that add up exactly (2 decimals).
 * The last milestone absorbs rounding.
 */
function docSplitMilestones_(grandTotal, milestones) {
  const totalPaise = Math.round(Number(grandTotal) * 100);
  let used = 0;
  return milestones.map(function (m, i) {
    const paise = (i === milestones.length - 1) ? totalPaise - used : Math.round(totalPaise * m.pct / 100);
    used += paise;
    return { name: m.name, pct: m.pct, amount: paise / 100 };
  });
}

/** Escapes a string for use as a literal regex pattern (DocumentApp.replaceText uses regex). */
function docRegexEscape_(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Escapes a replacement value so "$" and "\" are inserted literally by replaceText. */
function docReplacementEscape_(text) {
  return String(text === null || text === undefined ? '' : text).replace(/\\/g, '\\\\').replace(/\$/g, '\\$');
}

/** Returns { sheet, headers, headerIndex } for a sheet. */
function docGetSheetMeta_(sheetName) {
  const sheet = getSheet_(sheetName);
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) { return String(h).trim(); });
  const headerIndex = {};
  headers.forEach(function (h, i) { if (h) headerIndex[h] = i + 1; });
  return { sheet: sheet, headers: headers, headerIndex: headerIndex };
}

/** Adds any missing headers at the end of row 1. */
function docEnsureColumns_(sheetName, columnNames) {
  const meta = docGetSheetMeta_(sheetName);
  const missing = columnNames.filter(function (c) { return !meta.headerIndex[c]; });
  if (missing.length === 0) return 0;
  const startCol = meta.sheet.getLastColumn() + 1;
  const range = meta.sheet.getRange(1, startCol, 1, missing.length);
  range.setValues([missing]);
  range.setFontWeight('bold').setBackground('#000000').setFontColor('#FFFFFF');
  return missing.length;
}

/** Writes values into a row by header name: updates = { 'Header': value }. */
function docSetRowValues_(sheetName, rowNumber, updates) {
  const meta = docGetSheetMeta_(sheetName);
  Object.keys(updates).forEach(function (h) {
    const col = meta.headerIndex[h];
    if (!col) throw new Error('Column "' + h + '" not found in ' + sheetName + '.');
    meta.sheet.getRange(rowNumber, col).setValue(updates[h]);
  });
}

/** Reads one Settings value, or a default. */
function docGetSetting_(map, key, fallback) {
  const v = map[key];
  return (v === undefined || v === null || String(v).trim() === '') ? fallback : v;
}

/** Writes a Settings value: updates the row if the key exists, otherwise appends it. */
function docSetSetting_(key, value, note) {
  const sheet = getSheet_(CONFIG.SHEETS.SETTINGS);
  const values = sheet.getDataRange().getValues();
  for (let r = 1; r < values.length; r++) {
    if (String(values[r][0]).trim() === key) {
      sheet.getRange(r + 1, 2).setValue(value);
      return;
    }
  }
  sheet.appendRow([key, value, note || '']);
}
