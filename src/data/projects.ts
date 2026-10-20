import thWeb from "@/assets/numa-web-thumb.webp.asset.json";
import thKeo from "@/assets/keora-thumb.webp.asset.json";
import thSem from "@/assets/semiotics-thumb.webp.asset.json";
import thBrand from "@/assets/numa-brand-thumbnail.png.asset.json";
import thFro from "@/assets/frodoh-thumb.webp.asset.json";
import brand0 from "@/assets/numa-brand-hd-0.webp.asset.json";
import brand1 from "@/assets/numa-brand-hd-1.webp.asset.json";
import brand2 from "@/assets/numa-brand-hd-2.webp.asset.json";
import brandBoard from "@/assets/numa-brand-board-hd.webp.asset.json";
import web0 from "@/assets/numa-web-hd-0.webp.asset.json";
import web1 from "@/assets/numa-web-hd-1.webp.asset.json";
import web2 from "@/assets/numa-web-hd-2.webp.asset.json";
import webBoard from "@/assets/numa-web-board-hd2.webp.asset.json";
import sem0 from "@/assets/semiotics-hd-0.webp.asset.json";
import sem1 from "@/assets/semiotics-hd-1.webp.asset.json";
import sem2 from "@/assets/semiotics-hd-2.webp.asset.json";
import semBoard from "@/assets/semiotics-board-hd.webp.asset.json";
import keo0 from "@/assets/keora-hd-0.webp.asset.json";
import keo1 from "@/assets/keora-hd-1.webp.asset.json";
import keo2 from "@/assets/keora-hd-2.webp.asset.json";
import fro0 from "@/assets/frodoh-hd-0.webp.asset.json";
import fro1 from "@/assets/frodoh-hd-1.webp.asset.json";
import fro2 from "@/assets/frodoh-hd-2.webp.asset.json";
import froBoard from "@/assets/frodoh-board-hd.webp.asset.json";
import keoBoard from "@/assets/keora-board-hd.webp.asset.json";
import forge01 from "@/assets/frodoh-forge-page-01.webp.asset.json";
import forge02 from "@/assets/frodoh-forge-page-02.webp.asset.json";
import forge03 from "@/assets/frodoh-forge-page-03.webp.asset.json";
import forge04 from "@/assets/frodoh-forge-page-04.webp.asset.json";
import forge05 from "@/assets/frodoh-forge-page-05.webp.asset.json";
import forge06 from "@/assets/frodoh-forge-page-06.webp.asset.json";
import forge07 from "@/assets/frodoh-forge-page-07.webp.asset.json";
import forge08 from "@/assets/frodoh-forge-page-08.webp.asset.json";
import forge09 from "@/assets/frodoh-forge-page-09.webp.asset.json";
import forge10 from "@/assets/frodoh-forge-page-10.webp.asset.json";

export const CATEGORIES = ["UI/UX", "Branding", "Social Media"] as const;
export type Category = (typeof CATEGORIES)[number];

export type ImageRef = { src: string; alt: string; width: number; height: number };

/** A case-study section. `body: null` = not yet supplied; it is hidden on the site. */
export type Section = { heading: string; body: string | null; images?: ImageRef[] };

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: Category;
  /** Optional secondary descriptor shown next to the category. */
  descriptor?: string;
  featured: boolean;
  summary: string | null;
  cover: ImageRef;
  /** Extra crops used by the homepage cursor trail. */
  previews: ImageRef[];
  /** Full presentation board(s), shown uncropped. */
  boards: ImageRef[];
  sections: Section[];
  related?: string;
};

const crop = (src: string, alt: string): ImageRef => ({ src, alt, width: 690, height: 861 });

