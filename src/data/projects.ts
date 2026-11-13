export type ProjectKind = "website" | "video";

export interface Project {
  slug: string;
  title: string;
  kind: ProjectKind;
  category: string;
  description: string;
  url: string;
  /** Brand accent used by the mockup thumbnail (and accents on real-image cards). */
  accent: string;
  accentSoft: string;
  /** Short label rendered inside the mockup frame (mockup-only projects). */
  mockupLabel: string;
  /** Real thumbnail image in /public/work (screenshot or video frame).
      Absent only when no real shot could be obtained - that project keeps its mockup. */
  image?: string;
  /** Descriptive alt text for the real thumbnail. */
  imageAlt?: string;
  /** Intrinsic dimensions of the real thumbnail (prevents layout shift). */
  imageWidth?: number;
  imageHeight?: number;
  /** Short muted preview clip (video projects only) played on card hover -
      the first 30 seconds of the video, from the start (Tesla: 13–43s, so its
      opening news clip stays out). */
  preview?: string;
  /** Top-right badge on video cards. Defaults to "DOCUMENTARY" - set it to
      the series name for series videos (e.g. "NFL", "BRAND AUDIT"). */
  badge?: string;
  /** Grid span on md+ screens (editorial varied sizes). */
  span: "md:col-span-4" | "md:col-span-2" | "md:col-span-3";
}

/**
 * The ONLY projects shown on the site - real work with real links.
 * Thumbnails are real screenshots / video frames.
 */
