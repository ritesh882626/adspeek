/**
 * Mailer.gs  (Module 2)
 * Emails the proposal and quotation PDFs to the client, with a copy (BCC) to AdsPeek.
 */

function sendDocumentsEmail_(docs, settings) {
  const K = CONFIG.SETTING_KEYS;
  const DK = DOCS_CONFIG.SETTING_KEYS;
  const d = docs.data;

  if (!CONFIG.REGEX.EMAIL.test(d.client.email)) {
    throw new Error('Client email "' + d.client.email + '" is not valid.');
  }
  if (MailApp.getRemainingDailyQuota() < 1) {
    throw new Error('Daily email limit reached. It will retry automatically.');
  }

  const notify = toStr_(settings[K.NOTIFY_EMAIL]);
  const replyTo = toStr_(settings[DK.REPLY_TO]) || (CONFIG.REGEX.EMAIL.test(notify) ? notify : '');
  const senderName = toStr_(settings[DK.SENDER_NAME]) || 'AdsPeek';
  const whatsapp = toStr_(settings[K.WHATSAPP]).replace(/\D/g, '');
  const isStaff = d.mode === 'Staff';

  const subject = isStaff
    ? 'Your AdsPeek proposal and quotation | ' + d.client.business
    : 'Your AdsPeek estimate ' + d.submissionId + ' | ' + docFormatINR_(d.grand, 0) + ' incl. GST';

  const options = {
    name: senderName,
    htmlBody: buildEmailHtml_(d, docs, whatsapp, isStaff),
    attachments: [docs.proposal.pdfBlob, docs.quotation.pdfBlob]
  };
  if (replyTo) options.replyTo = replyTo;
  if (CONFIG.REGEX.EMAIL.test(notify) && notify.toLowerCase() !== d.client.email.toLowerCase()) options.bcc = notify;

  MailApp.sendEmail(d.client.email, subject, buildEmailText_(d, isStaff), options);
}

/** Plain-text version (shown by email apps that don't display HTML). */
function buildEmailText_(d, isStaff) {
  return [
    'Hi ' + (d.client.name || 'there') + ',',
    '',
    isStaff
      ? 'Thank you for speaking with us. Your proposal and quotation for ' + d.serviceName + ' are attached.'
      : 'Thank you for building your package with AdsPeek. Your proposal and quotation for ' + d.serviceName + ' are attached.',
    '',
    'Reference: ' + d.submissionId,
    'Project value: ' + docFormatINR_(d.finalPrice, 2),
    'Total incl. GST: ' + docFormatINR_(d.grand, 2),
    'Valid until: ' + docFormatDateIN_(d.validUntil),
    '',
    'Next steps:',
    '1. Our team will review your package and call you within 24 hours.',
    '2. Reply to this email with any changes or questions.',
    '3. To start, pay the advance shown in the quotation.',
    '',
    'Team AdsPeek'
  ].join('\n');
}

/** Simple black-and-white HTML email that works in Gmail, Outlook and phones. */
function buildEmailHtml_(d, docs, whatsapp, isStaff) {
  const e = docEscapeHtml_;
  const intro = isStaff
    ? 'Thank you for speaking with us. Your proposal and quotation for <b>' + e(d.serviceName) + '</b> are attached to this email.'
    : 'Thank you for building your package with AdsPeek. Your proposal and quotation for <b>' + e(d.serviceName) + '</b> are attached to this email.';

  const row = function (label, value, bold) {
    return '<tr><td style="padding:6px 0;color:#6B7280;font-size:13px;">' + e(label) + '</td>' +
      '<td style="padding:6px 0;text-align:right;font-size:' + (bold ? '16px;font-weight:700' : '13px') + ';color:#111827;">' + e(value) + '</td></tr>';
  };

  const waButton = whatsapp
    ? '<a href="https://wa.me/' + e(whatsapp) + '?text=' + encodeURIComponent('Hi AdsPeek, about my estimate ' + d.submissionId) +
      '" style="display:inline-block;margin-top:8px;padding:12px 20px;border:1px solid #111827;border-radius:8px;color:#111827;text-decoration:none;font-size:14px;">Chat with us on WhatsApp</a>'
    : '';

  return '' +
    '<div style="background:#F3F4F6;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;">' +
    '<div style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:12px;padding:32px 28px;">' +
    '<div style="font-size:18px;font-weight:700;letter-spacing:2px;color:#111827;">ADSPEEK</div>' +
    '<div style="height:1px;background:#E5E7EB;margin:16px 0 24px;"></div>' +
    '<p style="font-size:15px;color:#111827;margin:0 0 12px;">Hi ' + e(d.client.name || 'there') + ',</p>' +
    '<p style="font-size:14px;line-height:1.6;color:#374151;margin:0 0 20px;">' + intro + '</p>' +
    '<table role="presentation" width="100%" style="border-collapse:collapse;border-top:1px solid #E5E7EB;border-bottom:1px solid #E5E7EB;margin-bottom:20px;">' +
    row('Reference', d.submissionId) +
    row('Proposal', d.proposalNumber) +
    row('Quotation', d.quotationNumber) +
    row('Project value', docFormatINR_(d.finalPrice, 2)) +
    row('Total incl. GST', docFormatINR_(d.grand, 2), true) +
    row('Valid until', docFormatDateIN_(d.validUntil)) +
    '</table>' +
    '<p style="font-size:14px;font-weight:700;color:#111827;margin:0 0 8px;">What happens next</p>' +
    '<ol style="font-size:14px;line-height:1.7;color:#374151;margin:0 0 20px;padding-left:18px;">' +
    '<li>Our team reviews your package and calls you within 24 hours.</li>' +
    '<li>Reply to this email with any changes or questions.</li>' +
    '<li>To start, pay the advance shown in the quotation.</li>' +
    '</ol>' +
    waButton +
    '<p style="font-size:13px;color:#6B7280;margin:28px 0 0;">Team AdsPeek<br>' + e(d.company.address) + '</p>' +
    '</div></div>';
}
