/**
 * Tracker.gs  (Module 3a)
 * Links the sheets together.
 *
 *   Documents emailed           -> Proposals row (Sent), Lead stage "Proposal sent"
 *   Proposals Status = Accepted -> Sales row + Payments rows (one per milestone) + Projects row, Lead "Won"
 *   Proposals Status = Rejected / Lost -> Lead "Lost"
 *   Payments amount received    -> Paid / Partly paid, Balance, Sales totals; advance starts the project
 *   Projects Stage changes      -> next milestone payment becomes Due; Delivered sets the delivery date
 *   Daily at 8 am               -> follow-ups, expired proposals, overdue payments, project delays, Sales refresh
 *
 * Changes made by the script do not fire the edit trigger, so each step calls the next one directly.
 */

// ======================================================================= small helpers

/** Rows of a tracking sheet that have a key (first column) value. */
function trkRows_(sheetName) {
  const key = trackKey_(sheetName);
  return getSheetObjects_(sheetName).rows.filter(function (r) { return toStr_(r[key]) !== ''; });
}

/** Appends a row after the last row that has a key, writing values by header name. */
function trkAppend_(sheetName, values) {
  const meta = docGetSheetMeta_(sheetName);
  const keyCol = meta.headerIndex[trackKey_(sheetName)];
  const lastRow = meta.sheet.getLastRow();
  let target = 2;
  if (lastRow >= 2) {
    const keys = meta.sheet.getRange(2, keyCol, lastRow - 1, 1).getValues();
    for (let i = keys.length - 1; i >= 0; i--) { if (String(keys[i][0]).trim() !== '') { target = i + 3; break; } }
  }
  // only the table's own columns (Sales has a summary block further right)
  const nCols = Math.max.apply(null, trackColumns_()[sheetName].map(function (h) { return meta.headerIndex[h] || 0; }));
  const row = meta.sheet.getRange(target, 1, 1, nCols).getValues()[0];
  meta.headers.forEach(function (h, i) { if (h && values[h] !== undefined) row[i] = values[h]; });
  meta.sheet.getRange(target, 1, 1, nCols).setValues([row]);
  return target;
}

/** Writes several values into one row by header name (skips unknown headers). */
function trkSet_(sheetName, rowNumber, updates) {
  const meta = docGetSheetMeta_(sheetName);
  Object.keys(updates).forEach(function (h) {
    const col = meta.headerIndex[h];
    if (col) meta.sheet.getRange(rowNumber, col).setValue(updates[h]);
  });
}

function trkToday_() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function trkDate_(v) {
  if (v instanceof Date) return new Date(v.getFullYear(), v.getMonth(), v.getDate());
  return null;
}

function trkDaysBetween_(a, b) {
  return Math.round((trkDate_(b) - trkDate_(a)) / 86400000);
}

/** Adds working days (Mon-Sat by default, or Mon-Fri from Settings). */
function trkAddWorkdays_(start, days) {
  const monFri = /fri/i.test(toStr_(getSettingsMap_()['Working days']));
  const d = trkDate_(start) || trkToday_();
  let left = Math.max(0, Math.round(Number(days) || 0));
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay();
    if (wd === 0 || (monFri && wd === 6)) continue;
    left--;
  }
  return d;
}

function trkSettingNum_(key, fallback) {
  return toNum_(getSettingsMap_()[key], fallback);
}

/** Updates the Lead stage on Submissions (never moves a Won lead backwards). */
function trkSetLeadStage_(submissionId, stage) {
  docEnsureColumns_(CONFIG.SHEETS.SUBMISSIONS, [TRACK.LEAD_STAGE_COL]);
  const sub = docFindSubmission_(submissionId);
  if (!sub) return;
  const current = toStr_(sub[TRACK.LEAD_STAGE_COL]);
  if (current === TRACK.LEAD_STAGE.WON && stage !== TRACK.LEAD_STAGE.LOST) return;
  trkSet_(CONFIG.SHEETS.SUBMISSIONS, sub._row, (function () { const o = {}; o[TRACK.LEAD_STAGE_COL] = stage; return o; })());
}

