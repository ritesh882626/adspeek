/**
 * ConfigDocs.gs  (Module 2: proposals, quotations and emails)
 * Names used by the document + email module. Kept separate from Config.gs so the
 * form's files don't need to change.
 */

const DOCS_CONFIG = {
  // New rows added to the Settings sheet by setupDocuments() (only if missing)
  SETTING_KEYS: {
    PROPOSAL_TEMPLATE: 'Proposal template ID',
    QUOTATION_TEMPLATE: 'Quotation template ID',
    OUTPUT_FOLDER: 'Documents folder ID',
    AUTO_SEND: 'Auto-send documents',
    SENDER_NAME: 'Email sender name',
    REPLY_TO: 'Reply-to email',
    BANK_DETAILS: 'Bank details',
    DELIVERY_DAYS: 'Delivery timeline (working days)',
    MILESTONES: 'Payment milestones',
    INVOICE_TEMPLATE: 'Invoice template ID',
    INVOICE_TITLE: 'Invoice title',
    SAC_CODE: 'SAC code',
    WEBSITE: 'Company website',
    THANK_YOU: 'Thank-you note',
    SHOW_PARTNERS: 'Show partner badges',
    SIGNATURE_NAME: 'Email signature name',
    SIGNATURE_TITLE: 'Email signature title',
    CONTACT_PHONE: 'Contact phone'
  },

  SETTING_DEFAULTS: [
    ['Auto-send documents', 'Yes', 'Yes = proposal and quotation are emailed automatically after every submission.'],
    ['Email sender name', 'AdsPeek', 'Name shown as the sender of client emails.'],
    ['Reply-to email', '', 'Client replies go here. Leave empty to use the Notification email.'],
    ['Bank details', 'Account name: [ ] | Bank: [ ] | Account no: [ ] | IFSC: [ ] | UPI: [ ]', 'FILL IN: printed on every quotation.'],
    ['Delivery timeline (working days)', 20, 'Printed in the proposal timeline.'],
    ['Payment milestones', 'Advance to start the project:50 | On approval of the design:40 | Before the store goes live:10', 'Name:percent pairs separated by | . Percentages must add up to 100.'],
    ['Proposal template ID', '', 'Filled automatically by AdsPeek > Set up documents and email.'],
    ['Quotation template ID', '', 'Filled automatically by AdsPeek > Set up documents and email.'],
    ['Documents folder ID', '', 'Filled automatically by AdsPeek > Set up documents and email.'],
    ['Invoice template ID', '', 'Filled automatically by AdsPeek > Set up documents and email.'],
    ['Invoice title', 'Tax Invoice', 'Title printed on invoices: "Tax Invoice" or "Proforma Invoice" (confirm with your CA).'],
    ['SAC code', '998314', 'Service code printed on invoices. 998314 = IT design and development services (confirm with your CA).'],
    ['Company website', 'adspeek.in', 'Printed in the document footer.'],
    ['Thank-you note', 'It has been a pleasure working with you.', 'Printed at the bottom of invoices.'],
    ['Email signature name', 'Ritesh Kumar Singh', 'Name at the end of client emails.'],
    ['Email signature title', 'Founder, AdsPeek', 'Line under your name in client emails.'],
    ['Contact phone', '', 'Phone shown in the email signature, e.g. +91 98xxxxxxxx. Leave empty to use the WhatsApp number.'],
    ['Show partner badges', 'Yes', 'Yes = Meta, Google, Shopify and n8n partner badges on proposals. Only show programmes you are officially part of.']
  ],

  // Submissions headers (existing + new columns this module adds at the end)
  SUB: {
    ID: 'Submission ID', TIMESTAMP: 'Timestamp', MODE: 'Mode', STAFF: 'Staff name',
    SERVICE: 'Service ID', CLIENT: 'Client name', BUSINESS: 'Business name', MOBILE: 'Mobile',
    EMAIL: 'Email', GSTIN: 'GSTIN', ADDRESS: 'Address', STATE: 'State code',
    EXPECTED: 'Expected price (₹)', FINAL: 'Final price (₹)', DISCOUNT: 'Discount %',
    TAX_TYPE: 'Tax type', GST: 'GST amount (₹)', GRAND: 'Grand total (₹)',
    STATUS: 'Status', PROPOSAL_LINK: 'Proposal link', NOTES: 'Notes',
    // added by this module
    QUOTATION_LINK: 'Quotation link', EMAIL_STATUS: 'Email status', EMAILED_AT: 'Emailed at',
    ATTEMPTS: 'Document attempts', DOC_ERROR: 'Document error'
  },
  NEW_SUB_COLUMNS: ['Quotation link', 'Email status', 'Emailed at', 'Document attempts', 'Document error'],

  // Submission_Lines headers
  LINE: {
    ID: 'Submission ID', COMPONENT: 'Component ID', NAME: 'Name', STEP: 'Step', TYPE: 'Type',
    QTY: 'Qty', FINAL_AMOUNT: 'Final amount (₹)', EXPECTED_AMOUNT: 'Expected amount (₹)'
  },

  EMAIL_STATUS: { PENDING: 'Pending', SENT: 'Sent', DOCS_ONLY: 'Docs created (not emailed)', FAILED: 'Failed' },
  SUB_STATUS: { PUBLIC_SENT: 'Estimate sent', STAFF_SENT: 'Quotation sent', DOCS_READY: 'Documents ready' },

  MAX_ATTEMPTS: 3,
  MAX_PER_RUN: 5,
  QUEUE_HANDLER: 'processPendingDocuments',
  PROPS: { SAFETY_TRIGGER_ID: 'DOCS_SAFETY_TRIGGER_ID' },
  TZ: 'Asia/Kolkata'
};
