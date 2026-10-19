import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { profile } from "@/data/profile";
import { btn } from "@/components/ui-button";

const TITLE = "Resume | Archie Saluja";
const DESC = "Resume of Archie Saluja: B.Des Fashion Communication at NIFT Panchkula, with UI/UX, branding and social media experience.";

export const Route = createFileRoute("/resume")({
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
  component: Resume,
});

const EXPERIENCE = [
  { role: "Design Intern", org: "FRODOH Business Solutions", date: "June–July 2026", text: "Revamped website and campaign-tool interfaces, refreshed brand typography and colours, and designed digital and print collateral." },
  { role: "Social Media Strategist Intern", org: "North & Beyond", date: "May–July 2026", text: "Developed social content concepts, publishing calendars, and campaign direction, collaborating with teams and clients." },
  { role: "AI Visual Content & Brand Strategy Executive", org: "Ninos Dreams", date: "December 2025–April 2026", text: "Created e-commerce visuals and social content, developed brand strategy, and generated 25K+ organic views in 30 days." },
  { role: "Business Development & Social Media Research Intern", org: "Tendeza Media", date: "June–July 2025", text: "Researched social trends and competitors to inform campaign messaging and creative direction." },
];
const SKILLS = [
  { g: "UI/UX", s: "Research, information architecture, wireframing, prototyping." },
  { g: "Branding", s: "Identity systems, typography, layout, visual storytelling." },
  { g: "Social Media", s: "Content strategy, campaign planning, content calendars." },
];
const LEADERSHIP = [
  "Cultural Club Secretary, NIFT Panchkula · 2023–2025",
  "SPOC Head, Converge 2024 · Coordinated 38 SPOCs",
  "Event anchoring and campus event organisation",
];

function Row({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 border-t py-10 md:grid-cols-12">
      <h2 className="label-sm md:col-span-3 md:pt-1">{title}</h2>
      <div className="md:col-span-9 md:col-start-4">{children}</div>
    </section>
  );
}

function Resume() {
  return (
    <div className="container-page section-y">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label-sm">Resume</p>
          <h1 className="display-xl mt-4">Archie Saluja</h1>
          <p className="mt-4 text-lg font-bold text-primary">UI/UX · Branding · Social Media</p>
          <p className="text-muted-foreground">{profile.location}</p>
        </div>
        {profile.resumePdf && <a href={profile.resumePdf} download className={btn.primary}>Download full resume</a>}
      </div>
      <div className="mt-14">
        <Row title="Profile">
          <p className="max-w-[62ch]">Fashion Communication student at NIFT Panchkula, working across digital experiences, brand identities, and social content. I bring research, visual storytelling, and hands-on execution into my design process.</p>
        </Row>
        <Row title="Experience">
          <ol>
            {EXPERIENCE.map((e) => (
              <li key={e.org} className="grid gap-1 border-b py-6 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-[1fr_auto] md:gap-x-8">
                <h3 className="text-lg font-bold">{e.role} <span className="font-semibold text-primary">· {e.org}</span></h3>
                <p className="label-sm md:row-span-2 md:pt-1 md:text-right">{e.date}</p>
                <p className="max-w-[62ch] text-muted-foreground">{e.text}</p>
              </li>
            ))}
          </ol>
        </Row>
        <Row title="Education">
          <div className="grid gap-1 md:grid-cols-[1fr_auto] md:gap-x-8">
            <h3 className="text-lg font-bold">B.Des, Fashion Communication</h3>
            <p className="label-sm md:pt-1 md:text-right">2023–2027, expected</p>
            <p className="text-muted-foreground">NIFT Panchkula · CGPA: 8.40/10</p>
          </div>
        </Row>
        <Row title="Skills">
          <dl className="grid gap-6 md:grid-cols-3">
            {SKILLS.map((k) => (
              <div key={k.g}>
                <dt className="font-bold">{k.g}</dt>
                <dd className="mt-1 text-muted-foreground">{k.s}</dd>
              </div>
            ))}
          </dl>
        </Row>
        <Row title="Tools">
          <p>Figma · Illustrator · Photoshop · InDesign · Canva</p>
        </Row>
        <Row title="Leadership">
          <ul className="space-y-2">
            {LEADERSHIP.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </Row>
      </div>
    </div>
  );
}
