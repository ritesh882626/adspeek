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
  queueDocuments_(submissionId);
}
