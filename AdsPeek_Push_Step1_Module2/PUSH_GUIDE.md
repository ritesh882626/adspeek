# AdsPeek Quote Builder: Push Guide (Step 1 + Module 2)

## What's in this folder

| File | What it does | How to push |
|---|---|---|
| appsscript.json | Project settings (time zone, web app access, permissions) | Replace |
| Config.gs | Sheet names, column headers, settings keys | Replace |
| Utils.gs | Shared sheet helpers | Replace |
| Catalog.gs | Reads Services + Components and sends them to the form | Replace |
| Code.gs | doGet, the AdsPeek menu, onEdit | **Read the note below** |
| Hooks.gs | Runs after a submission is saved, then queues the documents | Replace |
| ConfigDocs.gs | Settings for documents and email | New |
| DocUtils.gs | Formatting helpers (₹, dates, milestones) | New |
| DocSetup.gs | Builds the folders, the 3 templates and the safety trigger | New |
| Documents.gs | Fills the templates and makes the PDFs | New |
| Assets.gs | AdsPeek logo and partner strip, stored as images | New |
| Mailer.gs | Sends the proposal and quotation email | New |
| Queue.gs | Background queue, retries, resend and test functions | New |

## Do not overwrite these files (Antigravity built them)
Index.html, Styles.html, App.html, PricingCore.html, Logo.html, Pricing.gs, Auth.gs, Submissions.gs.
Don't push the old temporary Index.html from Step 1 either.

## Code.gs note
- If Antigravity **did not** edit Code.gs: replace it.
- If Antigravity **did** edit it (for example doGet): keep their doGet and copy in only the 4 new menu lines inside `onOpen()`, plus the menu functions at the bottom of this Code.gs.

## Push with clasp
```bash
cd your-clasp-folder
# copy the files from this zip in, following the rules above
clasp push
```
If clasp asks "Manifest file has been updated. Do you want to push and overwrite?", answer **y**.

No clasp? Open Extensions → Apps Script, make each new file with + → Script using the same name (no .gs needed), and paste the code in.

## After pushing
Deploy → Manage deployments → Edit (pencil) → Version: **New version** → Deploy.
Your web-app link stays the same.
