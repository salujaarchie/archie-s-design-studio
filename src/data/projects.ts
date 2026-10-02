import brand0 from "@/assets/numa-brand-0.webp.asset.json";
import brand1 from "@/assets/numa-brand-1.webp.asset.json";
import brand2 from "@/assets/numa-brand-2.webp.asset.json";
import brandBoard from "@/assets/numa-brand-board.webp.asset.json";
import web0 from "@/assets/numa-web-0.webp.asset.json";
import web1 from "@/assets/numa-web-1.webp.asset.json";
import web2 from "@/assets/numa-web-2.webp.asset.json";
import webBoard from "@/assets/numa-web-board.webp.asset.json";
import sem0 from "@/assets/semiotics-0.webp.asset.json";
import sem1 from "@/assets/semiotics-1.webp.asset.json";
import sem2 from "@/assets/semiotics-2.webp.asset.json";
import semBoard from "@/assets/semiotics-board.webp.asset.json";

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
    id: "numa-brand",
    slug: "numa-brand-identity",
    title: "Numa — Brand Identity",
    category: "Branding",
    featured: true,
    summary: null,
    cover: crop(brand0.url, "Numa wordmark in soft blue with the tagline Breathe, Reflect, Reset, beside a person meditating by a lake"),
    previews: [
      crop(brand1.url, "Numa branded notebook with blue dot pattern"),
      crop(brand2.url, "Numa packaging boxes in blue and pink"),
    ],
    boards: [{ src: brandBoard.url, alt: "Full Numa brand identity presentation: logo, colours, stationery, packaging and business cards", width: 230, height: 1920 }],
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
    title: "Numa — Website Design",
    category: "UI/UX",
    featured: true,
    summary: null,
    cover: crop(web0.url, "Numa website case study cover with a person meditating on a pier at sunrise"),
    previews: [
      crop(web1.url, "Numa research and card-sorting boards"),
      crop(web2.url, "Numa website shown on a laptop"),
    ],
    boards: [{ src: webBoard.url, alt: "Full Numa website case study: research, card sorting, wireframes and final screens", width: 211, height: 1920 }],
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
    title: "Semiotics — Visual Exploration",
    category: "Branding",
    descriptor: "Academic / Semiotics",
    featured: true,
    summary: null,
    cover: crop(sem0.url, "Warli Verse title page with serif lettering and Warli art references"),
    previews: [
      crop(sem1.url, "Warli-inspired letterforms drawn on a grid"),
      crop(sem2.url, "Warli Verse typeface applied to an art museum poster"),
    ],
    boards: [{ src: semBoard.url, alt: "Full Warli Verse presentation: inspiration, typeface references, letter exploration and deliverables", width: 218, height: 1920 }],
    sections: [
      { heading: "Brief", body: null },
      { heading: "Concept", body: null },
      { heading: "Interpretation of signs and symbols", body: null },
      { heading: "Final outcome", body: null },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
export const trailImages: ImageRef[] = projects.flatMap((p) => [p.cover, ...p.previews]);
