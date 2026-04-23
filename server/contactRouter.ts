/**
 * contactRouter – Verarbeitet Kontaktformular-Anfragen
 * Sendet E-Mails direkt an aleks@aleksboskovic.com via SMTP
 */
import nodemailer from "nodemailer";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";

const OWNER_EMAIL = "aleks@aleksboskovic.com";

// Erstellt den SMTP-Transporter basierend auf Umgebungsvariablen
function createTransporter() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT ?? "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    // Echter SMTP-Versand
    return nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  // Fallback: Ethereal (Test-E-Mail-Dienst) – nur für Entwicklung
  return null;
}

export const contactRouter = router({
  send: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name ist erforderlich"),
        business: z.string().min(1, "Unternehmen ist erforderlich"),
        phone: z.string().min(1, "Telefonnummer ist erforderlich"),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, business, phone, message } = input;

      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background: #0a0a0f; color: #e8e0d0; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { border-bottom: 1px solid rgba(212,168,67,0.4); padding-bottom: 24px; margin-bottom: 32px; }
    .logo { font-size: 1.2rem; font-weight: 700; letter-spacing: 0.15em; color: #d4a843; }
    .title { font-size: 1.5rem; font-weight: 600; margin: 0 0 8px; color: #e8e0d0; }
    .subtitle { color: #888; font-size: 0.9rem; }
    .field { margin-bottom: 20px; }
    .label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #d4a843; margin-bottom: 4px; }
    .value { font-size: 1rem; color: #e8e0d0; padding: 12px 16px; background: rgba(255,255,255,0.05); border-radius: 6px; border-left: 3px solid rgba(212,168,67,0.5); }
    .footer { margin-top: 40px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.8rem; color: #666; }
    a { color: #d4a843; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">QUANTUM CREATIVITY</div>
    </div>
    <h1 class="title">Neue Kontaktanfrage</h1>
    <p class="subtitle">Eingegangen über das Kontaktformular auf Ihrer Website</p>
    <br>
    <div class="field">
      <div class="label">Name</div>
      <div class="value">${name}</div>
    </div>
    <div class="field">
      <div class="label">Unternehmen</div>
      <div class="value">${business}</div>
    </div>
    <div class="field">
      <div class="label">Telefon</div>
      <div class="value"><a href="tel:${phone}">${phone}</a></div>
    </div>
    ${message ? `
    <div class="field">
      <div class="label">Nachricht</div>
      <div class="value">${message.replace(/\n/g, "<br>")}</div>
    </div>
    ` : ""}
    <div class="footer">
      Diese E-Mail wurde automatisch über das Kontaktformular auf Ihrer QuantumCreativity-Website gesendet.
    </div>
  </div>
</body>
</html>
      `.trim();

      const emailText = `
Neue Kontaktanfrage – QuantumCreativity
========================================

Name: ${name}
Unternehmen: ${business}
Telefon: ${phone}
${message ? `\nNachricht:\n${message}` : ""}

---
Diese E-Mail wurde automatisch über das Kontaktformular gesendet.
      `.trim();

      const transporter = createTransporter();

      if (transporter) {
        await transporter.sendMail({
          from: `"QuantumCreativity Website" <${process.env.SMTP_USER}>`,
          to: OWNER_EMAIL,
          replyTo: `"${name}" <${process.env.SMTP_USER}>`,
          subject: `Neue Anfrage: ${name} – ${business}`,
          text: emailText,
          html: emailHtml,
        });
      } else {
        console.log("[ContactForm] Neue Anfrage:", { name, business, phone, message });
        console.log("[ContactForm] SMTP nicht konfiguriert – bitte SMTP_HOST, SMTP_USER, SMTP_PASS setzen");
      }

      return { success: true };
    }),
});
