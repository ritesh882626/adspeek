/**
 * Config.gs
 * Every sheet name, header name, setting key and cache key used by the project.
 * Change names HERE only. Never hardcode them in other files.
 */

const CONFIG = {
  SHEETS: {
    SERVICES: 'Services',
    COMPONENTS: 'Components',
    SETTINGS: 'Settings',
    SUBMISSIONS: 'Submissions',
    LINES: 'Submission_Lines'
  },

  // Services sheet headers
  SERVICE: {
    ID: 'Service ID',
    NAME: 'Service',
    BASE_PRICE: 'Base price (₹)',
    ACTIVE: 'Active',
    SORT: 'Sort order',
    DESCRIPTION: 'Description (shown on form)'
  },

  // Components sheet headers
  COMPONENT: {
    ID: 'Component ID',
    SERVICE_ID: 'Service ID',
    STEP: 'Step',
    NAME: 'Name',
    DESCRIPTION: 'Description (shown on form and proposal)',
    TYPE: 'Type',
    RATE: 'Rate (₹)',
    UNIT: 'Unit',
    BATCH: 'Batch size',
    INCLUDED: 'Included qty',
    MIN: 'Min qty',
    MAX: 'Max qty',
    DEFAULT_ON: 'Default on',
    BASE_VALUE: 'Base value (₹)',
    MONTHLY: 'Monthly third-party cost (paid by client)',
    VISIBLE_TO: 'Visible to',
    DISCOUNTABLE: 'Discountable',
    ACTIVE: 'Active',
    SORT: 'Sort order',
    TAG: 'Tag' // optional column
  },

  // Settings sheet: column headers and keys
  SETTINGS_COLS: { KEY: 'Setting', VALUE: 'Value' },
  SETTING_KEYS: {
    GST_RATE: 'GST rate',
    HOME_STATE: 'Home state code',
    MAX_DISCOUNT: 'Max staff discount',
    ESTIMATE_PREFIX: 'Estimate prefix',
    QUOTE_PREFIX: 'Quote prefix',
    PROPOSAL_PREFIX: 'Proposal prefix',
    VALIDITY_DAYS: 'Estimate validity (days)',
    NOTIFY_EMAIL: 'Notification email',
    COMPANY_NAME: 'Company name',
    COMPANY_ADDRESS: 'Company address',
    COMPANY_GSTIN: 'Company GSTIN',
    WHATSAPP: 'WhatsApp number' // optional row
  },

  // Allowed values in the Components sheet
  STEPS: ['Base', 'Catalogue', 'Pages', 'Features', 'Integrations'],
  TYPES: ['Included', 'Quantity', 'Optional', 'Optional + Qty', 'Quote on request'],
  VISIBILITY: ['Public', 'Staff'],

  CACHE: {
    PUBLIC: 'CATALOG_PUBLIC_V1',
    STAFF: 'CATALOG_STAFF_V1',
    TTL_SECONDS: 600 // 10 minutes
  },

  // Script Property names (set in Project Settings > Script Properties)
  PROPS: {
    STAFF_PASSWORD: 'STAFF_PASSWORD',
    SPREADSHEET_ID: 'SPREADSHEET_ID' // optional fallback if the script is not bound to the sheet
  },

  REGEX: {
    MOBILE: /^[6-9][0-9]{9}$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    GSTIN: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/
  },

  // GST state codes (used for CGST+SGST vs IGST)
  STATES: [
    { code: '01', name: 'Jammu and Kashmir' },
    { code: '02', name: 'Himachal Pradesh' },
    { code: '03', name: 'Punjab' },
    { code: '04', name: 'Chandigarh' },
    { code: '05', name: 'Uttarakhand' },
    { code: '06', name: 'Haryana' },
    { code: '07', name: 'Delhi' },
    { code: '08', name: 'Rajasthan' },
    { code: '09', name: 'Uttar Pradesh' },
    { code: '10', name: 'Bihar' },
    { code: '11', name: 'Sikkim' },
    { code: '12', name: 'Arunachal Pradesh' },
    { code: '13', name: 'Nagaland' },
    { code: '14', name: 'Manipur' },
    { code: '15', name: 'Mizoram' },
    { code: '16', name: 'Tripura' },
    { code: '17', name: 'Meghalaya' },
    { code: '18', name: 'Assam' },
    { code: '19', name: 'West Bengal' },
    { code: '20', name: 'Jharkhand' },
    { code: '21', name: 'Odisha' },
    { code: '22', name: 'Chhattisgarh' },
    { code: '23', name: 'Madhya Pradesh' },
    { code: '24', name: 'Gujarat' },
    { code: '26', name: 'Dadra and Nagar Haveli and Daman and Diu' },
    { code: '27', name: 'Maharashtra' },
    { code: '29', name: 'Karnataka' },
    { code: '30', name: 'Goa' },
    { code: '31', name: 'Lakshadweep' },
    { code: '32', name: 'Kerala' },
    { code: '33', name: 'Tamil Nadu' },
    { code: '34', name: 'Puducherry' },
    { code: '35', name: 'Andaman and Nicobar Islands' },
    { code: '36', name: 'Telangana' },
    { code: '37', name: 'Andhra Pradesh' },
    { code: '38', name: 'Ladakh' },
    { code: '97', name: 'Other Territory' }
  ]
};
