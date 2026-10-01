import { createFileRoute, Link } from "@tanstack/react-router";
import { projects, usedCategories } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";

const TITLE = "Work — Archie Saluja";
const DESC = "Branding, UI/UX and visual communication projects by Archie Saluja, NIFT Panchkula.";

export const Route = createFileRoute("/work/")({
  validateSearch: (s: Record<string, unknown>): { category?: string } =>
    typeof s.category === "string" ? { category: s.category } : {},
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { category } = Route.useSearch();
  const active = usedCategories.find((c) => c === category);
  const list = active ? projects.filter((p) => p.category === active) : projects;
  const filters = [{ label: "All", value: undefined }, ...usedCategories.map((c) => ({ label: c, value: c }))];

  return (
    <section className="section-y">
      <div className="container-page">
        <p className="label-sm">Work</p>
        <h1 className="display-xl mt-4">Projects</h1>
        <nav aria-label="Filter by category" className="mt-10 border-y">
          <ul className="flex flex-wrap gap-x-1">
            {filters.map((f) => {
              const on = f.value === active;
              return (
                <li key={f.label}>
                  <Link
                    to="/work"
                    search={f.value ? { category: f.value } : {}}
                    resetScroll={false}
                    aria-current={on ? "true" : undefined}
                    className={cn(
                      "inline-flex min-h-12 items-center px-3 text-[15px] font-semibold transition-colors",
                      on ? "text-accent underline underline-offset-8" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {f.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <p className="sr-only" aria-live="polite">{list.length} projects shown</p>
        <div className="mt-12 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {list.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  );
}
