import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { btn } from "@/components/ui-button";
import { cn } from "@/lib/utils";

const TITLE = "Contact — Archie Saluja";
const DESC = "Get in touch with Archie Saluja about design opportunities, collaborations, and ideas.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Contact,
});

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");
  const channels = [
    { label: "Email", value: profile.email, href: profile.email && `mailto:${profile.email}` },
    { label: "LinkedIn", value: profile.linkedin, href: profile.linkedin },
    { label: "Behance", value: profile.behance, href: profile.behance },
  ];

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();
    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address.";
    if (message.length < 10) next.message = "Please write at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) { setStatus("Please fix the highlighted fields."); return; }
    setStatus("Your message looks good, but it can’t be sent yet — the form isn’t connected to a delivery service.");
  };

  const field = "mt-2 w-full border bg-background px-4 py-3 text-base outline-none focus:border-accent rounded-sm";

  return (
    <div className="container-page section-y">
      <p className="label-sm">Contact</p>
      <h1 className="display-xl mt-4 max-w-[14ch]">Let’s make something thoughtful.</h1>
      <div className="mt-14 grid gap-12 md:grid-cols-12">
        <ul className="md:col-span-4">
          {channels.map((c) => (
            <li key={c.label} className="border-t py-5">
              <p className="label-sm">{c.label}</p>
              {c.value ? (
                <a href={c.href} className="link-accent mt-1 inline-flex min-h-11 items-center font-semibold">{c.value}</a>
              ) : (
                <p className="mt-1 text-muted-foreground italic">Coming soon</p>
              )}
            </li>
          ))}
        </ul>
        <form noValidate onSubmit={onSubmit} className="space-y-6 md:col-span-7 md:col-start-6">
          {!profile.contactFormEnabled && (
            <p className="border-l-2 border-accent pl-4 text-[15px] text-muted-foreground">
              This form isn’t connected yet, so messages can’t be delivered. You can still check your details — sending will be enabled soon.
            </p>
          )}
          {(["name", "email"] as const).map((k) => (
            <div key={k}>
              <label htmlFor={k} className="text-[15px] font-semibold capitalize">{k}</label>
              <input id={k} name={k} type={k === "email" ? "email" : "text"} autoComplete={k}
                aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined}
                className={cn(field, errors[k] && "border-destructive")} />
              {errors[k] && <p id={`${k}-err`} className="mt-1 text-sm text-destructive">{errors[k]}</p>}
            </div>
          ))}
          <div>
            <label htmlFor="message" className="text-[15px] font-semibold">Message</label>
            <textarea id="message" name="message" rows={6}
              aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined}
              className={cn(field, errors.message && "border-destructive")} />
            {errors.message && <p id="message-err" className="mt-1 text-sm text-destructive">{errors.message}</p>}
          </div>
          <button type="submit" className={btn.primary}>
            {profile.contactFormEnabled ? "Send message" : "Check message"}
          </button>
          <p role="status" aria-live="polite" className="text-[15px] text-muted-foreground">{status}</p>
        </form>
      </div>
    </div>
  );
}