export const projects: Project[] = [
  {
    id: "frodoh-forge",
    slug: "frodoh-forge",
    title: "Frodoh Forge",
    category: "UI/UX",
    descriptor: "Product UI redesign",
    featured: true,
    summary: "A focused redesign of the campaign planning experience.",
    cover: { src: forge01.url, alt: "Frodoh Forge campaign planning redesign presented on a laptop", width: 2000, height: 1125 },
    previews: [{ src: forge10.url, alt: "Frodoh Forge landing page, login and sign up designs", width: 2000, height: 1125 }],
    boards: [forge01, forge02, forge03, forge04, forge05, forge06, forge07, forge08, forge09, forge10].map((asset, i) => ({
      src: asset.url,
      alt: ["Frodoh Forge project introduction", "Connecting product discovery with account access", "Early landing page, sign up and login layouts", "Login redesign and brand consistency", "Login before and after", "Sign up redesign and business context", "Sign up before and after", "Landing page and campaign planning workflow", "Landing page before and after", "Final landing page, login and sign up designs"][i] ?? "Frodoh Forge presentation",
      width: 2000,
      height: 1125,
    })),
    sections: [],
    related: "frodoh-website-redesign",
  },
  {
    id: "numa-brand",
    slug: "numa-brand-identity",
    title: "Numa: Brand Identity",
    category: "Branding",
    featured: true,
    summary: null,
    cover: { src: thBrand.url, alt: "Numa Calming Chamomile and Healthy Hibiscus packaging beside tea and chamomile flowers", width: 1024, height: 512 },
    previews: [
      crop(brand1.url, "Numa branded notebook with blue dot pattern"),
      crop(brand2.url, "Numa packaging boxes in blue and pink"),
    ],
    boards: [{ src: brandBoard.url, alt: "Full Numa brand identity presentation: logo, colours, stationery, packaging and business cards", width: 1201, height: 10009 }],
    sections: [
      { heading: "Brief", body: null },
      { heading: "Concept", body: null },
      { heading: "Identity system", body: null },
      { heading: "Applications", body: null },
    ],
    related: "numa-website",
  },
  {
    id: "numa-web",
    slug: "numa-website",
    title: "Numa: Website Design",
    category: "UI/UX",
    featured: true,
    summary: null,
    cover: { src: thWeb.url, alt: "Numa website homepage shown on a laptop: Breathe. Reflect. Reset.", width: 1397, height: 941 },
    previews: [
      crop(web1.url, "Numa research and card-sorting boards"),
      crop(web2.url, "Numa website shown on a laptop"),
    ],
    boards: [{ src: webBoard.url, alt: "Full Numa website case study: research, card sorting, wireframes and final screens", width: 1201, height: 10914 }],
    sections: [
      { heading: "Problem", body: null },
      { heading: "Role", body: null },
      { heading: "Research", body: null },
      { heading: "User flow", body: null },
      { heading: "Wireframes", body: null },
      { heading: "Design decisions", body: null },
      { heading: "Final screens", body: null },
    ],
    related: "numa-brand-identity",
  },
  {
    id: "semiotics",
    slug: "semiotics",
    title: "Semiotics: Visual Exploration",
    category: "Branding",
    descriptor: "Academic / Semiotics",
    featured: true,
    summary: null,
    cover: { src: thSem.url, alt: "Warli Exhibition 2025 tickets set in the Warli-inspired typeface", width: 1393, height: 927 },
    previews: [
      crop(sem1.url, "Warli-inspired letterforms drawn on a grid"),
      crop(sem2.url, "Warli Verse typeface applied to an art museum poster"),
    ],
    boards: [{ src: semBoard.url, alt: "Full Warli Verse presentation: inspiration, typeface references, letter exploration and deliverables", width: 1200, height: 10590 }],
    sections: [
      { heading: "Brief", body: null },
      { heading: "Concept", body: null },
      { heading: "Interpretation of signs and symbols", body: null },
      { heading: "Final outcome", body: null },
    ],
  },
  {
    id: "frodoh",
    slug: "frodoh-website-redesign",
    title: "Frodoh: Website Redesign",
    category: "UI/UX",
    featured: false,
    summary: null,
    cover: { src: thFro.url, alt: "Reimagining Frodoh: website redesign cover with the new homepage shown on a laptop", width: 1672, height: 941 },
    previews: [
      crop(fro1.url, "Frodoh website redesign process board"),
      crop(fro2.url, "Frodoh redesigned website screens"),
    ],
    boards: [{ src: froBoard.url, alt: "Full Frodoh website redesign case study: visual audit, competitive landscape, process and final screens", width: 1201, height: 10170 }],
    sections: [
      { heading: "Problem", body: null },
      { heading: "Role", body: null },
      { heading: "Research", body: null },
      { heading: "Final screens", body: null },
    ],
  },
  {
    id: "keora",
    slug: "keora-magazine",
    title: "Keora: Magazine Design",
    category: "Branding",
    descriptor: "Editorial / Magazine",
    featured: false,
    summary: null,
    cover: { src: thKeo.url, alt: "Keora magazine cover featuring Park Hyung Sik", width: 1398, height: 842 },
    previews: [
      crop(keo1.url, "Keora typography system and magazine cover mockup"),
      crop(keo2.url, "Keora magazine inner spreads with fashion features"),
    ],
    boards: [{ src: keoBoard.url, alt: "Full Keora magazine presentation: theme, references, layout explorations, fonts, cover and spreads", width: 1201, height: 7219 }],
    sections: [
      { heading: "Brief", body: null },
      { heading: "Concept", body: null },
      { heading: "Final outcome", body: null },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
export const trailImages: ImageRef[] = projects.map((p) => p.cover);
