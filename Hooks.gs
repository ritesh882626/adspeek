/**
 * Hooks.gs
 * Extension points for future modules. Do not put form logic here.
 */

/**
 * Called after a submission is saved (Step 5).
 * Future: create proposal doc, email the client, notify the owner.
 * @param {string} submissionId e.g. EST-041126-01 or QT-041126-01
 * @param {string} mode 'Public' or 'Staff'
 */
function onSubmissionSaved_(submissionId, mode) {
  // Intentionally empty. Proposal, email and notification code will be added here later.
}
