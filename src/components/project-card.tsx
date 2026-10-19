import { Link } from "@tanstack/react-router";
import type { Project } from "@/data/projects";

const BACKING: Record<string, string> = {
  "UI/UX": "bg-primary",
  Branding: "bg-secondary",
  "Social Media": "bg-highlight",
};

export function ProjectCard({ project, eager = false, editorial = false }: { project: Project; eager?: boolean; editorial?: boolean }) {
  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      className="group block rounded-[28px] focus-visible:outline-offset-8"
    >
      <div className="relative">
        <div
          aria-hidden="true"
          className={`absolute inset-0 rounded-[28px] ${BACKING[project.category] ?? "bg-primary"} transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:translate-y-3 group-hover:rotate-2 group-focus-visible:translate-x-3 group-focus-visible:translate-y-3 motion-reduce:transition-none`}
        />
        <div className={`relative overflow-hidden rounded-[28px] bg-surface shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--color-foreground)_35%,transparent)] transition-transform duration-500 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:-rotate-1 group-focus-visible:-translate-x-1 group-focus-visible:-translate-y-1 motion-reduce:transition-none ${editorial ? "aspect-[16/11] p-4 md:p-6" : "aspect-[3/2]"}`}>
          <img
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03] motion-reduce:transition-none ${editorial ? "object-contain" : "object-cover"}`}
          />
          {!editorial && <span className="absolute left-4 top-4 rounded-full bg-background px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-foreground">
            {project.category}
          </span>}
          <span
            aria-hidden="true"
            className={`absolute bottom-4 right-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-highlight text-2xl font-bold text-highlight-foreground transition-all duration-300 group-hover:rotate-45 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 ${editorial ? "scale-90 opacity-100" : "scale-75 opacity-0"}`}
          >
            ↑
          </span>
        </div>
      </div>
      <div className="mt-6 flex items-start justify-between gap-4 px-1">
        <div>
          <h3 className="text-xl font-extrabold tracking-tight transition-colors group-hover:text-primary md:text-2xl">{project.title}</h3>
          <p className="label-sm mt-1"><span className="text-primary">{project.category}</span>{project.descriptor && <> · {project.descriptor}</>}</p>
        </div>
      </div>
    </Link>
  );
}
