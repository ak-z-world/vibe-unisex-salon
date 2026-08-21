import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactApiSchema } from "@/lib/contact-schema";
import { branchEmailMap, ADMIN_EMAIL, FROM_EMAIL, BRAND_NAME } from "@/lib/branches";
import {
  buildBranchEmail,
  buildAdminEmail,
  buildCustomerConfirmationEmail,
} from "@/lib/email-templates";

// ---------------------------------------------------------------------------
// Typed response helpers
// ---------------------------------------------------------------------------

type SuccessResponse = { success: true; message: string };
type ErrorResponse = { success: false; error: string; fields?: Record<string, string[]> };

function ok(message: string) {
  return NextResponse.json<SuccessResponse>({ success: true, message }, { status: 200 });
}

function err(error: string, status = 400, fields?: Record<string, string[]>) {
  return NextResponse.json<ErrorResponse>({ success: false, error, fields }, { status });
}

// ---------------------------------------------------------------------------
// In-memory rate limiter (per IP, 5 requests / 10 minutes)
// ---------------------------------------------------------------------------

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

// ---------------------------------------------------------------------------
// Input sanitizer – strips HTML tags and trims
// ---------------------------------------------------------------------------

function sanitize(value?: string | null): string {
  if (!value) return "";
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .trim();
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  // 1. Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return err(
      "Too many requests. Please wait 10 minutes before submitting again.",
      429
    );
  }

  // 2. Parse body
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return err("Invalid request body.", 400);
  }

  // 3. Validate
  const parsed = contactApiSchema.safeParse(body);

  if (!parsed.success) {
    const fields: Record<string, string[]> = {};

    parsed.error.issues.forEach((e) => {
      const key = e.path.join(".");

      if (!fields[key]) fields[key] = [];

      fields[key].push(e.message);
    });

    return err(
      "Validation failed. Please check the form and try again.",
      422,
      fields
    );
  }

  // 4. Sanitize
  const raw = parsed.data;

  const data = {
    ...raw,
    fullName: sanitize(raw.fullName),
    mobile: sanitize(raw.mobile),
    email: raw.email ? sanitize(raw.email) : "",
    message: raw.message ? sanitize(raw.message) : undefined,
    branchName: sanitize(raw.branchName),
  };

  // 5. If no Resend key, just log and return success
  if (!process.env.RESEND_API_KEY) {
    console.log("Contact form received (email disabled):", data);

    return ok(
      "Your enquiry has been received! Our team will contact you soon."
    );
  }

  // 6. Create Resend only when key exists
  const resend = new Resend(process.env.RESEND_API_KEY);

  // 7. Branch lookup
  const branchEmail = branchEmailMap[data.branchSlug];

  if (!branchEmail) {
    return err(
      "Selected branch is not recognised. Please refresh and try again.",
      400
    );
  }

  // 8. Build emails
  const branchEmail_ = buildBranchEmail(data);
  const adminEmail_ = buildAdminEmail(data, branchEmail);
  const customerEmail_ = buildCustomerConfirmationEmail(data);

  try {
    const promises: Promise<unknown>[] = [
      resend.emails.send({
        from: `${BRAND_NAME} <${FROM_EMAIL}>`,
        to: [branchEmail],
        subject: branchEmail_.subject,
        html: branchEmail_.html,
        text: branchEmail_.text,
        replyTo: data.email || undefined,
      }),

      resend.emails.send({
        from: `${BRAND_NAME} <${FROM_EMAIL}>`,
        to: [ADMIN_EMAIL],
        subject: adminEmail_.subject,
        html: adminEmail_.html,
        text: adminEmail_.text,
        replyTo: data.email || undefined,
      }),
    ];

    if (data.email) {
      promises.push(
        resend.emails.send({
          from: `${BRAND_NAME} <${FROM_EMAIL}>`,
          to: [data.email],
          subject: customerEmail_.subject,
          html: customerEmail_.html,
          text: customerEmail_.text,
        })
      );
    }

    const [branchResult, adminResult, customerResult] =
      await Promise.allSettled(promises);

    if (branchResult.status === "rejected") {
      console.error(branchResult.reason);

      return err(
        "We could not send your enquiry. Please try again later.",
        500
      );
    }

    if (adminResult && adminResult.status === "rejected") {
      console.error(adminResult.reason);
    }

    if (customerResult && customerResult.status === "rejected") {
      console.error(customerResult.reason);
    }

    return ok(
      "Your enquiry has been received! Our team will contact you within 2 hours."
    );
  } catch (error) {
    console.error(error);

    return err(
      "Something went wrong. Please try again later.",
      500
    );
  }
}

// Only POST is allowed
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}