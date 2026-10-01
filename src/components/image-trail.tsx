import { useEffect, useRef, useState, type RefObject } from "react";
import type { ImageRef } from "@/data/projects";

const STEP = 80;
const MIN_INTERVAL = 120;
const MAX_VISIBLE = 5;
const LIFETIME = 900;

/** True on hover-capable fine-pointer devices without reduced motion. */
export function useTrailEnabled() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const set = () => setOn(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return on;
}

/** Imperative trail: no React state updates on pointer move. */
export function ImageTrail({ containerRef, images }: { containerRef: RefObject<HTMLElement | null>; images: ImageRef[] }) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = containerRef.current;
    const layer = layerRef.current;
    if (!host || !layer || !images.length) return;
    images.forEach((i) => { const im = new Image(); im.src = i.src; });

    let last: { x: number; y: number } | null = null;
    let lastTime = 0;
    let idx = 0;
    let pending: { x: number; y: number } | null = null;
    let raf = 0;
    const live: HTMLImageElement[] = [];

    const spawn = (x: number, y: number) => {
      const data = images[idx++ % images.length];
      const rect = host.getBoundingClientRect();
      const w = 180 + Math.random() * 60;
      const h = (w * data.height) / data.width;
      const cx = Math.min(Math.max(x, w / 2), rect.width - w / 2);
      const cy = Math.min(Math.max(y, h / 2), rect.height - h / 2);
      const rot = Math.random() * 16 - 8;
      const el = document.createElement("img");
      el.src = data.src;
      el.alt = "";
      el.decoding = "async";
      el.style.cssText = `position:absolute;left:0;top:0;width:${w}px;height:${h}px;object-fit:cover;pointer-events:none;will-change:transform,opacity;`;
      const t = (s: number) => `translate3d(${cx - w / 2}px,${cy - h / 2}px,0) rotate(${rot}deg) scale(${s})`;
      layer.appendChild(el);
      live.push(el);
      while (live.length > MAX_VISIBLE) live.shift()?.remove();
      const anim = el.animate(
        [
          { transform: t(0.85), opacity: 0 },
          { transform: t(1), opacity: 1, offset: 0.18 },
          { transform: t(1), opacity: 1, offset: 0.6 },
          { transform: t(0.92), opacity: 0 },
        ],
        { duration: LIFETIME, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" },
      );
      anim.onfinish = () => {
        el.remove();
        const i = live.indexOf(el);
        if (i >= 0) live.splice(i, 1);
      };
    };

    const tick = () => {
      raf = 0;
      if (!pending) return;
      const p = pending;
      pending = null;
      const now = performance.now();
      if (!last) { last = p; return; }
      if (Math.hypot(p.x - last.x, p.y - last.y) >= STEP && now - lastTime >= MIN_INTERVAL) {
        spawn(p.x, p.y);
        last = p;
        lastTime = now;
      }
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      const r = host.getBoundingClientRect();
      pending = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      last = null;
      pending = null;
      live.splice(0).forEach((el) => el.remove());
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      onLeave();
    };
  }, [containerRef, images]);

  return <div ref={layerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden" />;
}