function trkSheetsReady_() {
  const ss = getSpreadsheet_();
  return objValues_(TRACK.SHEETS).every(function (n) { return !!ss.getSheetByName(n); });
}

function trkServiceName_(serviceId) {
  try {
    const s = buildCatalog_(true).services.filter(function (x) { return x.id === serviceId; })[0];
    return s ? s.name : serviceId;
  } catch (e) { return serviceId; }
}

// ======================================================================= proposals

/**
 * Adds (or refreshes) the Proposals row for a submission.
 * links: { proposalPdf, quotationPdf }. sent: true if emailed. sentOn: Date or null (today).
 */
function recordProposal_(submissionId, links, sent, sentOn) {
  if (!trkSheetsReady_()) return;
  const P = TRACK.P, S = DOCS_CONFIG.SUB;
  const sub = docFindSubmission_(submissionId);
  if (!sub) return;
  const today = trkDate_(sentOn) || trkToday_();
  const validity = trkSettingNum_(CONFIG.SETTING_KEYS.VALIDITY_DAYS, 15);
  const values = {};
  values[P.PROPOSAL_NO] = 'PO/' + submissionId;
  values[P.QUOTATION_NO] = 'QTN/' + submissionId;
  values[P.SUB_ID] = submissionId;
  values[P.BUSINESS] = toStr_(sub[S.BUSINESS]);
  values[P.CLIENT] = toStr_(sub[S.CLIENT]);
  values[P.EMAIL] = toStr_(sub[S.EMAIL]);
  values[P.MOBILE] = toStr_(sub[S.MOBILE]);
  values[P.SERVICE] = trkServiceName_(toStr_(sub[S.SERVICE]));
  values[P.VALUE] = toNum_(sub[S.FINAL], 0);
  values[P.GST] = toNum_(sub[S.GST], 0);
  values[P.TOTAL] = toNum_(sub[S.GRAND], 0);
  values[P.PROPOSAL_PDF] = links.proposalPdf || '';
  values[P.QUOTATION_PDF] = links.quotationPdf || '';

  const existing = trkRows_(TRACK.SHEETS.PROPOSALS).filter(function (r) { return toStr_(r[P.SUB_ID]) === submissionId; })[0];
  if (existing) {
    // Resend: refresh links; a "Not emailed" row becomes "Sent"
    const upd = {};
    upd[P.PROPOSAL_PDF] = values[P.PROPOSAL_PDF];
    upd[P.QUOTATION_PDF] = values[P.QUOTATION_PDF];
    if (sent && toStr_(existing[P.STATUS]) === TRACK.P_STATUS.NOT_EMAILED) {
      upd[P.STATUS] = TRACK.P_STATUS.SENT;
      upd[P.SENT_ON] = today;
      upd[P.FOLLOW_UP] = docAddDays_(today, trkSettingNum_('Follow-up after (days)', 3));
      upd[P.VALID_UNTIL] = docAddDays_(today, validity);
    }
    trkSet_(TRACK.SHEETS.PROPOSALS, existing._row, upd);
  } else {
    values[P.SENT_ON] = today;
    values[P.VALID_UNTIL] = docAddDays_(today, validity);
    values[P.STATUS] = sent ? TRACK.P_STATUS.SENT : TRACK.P_STATUS.NOT_EMAILED;
    values[P.FOLLOW_UP] = docAddDays_(today, trkSettingNum_('Follow-up after (days)', 3));
    trkAppend_(TRACK.SHEETS.PROPOSALS, values);
  }
  if (sent) trkSetLeadStage_(submissionId, TRACK.LEAD_STAGE.SENT);
}

