// Kontaktformular von ai-architekt.com: nimmt die Anfrage entgegen und verschickt sie per SMTP.
//
// Umgebungsvariablen (Vercel → Project → Settings → Environment Variables):
//   SMTP_HOST, SMTP_PORT (465 = SSL, 587 = STARTTLS), SMTP_USER, SMTP_PASS
//   MAIL_TO   Empfänger der Anfragen, z. B. kontakt@ai-architekt.com
//   MAIL_FROM optional, Absender (Standard: SMTP_USER)
// Lokal ohne Versand testen: MAIL_DRY_RUN=1
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 200, email: 200, firma: 200, nachricht: 5000 };

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=UTF-8", "cache-control": "no-store" },
  });

// Ohne JavaScript schickt der Browser das Formular klassisch ab; dann zurück zur Seite mit Status im Anker.
const back = (request, state) =>
  new Response(null, { status: 303, headers: { location: new URL(`/#kontakt-${state}`, request.url).toString() } });

function transport() {
  if (process.env.MAIL_DRY_RUN === "1") return nodemailer.createTransport({ jsonTransport: true });
  const port = Number(process.env.SMTP_PORT || 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

function validate(f) {
  const errors = {};
  if (!f.name) errors.name = "Bitte geben Sie Ihren Namen an.";
  if (!f.email) errors.email = "Bitte geben Sie Ihre E-Mail-Adresse an.";
  else if (!EMAIL_RE.test(f.email)) errors.email = "Diese E-Mail-Adresse ist nicht gültig.";
  if (!f.nachricht) errors.nachricht = "Bitte schreiben Sie kurz, worum es geht.";
  if (!f.einwilligung) errors.einwilligung = "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.";
  for (const [k, max] of Object.entries(LIMITS)) {
    if ((f[k] || "").length > max) errors[k] = `Bitte höchstens ${max} Zeichen.`;
  }
  return errors;
}

export async function POST(request) {
  const wantsJson = (request.headers.get("accept") || "").includes("application/json");
  let form;
  try {
    form = await request.formData();
  } catch {
    return wantsJson ? json({ ok: false, message: "Die Anfrage konnte nicht gelesen werden." }, 400) : back(request, "fehler");
  }
  const get = (k) => (typeof form.get(k) === "string" ? form.get(k).trim() : "");
  const f = {
    name: get("name"),
    email: get("email"),
    firma: get("firma"),
    nachricht: get("nachricht"),
    einwilligung: get("einwilligung"),
  };

  // Honeypot: ein für Menschen unsichtbares Feld. Ist es gefüllt, antworten wir freundlich und verschicken nichts.
  if (get("website")) return wantsJson ? json({ ok: true }) : back(request, "danke");

  const errors = validate(f);
  if (Object.keys(errors).length) {
    return wantsJson
      ? json({ ok: false, message: "Bitte prüfen Sie die markierten Felder.", errors }, 422)
      : back(request, "fehler");
  }

  try {
    const info = await transport().sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      replyTo: f.email,
      subject: `Anfrage über ai-architekt.com von ${f.name}`,
      text:
        `Name: ${f.name}\nE-Mail: ${f.email}\nUnternehmen: ${f.firma || "-"}\n\n` +
        `Nachricht:\n${f.nachricht}\n\n` +
        `Einwilligung Datenverarbeitung: ja\nGesendet: ${new Date().toISOString()}`,
    });
    if (process.env.MAIL_DRY_RUN === "1") console.log("MAIL", info.message);
  } catch (e) {
    console.error("contact mail failed", e);
    return wantsJson
      ? json({ ok: false, message: "Die Nachricht konnte gerade nicht gesendet werden. Bitte schreiben Sie direkt an kontakt@ai-architekt.com." }, 502)
      : back(request, "fehler");
  }
  return wantsJson ? json({ ok: true }) : back(request, "danke");
}

export function GET() {
  return new Response("Method Not Allowed", { status: 405, headers: { allow: "POST" } });
}
