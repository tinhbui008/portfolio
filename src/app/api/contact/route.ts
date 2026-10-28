import { z } from "zod";
import nodemailer from "nodemailer";

const Schema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập tên").max(100),
  email: z.email("Email không hợp lệ").max(200),
  projectType: z.string().trim().max(60).optional(),
  budget: z.string().trim().max(60).optional(),
  message: z.string().trim().max(2000).optional(),
  website: z.string().max(0).optional(), // honeypot must stay empty
});

// Simple per-IP rate limit (in-memory; fine for a single container).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escape = (s = "") =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) {
    return Response.json({ ok: false, error: "Bạn gửi hơi nhiều, thử lại sau ít phút nhé." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" }, { status: 400 });
  }
  const d = parsed.data;
  if (d.website) return Response.json({ ok: true }); // silently drop bots

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;

  if (!SMTP_HOST || !CONTACT_TO) {
    // No mail server configured: log so the request isn't lost (visible in Coolify/Docker logs).
    console.info("[contact] new enquiry (SMTP not configured)", { ...d, website: undefined });
    return Response.json({ ok: true });
  }

  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      secure: Number(SMTP_PORT) === 465,
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    });
    await transport.sendMail({
      from: CONTACT_FROM ?? SMTP_USER,
      to: CONTACT_TO,
      replyTo: d.email,
      subject: `[Portfolio] ${d.projectType ?? "Dự án mới"} — ${d.name}`,
      text: `Tên: ${d.name}\nEmail: ${d.email}\nLoại dự án: ${d.projectType ?? "-"}\nNgân sách: ${d.budget ?? "-"}\n\n${d.message ?? ""}`,
      html: `<p><b>Tên:</b> ${escape(d.name)}<br><b>Email:</b> ${escape(d.email)}<br><b>Loại dự án:</b> ${escape(d.projectType)}<br><b>Ngân sách:</b> ${escape(d.budget)}</p><p>${escape(d.message).replace(/\n/g, "<br>")}</p>`,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return Response.json({ ok: false, error: "Không gửi được, vui lòng email trực tiếp." }, { status: 502 });
  }
}