/** Proposal accepted: creates Sales, Payments and Projects rows (only once per submission). */
function acceptProposal_(proposalRow) {
  const P = TRACK.P, S = DOCS_CONFIG.SUB;
  const subId = toStr_(proposalRow[P.SUB_ID]);
  const today = trkToday_();
  const already = trkRows_(TRACK.SHEETS.PROJECTS).filter(function (r) { return toStr_(r[TRACK.PRJ.SUB_ID]) === subId; })[0];
  if (already) {
    trkSet_(TRACK.SHEETS.PROPOSALS, proposalRow._row, (function () { const o = {}; o[P.PROJECT_ID] = already[TRACK.PRJ.PROJECT_ID]; return o; })());
    return already[TRACK.PRJ.PROJECT_ID];
  }
  const sub = docFindSubmission_(subId);
  if (!sub) throw new Error('Submission ' + subId + ' not found.');

  const settings = getSettingsMap_();
  const projectId = trkNewProjectId_(today);
  const business = toStr_(sub[S.BUSINESS]) || toStr_(sub[S.CLIENT]);
  const service = trkServiceName_(toStr_(sub[S.SERVICE]));
  const value = toNum_(sub[S.FINAL], 0), gst = toNum_(sub[S.GST], 0), total = toNum_(sub[S.GRAND], value + gst);
  const deliveryDays = toNum_(settings[DOCS_CONFIG.SETTING_KEYS.DELIVERY_DAYS], 20);

  // Payments: one row per milestone
  const milestones = docSplitMilestones_(total, docParseMilestones_(settings[DOCS_CONFIG.SETTING_KEYS.MILESTONES]));
  const stages = String(settings['Milestone stages'] || TRACK.SETTING_DEFAULTS[3][1]).split('|').map(function (s) { return s.trim(); });
  const advanceDays = toNum_(settings['Advance due (days)'], 3);
  milestones.forEach(function (m, i) {
    const PAY = TRACK.PAY, v = {};
    const unlock = i === 0 ? 'On acceptance' : (stages[i] || TRACK.STAGES[TRACK.STAGES.length - 1]);
    v[PAY.PAYMENT_ID] = projectId + '-' + (i + 1);
    v[PAY.PROJECT_ID] = projectId;
    v[PAY.SUB_ID] = subId;
    v[PAY.BUSINESS] = business;
    v[PAY.CLIENT] = toStr_(sub[S.CLIENT]);
    v[PAY.EMAIL] = toStr_(sub[S.EMAIL]);
    v[PAY.NO] = i + 1;
    v[PAY.MILESTONE] = m.name;
    v[PAY.SHARE] = m.pct / 100;
    v[PAY.AMOUNT] = m.amount;
    v[PAY.RECEIVED] = 0;
    v[PAY.BALANCE] = m.amount;
    v[PAY.UNLOCKS_AT] = unlock;
    v[PAY.REMINDERS] = 0;
    if (i === 0) {
      v[PAY.STATUS] = TRACK.PAY_STATUS.DUE;
      v[PAY.DUE] = docAddDays_(today, advanceDays);
      v[PAY.EXPECTED] = v[PAY.DUE];
    } else {
      v[PAY.STATUS] = TRACK.PAY_STATUS.UPCOMING;
      // estimate: spread across the delivery window, last one at planned delivery
      const share = (i) / (milestones.length - 1);
      v[PAY.EXPECTED] = trkAddWorkdays_(today, Math.round(advanceDays + deliveryDays * share));
    }
    trkAppend_(TRACK.SHEETS.PAYMENTS, v);
  });

  // Project
  const PRJ = TRACK.PRJ, pv = {};
  pv[PRJ.PROJECT_ID] = projectId;
  pv[PRJ.SUB_ID] = subId;
  pv[PRJ.BUSINESS] = business;
  pv[PRJ.CLIENT] = toStr_(sub[S.CLIENT]);
  pv[PRJ.EMAIL] = toStr_(sub[S.EMAIL]);
  pv[PRJ.MOBILE] = toStr_(sub[S.MOBILE]);
  pv[PRJ.SERVICE] = service;
  pv[PRJ.VALUE] = value;
  pv[PRJ.WON_ON] = today;
  pv[PRJ.STAGE] = TRACK.STAGES[0];
  pv[PRJ.DAYS] = deliveryDays;
  pv[PRJ.HEALTH] = TRACK.HEALTH.WAITING;
  pv[PRJ.UPDATED] = new Date();
  trkAppend_(TRACK.SHEETS.PROJECTS, pv);

  // Sales
  const SL = TRACK.SALE, sv = {};
  sv[SL.PROJECT_ID] = projectId;
  sv[SL.SUB_ID] = subId;
  sv[SL.WON_ON] = today;
  sv[SL.MONTH] = Utilities.formatDate(today, TRACK.TZ, 'yyyy-MM');
  sv[SL.BUSINESS] = business;
  sv[SL.CLIENT] = toStr_(sub[S.CLIENT]);
  sv[SL.SERVICE] = service;
  sv[SL.VALUE] = value;
  sv[SL.GST] = gst;
  sv[SL.TOTAL] = total;
  sv[SL.SOURCE] = toStr_(sub[S.MODE]) === 'Staff' ? 'Staff quote' : 'Website form';
  sv[SL.STAFF] = toStr_(sub[S.STAFF]);
  trkAppend_(TRACK.SHEETS.SALES, sv);

  // Proposal + lead
  const upd = {};
  upd[P.PROJECT_ID] = projectId;
  upd[P.DECISION_ON] = today;
  trkSet_(TRACK.SHEETS.PROPOSALS, proposalRow._row, upd);
  trkSetLeadStage_(subId, TRACK.LEAD_STAGE.WON);

  trkRefreshProject_(projectId);
  trkRefreshSales_(projectId);
  return projectId;
}

