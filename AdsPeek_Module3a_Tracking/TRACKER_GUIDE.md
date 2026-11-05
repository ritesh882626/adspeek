# AdsPeek Tracking Sheets: Guide (Module 3a)

Every sheet carries the **Submission ID**, so any row can be traced back to the form.
**Yellow header = you edit it. Black header = filled by the system.**

## 1. Submissions (Leads)
Everyone who filled the form. New column: **Lead stage** = New → Proposal sent → Follow-up due → Won / Lost / Expired (automatic).

## 2. Proposals: who got a proposal and quotation
Proposal no. · Quotation no. · Submission ID · Sent on · Business · Client · Email · Mobile · Service · Value excl. GST · GST · Total · Valid until ·
**Status** · **Follow-up on** · Decision on · **Lost reason** · Proposal PDF · Quotation PDF · Project ID · **Notes**

- A row is added automatically when the documents are emailed.
- **Status = Accepted** creates the Project, Sales and 3 Payments rows.
- Rejected / Lost marks the lead Lost (pick a Lost reason).
- Daily: changes to "Follow-up due" after 3 days, and to "Expired" after the valid-until date.

## 3. Payments: who paid and what's due next (one row per milestone)
Payment ID · Project ID · Submission ID · Business · Client · Email · Milestone # · Milestone · Share % · Amount due · Status · Becomes due at · Expected date ·
**Due date** · **Amount received** · **Received on** · **Method** · **Reference / UTR** · Balance · Days overdue · Invoice no. · Invoice PDF · Reminders sent · **Notes**

- Advance: due 3 days after acceptance.
- 40% unlocks when the project reaches **Design approved**; 10% unlocks at **Ready to launch**. Each is due 7 days after it unlocks.
- Enter **Amount received** to set the row to Paid or Partly paid and update the balance. The received date fills in automatically.
- Paying the advance starts the project.

## 4. Projects: work status, timeline, delivery
Project ID · Submission ID · Business · Client · Email · Mobile · Service · Value · Won on · **Stage** · **Owner** · Advance paid on · **Content received on** · Start date · Delivery days · Planned delivery · **Revised delivery** · Actual delivery · Days delayed · Health · Next payment · Last updated · **Notes**

- Stages: Onboarding → Content received → In progress → Design approved → Ready to launch → Delivered (plus On hold / Cancelled).
- Planned delivery = delivery days (Mon–Sat) from the later of the advance date and the content date.
- Health: Waiting to start · On track · At risk (3 days or fewer left) · Delayed · Delivered on time · Delivered late.
- Delivered fills in the actual delivery date. Cancelled cancels the unpaid payments.

## 5. Sales: total sales and forecast
Project ID · Submission ID · Won on · Month · Business · Client · Service · Deal value excl. GST · GST · Total · Received · Pending · Payment status · Next due date · Next due amount · Project stage · Source · Staff name

The **Summary block** on the right shows: deals won, total sales, collected, pending, overdue now, and the amount expected in the next 30 / 60 / 90 days.

## Settings added
Advance due (days) 3 · Payment due (days) 7 · Follow-up after (days) 3 · Milestone stages · Working days (Mon-Sat)

## Setup
1. Push the files with `clasp push`.
2. In the sheet, click **AdsPeek → Set up tracking sheets** and approve the permissions. This creates the sheets, dropdowns, colours, triggers and backfill.
3. To test: in **Proposals**, set the Adssspeee row to **Accepted**, then check Projects, Payments and Sales.
