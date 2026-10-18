import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { featuredProjects, trailImages } from "@/data/projects";
import { ImageTrail, useTrailEnabled } from "@/components/image-trail";
import { ProjectCard } from "@/components/project-card";
import { Asterisk, ButtonLink, btn } from "@/components/ui-button";
import { ChapterArt, Doodle, Marquee, Reveal, Sticker } from "@/components/story";
import portrait from "@/assets/archie-portrait.webp.asset.json";

const CHAPTERS = [
  { n: "01", t: "Notice", d: "Every project starts with looking closely: at people, references, and the problem behind the brief." },
  { n: "02", t: "Sketch", d: "Ideas get messy on paper first: rough layouts, letterforms, and flows before anything is polished." },
  { n: "03", t: "Shape", d: "The strongest direction becomes a system of type, colour, grids, and screens that work together." },
  { n: "04", t: "Share", d: "Finally it goes out into the world, as a website, a brand, or a feed, and tells its story." },
];

const Words = ({ text, start = 0 }: { text: string; start?: number }) => (
  <>{text.split(" ").map((w, i) => <span key={i} className="word-rise" style={{ animationDelay: `${start + i * 90}ms` }}>{w}&nbsp;</span>)}</>
);

const TITLE = "Archie Saluja | UI/UX, Branding & Social Media";
const DESC = "Archie Saluja is a Fashion Communication student at NIFT Panchkula designing digital experiences, brand identities, and social content.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <Doodle kind="squiggle" className="draw-now absolute right-[8%] top-[14%] w-40 text-primary md:w-56" />
          <Doodle kind="spark" className="draw-now float-y absolute right-[30%] top-[58%] hidden w-12 text-foreground md:block" />
          <Sticker text="Archie Saluja · Design student · " className="absolute bottom-8 right-[6%] hidden md:block" />
        </div>
        <div className="container-page pointer-events-none relative z-10 py-14 md:py-20">
          <p className="flex items-center gap-2 text-lg font-bold">
            <Asterisk className="text-primary" /> Hi, I’m Archie.
          </p>
          <h1 className="display-xl mt-6">
            <Words text="Curiosity to clarity." />
            <br />
            <span className="text-primary"><Words text="Ideas to" start={200} /><span className="word-rise offset-underline" style={{ animationDelay: "420ms" }}>identity.</span></span>
          </h1>
          <div className="mt-10 max-w-[56ch]">
            <p className="text-muted-foreground">
              I’m Archie Saluja, a Communication student at NIFT Panchkula, working across UI/UX, branding, and social media. I turn research and ideas into intuitive digital experiences, distinctive identities, and content that gives brands a voice.
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

      <Marquee items={["UI/UX", "Branding", "Social Media", "Storytelling", "Typography"]} />

      <section id="selected-work" className="section-y scroll-mt-[72px] border-t">
        <div className="container-page">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label-sm">Selected work</p>
              <h2 className="display-lg mt-3">A few things I’ve <span className="mark now">made.</span></h2>
              <p className="mt-3 max-w-[48ch] text-muted-foreground">Across screens, brands, and social feeds.</p>
            </div>
            <Link to="/work" className="inline-flex min-h-11 items-center font-bold text-primary underline decoration-2 underline-offset-8 hover:decoration-highlight">View all work →</Link>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 120} className={i === featuredProjects.length - 1 && i % 2 === 0 ? "md:col-span-2 md:mx-auto md:w-[70%]" : undefined}>
                <p className="mb-3 text-sm font-extrabold text-primary">Chapter {String(i + 1).padStart(2, "0")}</p>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-t" aria-labelledby="story-h">
        <div className="container-page grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <p className="label-sm">The process</p>
              <h2 id="story-h" className="display-lg mt-3">How an idea becomes a <span className="mark now">project.</span></h2>
              <Doodle kind="loop" className="draw-now mt-6 w-40 text-primary" />
            </div>
          </div>
          <ol className="space-y-6 md:col-span-7 md:col-start-6">
            {CHAPTERS.map((c, i) => (
              <Reveal as="li" key={c.n} className={`chapter-card flex gap-6 border p-6 md:p-8 ${i % 2 ? "bg-surface" : "bg-background"}`}>
                <div className="shrink-0 text-primary"><ChapterArt i={i} /></div>
                <div>
                  <p className="text-sm font-extrabold text-primary">{c.n}</p>
                  <h3 className="display-md mt-1">{c.t}</h3>
                  <p className="mt-2 text-muted-foreground">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="about" className="section-y relative scroll-mt-[72px] overflow-hidden bg-secondary text-secondary-foreground">
        <Reveal className="container-page grid items-center gap-12 md:grid-cols-12">
          <div className="relative mx-auto w-full max-w-[360px] md:col-span-4">
            <div className="portrait-card relative">
              <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rotate-3 bg-primary" />
              <img src={portrait.url} alt="Portrait of Archie Saluja" width={900} height={1200} loading="lazy" className="relative aspect-[3/4] w-full border-4 border-background object-cover" />
              <span className="wiggle absolute -left-4 top-6 rounded-full bg-highlight px-4 py-1.5 text-sm font-extrabold text-highlight-foreground shadow-sm">Hi! 👋</span>
            </div>
            <Sticker text="Curious · Creative · Archie · " className="absolute -bottom-10 -right-6 h-24 w-24" />
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="label-sm text-secondary-foreground">About</p>
            <h2 className="display-lg mt-4">Who is <span className="mark">Archie ?</span></h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {["Curious thinker", "Visual storyteller", "Team person"].map((t) => (
                <li key={t} className="pill-pop cursor-default rounded-full border border-foreground px-4 py-1.5 text-sm font-semibold">{t}</li>
              ))}
            </ul>
            <div className="mt-8 space-y-6">
              <p>I like figuring out what makes something work, and what makes it feel memorable. At NIFT Panchkula, I’m studying Fashion Communication and exploring that space through interfaces, brand identities, and social media.</p>
              <p>My experience spans website and campaign-tool design at Frodoh, social media strategy at North &amp; Beyond, and visual content at Ninos Dreams. Beyond design, I’ve organised cultural events and stepped on stage as an anchor, so collaboration, storytelling, and a little energy come naturally to me.</p>
              <Link to="/resume" className="inline-flex min-h-11 items-center font-bold underline decoration-2 underline-offset-8">View my resume →</Link>
              <Doodle kind="squiggle" className="w-36 text-foreground" />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-y relative overflow-hidden bg-primary text-primary-foreground">
        <Reveal className="container-page">
          <h2 className="display-xl max-w-[14ch]">Got an idea? Let’s talk.</h2>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[46ch]">For design opportunities, collaborations, or a good creative conversation.</p>
            <div className="flex items-center gap-4">
              <Doodle kind="arrow" className="hidden w-28 text-highlight md:block" />
              <ButtonLink to="/contact" variant="inverse">Let’s talk <span aria-hidden>→</span></ButtonLink>
            </div>
          </div>
        </Reveal>
        <Sticker text="Let's make something · " className="mx-auto mt-8 opacity-90 md:absolute md:right-8 md:top-8 md:mt-0" />
      </section>
    </>
  );
}