/** PRJ-2611-001 style IDs, numbered within the month. */
function trkNewProjectId_(date) {
  const prefix = 'PRJ-' + Utilities.formatDate(date, TRACK.TZ, 'yyMM') + '-';
  let max = 0;
  trkRows_(TRACK.SHEETS.PROJECTS).forEach(function (r) {
    const id = toStr_(r[TRACK.PRJ.PROJECT_ID]);
    if (id.indexOf(prefix) === 0) max = Math.max(max, Number(id.slice(prefix.length)) || 0);
  });
  return prefix + ('00' + (max + 1)).slice(-3);
}

// ======================================================================= payments

/** Recalculates one payment row after money is entered. Returns the updated status. */
function trkRefreshPayment_(payRow) {
  const PAY = TRACK.PAY, ST = TRACK.PAY_STATUS;
  const amount = toNum_(payRow[PAY.AMOUNT], 0);
  const received = toNum_(payRow[PAY.RECEIVED], 0);
  const status = toStr_(payRow[PAY.STATUS]);
  const upd = {};
  upd[PAY.BALANCE] = Math.max(0, Math.round((amount - received) * 100) / 100);
  if (status === ST.CANCELLED) { trkSet_(TRACK.SHEETS.PAYMENTS, payRow._row, upd); return status; }

  let next = status;
  if (received > 0 && received >= amount - 0.5) next = ST.PAID;
  else if (received > 0) next = ST.PARTLY;
  else if (status === ST.PAID || status === ST.PARTLY) next = toStr_(payRow[PAY.DUE]) ? ST.DUE : ST.UPCOMING;

  if (received > 0 && !trkDate_(payRow[PAY.RECEIVED_ON])) upd[PAY.RECEIVED_ON] = trkToday_();
  if (next === ST.PAID) upd[PAY.DAYS_OVERDUE] = '';
  const due = trkDate_(payRow[PAY.DUE]);
  if (next === ST.DUE && due && due < trkToday_()) next = ST.OVERDUE;
  if (next === ST.OVERDUE && due && due >= trkToday_()) next = ST.DUE;
  if (next !== ST.PAID) upd[PAY.DAYS_OVERDUE] = (due && due < trkToday_()) ? trkDaysBetween_(due, trkToday_()) : '';
  upd[PAY.STATUS] = next;
  trkSet_(TRACK.SHEETS.PAYMENTS, payRow._row, upd);
  return next;
}

