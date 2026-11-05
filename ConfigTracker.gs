/**
 * ConfigTracker.gs  (Module 3a: tracking sheets)
 * Sheet names, columns, dropdowns and statuses for:
 *   Leads (= Submissions)  ->  Proposals  ->  Sales + Payments + Projects
 * Every sheet carries the Submission ID, so any row can be traced back to the form.
 */

const TRACK = {
  SHEETS: { PROPOSALS: 'Proposals', PAYMENTS: 'Payments', PROJECTS: 'Projects', SALES: 'Sales' },

  // Extra column added to Submissions (the Leads sheet)
  LEAD_STAGE_COL: 'Lead stage',
  LEAD_STAGE: { NEW: 'New', SENT: 'Proposal sent', FOLLOW: 'Follow-up due', WON: 'Won', LOST: 'Lost', EXPIRED: 'Expired' },

  // ---------------------------------------------------------------- Proposals
  P: {
    PROPOSAL_NO: 'Proposal no.', QUOTATION_NO: 'Quotation no.', SUB_ID: 'Submission ID', SENT_ON: 'Sent on',
    BUSINESS: 'Business name', CLIENT: 'Client name', EMAIL: 'Email', MOBILE: 'Mobile', SERVICE: 'Service',
    VALUE: 'Value excl. GST (₹)', GST: 'GST (₹)', TOTAL: 'Total incl. GST (₹)', VALID_UNTIL: 'Valid until',
    STATUS: 'Status', FOLLOW_UP: 'Follow-up on', DECISION_ON: 'Decision on', LOST_REASON: 'Lost reason',
    PROPOSAL_PDF: 'Proposal PDF', QUOTATION_PDF: 'Quotation PDF', PROJECT_ID: 'Project ID', NOTES: 'Notes'
  },
  P_STATUS: { SENT: 'Sent', FOLLOW: 'Follow-up due', ACCEPTED: 'Accepted', REJECTED: 'Rejected', LOST: 'Lost', EXPIRED: 'Expired', NOT_EMAILED: 'Not emailed' },
  LOST_REASONS: ['Price too high', 'Chose another agency', 'Not ready yet', 'No response', 'Scope changed', 'Other'],

  // ---------------------------------------------------------------- Payments
  PAY: {
    PAYMENT_ID: 'Payment ID', PROJECT_ID: 'Project ID', SUB_ID: 'Submission ID', BUSINESS: 'Business name',
    CLIENT: 'Client name', EMAIL: 'Email', NO: 'Milestone #', MILESTONE: 'Milestone', SHARE: 'Share %',
    AMOUNT: 'Amount due (₹)', STATUS: 'Status', UNLOCKS_AT: 'Becomes due at', EXPECTED: 'Expected date',
    DUE: 'Due date', RECEIVED: 'Amount received (₹)', RECEIVED_ON: 'Received on', METHOD: 'Method',
    REFERENCE: 'Reference / UTR', BALANCE: 'Balance (₹)', DAYS_OVERDUE: 'Days overdue',
    INVOICE_NO: 'Invoice no.', INVOICE_PDF: 'Invoice PDF', REMINDERS: 'Reminders sent', NOTES: 'Notes'
  },
  PAY_STATUS: { UPCOMING: 'Upcoming', DUE: 'Due', OVERDUE: 'Overdue', PARTLY: 'Partly paid', PAID: 'Paid', CANCELLED: 'Cancelled' },
  METHODS: ['UPI', 'Bank transfer', 'Razorpay', 'Card', 'Cash', 'Cheque', 'Other'],

  // ---------------------------------------------------------------- Projects
  PRJ: {
    PROJECT_ID: 'Project ID', SUB_ID: 'Submission ID', BUSINESS: 'Business name', CLIENT: 'Client name',
    EMAIL: 'Email', MOBILE: 'Mobile', SERVICE: 'Service', VALUE: 'Value excl. GST (₹)', WON_ON: 'Won on',
    STAGE: 'Stage', OWNER: 'Owner', ADVANCE_ON: 'Advance paid on', CONTENT_ON: 'Content received on',
    START: 'Start date', DAYS: 'Delivery days', PLANNED: 'Planned delivery', REVISED: 'Revised delivery',
    ACTUAL: 'Actual delivery', DELAY: 'Days delayed', HEALTH: 'Health', NEXT_PAYMENT: 'Next payment',
    UPDATED: 'Last updated', NOTES: 'Notes'
  },
  // Order matters: a payment unlocks when the project reaches its stage or any later one
  STAGES: ['Onboarding', 'Content received', 'In progress', 'Design approved', 'Ready to launch', 'Delivered'],
  STAGE_EXTRA: ['On hold', 'Cancelled'],
  HEALTH: { ON_TRACK: 'On track', AT_RISK: 'At risk', DELAYED: 'Delayed', ON_TIME: 'Delivered on time', LATE: 'Delivered late', WAITING: 'Waiting to start', HOLD: 'On hold', CANCELLED: 'Cancelled' },

  // ---------------------------------------------------------------- Sales
  SALE: {
    PROJECT_ID: 'Project ID', SUB_ID: 'Submission ID', WON_ON: 'Won on', MONTH: 'Month', BUSINESS: 'Business name',
    CLIENT: 'Client name', SERVICE: 'Service', VALUE: 'Deal value excl. GST (₹)', GST: 'GST (₹)',
    TOTAL: 'Total incl. GST (₹)', RECEIVED: 'Received (₹)', PENDING: 'Pending (₹)', PAY_STATUS: 'Payment status',
    NEXT_DUE: 'Next due date', NEXT_AMOUNT: 'Next due amount (₹)', STAGE: 'Project stage', SOURCE: 'Source', STAFF: 'Staff name'
  },
  SALE_STATUS: { NOT_PAID: 'Not paid', PARTLY: 'Partly paid', PAID: 'Fully paid', CANCELLED: 'Cancelled' },

  // Settings rows added by setup (only if missing)
  SETTING_DEFAULTS: [
    ['Advance due (days)', 3, 'Days after acceptance by which the advance is due.'],
    ['Payment due (days)', 7, 'Days a milestone payment is due after it unlocks.'],
    ['Follow-up after (days)', 3, 'A sent proposal is marked "Follow-up due" after this many days.'],
    ['Milestone stages', 'On acceptance | Design approved | Ready to launch', 'When each payment milestone becomes due, in the same order as Payment milestones. Use project stages.'],
    ['Working days', 'Mon-Sat', 'Mon-Sat (Sunday off) or Mon-Fri. Used for delivery dates.']
  ],

  TZ: 'Asia/Kolkata',
  HANDLERS: { EDIT: 'onTrackerEdit', DAILY: 'dailyTrackerRun' }
};

