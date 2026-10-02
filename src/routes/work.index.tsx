import { createFileRoute, Link } from "@tanstack/react-router";
import { projects, CATEGORIES } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";

const TITLE = "Work — Archie Saluja";
const DESC = "UI/UX, branding and social media projects by Archie Saluja, NIFT Panchkula.";

export const Route = createFileRoute("/work/")({
  validateSearch: (s: Record<string, unknown>): { category?: string } =>
    typeof s["category"] === "string" ? { category: s["category"] } : {},
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
  const active = CATEGORIES.find((c) => c === category);
  const list = active ? projects.filter((p) => p.category === active) : projects;
  const filters = [{ label: "All", value: undefined }, ...CATEGORIES.map((c) => ({ label: c, value: c }))];

  return (
    <section className="section-y">
      <div className="container-page">
        <p className="label-sm">Work</p>
        <h1 className="display-xl mt-4">Projects</h1>
        <nav aria-label="Filter by category" className="mt-10 border-y py-3">
          <ul className="flex flex-wrap gap-2">
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
                      "inline-flex min-h-11 items-center rounded-full px-5 text-[15px] font-semibold transition-colors",
                      on ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-highlight hover:text-foreground",
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
        {list.length === 0 ? (
          <p className="mt-16 border-t pt-10 text-xl font-semibold">{active} projects are coming soon.</p>
        ) : (
          <div className="mt-12 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {list.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}