/** First payment received -> project starts. */
function trkOnPaymentChanged_(payRow) {
  const PAY = TRACK.PAY;
  const status = trkRefreshPayment_(payRow);
  const projectId = toStr_(payRow[PAY.PROJECT_ID]);
  if (toNum_(payRow[PAY.NO], 0) === 1 && (status === TRACK.PAY_STATUS.PAID || status === TRACK.PAY_STATUS.PARTLY)) {
    const prj = trkFindProject_(projectId);
    if (prj && !trkDate_(prj[TRACK.PRJ.ADVANCE_ON])) {
      const paidOn = trkDate_(payRow[PAY.RECEIVED_ON]) || trkToday_();
      const upd = {};
      upd[TRACK.PRJ.ADVANCE_ON] = paidOn;
      upd[TRACK.PRJ.START] = paidOn;
      const stage = toStr_(prj[TRACK.PRJ.STAGE]);
      if (TRACK.STAGES.indexOf(stage) < TRACK.STAGES.indexOf('In progress')) upd[TRACK.PRJ.STAGE] = 'In progress';
      trkSet_(TRACK.SHEETS.PROJECTS, prj._row, upd);
    }
  }
  trkRefreshProject_(projectId);
  trkRefreshSales_(projectId);
}

// ======================================================================= projects

function trkFindProject_(projectId) {
  return trkRows_(TRACK.SHEETS.PROJECTS).filter(function (r) { return toStr_(r[TRACK.PRJ.PROJECT_ID]) === projectId; })[0] || null;
}

/** Stage changed by hand: unlock payments, set delivery date, handle cancel. */
function trkOnStageChanged_(prjRow) {
  const PRJ = TRACK.PRJ, PAY = TRACK.PAY, ST = TRACK.PAY_STATUS;
  const projectId = toStr_(prjRow[PRJ.PROJECT_ID]);
  const stage = toStr_(prjRow[PRJ.STAGE]);
  const today = trkToday_();
  const stageIdx = TRACK.STAGES.indexOf(stage);
  const dueDays = trkSettingNum_('Payment due (days)', 7);

  trkRows_(TRACK.SHEETS.PAYMENTS).forEach(function (p) {
    if (toStr_(p[PAY.PROJECT_ID]) !== projectId) return;
    const status = toStr_(p[PAY.STATUS]);
    if (stage === 'Cancelled') {
      if (status === ST.UPCOMING || status === ST.DUE || status === ST.OVERDUE) {
        trkSet_(TRACK.SHEETS.PAYMENTS, p._row, (function () { const o = {}; o[PAY.STATUS] = ST.CANCELLED; o[PAY.BALANCE] = 0; return o; })());
      }
      return;
    }
    const unlockIdx = TRACK.STAGES.indexOf(toStr_(p[PAY.UNLOCKS_AT]));
    if (status === ST.UPCOMING && unlockIdx !== -1 && stageIdx >= unlockIdx) {
      const o = {};
      o[PAY.STATUS] = ST.DUE;
      o[PAY.DUE] = docAddDays_(today, dueDays);
      o[PAY.EXPECTED] = o[PAY.DUE];
      trkSet_(TRACK.SHEETS.PAYMENTS, p._row, o);
    }
  });

  const upd = {};
  upd[PRJ.UPDATED] = new Date();
  if (stage === 'Delivered' && !trkDate_(prjRow[PRJ.ACTUAL])) upd[PRJ.ACTUAL] = today;
  if (stage === 'Content received' && !trkDate_(prjRow[PRJ.CONTENT_ON])) upd[PRJ.CONTENT_ON] = today;
  trkSet_(TRACK.SHEETS.PROJECTS, prjRow._row, upd);

  trkRefreshProject_(projectId);
  trkRefreshSales_(projectId);
}