export const projects: Project[] = [
  {
    slug: "alaska-restaurant",
    title: "Alaska Restaurant",
    kind: "website",
    category: "Website · Restaurant",
    description: "A warm, modern restaurant website with menus, atmosphere and reservations in focus",
    url: "https://alaska-restaurant.vercel.app",
    accent: "#f59e0b",
    accentSoft: "#78350f",
    mockupLabel: "ALASKA",
    image: "/work/alaska-restaurant.webp",
    imageAlt: "Alaska Restaurant website hero, night photo of the Clifton restaurant with gold ALASKA branding and reservation buttons",
    imageWidth: 1200,
    imageHeight: 750,
    span: "md:col-span-2",
  },
  {
    slug: "knives-edc",
    title: "Knives: 8 EDC Pocket Knives",
    kind: "video",
    category: "Video · Documentary",
    description: "A cinematic documentary edit on eight everyday-carry pocket knives",
    url: "https://drive.google.com/file/d/1pEIetHR6nhlwy4LKJncj3wFOZ0t04Zhh/view",
    accent: "#60a5fa",
    accentSoft: "#1e3a5f",
    mockupLabel: "8 EDC POCKET KNIVES",
    image: "/work/knives-edc.webp",
    imageAlt: "Frame from the Knives documentary, close-up of a D2 steel pocket knife resting on bark",
    imageWidth: 1200,
    imageHeight: 675,
    preview: "/work/previews/knives-edc-preview.mp4",
    span: "md:col-span-3",
  },
  {
    slug: "new-fine-steel",
    title: "New Fine Steel",
    kind: "website",
    category: "Website · Steel & Industry",
    description: "A clean industrial website presenting steel products and company capability",
    url: "https://new-fine-steel.vercel.app",
    accent: "#94a3b8",
    accentSoft: "#334155",
    mockupLabel: "NEW FINE STEEL",
    image: "/work/new-fine-steel.webp",
    imageAlt: "New Fine Steel website hero, bold NEW FINE STEEL headline beside a photo of structural steel beams",
    imageWidth: 1200,
    imageHeight: 750,
    span: "md:col-span-2",
  },
  {
    slug: "a380",
    title: "A380",
    kind: "video",
    category: "Video · Documentary",
    description: "A documentary edit on the Airbus A380, the world's largest passenger aircraft",
    url: "https://drive.google.com/file/d/14BCC8nDU9iHtROkyFtLvblETGHgBP7H3/view",
    accent: "#38bdf8",
    accentSoft: "#0c4a6e",
    mockupLabel: "AIRBUS A380",
    image: "/work/a380.webp",
    imageAlt: "Frame from the A380 documentary, an Emirates Airbus A380 in flight against a clear blue sky",
    imageWidth: 1200,
    imageHeight: 675,
    preview: "/work/previews/a380-preview.mp4",
    span: "md:col-span-3",
  },
  {
    slug: "dynamic-gym",
    title: "Dynamic Gym",
    kind: "website",
    category: "Website · Fitness",
    description: "A bold, energetic gym website with programs, trainers and memberships",
    url: "https://dynamic-gym-regulasprojects.vercel.app",
    accent: "#ef4444",
    accentSoft: "#7f1d1d",
    mockupLabel: "DYNAMIC GYM",
    image: "/work/dynamic-gym.webp",
    imageAlt: "Dynamic Gym website hero, 'Build Strength. Break Limits.' headline over a dark gym interior with treadmills and training equipment",
    imageWidth: 1200,
    imageHeight: 750,
    span: "md:col-span-2",
  },
  {
    slug: "tesla-airless-tire",
    title: "Tesla Airless Tire",
    kind: "video",
    category: "Video · Documentary",
    description: "A documentary edit exploring Tesla's airless tire technology",
    url: "https://drive.google.com/file/d/1aTG6ovNfDMnalS0Wd7JvTlx3GdpRsg8T/view",
    accent: "#e879f9",
    accentSoft: "#701a75",
    mockupLabel: "TESLA AIRLESS TIRE",
    image: "/work/tesla-airless-tire.webp",
    imageAlt: "Frame from the Tesla Airless Tire documentary, close-up of an airless tire with flexible spokes on a red car rolling over broken road",
    imageWidth: 1200,
    imageHeight: 675,
    preview: "/work/previews/tesla-airless-tire-preview.mp4",
    span: "md:col-span-3",
  },
  {
    slug: "zelnivo",
    title: "Zelnivo",
    kind: "website",
    category: "Website · E-commerce",
    description: "A modern e-commerce storefront for browsing and buying",
    url: "https://www.zelnivo.store",
    accent: "#34d399",
    accentSoft: "#064e3b",
    mockupLabel: "ZELNIVO",
    image: "/work/zelnivo.webp",
    imageAlt: "Zelnivo store hero, Considered objects headline beside a glowing wooden house table lamp",
    imageWidth: 1200,
    imageHeight: 750,
    span: "md:col-span-3",
  },
  {
    slug: "aysh-collection",
    title: "Aysh Collection",
    kind: "website",
    category: "Website · E-commerce",
    description: "An elegant online collection storefront with a refined shopping experience",
    url: "https://aysh-collection.vercel.app",
    accent: "#f472b6",
    accentSoft: "#831843",
    mockupLabel: "AYSH COLLECTION",
    image: "/work/aysh-collection.webp",
    imageAlt: "Aysh Collection website hero, Everyday elegance, tailored headline beside embroidered three-piece suits",
    imageWidth: 1200,
    imageHeight: 750,
    span: "md:col-span-3",
  },
  {
    slug: "suspicious-supplements",
    title: "Avoid These 15 Suspicious Supplements (And 5 That Are ACTUALLY Safe)",
    kind: "video",
    category: "In Plain Bite",
    description: "An In Plain Bite video on fifteen suspicious supplements to avoid, and five that are actually safe",
    url: "https://drive.google.com/file/d/1LXSWDrRLPA8Re5492qVs5RP3tmPorPbv/view",
    accent: "#ef4444",
    accentSoft: "#7f1d1d",
    mockupLabel: "SUSPICIOUS SUPPLEMENTS",
    image: "/work/suspicious-supplements.webp",
    imageAlt: "Frame from the In Plain Bite video on suspicious supplements to avoid",
    imageWidth: 1200,
    imageHeight: 675,
    preview: "/work/previews/suspicious-supplements-preview.mp4",
    span: "md:col-span-3",
    badge: "IN PLAIN BITE",
  },
  {
    slug: "winter-jackets",
    title: "5 Winter Jacket Brands ROBBING You BLIND: And 3 Worth Every Penny",
    kind: "video",
    category: "Brand Audit",
    description: "A Brand Audit video on five winter jacket brands robbing buyers blind, and three worth every penny",
    url: "https://drive.google.com/file/d/1BopAMsuRA5DtbtCb4BqO79c0ewcJW_Wb/view",
    accent: "#38bdf8",
    accentSoft: "#0c4a6e",
    mockupLabel: "WINTER JACKETS",
    image: "/work/winter-jackets.webp",
    imageAlt: "Frame from the Brand Audit video on winter jacket brands",
    imageWidth: 1200,
    imageHeight: 675,
    preview: "/work/previews/winter-jackets-preview.mp4",
    span: "md:col-span-3",
    badge: "BRAND AUDIT",
  },
  {
    slug: "nfl-savage-plays",
    title: "20 Most SAVAGE plays in NFL History!",
    kind: "video",
    category: "NFL",
    description: "An NFL video on the twenty most savage plays in NFL history",
    url: "https://drive.google.com/file/d/1ctwSL9nzBQpMF15cuiu0bPg03EP37cLR/view",
    accent: "#34d399",
    accentSoft: "#064e3b",
    mockupLabel: "NFL SAVAGE PLAYS",
    image: "/work/nfl-savage-plays.webp",
    imageAlt: "Frame from the NFL video on the most savage plays in NFL history",
    imageWidth: 1200,
    imageHeight: 675,
    preview: "/work/previews/nfl-savage-plays-preview.mp4",
    span: "md:col-span-3",
    badge: "NFL",
  },
  {
    slug: "yamal-walks",
    title: "WHY LAMINE YAMAL WALKS 45% OF THE MATCH",
    kind: "video",
    category: "Football Spree",
    description: "A Football Spree video on why Lamine Yamal walks 45% of the match",
    url: "https://drive.google.com/file/d/1uya5I47Mohn29_e0Pums98drjc-Nvsyn/view",
    accent: "#e879f9",
    accentSoft: "#701a75",
    mockupLabel: "YAMAL WALKS",
    image: "/work/yamal-walks.webp",
    imageAlt: "Frame from the Football Spree video on why Lamine Yamal walks so much of the match",
    imageWidth: 1200,
    imageHeight: 675,
    preview: "/work/previews/yamal-walks-preview.mp4",
    span: "md:col-span-3",
    badge: "FOOTBALL SPREE",
  },
  {
    slug: "illegale-gewohnheiten",
    title: "7 illegale Gewohnheiten, die du als Autofahrer in Deutschland der 1970er Jahre hattest",
    kind: "video",
    category: "German Food",
    description: "A German Food video on seven illegal habits of 1970s German drivers",
    url: "https://drive.google.com/file/d/1DbAHxX4YsFXowZoLOeohqcQPDRhQe3qc/view",
    accent: "#fbbf24",
    accentSoft: "#78350f",
    mockupLabel: "ILLEGAL HABITS 1970S",
    image: "/work/illegale-gewohnheiten.webp",
    imageAlt: "Frame from the German Food video on illegal driving habits in 1970s Germany",
    imageWidth: 1200,
    imageHeight: 675,
    preview: "/work/previews/illegale-gewohnheiten-preview.mp4",
    span: "md:col-span-3",
    badge: "GERMAN FOOD",
  },
];
