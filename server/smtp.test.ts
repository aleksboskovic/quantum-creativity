import { describe, expect, it } from "vitest";
import nodemailer from "nodemailer";

describe("SMTP connection", () => {
  it("should verify SMTP credentials are configured", async () => {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT ?? "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    expect(host, "SMTP_HOST must be set").toBeTruthy();
    expect(user, "SMTP_USER must be set").toBeTruthy();
    expect(pass, "SMTP_PASS must be set").toBeTruthy();

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    // Verify SMTP connection
    const verified = await transporter.verify();
    expect(verified).toBe(true);
  }, 15000);
});
