import { NextResponse } from "next/server";
import { validateContact, type ContactFields } from "@/lib/contactValidation";

// Delivers contact-form submissions by email through Resend's REST API.
// Configuration (server-side only, see .env.example):
//   RESEND_API_KEY      required, Resend API key
//   CONTACT_TO_EMAIL    inbox that receives messages
//   CONTACT_FROM_EMAIL  sender; must be a domain verified in Resend
export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "shereifelswaf7@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

// Best-effort in-memory rate limit: 5 messages per IP per 10 minutes.
// (Per server instance; enough to blunt casual abuse without extra services.)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Strips characters that could break out of an email header.
const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

const fail = (message: string, status: number) =>
  NextResponse.json({ ok: false, error: message }, { status });

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return fail("Unsupported request.", 415);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid request.", 400);
  }

  const str = (key: string) => (typeof body[key] === "string" ? (body[key] as string) : "");

  // Honeypot: real visitors never see or fill this field. Pretend success.
  if (str("company")) return NextResponse.json({ ok: true });

  const fields: ContactFields = {
    name: str("name"),
    email: str("email"),
    message: str("message"),
  };
  const errors = validateContact(fields);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "Please check the form fields.", errors }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return fail("Too many messages. Please try again in a few minutes.", 429);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured.");
    return fail("The message could not be sent right now. Please email me directly.", 500);
  }

  const name = singleLine(fields.name);
  const email = singleLine(fields.email);
  const message = fields.message.trim();
  const sentAt = new Date().toISOString();

  const text = `New message from your portfolio contact form

Name: ${name}
Email: ${email}
Sent: ${sentAt}

${message}`;

  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">
  <h2 style="margin:0 0 16px">New portfolio message</h2>
  <p style="margin:0"><strong>Name:</strong> ${escapeHtml(name)}</p>
  <p style="margin:0"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
  <p style="margin:0 0 16px"><strong>Sent:</strong> ${escapeHtml(sentAt)}</p>
  <div style="white-space:pre-wrap;border-left:3px solid #915eff;padding-left:12px">${escapeHtml(message)}</div>
</div>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New portfolio message from ${name}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      console.error("[contact] Resend error", response.status, await response.text());
      return fail("The message could not be sent right now. Please email me directly.", 502);
    }
  } catch (error) {
    console.error("[contact] Network error contacting Resend", error);
    return fail("The message could not be sent right now. Please email me directly.", 502);
  }

  return NextResponse.json({ ok: true });
}
