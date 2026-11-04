# AdsPeek Package Builder — Server API Documentation

This document describes all server functions in the AdsPeek Package Builder Google Apps Script project.

---

## 1. Client-Callable Functions (`google.script.run`)

### 1.1 `getCatalog(staffToken)`
Retrieves services, active components, settings, and GST state codes needed by the form.

- **Parameters:**
  - `staffToken` *(string | null)*: Optional session token received from `staffLogin`.
- **Returns:** `Catalog` object
  ```json
  {
    "services": [
      {
        "id": "SHOPIFY",
        "name": "Shopify Store",
        "basePrice": 19499,
        "active": true,
        "sortOrder": 1,
        "description": "Complete online store built on Shopify"
      }
    ],
    "components": [
      {
        "id": "PROD",
        "serviceId": "SHOPIFY",
        "step": "Catalogue",
        "name": "Number of products",
        "description": "Product setup & upload",
        "type": "Quantity",
        "rate": 1500,
        "unit": "products",
        "batchSize": 25,
        "includedQty": 20,
        "minQty": 20,
        "maxQty": 500,
        "defaultOn": true,
        "monthlyCost": "",
        "visibleTo": "Public",
        "discountable": true,
        "sortOrder": 1,
        "tag": null
      }
    ],
    "settings": {
      "gstRate": 0.18,
      "homeStateCode": "06",
      "maxStaffDiscount": 0.15,
      "estimateValidityDays": 15,
      "whatsappNumber": "919876543210"
    },
    "states": [
      { "code": "01", "name": "Jammu and Kashmir" },
      { "code": "06", "name": "Haryana" }
    ],
    "isStaff": false,
    "catalogVersion": "3a8b1c"
  }
  ```
- **Security & Caching:**
  - If `staffToken` is omitted or invalid, components with `Visible to = Staff` are stripped and `isStaff` is `false`.
  - Public and staff catalogs are cached separately in `ScriptCache` for 10 minutes (`CATALOG_PUBLIC_V1` and `CATALOG_STAFF_V1`).
  - Cache is cleared automatically when `Services`, `Components`, or `Settings` are edited.
- **Errors:** Throws `Error` if required sheets or required columns are missing from the master spreadsheet.

---

### 1.2 `staffLogin(password)`
Authenticates team members to unlock staff mode, staff-only components, custom lines, and price overrides.

- **Parameters:**
  - `password` *(string)*: Staff password entered on the login screen.
- **Returns:**
  ```json
  {
    "token": "d3b07384-d113-46d8-9ba5-0219468945a0",
    "expiresInMinutes": 360
  }
  ```
- **Security:**
  - Checks against Script Property `STAFF_PASSWORD`.
  - Never stores passwords in code or logs.
  - Brute-force protection: Tracks failed attempts in cache. After 10 failed attempts within 15 minutes, locks out login attempts for 15 minutes.
- **Errors:**
  - `'Incorrect password. Try again.'`
  - `'Too many attempts. Try again in 15 minutes.'`
  - `'Staff password is not configured in Script Properties.'`

---

### 1.3 `staffLogout(token)`
Invalidates an active staff session token.

- **Parameters:**
  - `token` *(string)*: Active staff session token.
- **Returns:**
  ```json
  { "ok": true }
  ```

---

### 1.4 `computeQuoteServer(payload, staffToken)`
Server-side quote calculation wrapper that uses the single source of truth in `PricingCore.html`.

- **Parameters:**
  - `payload` *(Object)*: Form selections and client data (same format as `saveSubmission`).
  - `staffToken` *(string | null)*: Optional staff authentication token.
- **Returns:** `QuoteResult`
  ```json
  {
    "serviceId": "SHOPIFY",
    "serviceName": "Shopify Store",
    "basePrice": 19499,
    "lines": [...],
    "quoteOnRequestItems": [],
    "expectedPrice": 41999,
    "finalPrice": 41999,
    "discountPct": 0,
    "taxType": "GST 18%",
    "isInterState": false,
    "stateCode": "06",
    "gstRate": 0.18,
    "gstAmount": 7559.82,
    "grandTotal": 49558.82
  }
  ```

---

### 1.5 `saveSubmission(payload, staffToken)`
Validates, recalculates, and saves a quote or estimate to the master sheet.

- **Parameters:**
  - `payload` *(Object)*:
    ```json
    {
      "serviceId": "SHOPIFY",
      "selections": [
        { "componentId": "PROD", "qty": 40 },
        { "componentId": "FEAT-HOME", "qty": 1 }
      ],
      "customLines": [
        { "name": "Custom Migration", "amount": 2500, "discountable": true }
      ],
      "finalPriceOverride": 38000,
      "discountReason": "Founder approval",
      "staffName": "Ritesh",
      "client": {
        "name": "Priya Sharma",
        "businessName": "Kesar Naturals",
        "mobile": "9876543210",
        "email": "priya@kesarnaturals.in",
        "gstin": "06AAAAA0000A1Z5",
        "stateCode": "06",
        "address": "Sector 14, Gurgaon",
        "whatsappOptIn": true
      },
      "honeypot": ""
    }
    ```
  - `staffToken` *(string | null)*: Optional staff token.
- **Returns:**
  ```json
  {
    "submissionId": "EST-041126-01",
    "expectedPrice": 41999,
    "finalPrice": 41999,
    "discountPct": 0,
    "taxType": "CGST+SGST",
    "gstAmount": 7559.82,
    "grandTotal": 49558.82,
    "quoteOnRequestItems": []
  }
  ```
- **Rules Enforced on Server:**
  1. Honeypot check: `payload.honeypot` must be empty.
  2. Mobile validation: `/^[6-9][0-9]{9}$/`.
  3. Email validation: `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`.
  4. GSTIN validation: `/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/` if provided.
  5. Spam control: Maximum 3 public submissions per mobile number per day.
  6. Recalculation: All line totals, taxes, and discounts are computed server-side from active components. Client prices are never trusted.
  7. Atomic Lock: Uses `LockService.getScriptLock()` around ID generation and row appends.
  8. Sheet Rows: Writes 1 row to `Submissions` and individual rows to `Submission_Lines` mapped strictly by header name.
  9. Post-Save Hook: Triggers `onSubmissionSaved_(submissionId, mode)`.
- **Errors:**
  - Throws descriptive validation errors (e.g. `'Full name is required.'`, `'Daily limit of 3 estimates reached for this mobile number.'`).

---

## 2. Spreadsheet Hooks & Triggers

### 2.1 `doGet(e)`
Serves the web application HTML template (`Index.html`).
- Configures responsive viewport metadata.
- Enables `ALLOWALL` X-Frame-Options for embedding via `<iframe>`.

### 2.2 `onOpen()`
Simple trigger that installs the **AdsPeek** custom menu on the master spreadsheet:
- **Check price sheet**: Runs `validateCatalog_()` and displays issues in an alert dialog.
- **Refresh form prices now**: Calls `clearCatalogCache_()` to force instant refresh on the web app.

### 2.3 `onEdit(e)`
Simple trigger that runs on spreadsheet cell edits. If edits are made in `Services`, `Components`, or `Settings`, both cached catalogs (`CATALOG_PUBLIC_V1` and `CATALOG_STAFF_V1`) are evicted immediately.

---

## 3. Test Runners (Apps Script Editor)

- **`testCatalog()`**: Verifies sheet columns, active service base value sums, and component constraints.
- **`testPricing()`**: Executes the 5 comprehensive pricing tests from Section 6 and verifies expected rupee and tax values.
- **`testAuth()`**: Verifies token creation, verification, revocation, and invalid token handling.

