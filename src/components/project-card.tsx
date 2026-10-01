import { Link } from "@tanstack/react-router";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, eager = false }: { project: Project; eager?: boolean }) {
  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      className="group block focus-visible:outline-offset-8"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <img
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.025] group-focus-visible:scale-[1.025] motion-reduce:transition-none"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4 border-t pt-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight md:text-2xl">{project.title}</h3>
          <p className="label-sm mt-1">{project.category}</p>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 text-xl text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1"
        >
          ↗
        </span>
      </div>
    </Link>
  );
}