/**
 * Planned delivery, days delayed, health and next payment for one project.
 * Planned delivery = delivery days (working days) from the later of advance date and content date.
 */
function trkRefreshProject_(projectId) {
  const PRJ = TRACK.PRJ, H = TRACK.HEALTH;
  const prj = trkFindProject_(projectId);
  if (!prj) return;
  const today = trkToday_();
  const stage = toStr_(prj[PRJ.STAGE]);
  const advance = trkDate_(prj[PRJ.ADVANCE_ON]);
  const content = trkDate_(prj[PRJ.CONTENT_ON]);
  const upd = {};

  let planned = trkDate_(prj[PRJ.PLANNED]);
  if (advance) {
    const from = content && content > advance ? content : advance;
    planned = trkAddWorkdays_(from, toNum_(prj[PRJ.DAYS], 20));
    upd[PRJ.START] = trkDate_(prj[PRJ.START]) || advance;
    upd[PRJ.PLANNED] = planned;
  }
  const target = trkDate_(prj[PRJ.REVISED]) || planned;
  const actual = trkDate_(prj[PRJ.ACTUAL]);

  let delay = '', health;
  if (stage === 'Cancelled') health = H.CANCELLED;
  else if (stage === 'On hold') health = H.HOLD;
  else if (actual && target) { delay = Math.max(0, trkDaysBetween_(target, actual)); health = delay > 0 ? H.LATE : H.ON_TIME; }
  else if (!advance || !target) health = H.WAITING;
  else {
    const left = trkDaysBetween_(today, target);
    if (left < 0) { delay = -left; health = H.DELAYED; }
    else health = left <= 3 ? H.AT_RISK : H.ON_TRACK;
  }
  upd[PRJ.DELAY] = delay === '' ? '' : delay;
  upd[PRJ.HEALTH] = health;
  upd[PRJ.NEXT_PAYMENT] = trkNextPaymentText_(projectId);
  trkSet_(TRACK.SHEETS.PROJECTS, prj._row, upd);
}

/** "₹11,328.00 due 12-11-2026" or "₹2,832.00 after Ready to launch" or "All paid". */
function trkNextPaymentText_(projectId) {
  const n = trkNextPayment_(projectId);
  if (!n) return 'All paid';
  return docFormatINR_(n.amount, 2) + (n.due ? ' due ' + docFormatDateIN_(n.due) : ' after ' + n.unlocksAt);
}

function trkNextPayment_(projectId) {
  const PAY = TRACK.PAY, ST = TRACK.PAY_STATUS;
  const rows = trkRows_(TRACK.SHEETS.PAYMENTS)
    .filter(function (p) { return toStr_(p[PAY.PROJECT_ID]) === projectId; })
    .sort(function (a, b) { return toNum_(a[PAY.NO], 0) - toNum_(b[PAY.NO], 0); });
  const open = rows.filter(function (p) { return [ST.DUE, ST.OVERDUE, ST.PARTLY].indexOf(toStr_(p[PAY.STATUS])) !== -1; })[0];
  if (open) return { amount: toNum_(open[PAY.BALANCE], toNum_(open[PAY.AMOUNT], 0)), due: trkDate_(open[PAY.DUE]), unlocksAt: '' };
  const up = rows.filter(function (p) { return toStr_(p[PAY.STATUS]) === ST.UPCOMING; })[0];
  if (up) return { amount: toNum_(up[PAY.AMOUNT], 0), due: null, unlocksAt: toStr_(up[PAY.UNLOCKS_AT]), expected: trkDate_(up[PAY.EXPECTED]) };
  return null;
}

// ======================================================================= sales

