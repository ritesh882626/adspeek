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

  const sig = {
    name: toStr_(docGetSetting_(settings, DK.SIGNATURE_NAME, 'Ritesh Kumar Singh')),
    title: toStr_(docGetSetting_(settings, DK.SIGNATURE_TITLE, 'Founder, AdsPeek')),
    phone: toStr_(docGetSetting_(settings, DK.CONTACT_PHONE, whatsapp ? '+' + whatsapp : '')),
    website: d.company.website
  };

  // Plain, personal subject: no amounts or reference numbers (these raise spam scores)
  const subject = d.serviceName + ' proposal for ' + d.client.business;

  // Friendly attachment names
  const pdfName = function (kind) { return 'AdsPeek ' + kind + ' - ' + d.fileLabel + '.pdf'; };
  const options = {
    name: senderName,
    htmlBody: buildEmailHtml_(d, sig, whatsapp, isStaff),
    attachments: [docs.proposal.pdfBlob.copyBlob().setName(pdfName('Proposal')), docs.quotation.pdfBlob.copyBlob().setName(pdfName('Quotation'))]
  };
  if (replyTo) options.replyTo = replyTo;
  if (CONFIG.REGEX.EMAIL.test(notify) && notify.toLowerCase() !== d.client.email.toLowerCase()) options.bcc = notify;

  MailApp.sendEmail(d.client.email, subject, buildEmailText_(d, sig, isStaff), options);
}

/** Opening line, shared by the text and HTML versions. */
function emailIntro_(d, isStaff) {
  return isStaff
    ? 'Thank you for your time on the call. As discussed, I have attached the proposal and quotation for your ' + d.serviceName + ' project.'
    : 'Thank you for choosing your package on our website. I have attached the proposal and quotation for your ' + d.serviceName + ' project.';
}

/** Plain-text version (shown by email apps that don't display HTML). */
function buildEmailText_(d, sig, isStaff) {
  return [
    'Hi ' + (d.client.name || 'there') + ',',
    '',
    emailIntro_(d, isStaff),
    '',
    'Summary',
    'Project value: ' + docFormatINR_(d.finalPrice, 2) + ' + GST',
    'Total: ' + docFormatINR_(d.grand, 2),
    'Valid until: ' + docFormatDateIN_(d.validUntil),
    '',
    'The proposal explains the full scope, timeline and payment terms. The quotation has the item-wise price breakup.',
    '',
    'What happens next:',
    '1. I will call you within 24 hours to go through it with you.',
    '2. If you would like any changes, just reply to this email.',
    '3. Once you are happy, we start as soon as the advance is received.',
    '',
    'Looking forward to working with you.',
    '',
    'Warm regards,',
    sig.name,
    sig.title,
    [sig.phone, sig.website].filter(String).join('  |  ')
  ].join('\n');
}

/**
 * Simple, personal-looking HTML email: plain white, mostly text, no images,
 * at most one link. Designed to read like a normal business email rather than a newsletter.
 */
function buildEmailHtml_(d, sig, whatsapp, isStaff) {
  const e = docEscapeHtml_;
  const p = function (html, extra) { return '<p style="margin:0 0 14px;' + (extra || '') + '">' + html + '</p>'; };
  const row = function (label, value, bold) {
    return '<tr>' +
      '<td style="padding:7px 0;border-bottom:1px solid #EEEEEE;color:#555555;">' + e(label) + '</td>' +
      '<td style="padding:7px 0;border-bottom:1px solid #EEEEEE;text-align:right;color:#111111;' + (bold ? 'font-weight:bold;' : '') + '">' + e(value) + '</td>' +
      '</tr>';
  };
  const contact = whatsapp
    ? 'Prefer WhatsApp? <a href="https://wa.me/' + e(whatsapp) + '" style="color:#111111;">Message me here</a>.'
    : '';

  return '' +
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#222222;max-width:600px;">' +
    p('Hi ' + e(d.client.name || 'there') + ',') +
    p(e(emailIntro_(d, isStaff))) +
    '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:420px;border-collapse:collapse;margin:4px 0 18px;font-size:14px;">' +
    row('Project value', docFormatINR_(d.finalPrice, 2) + ' + GST') +
    row('Total', docFormatINR_(d.grand, 2), true) +
    row('Valid until', docFormatDateIN_(d.validUntil)) +
    '</table>' +
    p('The <b>proposal</b> explains the full scope, timeline and payment terms. The <b>quotation</b> has the item-wise price breakup.') +
    p('<b>What happens next</b><br>' +
      '1. I will call you within 24 hours to go through it with you.<br>' +
      '2. If you would like any changes, just reply to this email.<br>' +
      '3. Once you are happy, we start as soon as the advance is received.') +
    (contact ? p(contact) : '') +
    p('Looking forward to working with you.') +
    '<p style="margin:22px 0 0;">Warm regards,<br>' +
    '<b>' + e(sig.name) + '</b><br>' +
    '<span style="color:#555555;">' + e(sig.title) + '</span><br>' +
    '<span style="color:#555555;">' + e([sig.phone, sig.website].filter(String).join('  |  ')) + '</span></p>' +
    '<p style="margin:18px 0 0;font-size:12px;color:#888888;">' + e(d.company.name) + ', ' + e(d.company.address) + '</p>' +
    '</div>';
}
