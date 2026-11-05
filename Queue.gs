/**
 * Queue.gs  (Module 2)
 * Creates and emails documents in the background, so the form never waits for them.
 *
 * Flow: saveSubmission() -> onSubmissionSaved_() -> queueDocuments_() marks the row "Pending"
 *       and schedules processPendingDocuments() a few seconds later.
 *       A 10-minute safety trigger retries anything still pending or failed (max 3 attempts).
 */

/** Marks a submission as Pending and schedules background processing. */
function queueDocuments_(submissionId) {
  docEnsureColumns_(CONFIG.SHEETS.SUBMISSIONS, DOCS_CONFIG.NEW_SUB_COLUMNS);
  const sub = docFindSubmission_(submissionId);
  if (!sub) throw new Error('Submission ' + submissionId + ' not found for documents.');
  const S = DOCS_CONFIG.SUB;
  const upd = {};
  upd[S.EMAIL_STATUS] = DOCS_CONFIG.EMAIL_STATUS.PENDING;
  upd[S.ATTEMPTS] = 0;
  upd[S.DOC_ERROR] = '';
  docSetRowValues_(CONFIG.SHEETS.SUBMISSIONS, sub._row, upd);
  scheduleQueueRun_();
}

/** Schedules a one-off run in ~10 seconds unless one is already waiting. */
function scheduleQueueRun_() {
  const props = PropertiesService.getScriptProperties();
  const safetyId = props.getProperty(DOCS_CONFIG.PROPS.SAFETY_TRIGGER_ID);
  const waiting = ScriptApp.getProjectTriggers().some(function (t) {
    return t.getHandlerFunction() === DOCS_CONFIG.QUEUE_HANDLER && t.getUniqueId() !== safetyId;
  });
  if (!waiting) {
    ScriptApp.newTrigger(DOCS_CONFIG.QUEUE_HANDLER).timeBased().after(10 * 1000).create();
  }
}

/**
 * Processes pending submissions: create proposal + quotation, email them, update the sheet.
 * Runs from triggers, and from the menu "Process pending documents now".
 */
function processPendingDocuments() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20 * 1000)) return; // another run is already working
  try {
    cleanupOneOffTriggers_();
    const S = DOCS_CONFIG.SUB;
    const ST = DOCS_CONFIG.EMAIL_STATUS;
    const settings = getSettingsMap_();
    const autoSend = isYes_(docGetSetting_(settings, DOCS_CONFIG.SETTING_KEYS.AUTO_SEND, 'Yes'));

    const pending = getSheetObjects_(CONFIG.SHEETS.SUBMISSIONS).rows.filter(function (r) {
      const status = toStr_(r[S.EMAIL_STATUS]);
      const attempts = toNum_(r[S.ATTEMPTS], 0);
      return toStr_(r[S.ID]) && (status === ST.PENDING || (status === ST.FAILED && attempts < DOCS_CONFIG.MAX_ATTEMPTS));
    }).slice(0, DOCS_CONFIG.MAX_PER_RUN);

    pending.forEach(function (r) { processOneSubmission_(r, settings, autoSend); });

    // Anything new that arrived while this run was working gets its own run
    const stillPending = getSheetObjects_(CONFIG.SHEETS.SUBMISSIONS).rows.some(function (r) {
      return toStr_(r[S.EMAIL_STATUS]) === ST.PENDING;
    });
    if (stillPending) scheduleQueueRun_();
  } finally {
    lock.releaseLock();
  }
}

/**
 * TEST: run from the editor (select testDocumentsForLatest > Run).
 * Creates the proposal and quotation for the most recent submission WITHOUT emailing,
 * and prints the links in the execution log. Use it to check the documents look right.
 */
function testDocumentsForLatest() {
  const rows = getSheetObjects_(CONFIG.SHEETS.SUBMISSIONS).rows.filter(function (r) { return toStr_(r[DOCS_CONFIG.SUB.ID]); });
  if (rows.length === 0) throw new Error('No submissions yet. Submit a test estimate from the form first.');
  const id = toStr_(rows[rows.length - 1][DOCS_CONFIG.SUB.ID]);
  const docs = generateDocuments_(id);
  console.log('Test documents for ' + id + ' (not emailed):');
  console.log('Proposal PDF:  ' + docs.proposal.pdfUrl + '\nProposal Doc:  ' + docs.proposal.docUrl);
  console.log('Quotation PDF: ' + docs.quotation.pdfUrl + '\nQuotation Doc: ' + docs.quotation.docUrl);
}

