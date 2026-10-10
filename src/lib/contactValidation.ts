// Shared by the contact form (client) and the API route (server).

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
  minMessage: 10,
} as const;

export type ContactFields = { name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact({ name, email, message }: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  const n = name.trim();
  const e = email.trim();
  const m = message.trim();

  if (!n) errors.name = "Please enter your name.";
  else if (n.length > CONTACT_LIMITS.name)
    errors.name = `Please keep your name under ${CONTACT_LIMITS.name} characters.`;

  if (!e) errors.email = "Please enter your email address.";
  else if (e.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(e))
    errors.email = "Please enter a valid email address.";

  if (!m) errors.message = "Please enter a message.";
  else if (m.length < CONTACT_LIMITS.minMessage)
    errors.message = `Please write at least ${CONTACT_LIMITS.minMessage} characters.`;
  else if (m.length > CONTACT_LIMITS.message)
    errors.message = `Please keep your message under ${CONTACT_LIMITS.message} characters.`;

  return errors;
}
