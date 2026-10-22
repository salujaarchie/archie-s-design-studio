import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Maximize2, X, Download, FileText } from "lucide-react";
import { getProject, projects } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const p = getProject(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData && getProject(loaderData.slug);
    if (!p) return { meta: [{ title: "Project not found | Archie Saluja" }, { name: "robots", content: "noindex" }] };
    const t = `${p.title} | Archie Saluja`;
    const d = `${p.title}, a ${p.category} project by Archie Saluja, NIFT Panchkula.`;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
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
  const [showPdfModal, setShowPdfModal] = useState(false);
  const p = getProject(slug);
  if (!p) return null;
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
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
          <img src={p.cover.src} alt={p.cover.alt} width={p.cover.width} height={p.cover.height} className="mx-auto h-auto w-full max-w-[1000px]" />
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
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t pt-8">
          <div>
            <h2 id="board-h" className="display-md">Project presentation</h2>
            <p className="label-sm mt-1">{p.boards.length > 1 ? `${p.boards.length} sections · 2x Retina` : "Full board"}</p>
          </div>
          {p.pdf && (
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPdfModal(true)}
                className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Maximize2 className="h-4 w-4" /> Open Full Vector PDF
              </button>
              <a
                href={p.pdf}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-foreground px-4 py-2 text-sm font-bold text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                <Download className="h-4 w-4" /> Download PDF
              </a>
            </div>
          )}
        </div>

        {/* High-DPI continuous board presentation */}
        <div className="mt-8 overflow-hidden rounded-sm bg-surface shadow-sm">
          {p.boards.map((b, idx) => (
            <div key={b.src} className="relative w-full">
              <img
                src={b.src}
                alt={b.alt}
                width={b.width}
                height={b.height}
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
                className="mx-auto block h-auto w-full max-w-[1000px]"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Vector PDF Modal */}
      {showPdfModal && p.pdf && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-bold text-foreground">{p.title} — Vector PDF</h3>
                <p className="text-xs text-muted-foreground">Original vector file · Zoom & inspect freely</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={p.pdf}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-xs font-semibold hover:bg-accent"
              >
                <Download className="h-3.5 w-3.5" /> Download
              </a>
              <button
                type="button"
                onClick={() => setShowPdfModal(false)}
                className="inline-flex items-center justify-center rounded-sm p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="Close PDF Viewer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 bg-neutral-900 p-2 md:p-6">
            <object
              data={p.pdf}
              type="application/pdf"
              className="h-full w-full rounded border border-neutral-700 bg-white"
            >
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-white p-6">
                <p>Your browser could not preview the PDF inline.</p>
                <a
                  href={p.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded bg-primary px-4 py-2 font-bold text-primary-foreground"
                >
                  Open PDF in new tab ↗
                </a>
              </div>
            </object>
          </div>
        </div>
      )}

      <nav aria-label="More projects" className="border-t">
        <div className="container-page grid gap-8 py-12 md:grid-cols-2">
          {related ? (
            <Link to="/work/$slug" params={{ slug: related.slug }} className="group block">
              <p className="label-sm">Companion case study</p>
              <p className="display-md mt-2 group-hover:text-primary">{related.title}</p>
            </Link>
          ) : <span />}
          {next && <Link to="/work/$slug" params={{ slug: next.slug }} className="group block md:text-right">
            <p className="label-sm">Next project</p>
            <p className="display-md mt-2 group-hover:text-primary">{next.title} →</p>
          </Link>}
        </div>
      </nav>
    </article>
  );
}