/** Column order per sheet (headers in row 1). */
function trackColumns_() {
  const P = TRACK.P, PAY = TRACK.PAY, PRJ = TRACK.PRJ, S = TRACK.SALE;
  const out = {};
  out[TRACK.SHEETS.PROPOSALS] = [P.PROPOSAL_NO, P.QUOTATION_NO, P.SUB_ID, P.SENT_ON, P.BUSINESS, P.CLIENT, P.EMAIL, P.MOBILE, P.SERVICE,
    P.VALUE, P.GST, P.TOTAL, P.VALID_UNTIL, P.STATUS, P.FOLLOW_UP, P.DECISION_ON, P.LOST_REASON, P.PROPOSAL_PDF, P.QUOTATION_PDF, P.PROJECT_ID, P.NOTES];
  out[TRACK.SHEETS.PAYMENTS] = [PAY.PAYMENT_ID, PAY.PROJECT_ID, PAY.SUB_ID, PAY.BUSINESS, PAY.CLIENT, PAY.EMAIL, PAY.NO, PAY.MILESTONE, PAY.SHARE,
    PAY.AMOUNT, PAY.STATUS, PAY.UNLOCKS_AT, PAY.EXPECTED, PAY.DUE, PAY.RECEIVED, PAY.RECEIVED_ON, PAY.METHOD, PAY.REFERENCE, PAY.BALANCE,
    PAY.DAYS_OVERDUE, PAY.INVOICE_NO, PAY.INVOICE_PDF, PAY.REMINDERS, PAY.NOTES];
  out[TRACK.SHEETS.PROJECTS] = [PRJ.PROJECT_ID, PRJ.SUB_ID, PRJ.BUSINESS, PRJ.CLIENT, PRJ.EMAIL, PRJ.MOBILE, PRJ.SERVICE, PRJ.VALUE, PRJ.WON_ON,
    PRJ.STAGE, PRJ.OWNER, PRJ.ADVANCE_ON, PRJ.CONTENT_ON, PRJ.START, PRJ.DAYS, PRJ.PLANNED, PRJ.REVISED, PRJ.ACTUAL, PRJ.DELAY, PRJ.HEALTH,
    PRJ.NEXT_PAYMENT, PRJ.UPDATED, PRJ.NOTES];
  out[TRACK.SHEETS.SALES] = [S.PROJECT_ID, S.SUB_ID, S.WON_ON, S.MONTH, S.BUSINESS, S.CLIENT, S.SERVICE, S.VALUE, S.GST, S.TOTAL,
    S.RECEIVED, S.PENDING, S.PAY_STATUS, S.NEXT_DUE, S.NEXT_AMOUNT, S.STAGE, S.SOURCE, S.STAFF];
  return out;
}

/** Columns you edit by hand (highlighted yellow). Everything else is filled by the system. */
function trackEditable_() {
  const out = {};
  out[TRACK.SHEETS.PROPOSALS] = [TRACK.P.STATUS, TRACK.P.FOLLOW_UP, TRACK.P.LOST_REASON, TRACK.P.NOTES];
  out[TRACK.SHEETS.PAYMENTS] = [TRACK.PAY.DUE, TRACK.PAY.RECEIVED, TRACK.PAY.RECEIVED_ON, TRACK.PAY.METHOD, TRACK.PAY.REFERENCE, TRACK.PAY.NOTES];
  out[TRACK.SHEETS.PROJECTS] = [TRACK.PRJ.STAGE, TRACK.PRJ.OWNER, TRACK.PRJ.CONTENT_ON, TRACK.PRJ.REVISED, TRACK.PRJ.NOTES];
  out[TRACK.SHEETS.SALES] = [];
  return out;
}

/** Key column per sheet (first column). */
function trackKey_(sheetName) {
  const k = {};
  k[TRACK.SHEETS.PROPOSALS] = TRACK.P.PROPOSAL_NO;
  k[TRACK.SHEETS.PAYMENTS] = TRACK.PAY.PAYMENT_ID;
  k[TRACK.SHEETS.PROJECTS] = TRACK.PRJ.PROJECT_ID;
  k[TRACK.SHEETS.SALES] = TRACK.SALE.PROJECT_ID;
  return k[sheetName];
}
