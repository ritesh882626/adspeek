# AdsPeek Package Builder — Owner Setup Guide

Step-by-step setup instructions for deploying the AdsPeek Package Builder web app and connecting it to your master Google Sheet.

---

## Prerequisites

1. Master Google Sheet prepared with the following sheets and exact headers:
   - `Services`
   - `Components`
   - `Settings`
   - `Submissions`
   - `Submission_Lines`
2. Google clasp installed locally (`npm install -g @google/clasp`), or access to Apps Script Editor.

---

## Step 1: Open the Apps Script Project

### Option A: Bound Script (Recommended)
1. Open your master Google Sheet.
2. In the top menu, click **Extensions** → **Apps Script**.
3. Note the Script ID from **Project Settings** (gear icon) → **Script ID**.
4. In your local terminal, link or clone the project:
   ```bash
   clasp clone <YOUR_SCRIPT_ID>
   ```

### Option B: Standalone Script
If using a standalone script:
1. Open [script.google.com](https://script.google.com) and create a project.
2. Go to **Project Settings** → **Script Properties**.
3. Add a property:
   - **Property:** `SPREADSHEET_ID`
   - **Value:** The ID of your master Google Sheet (from its URL).

---

## Step 2: Configure Staff Password in Script Properties

1. In the Apps Script editor, click **Project Settings** (the gear icon on the left sidebar).
2. Scroll down to **Script Properties**.
3. Click **Add script property**:
   - **Property:** `STAFF_PASSWORD`
   - **Value:** `<YOUR_SECRET_TEAM_PASSWORD>` (e.g. your agency staff password)
4. Click **Save script properties**.

> **Security Note:** Never commit passwords to Git or write them in `.gs` files. The app only reads `STAFF_PASSWORD` from Script Properties.

---

## Step 3: Push Code and Grant Permissions

1. Push all files from your terminal:
   ```bash
   clasp push
   ```
2. In the Apps Script Editor, open `Pricing.gs` or `Catalog.gs`.
3. In the toolbar function dropdown, select **`testPricing`** and click **Run**.
4. A Google authorization popup will appear:
   - Click **Review permissions**.
   - Select your Google Account.
   - Click **Advanced** → **Go to AdsPeek Package Builder (unsafe)**.
   - Click **Allow**.
5. Confirm that the Execution Log shows:
   ```text
   --- ALL PRICING TESTS PASSED (5/5) ---
   ```
6. You can also select and run **`testCatalog`** to verify that your master sheet headers and values are valid.

---

## Step 4: Deploy as a Web App

1. In the top-right corner of the Apps Script Editor, click **Deploy** → **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the deployment configuration:
   - **Description:** `AdsPeek Package Builder v1`
   - **Execute as:** `Me (<your-email@gmail.com>)`
   - **Who has access:** `Anyone`
4. Click **Deploy**.
5. Copy the generated **Web App URL** (e.g. `https://script.google.com/macros/s/.../exec`).

---

## Step 5: Embed on the AdsPeek Website

To embed the package builder form on your Next.js website or any webpage:

```html
<iframe 
  src="https://script.google.com/macros/s/<YOUR_DEPLOYMENT_ID>/exec" 
  style="width: 100%; min-height: 900px; border: 0; display: block;" 
  title="AdsPeek Package Builder"
  loading="lazy"
  allow="clipboard-write">
</iframe>
```

---

## Maintenance & Updating Prices

- **Updating Prices/Components:**
  Any edits made directly to the `Services`, `Components`, or `Settings` tabs automatically clear the 10-minute cache via the `onEdit` trigger.
- **Manual Cache Clear:**
  In the master spreadsheet menu bar, click **AdsPeek** → **Refresh form prices now**.
- **Audit Sheet Integrity:**
  In the master spreadsheet menu bar, click **AdsPeek** → **Check price sheet** to detect missing headers, broken references, or calculation mismatches.