/** Creates documents and (optionally) emails them for one submission row. */
function processOneSubmission_(r, settings, autoSend) {
  const S = DOCS_CONFIG.SUB;
  const ST = DOCS_CONFIG.EMAIL_STATUS;
  const id = toStr_(r[S.ID]);
  const attempts = toNum_(r[S.ATTEMPTS], 0) + 1;
  const upd = {};
  let docs = null;
  try {
    // Reuse documents from an earlier attempt if they were already created
    if (toStr_(r[S.PROPOSAL_LINK]) && toStr_(r[S.QUOTATION_LINK])) {
      docs = loadExistingDocuments_(r, settings);
    } else {
      docs = generateDocuments_(id);
      upd[S.PROPOSAL_LINK] = docs.proposal.pdfUrl;
      upd[S.QUOTATION_LINK] = docs.quotation.pdfUrl;
    }

    if (autoSend) {
      sendDocumentsEmail_(docs, settings);
      upd[S.EMAIL_STATUS] = ST.SENT;
      upd[S.EMAILED_AT] = new Date();
      upd[S.STATUS] = docs.data.mode === 'Staff' ? DOCS_CONFIG.SUB_STATUS.STAFF_SENT : DOCS_CONFIG.SUB_STATUS.PUBLIC_SENT;
    } else {
      upd[S.EMAIL_STATUS] = ST.DOCS_ONLY;
      upd[S.STATUS] = DOCS_CONFIG.SUB_STATUS.DOCS_READY;
    }
    upd[S.DOC_ERROR] = '';
  } catch (err) {
    upd[S.EMAIL_STATUS] = ST.FAILED;
    upd[S.DOC_ERROR] = String(err && err.message ? err.message : err).slice(0, 500);
    console.error('Documents failed for ' + id + ': ' + upd[S.DOC_ERROR]);
  }
  upd[S.ATTEMPTS] = attempts;
  docSetRowValues_(CONFIG.SHEETS.SUBMISSIONS, r._row, upd);
  if (docs && upd[S.EMAIL_STATUS] !== ST.FAILED) onDocumentsReady_(id, docs, upd[S.EMAIL_STATUS] === ST.SENT);
}

/** Rebuilds the email payload from PDFs already saved (used on retries and resends). */
function loadExistingDocuments_(r, settings) {
  const S = DOCS_CONFIG.SUB;
  const data = buildDocumentData_(toStr_(r[S.ID]), settings);
  const fileFromUrl = function (url) {
    const m = String(url).match(/[-\w]{25,}/);
    if (!m) throw new Error('Cannot read document link: ' + url);
    return DriveApp.getFileById(m[0]);
  };
  const pFile = fileFromUrl(r[S.PROPOSAL_LINK]);
  const qFile = fileFromUrl(r[S.QUOTATION_LINK]);
  return {
    data: data,
    proposal: { pdfUrl: pFile.getUrl(), pdfBlob: pFile.getBlob().setName(pFile.getName()), number: data.proposalNumber },
    quotation: { pdfUrl: qFile.getUrl(), pdfBlob: qFile.getBlob().setName(qFile.getName()), number: data.quotationNumber }
  };
}

/** Deletes one-off queue triggers that have already fired (keeps the 10-minute safety trigger). */
function cleanupOneOffTriggers_() {
  const safetyId = PropertiesService.getScriptProperties().getProperty(DOCS_CONFIG.PROPS.SAFETY_TRIGGER_ID);
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === DOCS_CONFIG.QUEUE_HANDLER && t.getUniqueId() !== safetyId) {
      ScriptApp.deleteTrigger(t);
    }
  });
}

// ------------------------------------------------------------------ menu actions

/** Menu: resend documents for the selected row in Submissions (creates new documents). */
function menuResendSelected() {
  const ui = SpreadsheetApp.getUi();
  const sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getName() !== CONFIG.SHEETS.SUBMISSIONS) {
    ui.alert('Select a row in the Submissions sheet first.');
    return;
  }
  const row = sheet.getActiveRange().getRow();
  if (row < 2) { ui.alert('Select a submission row (not the header).'); return; }
  const meta = docGetSheetMeta_(CONFIG.SHEETS.SUBMISSIONS);
  const id = toStr_(sheet.getRange(row, meta.headerIndex[DOCS_CONFIG.SUB.ID]).getValue());
  if (!id) { ui.alert('That row has no Submission ID.'); return; }
  const answer = ui.alert('Resend documents', 'Create new documents and email them for ' + id + '?', ui.ButtonSet.YES_NO);
  if (answer !== ui.Button.YES) return;

  const S = DOCS_CONFIG.SUB;
  const upd = {};
  upd[S.PROPOSAL_LINK] = '';
  upd[S.QUOTATION_LINK] = '';
  upd[S.EMAIL_STATUS] = DOCS_CONFIG.EMAIL_STATUS.PENDING;
  upd[S.ATTEMPTS] = 0;
  upd[S.DOC_ERROR] = '';
  docSetRowValues_(CONFIG.SHEETS.SUBMISSIONS, row, upd);
  processPendingDocuments();
  ui.alert('Done. Check the Email status column for ' + id + '.');
}

/** Menu: process anything pending right now. */
function menuProcessPendingNow() {
  processPendingDocuments();
  SpreadsheetApp.getUi().alert('Pending documents processed. Check the Email status column.');
}
