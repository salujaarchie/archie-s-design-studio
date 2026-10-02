import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex h-12 items-center justify-center gap-2 px-6 text-[15px] font-bold tracking-tight transition-colors rounded-sm";
export const btn = {
  primary: cn(base, "bg-primary text-primary-foreground hover:bg-foreground"),
  secondary: cn(base, "border border-foreground/80 text-foreground hover:border-primary hover:text-primary"),
  inverse: cn(base, "bg-background text-foreground hover:bg-highlight"),
};

export function ButtonLink({ variant = "primary", className, ...props }: ComponentProps<typeof Link> & { variant?: keyof typeof btn }) {
  return <Link {...props} className={cn(btn[variant], className as string)} />;
}

/** Small original asterisk mark used sparingly as a graphic detail. */
export function Asterisk({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("inline-block h-[0.8em] w-[0.8em]", className)}>
      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
        <path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7" />
      </g>
    </svg>
  );
}

/** Circular arrow badge. */
export function CircleArrow({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex h-9 w-9 items-center justify-center rounded-full border border-current text-base", className)}>↗</span>
  );
}
