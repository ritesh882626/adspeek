/**
 * Hooks.gs
 * Extension points for modules. Do not put form logic here.
 */

/**
 * Called by saveSubmission() after a submission is saved.
 * Module 2: queues the proposal + quotation to be created and emailed in the background.
 * @param {string} submissionId e.g. EST-051126-01 or QT-051126-01
 * @param {string} mode 'Public' or 'Staff'
 */
function onSubmissionSaved_(submissionId, mode) {
  try { trkSetLeadStage_(submissionId, TRACK.LEAD_STAGE.NEW); } catch (e) { console.error('Lead stage: ' + e.message); }
  queueDocuments_(submissionId);
}

/**
 * Called by the document queue after the proposal + quotation are created (and emailed if sent = true).
 * Module 3a: adds the row to the Proposals sheet. Never breaks the document flow.
 */
function onDocumentsReady_(submissionId, docs, sent) {
  try {
    recordProposal_(submissionId, { proposalPdf: docs.proposal.pdfUrl, quotationPdf: docs.quotation.pdfUrl }, sent, null);
  } catch (e) {
    console.error('Proposals tracker failed for ' + submissionId + ': ' + e.message);
  }
}