/** Received, pending, payment status, next due and stage for one deal. */
function trkRefreshSales_(projectId) {
  const SL = TRACK.SALE, PAY = TRACK.PAY, ST = TRACK.PAY_STATUS;
  const sale = trkRows_(TRACK.SHEETS.SALES).filter(function (r) { return toStr_(r[SL.PROJECT_ID]) === projectId; })[0];
  if (!sale) return;
  const pays = trkRows_(TRACK.SHEETS.PAYMENTS).filter(function (p) { return toStr_(p[PAY.PROJECT_ID]) === projectId; });
  const received = pays.reduce(function (t, p) { return t + toNum_(p[PAY.RECEIVED], 0); }, 0);
  const total = toNum_(sale[SL.TOTAL], 0);
  const prj = trkFindProject_(projectId);
  const stage = prj ? toStr_(prj[TRACK.PRJ.STAGE]) : '';
  const cancelled = stage === 'Cancelled';

  const upd = {};
  upd[SL.RECEIVED] = Math.round(received * 100) / 100;
  upd[SL.PENDING] = cancelled ? 0 : Math.max(0, Math.round((total - received) * 100) / 100);
  upd[SL.PAY_STATUS] = cancelled ? TRACK.SALE_STATUS.CANCELLED
    : (received <= 0 ? TRACK.SALE_STATUS.NOT_PAID : (received >= total - 0.5 ? TRACK.SALE_STATUS.PAID : TRACK.SALE_STATUS.PARTLY));
  const next = cancelled ? null : trkNextPayment_(projectId);
  upd[SL.NEXT_DUE] = next ? (next.due || next.expected || '') : '';
  upd[SL.NEXT_AMOUNT] = next ? next.amount : '';
  upd[SL.STAGE] = stage;
  trkSet_(TRACK.SHEETS.SALES, sale._row, upd);
}

// ======================================================================= edit trigger

/** Installable edit trigger: reacts to the yellow columns. */
function onTrackerEdit(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  const name = sheet.getName();
  if (objValues_(TRACK.SHEETS).indexOf(name) === -1 || e.range.getRow() < 2) return;

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(25 * 1000)) return;
  try {
    const meta = docGetSheetMeta_(name);
    const editedHeaders = [];
    for (let c = e.range.getColumn(); c <= e.range.getLastColumn(); c++) editedHeaders.push(meta.headers[c - 1]);
    const rowsEdited = {};
    for (let r = e.range.getRow(); r <= e.range.getLastRow(); r++) rowsEdited[r] = true;
    const rows = getSheetObjects_(name).rows.filter(function (r) { return rowsEdited[r._row] && toStr_(r[trackKey_(name)]); });
    const has = function (h) { return editedHeaders.indexOf(h) !== -1; };

    rows.forEach(function (row) {
      try {
        if (name === TRACK.SHEETS.PROPOSALS && has(TRACK.P.STATUS)) trkOnProposalStatus_(row);
        else if (name === TRACK.SHEETS.PAYMENTS && (has(TRACK.PAY.RECEIVED) || has(TRACK.PAY.RECEIVED_ON) || has(TRACK.PAY.DUE))) trkOnPaymentChanged_(row);
        else if (name === TRACK.SHEETS.PROJECTS && has(TRACK.PRJ.STAGE)) trkOnStageChanged_(row);
        else if (name === TRACK.SHEETS.PROJECTS && (has(TRACK.PRJ.CONTENT_ON) || has(TRACK.PRJ.REVISED))) {
          trkRefreshProject_(toStr_(row[TRACK.PRJ.PROJECT_ID]));
          trkRefreshSales_(toStr_(row[TRACK.PRJ.PROJECT_ID]));
        }
      } catch (err) {
        console.error('Tracker edit failed on ' + name + ' row ' + row._row + ': ' + err.message);
        try { SpreadsheetApp.getActive().toast(err.message, 'AdsPeek tracker', 8); } catch (x) { /* no UI */ }
      }
    });
  } finally {
    lock.releaseLock();
  }
}

