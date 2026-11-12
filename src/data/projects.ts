export type ProjectKind = "website" | "video";

export interface Project {
  slug: string;
  title: string;
  kind: ProjectKind;
  category: string;
  description: string;
  url: string;
  /** Brand accent used by the CSS/SVG mockup thumbnail. */
  accent: string;
  accentSoft: string;
  /** Short label rendered inside the mockup frame. */
  mockupLabel: string;
  /** Grid span on md+ screens (editorial varied sizes). */
  span: "md:col-span-4" | "md:col-span-2" | "md:col-span-3";
}

/**
 * The ONLY projects shown on the site — real work with real links.
 * Thumbnails are original CSS/SVG mockups, never invented clients.
 */
export const projects: Project[] = [
  {
    slug: "alaska-restaurant",
    title: "Alaska Restaurant",
    kind: "website",
    category: "Website · Restaurant",
    description: "A warm, modern restaurant website with menus, atmosphere and reservations in focus.",
    url: "https://alaska-restaurant.vercel.app",
    accent: "#f59e0b",
    accentSoft: "#78350f",
    mockupLabel: "ALASKA",
    span: "md:col-span-4",
  },
  {
    slug: "knives-edc",
    title: "Knives — 8 EDC Pocket Knives",
    kind: "video",
    category: "Video · Documentary",
    description: "A cinematic documentary edit on eight everyday-carry pocket knives.",
    url: "https://drive.google.com/file/d/1pEIetHR6nhlwy4LKJncj3wFOZ0t04Zhh/view",
    accent: "#60a5fa",
    accentSoft: "#1e3a5f",
    mockupLabel: "8 EDC POCKET KNIVES",
    span: "md:col-span-2",
  },
  {
    slug: "new-fine-steel",
    title: "New Fine Steel",
    kind: "website",
    category: "Website · Steel & Industry",
    description: "A clean industrial website presenting steel products and company capability.",
    url: "https://new-fine-steel.vercel.app",
    accent: "#94a3b8",
    accentSoft: "#334155",
    mockupLabel: "NEW FINE STEEL",
    span: "md:col-span-2",
  },
  {
    slug: "a380",
    title: "A380",
    kind: "video",
    category: "Video · Documentary",
    description: "A documentary edit on the Airbus A380 — the world's largest passenger aircraft.",
    url: "https://drive.google.com/file/d/1MsgHXeaUHGt6MHSsvPvdui05FF_rVZ-/view",
    accent: "#38bdf8",
    accentSoft: "#0c4a6e",
    mockupLabel: "AIRBUS A380",
    span: "md:col-span-4",
  },
  {
    slug: "dynamic-gym",
    title: "Dynamic Gym",
    kind: "website",
    category: "Website · Fitness",
    description: "A bold, energetic gym website with programs, trainers and memberships.",
    url: "https://dynamic-gym-regulasprojects.vercel.app",
    accent: "#ef4444",
    accentSoft: "#7f1d1d",
    mockupLabel: "DYNAMIC GYM",
    span: "md:col-span-3",
  },
  {
    slug: "tesla-airless-tire",
    title: "Tesla Airless Tire",
    kind: "video",
    category: "Video · Documentary",
    description: "A documentary edit exploring Tesla's airless tire technology.",
    url: "https://drive.google.com/file/d/1aTG6ovNfDMnalS0Wd7JvTlx3GdpRsg8T/view",
    accent: "#e879f9",
    accentSoft: "#701a75",
    mockupLabel: "TESLA AIRLESS TIRE",
    span: "md:col-span-3",
  },
  {
    slug: "zelnivo",
    title: "Zelnivo",
    kind: "website",
    category: "Website · E-commerce",
    description: "A modern e-commerce storefront built for browsing and buying with ease.",
    url: "https://www.zelnivo.store",
    accent: "#34d399",
    accentSoft: "#064e3b",
    mockupLabel: "ZELNIVO",
    span: "md:col-span-3",
  },
  {
    slug: "aysh-collection",
    title: "Aysh Collection",
    kind: "website",
    category: "Website · E-commerce",
    description: "An elegant online collection storefront with a refined shopping experience.",
    url: "https://aysh-collection.vercel.app",
    accent: "#f472b6",
    accentSoft: "#831843",
    mockupLabel: "AYSH COLLECTION",
    span: "md:col-span-3",
  },
];
