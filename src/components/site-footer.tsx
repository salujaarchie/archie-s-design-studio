import { Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";

export function SiteFooter() {
  const socials = [
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Behance", href: profile.behance },
  ].filter((s) => s.href);
  return (
    <footer className="border-t">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="text-[15px] font-bold">
          Archie Saluja <span className="font-medium text-muted-foreground">© {new Date().getFullYear()}</span>
        </p>
        <ul className="flex flex-wrap gap-x-2">
          {[
            { to: "/work", label: "Work" },
            { to: "/resume", label: "Resume" },
            { to: "/contact", label: "Contact" },
          ].map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="inline-flex min-h-11 items-center px-2 text-[15px] font-semibold text-muted-foreground hover:text-foreground">
                {l.label}
              </Link>
            </li>
          ))}
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center px-2 text-[15px] font-semibold text-muted-foreground hover:text-foreground">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
