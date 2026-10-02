import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { featuredProjects, trailImages } from "@/data/projects";
import { ImageTrail, useTrailEnabled } from "@/components/image-trail";
import { ProjectCard } from "@/components/project-card";
import { Asterisk, ButtonLink, btn } from "@/components/ui-button";

const TITLE = "Archie Saluja — UI/UX, Branding & Social Media";
const DESC = "Archie Saluja is a Fashion Communication student at NIFT Panchkula designing digital experiences, brand identities, and social content.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const trail = useTrailEnabled();

  return (
    <>
      <section ref={heroRef} className="relative md:flex md:min-h-[calc(85vh-72px)] md:items-center">
        {trail && <ImageTrail containerRef={heroRef} images={trailImages} />}
        <div className="container-page pointer-events-none relative z-10 py-14 md:py-20">
          <p className="flex items-center gap-2 text-lg font-bold">
            <Asterisk className="text-primary" /> Hi, I’m Archie.
          </p>
          <h1 className="display-xl mt-6">
            Interfaces, identities
            <br />
            <span className="text-primary">&amp; a little <span className="offset-underline">personality.</span></span>
          </h1>
          <div className="mt-10 max-w-[56ch]">
            <p className="text-muted-foreground">
              I’m Archie Saluja, a Fashion Communication student at NIFT Panchkula. I design digital experiences, build brand identities, and create social content with a clear idea behind it.
            </p>
            <p className="label-sm mt-6">UI/UX Design · Branding · Social Media</p>
            <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
              <a href="#selected-work" className={btn.primary}>Explore my work <span aria-hidden>↓</span></a>
              <a href="#about" className={btn.secondary}>Meet Archie</a>
            </div>
          </div>
          {!trail && (
            <div aria-hidden="true" className="mt-12 flex gap-3 overflow-hidden">
              {featuredProjects.map((p, i) => (
                <img
                  key={p.id}
                  src={p.cover.src}
                  alt=""
                  width={p.cover.width}
                  height={p.cover.height}
                  className="aspect-[4/5] w-[30%] max-w-[200px] object-cover object-top"
                  style={{ transform: `rotate(${[-3, 2, -1.5][i]}deg)` }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="selected-work" className="section-y scroll-mt-[72px] border-t">
        <div className="container-page">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label-sm">Selected work</p>
              <h2 className="display-lg mt-3">A few things I’ve made.</h2>
              <p className="mt-3 max-w-[48ch] text-muted-foreground">Across screens, brands, and social feeds.</p>
            </div>
            <Link to="/work" className="inline-flex min-h-11 items-center font-bold text-primary underline decoration-2 underline-offset-8 hover:decoration-highlight">View all work →</Link>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {featuredProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      </section>

      <section id="about" className="section-y scroll-mt-[72px] bg-secondary text-secondary-foreground">
        <div className="container-page grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label-sm text-secondary-foreground">About</p>
            <h2 className="display-lg mt-4">A little about Archie.</h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {["Curious thinker", "Visual storyteller", "Team person"].map((t) => (
                <li key={t} className="rounded-full border border-foreground px-4 py-1.5 text-sm font-semibold">{t}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-6 md:col-span-6 md:col-start-7 md:pt-8">
            <p>I like figuring out what makes something work—and what makes it feel memorable. At NIFT Panchkula, I’m studying Fashion Communication and exploring that space through interfaces, brand identities, and social media.</p>
            <p>My experience spans website and campaign-tool design at Frodoh, social media strategy at North &amp; Beyond, and visual content at Ninos Dreams. Beyond design, I’ve organised cultural events and stepped on stage as an anchor—so collaboration, storytelling, and a little energy come naturally to me.</p>
            <Link to="/resume" className="inline-flex min-h-11 items-center font-bold underline decoration-2 underline-offset-8">View my resume →</Link>
          </div>
        </div>
      </section>

      <section className="section-y bg-primary text-primary-foreground">
        <div className="container-page">
          <h2 className="display-xl max-w-[14ch]">Got an idea? Let’s talk.</h2>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[46ch]">For design opportunities, collaborations, or a good creative conversation.</p>
            <ButtonLink to="/contact" variant="inverse">Let’s talk <span aria-hidden>→</span></ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
