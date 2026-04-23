export const ENV = {
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  isProduction: process.env.NODE_ENV === "production",
  smtpHost: process.env.SMTP_HOST ?? "",
  smtpPort: parseInt(process.env.SMTP_PORT ?? "587"),
  smtpUser: process.env.SMTP_USER ?? "",
  smtpPass: process.env.SMTP_PASS ?? "",
};
