import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { featuredProjects, trailImages } from "@/data/projects";
import { ImageTrail, useTrailEnabled } from "@/components/image-trail";
import { ProjectCard } from "@/components/project-card";
import { ButtonLink, btn } from "@/components/ui-button";

const TITLE = "Archie Saluja — UI/UX, Branding & Social Media Designer";
const DESC = "Portfolio of Archie Saluja, a design student at NIFT Panchkula exploring UI/UX, branding, and social media design.";

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
      <section ref={heroRef} className="relative md:min-h-[calc(85vh-72px)] md:flex md:items-center">
        {trail && <ImageTrail containerRef={heroRef} images={trailImages} />}
        <div className="container-page relative z-10 py-14 md:py-20 pointer-events-none">
          <p className="text-lg font-semibold text-accent">Hi, I’m Archie Saluja.</p>
          <h1 className="display-xl mt-6 max-w-[14ch]">
            Thoughtful interfaces.
            <br />
            <span className="text-muted-foreground">Expressive identities.</span>
          </h1>
          <div className="mt-10 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="max-w-[52ch] text-muted-foreground">
                A design student at NIFT Panchkula, exploring UI/UX, branding, and social media through curiosity, storytelling, and attention to detail.
              </p>
              <p className="label-sm mt-6">UI/UX Design · Branding · Social Media</p>
              <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
                <a href="#selected-work" className={btn.primary}>Explore my work <span aria-hidden>↓</span></a>
                <ButtonLink to="/resume" variant="secondary">View resume</ButtonLink>
              </div>
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
              <h2 className="display-lg">Selected work</h2>
              <p className="mt-3 max-w-[48ch] text-muted-foreground">A selection of interfaces, identities, and visual explorations.</p>
            </div>
            <Link to="/work" className="link-accent inline-flex min-h-11 items-center font-semibold">View all work →</Link>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {featuredProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      </section>

      <section className="section-y border-t">
        <div className="container-page grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label-sm">About</p>
            <h2 className="display-lg mt-4">Curious by nature. Intentional by design.</h2>
          </div>
          <div className="space-y-6 text-muted-foreground md:col-span-6 md:col-start-7 md:pt-10">
            <p>I’m Archie, a design student at NIFT Panchkula with an interest in how brands look, how interfaces work, and how both connect with people. My practice spans UI/UX, branding, and social media design, bringing together clear thinking and visual storytelling.</p>
            <p>During my internship at Frodoh World, I worked across website UI/UX, social media creatives, and branding. As Cultural Club Secretary at NIFT Panchkula, I’ve also helped organise campus events, including Converge and Spectrum—experiences that have shaped how I collaborate, communicate, and take ideas into execution.</p>
          </div>
        </div>
      </section>

      <section className="section-y border-t">
        <div className="container-page">
          <h2 className="display-xl max-w-[12ch]">Have something in mind?</h2>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[46ch] text-muted-foreground">I’d love to hear about design opportunities, collaborations, and ideas worth exploring.</p>
            <ButtonLink to="/contact">Let’s talk <span aria-hidden>→</span></ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
