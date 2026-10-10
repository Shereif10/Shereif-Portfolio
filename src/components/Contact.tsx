"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { m as motion } from "framer-motion";
import SectionWrapper from "@/hoc/SectionWrapper";
import { styles } from "@/lib/styles";
import { slideIn } from "@/lib/motion";
import { contact } from "@/data";
import {
  CONTACT_LIMITS,
  validateContact,
  type ContactErrors,
  type ContactFields,
} from "@/lib/contactValidation";
import { EarthCanvas } from "./canvas";
import { contactIconPaths, type ContactIcon } from "./ui/contactIcons";
import LazyMount from "./LazyMount";

const inputClass =
  "bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium focus-visible:ring-2 focus-visible:ring-[#915eff]";

const emptyForm: ContactFields = { name: "", email: "", message: "" };

type Status = "idle" | "sending" | "success" | "error";

// Phone number in international digits only (e.g. 201008851954), from the CV.
const phoneDigits = contact.phone.replace(/\D/g, "");

const socialLinks: { icon: ContactIcon; label: string; href: string; external?: boolean }[] = [
  { icon: "whatsapp", label: "WhatsApp", href: `https://wa.me/${phoneDigits}`, external: true },
  { icon: "linkedin", label: "LinkedIn", href: contact.linkedin, external: true },
  { icon: "phone", label: "Phone", href: `tel:+${phoneDigits}` },
  { icon: "github", label: "GitHub", href: contact.github, external: true },
  { icon: "email", label: "Email", href: `mailto:${contact.email}` },
];

// Compact icon row in the portfolio's icon-button style (black-gradient
// circle, white glyph, purple accent on hover/focus). Touch targets are
// 44px on phones (so all five fit one row) and 48px from sm up.
function SocialLinks() {
  return (
    <ul aria-label="Contact links" className="list-none mt-10 pt-8 border-t border-tertiary flex flex-wrap justify-between gap-1 sm:justify-start sm:gap-4">
      {socialLinks.map(({ icon, label, href, external }) => (
        <li key={icon}>
          <a
            href={href}
            aria-label={external ? `${label} (opens in a new tab)` : label}
            title={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="black-gradient w-11 h-11 sm:w-12 sm:h-12 rounded-full flex justify-center items-center text-white transition duration-200 hover:scale-110 hover:text-[#915eff] hover:shadow-[0_0_14px_rgba(145,94,255,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#915eff] motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
              <path d={contactIconPaths[icon]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span id={id} className="mt-2 text-[14px] text-[#fc6767]">
      {message}
    </span>
  );
}

function Contact() {
  const [form, setForm] = useState<ContactFields>(emptyForm);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name as keyof ContactFields]) setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const fieldErrors = validateContact(form);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields.");
      const first = Object.keys(fieldErrors)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    setStatusMessage("Sending your message…");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company: honeypot }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || "Request failed");
      }
      setStatus("success");
      setStatusMessage("Thank you. I will get back to you as soon as possible.");
      setForm(emptyForm);
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error && error.message !== "Request failed"
          ? error.message
          : `Something went wrong. Please try again or email me at ${contact.email}.`
      );
    }
  };

  const sending = status === "sending";

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h2 className={styles.sectionHeadText}>Contact.</h2>

        <form onSubmit={handleSubmit} noValidate className="mt-12 flex flex-col gap-8">
          <label htmlFor="contact-name" className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              maxLength={CONTACT_LIMITS.name}
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className={inputClass}
            />
            <FieldError id="contact-name-error" message={errors.name} />
          </label>
          <label htmlFor="contact-email" className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              maxLength={CONTACT_LIMITS.email}
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={inputClass}
            />
            <FieldError id="contact-email-error" message={errors.email} />
          </label>
          <label htmlFor="contact-message" className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              id="contact-message"
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              maxLength={CONTACT_LIMITS.message}
              required
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className={inputClass}
            />
            <FieldError id="contact-message-error" message={errors.message} />
          </label>

          {/* Honeypot for spam bots: hidden from people and assistive tech. */}
          <div aria-hidden className="sr-only">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={sending}
              aria-disabled={sending}
              className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl focus-visible:ring-2 focus-visible:ring-[#915eff] disabled:cursor-wait disabled:opacity-80"
            >
              {sending ? "Sending..." : "Send"}
            </button>
            <p
              role="status"
              aria-live="polite"
              className={`text-[14px] min-h-[21px] ${
                status === "success"
                  ? "text-[#38ef7d]"
                  : status === "error"
                    ? "text-[#fc6767]"
                    : "text-secondary"
              }`}
            >
              {statusMessage}
            </p>
          </div>
        </form>

        <SocialLinks />
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        // Fixed at the original card height on xl so the planet keeps its size
        // now that the contact card is taller.
        className="xl:flex-1 xl:h-[805px] xl:self-center md:h-[550px] h-[350px]"
      >
        <LazyMount className="w-full h-full">
          <EarthCanvas />
        </LazyMount>
      </motion.div>
    </div>
  );
}

export default SectionWrapper(Contact, "contact");
