import { ContactFormData } from "./contact-schema";
import { BRAND_NAME } from "./branches";

function baseWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${BRAND_NAME} – New Enquiry</title>
</head>
<body style="margin:0;padding:0;background:#f4f0eb;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f0eb;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:2px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#1a1208;padding:36px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;letter-spacing:4px;color:#c9a96e;text-transform:uppercase;font-family:'Georgia',serif;">Vibe Unisex Salon</p>
              <h1 style="margin:10px 0 0;font-size:24px;color:#f5efe6;font-weight:400;letter-spacing:1px;font-family:'Georgia',serif;">New Appointment Enquiry</h1>
            </td>
          </tr>

          <!-- Gold divider -->
          <tr>
            <td style="background:#c9a96e;height:3px;"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#1a1208;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#8a7d6b;letter-spacing:2px;text-transform:uppercase;">
                ${BRAND_NAME} &bull; www.vibeunisexsalon.in
              </p>
              <p style="margin:8px 0 0;font-size:10px;color:#5a5040;">
                This is an automated notification. Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function fieldRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0ebe3;">
        <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a7d6b;font-family:Arial,sans-serif;">${label}</p>
        <p style="margin:4px 0 0;font-size:15px;color:#1a1208;font-family:'Georgia',serif;">${value}</p>
      </td>
    </tr>
  `;
}

export function buildBranchEmail(data: ContactFormData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `New Enquiry – ${data.fullName} | ${data.branchName}`;

  const content = `
    <p style="margin:0 0 28px;font-size:15px;color:#3a3020;line-height:1.7;font-family:'Georgia',serif;">
      A new appointment enquiry has been received for <strong style="color:#c9a96e;">${data.branchName}</strong>. 
      Please follow up with the customer at your earliest convenience.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0">
      ${fieldRow("Customer Name", data.fullName)}
      ${fieldRow("Mobile Number", data.mobile)}
      ${fieldRow("Email Address", data.email)}
      ${fieldRow("Service Interested In", data.service)}
      ${fieldRow("Preferred Visit Date", new Date(data.preferredDate).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}
      ${fieldRow("Preferred Time", data.preferredTime)}
      ${fieldRow("Selected Branch", data.branchName)}
      ${data.message ? fieldRow("Additional Message", data.message) : ""}
    </table>

    <div style="margin-top:32px;padding:20px;background:#faf7f2;border-left:3px solid #c9a96e;border-radius:2px;">
      <p style="margin:0;font-size:12px;color:#8a7d6b;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">Action Required</p>
      <p style="margin:6px 0 0;font-size:14px;color:#3a3020;font-family:'Georgia',serif;">
        Contact the customer within 2 hours to confirm their appointment slot.
      </p>
    </div>
  `;

  const text = `
NEW APPOINTMENT ENQUIRY – ${data.branchName.toUpperCase()}
${"=".repeat(50)}

Customer Name   : ${data.fullName}
Mobile          : ${data.mobile}
Email           : ${data.email}
Service         : ${data.service}
Preferred Date  : ${data.preferredDate}
Preferred Time  : ${data.preferredTime}
Branch          : ${data.branchName}
Message         : ${data.message ?? "—"}

Please follow up within 2 hours.
  `.trim();

  return { subject, html: baseWrapper(content), text };
}

export function buildAdminEmail(data: ContactFormData, branchEmail: string): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `[Admin Copy] Enquiry – ${data.fullName} → ${data.branchName}`;

  const content = `
    <p style="margin:0 0 8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#c9a96e;font-family:Arial,sans-serif;">Admin Notification</p>
    <p style="margin:0 0 28px;font-size:15px;color:#3a3020;line-height:1.7;font-family:'Georgia',serif;">
      This is an admin copy of an enquiry routed to <strong style="color:#c9a96e;">${data.branchName}</strong> 
      (<a href="mailto:${branchEmail}" style="color:#c9a96e;">${branchEmail}</a>).
    </p>

    <table width="100%" cellpadding="0" cellspacing="0">
      ${fieldRow("Customer Name", data.fullName)}
      ${fieldRow("Mobile Number", data.mobile)}
      ${fieldRow("Email Address", data.email)}
      ${fieldRow("Service Interested In", data.service)}
      ${fieldRow("Preferred Visit Date", new Date(data.preferredDate).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}
      ${fieldRow("Preferred Time", data.preferredTime)}
      ${fieldRow("Routed To Branch", `${data.branchName} (${branchEmail})`)}
      ${fieldRow("Branch ID", data.branchId)}
      ${data.message ? fieldRow("Additional Message", data.message) : ""}
    </table>
  `;

  const text = `
[ADMIN COPY] ENQUIRY ROUTED TO: ${data.branchName.toUpperCase()}
Branch Email: ${branchEmail}
${"=".repeat(50)}

Customer Name   : ${data.fullName}
Mobile          : ${data.mobile}
Email           : ${data.email}
Service         : ${data.service}
Preferred Date  : ${data.preferredDate}
Preferred Time  : ${data.preferredTime}
Branch          : ${data.branchName}
Message         : ${data.message ?? "—"}
  `.trim();

  return { subject, html: baseWrapper(content), text };
}

export function buildCustomerConfirmationEmail(data: ContactFormData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `We've received your enquiry – ${BRAND_NAME}`;

  const content = `
    <p style="margin:0 0 6px;font-size:15px;color:#3a3020;font-family:'Georgia',serif;">Dear ${data.fullName},</p>
    <p style="margin:0 0 28px;font-size:15px;color:#3a3020;line-height:1.8;font-family:'Georgia',serif;">
      Thank you for reaching out to <strong style="color:#c9a96e;">${BRAND_NAME}</strong>. 
      We have received your enquiry and our team at <strong>${data.branchName}</strong> will 
      contact you within 2 hours to confirm your appointment.
    </p>

    <div style="background:#faf7f2;border:1px solid #e8e0d0;border-radius:2px;padding:24px 28px;margin-bottom:28px;">
      <p style="margin:0 0 16px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8a7d6b;font-family:Arial,sans-serif;">Your Enquiry Summary</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${fieldRow("Service", data.service)}
        ${fieldRow("Preferred Date", new Date(data.preferredDate).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}
        ${fieldRow("Preferred Time", data.preferredTime)}
        ${fieldRow("Branch", data.branchName)}
      </table>
    </div>

    <p style="margin:0;font-size:14px;color:#8a7d6b;line-height:1.7;font-family:'Georgia',serif;">
      If you have any urgent queries, please call us directly at your selected branch.
    </p>
  `;

  const text = `
Dear ${data.fullName},

Thank you for your enquiry at ${BRAND_NAME}!

We will contact you within 2 hours from ${data.branchName}.

Summary:
Service       : ${data.service}
Preferred Date: ${data.preferredDate}
Preferred Time: ${data.preferredTime}
Branch        : ${data.branchName}
  `.trim();

  return { subject, html: baseWrapper(content), text };
}