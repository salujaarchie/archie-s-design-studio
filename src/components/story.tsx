import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Fades/slides children in once when scrolled into view. CSS handles reduced motion. */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "li" | "section" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/** Ink band with a looping list of disciplines. */
export function Marquee({ items }: { items: string[] }) {
  const row = (
    <span className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((t) => (
        <span key={t} className="flex items-center gap-8">
          <span>{t}</span>
          <Star className="h-6 w-6 text-highlight" />
        </span>
      ))}
    </span>
  );
  return (
    <div aria-hidden="true" className="overflow-hidden bg-foreground py-5 text-background">
      <div className="marquee flex w-max text-2xl font-extrabold tracking-tight md:text-4xl">
        {row}
        {row}
      </div>
    </div>
  );
}

export function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

/** Rotating circular text sticker. */
export function Sticker({ text, className }: { text: string; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative h-32 w-32", className)}>
      <svg viewBox="0 0 120 120" className="spin-slow h-full w-full">
        <defs>
          <path id="sticker-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <circle cx="60" cy="60" r="59" className="fill-highlight" />
        <text className="fill-foreground text-[11px] font-extrabold uppercase tracking-[0.2em]">
          <textPath href="#sticker-circle">{text}</textPath>
        </text>
      </svg>
      <Star className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-primary" />
    </div>
  );
}

/** Hand-drawn style doodles; stroke animates in via .draw. */
export function Doodle({ kind, className }: { kind: "squiggle" | "loop" | "arrow" | "spark"; className?: string }) {
  const paths: Record<string, string> = {
    squiggle: "M4 30 C 20 4, 34 56, 50 30 S 80 4, 96 30 S 126 56, 140 30",
    loop: "M6 50 C 40 50, 50 10, 30 10 C 10 10, 20 50, 60 46 S 110 20, 140 30",
    arrow: "M8 10 C 40 60, 90 70, 128 44 M110 40 L130 44 L122 62",
    spark: "M30 4 V 22 M30 38 V 56 M4 30 H 22 M38 30 H 56 M12 12 L 20 20 M40 40 L 48 48 M48 12 L 40 20 M20 40 L 12 48",
  };
  const vb = kind === "spark" ? "0 0 60 60" : "0 0 144 64";
  return (
    <svg viewBox={vb} aria-hidden="true" className={cn("draw overflow-visible", className)} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[kind]} pathLength={1} />
    </svg>
  );
}

/** Simple line illustrations for each story chapter. */
export function ChapterArt({ i }: { i: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const arts = [
    // eye / noticing
    <g key="0" {...common}><path d="M10 60 Q 60 10 110 60 Q 60 110 10 60Z" pathLength={1} /><circle cx="60" cy="60" r="16" pathLength={1} /><circle cx="60" cy="60" r="5" className="fill-current" /></g>,
    // pencil + sketch line
    <g key="1" {...common}><path d="M24 96 L 30 74 L 82 22 L 98 38 L 46 90 Z" pathLength={1} /><path d="M74 30 L 90 46" pathLength={1} /><path d="M14 108 C 40 100, 70 116, 106 104" pathLength={1} /></g>,
    // shapes / building
    <g key="2" {...common}><rect x="16" y="56" width="44" height="44" rx="4" pathLength={1} /><circle cx="84" cy="40" r="22" pathLength={1} /><path d="M66 100 L 86 66 L 106 100 Z" pathLength={1} /></g>,
    // speech bubble / sharing
    <g key="3" {...common}><path d="M16 24 H 104 V 78 H 54 L 32 98 V 78 H 16 Z" pathLength={1} /><path d="M36 46 H 84 M36 60 H 70" pathLength={1} /></g>,
  ];
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="draw h-24 w-24 md:h-28 md:w-28">
      {arts[i % arts.length]}
    </svg>
  );
}
