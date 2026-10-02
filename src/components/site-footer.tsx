import { Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";

const linkCls = "inline-flex min-h-11 items-center px-2 text-[15px] font-semibold text-muted-foreground hover:text-primary";

export function SiteFooter() {
  const socials = [
    { label: "Behance", href: profile.behance },
    { label: "LinkedIn", href: profile.linkedin },
  ].filter((s) => s.href);
  return (
    <footer className="border-t">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[15px] font-bold">
            Archie Saluja <span className="font-medium text-muted-foreground">© {new Date().getFullYear()}</span>
          </p>
          <p className="text-[15px] text-muted-foreground">
            <a href={`mailto:${profile.email}`} className="inline-flex min-h-11 items-center hover:text-primary">{profile.email}</a> · {profile.location}
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-2">
          {(["/work", "/resume", "/contact"] as const).map((to) => (
            <li key={to}>
              <Link to={to} className={linkCls}>{to.slice(1)[0]!.toUpperCase() + to.slice(2)}</Link>
            </li>
          ))}
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className={linkCls}>{s.label} ↗</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
