import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { profile } from "@/data/profile";
import { btn } from "@/components/ui-button";

const TITLE = "Resume — Archie Saluja";
const DESC = "Resume of Archie Saluja: design student at NIFT Panchkula, Design Intern at Frodoh World, Cultural Club Secretary.";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Resume,
});

function Row({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 border-t py-10 md:grid-cols-12">
      <h2 className="label-sm md:col-span-3 md:pt-1">{title}</h2>
      <div className="md:col-span-8 md:col-start-5">{children}</div>
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
          <p className="mt-4 text-muted-foreground">Design student · UI/UX, Branding, Social Media</p>
        </div>
        {profile.resumePdf && <a href={profile.resumePdf} download className={btn.primary}>Download Resume</a>}
      </div>
      <div className="mt-14">
        <Row title="Profile">
          <p className="text-muted-foreground">Design student at NIFT Panchkula with an interest in how brands look, how interfaces work, and how both connect with people.</p>
        </Row>
        <Row title="Experience">
          <h3 className="text-xl font-bold">Design Intern</h3>
          <p className="text-accent font-semibold">Frodoh World</p>
          <p className="mt-2 text-muted-foreground">Worked across website UI/UX, social media creatives, and branding.</p>
        </Row>
        <Row title="Education">
          <h3 className="text-xl font-bold">NIFT Panchkula</h3>
          <p className="text-muted-foreground">National Institute of Fashion Technology</p>
        </Row>
        <Row title="Leadership">
          <h3 className="text-xl font-bold">Cultural Club Secretary</h3>
          <p className="text-accent font-semibold">NIFT Panchkula</p>
          <p className="mt-2 text-muted-foreground">Helped organise campus events, including Converge and Spectrum.</p>
        </Row>
        <Row title="Skills">
          <ul className="flex flex-wrap gap-2">
            {["UI/UX Design", "Branding", "Social Media Design"].map((s) => (
              <li key={s} className="border px-4 py-2 text-[15px] font-semibold">{s}</li>
            ))}
          </ul>
        </Row>
        <Row title="Tools & achievements">
          <p className="text-muted-foreground italic">To be added.</p>
        </Row>
      </div>
    </div>
  );
}
