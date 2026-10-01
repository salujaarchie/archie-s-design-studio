import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex h-12 items-center justify-center gap-2 px-6 text-[15px] font-bold tracking-tight transition-colors rounded-sm";
export const btn = {
  primary: cn(base, "bg-foreground text-background hover:bg-accent"),
  secondary: cn(base, "border border-foreground/80 text-foreground hover:border-accent hover:text-accent"),
};

export function ButtonLink({ variant = "primary", className, ...props }: ComponentProps<typeof Link> & { variant?: keyof typeof btn }) {
  return <Link {...props} className={cn(btn[variant], className as string)} />;
}
