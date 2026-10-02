import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProject, projects } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const p = getProject(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData && getProject(loaderData.slug);
    if (!p) return { meta: [{ title: "Project not found — Archie Saluja" }, { name: "robots", content: "noindex" }] };
    const t = `${p.title} — Archie Saluja`;
    const d = `${p.title}, a ${p.category} project by Archie Saluja, NIFT Panchkula.`;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page section-y">
      <h1 className="display-lg">Project not found</h1>
      <Link to="/work" className="link-accent mt-6 inline-flex min-h-11 items-center">← Back to Work</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="container-page section-y" role="alert">{String((error as Error)?.message ?? error)}</div>,
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useLoaderData();
  const p = getProject(slug)!;
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length]!;
  const related = p.related ? getProject(p.related) : undefined;
  const filled = p.sections.filter((s) => s.body || s.images?.length);

  return (
    <article>
      <header className="container-page pt-10 md:pt-16">
        <Link to="/work" className="inline-flex min-h-11 items-center text-[15px] font-semibold text-muted-foreground hover:text-foreground">← Back to Work</Link>
        <p className="label-sm mt-8"><span className="text-primary">{p.category}</span>{p.descriptor && <> · {p.descriptor}</>}</p>
        <h1 className="display-xl mt-4 max-w-[16ch]">{p.title}</h1>
        {p.summary && <p className="mt-6 max-w-[60ch] text-muted-foreground">{p.summary}</p>}
      </header>

      <div className="container-page mt-12">
        <div className="bg-surface px-4 py-10 md:py-16">
          <img src={p.cover.src} alt={p.cover.alt} width={p.cover.width} height={p.cover.height} className="mx-auto h-auto w-full max-w-[520px]" />
        </div>
      </div>

      {filled.length > 0 && (
        <div className="container-page section-y space-y-14">
          {filled.map((s) => (
            <section key={s.heading} className="grid gap-4 border-t pt-8 md:grid-cols-12">
              <h2 className="display-md md:col-span-4">{s.heading}</h2>
              <div className="md:col-span-7 md:col-start-6">
                {s.body && <p className="text-muted-foreground">{s.body}</p>}
              </div>
            </section>
          ))}
        </div>
      )}

      <section className="container-page section-y" aria-labelledby="board-h">
        <div className="flex items-baseline justify-between border-t pt-8">
          <h2 id="board-h" className="display-md">Project presentation</h2>
          <p className="label-sm">Full board</p>
        </div>
        {p.boards.map((b) => (
          <div key={b.src} className="mt-8 bg-surface px-4 py-10">
            <img src={b.src} alt={b.alt} width={b.width} height={b.height} loading="lazy" decoding="async" className="mx-auto h-auto w-full max-w-[640px]" />
          </div>
        ))}
      </section>

      <nav aria-label="More projects" className="border-t">
        <div className="container-page grid gap-8 py-12 md:grid-cols-2">
          {related ? (
            <Link to="/work/$slug" params={{ slug: related.slug }} className="group block">
              <p className="label-sm">Companion case study</p>
              <p className="display-md mt-2 group-hover:text-accent">{related.title}</p>
            </Link>
          ) : <span />}
          <Link to="/work/$slug" params={{ slug: next.slug }} className="group block md:text-right">
            <p className="label-sm">Next project</p>
            <p className="display-md mt-2 group-hover:text-accent">{next.title} →</p>
          </Link>
        </div>
      </nav>
    </article>
  );
}