function trkOnProposalStatus_(row) {
  const P = TRACK.P, ST = TRACK.P_STATUS;
  const status = toStr_(row[P.STATUS]);
  const subId = toStr_(row[P.SUB_ID]);
  if (status === ST.ACCEPTED) {
    const id = acceptProposal_(row);
    try { SpreadsheetApp.getActive().toast('Created project ' + id + ' with its payments and sales rows.', 'Proposal accepted', 6); } catch (x) { /* no UI */ }
  } else if (status === ST.REJECTED || status === ST.LOST) {
    trkSet_(TRACK.SHEETS.PROPOSALS, row._row, (function () { const o = {}; o[P.DECISION_ON] = trkToday_(); return o; })());
    trkSetLeadStage_(subId, TRACK.LEAD_STAGE.LOST);
  } else if (status === ST.EXPIRED) {
    trkSetLeadStage_(subId, TRACK.LEAD_STAGE.EXPIRED);
  } else if (status === ST.SENT) {
    trkSetLeadStage_(subId, TRACK.LEAD_STAGE.SENT);
  }
}

// ======================================================================= daily run

/** Daily 8 am (also in the menu): follow-ups, expiry, overdue payments, delays, Sales refresh. */
function dailyTrackerRun() {
  if (!trkSheetsReady_()) return;
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30 * 1000)) return;
  try {
    const today = trkToday_();
    const P = TRACK.P, PS = TRACK.P_STATUS;

    // Proposals
    trkRows_(TRACK.SHEETS.PROPOSALS).forEach(function (r) {
      const status = toStr_(r[P.STATUS]);
      if (status !== PS.SENT && status !== PS.FOLLOW) return;
      const valid = trkDate_(r[P.VALID_UNTIL]), follow = trkDate_(r[P.FOLLOW_UP]);
      if (valid && valid < today) {
        trkSet_(TRACK.SHEETS.PROPOSALS, r._row, (function () { const o = {}; o[P.STATUS] = PS.EXPIRED; return o; })());
        trkSetLeadStage_(toStr_(r[P.SUB_ID]), TRACK.LEAD_STAGE.EXPIRED);
      } else if (status === PS.SENT && follow && follow <= today) {
        trkSet_(TRACK.SHEETS.PROPOSALS, r._row, (function () { const o = {}; o[P.STATUS] = PS.FOLLOW; return o; })());
        trkSetLeadStage_(toStr_(r[P.SUB_ID]), TRACK.LEAD_STAGE.FOLLOW);
      }
    });

    // Payments
    const PAY = TRACK.PAY, ST = TRACK.PAY_STATUS;
    trkRows_(TRACK.SHEETS.PAYMENTS).forEach(function (p) {
      const status = toStr_(p[PAY.STATUS]), due = trkDate_(p[PAY.DUE]);
      if ([ST.DUE, ST.OVERDUE, ST.PARTLY].indexOf(status) === -1 || !due) return;
      const late = trkDaysBetween_(due, today);
      const o = {};
      o[PAY.DAYS_OVERDUE] = late > 0 ? late : '';
      if (status === ST.DUE && late > 0) o[PAY.STATUS] = ST.OVERDUE;
      trkSet_(TRACK.SHEETS.PAYMENTS, p._row, o);
    });

    // Projects + Sales
    trkRows_(TRACK.SHEETS.PROJECTS).forEach(function (r) { trkRefreshProject_(toStr_(r[TRACK.PRJ.PROJECT_ID])); });
    trkRows_(TRACK.SHEETS.SALES).forEach(function (r) { trkRefreshSales_(toStr_(r[TRACK.SALE.PROJECT_ID])); });
  } finally {
    lock.releaseLock();
  }
}

/** Menu: run the daily update now. */
function menuRunDailyTracker() {
  dailyTrackerRun();
  try { SpreadsheetApp.getActive().toast('Follow-ups, payments, delays and sales are up to date.', 'AdsPeek tracker', 5); } catch (e) { /* no UI */ }
}
