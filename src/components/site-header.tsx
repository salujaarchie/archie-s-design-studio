import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { to: "/work", label: "Work" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkCls =
    "inline-flex min-h-11 items-center px-3 text-[15px] font-semibold text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-accent";

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container-page flex h-[72px] items-center justify-between">
        <Link to="/" className="inline-flex min-h-11 items-center text-[17px] font-extrabold tracking-tight">
          Archie Saluja
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-2">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className={linkCls}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          ref={btnRef}
          type="button"
          className="inline-flex h-11 min-w-11 items-center justify-center px-2 text-[15px] font-semibold md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="border-t bg-background md:hidden"
      >
        <nav aria-label="Mobile" className="container-page py-4">
          <ul>
            {NAV.map((n) => (
              <li key={n.to} className="border-b last:border-b-0">
                <Link
                  to={n.to}
                  className="flex min-h-14 items-center text-2xl font-bold tracking-tight data-[status=active]:text-accent"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
