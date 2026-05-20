export function isAllowedEmail(email: string): boolean {
  const allowed = process.env.ALLOWED_EMAIL;
  if (!allowed) return false;
  if (!email) return false;
  return email.trim().toLowerCase() === allowed.trim().toLowerCase();
}
