/**
 * Everything that differs between the two service pages lives here, so
 * prices, packages and FAQs can be edited in one place without touching
 * any component. Prices are in USD.
 */

export type ServiceKey = "video" | "web";

export interface Package {
  name: string;
  price: string;
  /** Small text after the price, e.g. "/ month" or "per video". */
  per?: string;
  tagline: string;
  features: string[];
  /** Numeric price in USD (for ordering). */
  value?: number;
  /** Highlighted card ("Most popular"). */
  featured?: boolean;
}

/** Answer to "what is it for?" in the welcome questions. */
export interface Purpose {
  id: string;
  label: string;
  hint: string;
  /** Hero copy shown after the visitor picks this purpose. */
  headline: [string, string];
  highlight: string;
  subhead: string;
  /** Extra FAQ shown first for this purpose. */
  faq?: { q: string; a: string };
  /** Portfolio slugs to show first for this purpose. */
  showFirst?: string[];
}

export interface Budget {
  label: string;
  /** Typical spend inside this range in USD; packages are built around it. */
  target: number;
}

export interface ServiceInfo {
  key: ServiceKey;
  /** Route of the service page. */
  href: string;
  /** Matching value in the contact form's service dropdown. */
  formValue: string;
  name: string;
  eyebrow: string;
  headline: [string, string];
  highlight: string;
  subhead: string;
  audience: string[];
  services: string[];
  startingFrom: string;
  packagesNote: string;
  purposeQuestion: string;
  purposes: Purpose[];
  budgetOptions: Budget[];
  steps: Array<{ title: string; text: string }>;
  faqs: Array<{ q: string; a: string }>;
}

export const REVISIONS = 3;

/** Free sample edit offered to video clients before they pay. */
export const FREE_SAMPLE = "Free 30 sec – 1 min sample edit";

/** Payment promise shown across the site. */
export const PAY_AFTER = "Pay after delivery";
const PAY_FAQ = {
  q: "When do I pay?",
  a: "Only after you have seen the finished work and you are happy with it. You check a preview first, pay within 3 days of approving it, and then get the final files",
};

/** What happens when approved work is not paid for, shown with the packages and in the terms. */
const NON_PAYMENT_COMMON = [
  "If a payment is more than 7 days late, a late fee of 10% per week may be added",
  "Only as a very last step, we may need to take legal action to recover the amount",
];
export const NON_PAYMENT_RULES: Record<ServiceKey, string[]> = {
  video: [
    "The video stays ours, including the copyright, until it is paid",
    "Please do not upload or publish it before paying, as that would count as copyright infringement",
    "If an unpaid video is published, we will have to ask YouTube, Instagram, TikTok or Facebook to remove it",
    ...NON_PAYMENT_COMMON,
  ],
  web: [
    "The website stays ours, including the copyright, until it is paid",
    "Please do not copy or publish it before paying, as that would count as copyright infringement",
    "If an unpaid site is published, we will have to ask the hosting company to take it offline",
    ...NON_PAYMENT_COMMON,
  ],
};

/** How "pay after the work" stays fair for both sides, shown with the packages. */
export const PAYMENT_RULES: Record<ServiceKey, string[]> = {
  video: [
    "We send you a watermarked preview of the finished video first",
    "Ask for changes, 3 revisions are free",
    "When you approve it, pay within 3 days",
    "As soon as payment arrives, you get the full-quality file without watermark",
    "Until it is paid, the video belongs to DevelopNearly and can not be uploaded or used",
    "Monthly plans are paid per delivered video, so you never pay for work you have not seen",
  ],
  web: [
    "We build your site on our own preview link so you can check every page",
    "Ask for changes, 3 revisions are free",
    "When you approve it, pay within 3 days",
    "As soon as payment arrives, we move the site to your domain and hand over every login",
    "Until it is paid, the website stays on our link and belongs to DevelopNearly",
    "Domain and hosting fees are paid directly by you, so you own them from day one",
  ],
};

export const SERVICES: Record<ServiceKey, ServiceInfo> = {
  video: {
    key: "video",
    href: "/video",
    formValue: "Video Editing",
    name: "Video Editing",
    eyebrow: "VIDEO EDITING",
    headline: ["EDITS THAT KEEP", "PEOPLE"],
    highlight: "WATCHING",
    subhead:
      "Long-form YouTube videos, Shorts and Reels for faceless channels, creators and brands, edited for retention, delivered on time",
    audience: ["Faceless YouTube channels", "Creators & podcasters", "Brands & local businesses"],
    services: [
      "Faceless YouTube videos",
      "Documentary-style edits",
      "YouTube Shorts & Reels",
      "Captions & text animation",
      "Stock footage & B-roll",
      "Sound design & music",
      "Motion graphics",
      "Podcast clips",
    ],
    startingFrom: "$59",
    packagesNote:
      "Longer videos, a different style or a bigger volume? Tell us what you need and we will send a clear, fixed quote",
    purposeQuestion: "Where will your videos go?",
    purposes: [
      {
        id: "youtube",
        label: "YouTube channel",
        hint: "Long videos, faceless or with a host",
        headline: ["EDITS THAT KEEP", "VIEWERS"],
        highlight: "WATCHING",
        subhead: "Long-form YouTube edits for faceless channels and creators, built for retention so people watch to the end",
        faq: { q: "Do you edit faceless documentary-style videos?", a: "Yes, that is what we do most. You send the script and voiceover, we send back a finished video with stock footage, B-roll, maps, text animation and sound design" },
      },
      {
        id: "shorts",
        label: "YouTube Shorts",
        hint: "Vertical videos under 60 seconds",
        headline: ["SHORTS THAT", "STOP THE"],
        highlight: "SCROLL",
        subhead: "Fast, punchy YouTube Shorts with strong hooks and animated captions, ready to post",
        faq: { q: "Can you turn my long videos into Shorts?", a: "Yes, send us your long video and we will pick the best moments and cut them into vertical Shorts with captions and hooks" },
      },
      {
        id: "reels",
        label: "Instagram Reels",
        hint: "Reels for your page or brand",
        headline: ["REELS THAT", "GET YOU"],
        highlight: "NOTICED",
        subhead: "Scroll-stopping Instagram Reels with hooks, captions and music, edited for your page or brand",
        faq: { q: "Do you add captions and music to Reels?", a: "Yes, every Reel gets animated captions, music and sound effects, cut in the vertical 9:16 format Instagram wants" },
      },
      {
        id: "tiktok",
        label: "TikTok",
        hint: "Trending-style short videos",
        headline: ["TIKTOKS THAT", "PEOPLE"],
        highlight: "SHARE",
        subhead: "TikTok videos cut in the style the platform rewards: quick hooks, captions and trending audio",
        faq: { q: "Do you follow TikTok trends?", a: "Yes, we edit in the fast style TikTok rewards, with quick hooks, captions and trending-style sounds, you choose the final audio when you post" },
      },
      {
        id: "facebook",
        label: "Facebook videos",
        hint: "Reels and page videos",
        headline: ["VIDEOS THAT", "GROW YOUR"],
        highlight: "PAGE",
        subhead: "Facebook Reels and page videos that grab attention and bring people back to your page",
      },
      {
        id: "podcast",
        label: "Podcast",
        hint: "Full episodes and short clips",
        headline: ["PODCASTS THAT", "LOOK AS GOOD AS THEY"],
        highlight: "SOUND",
        subhead: "Full podcast episodes edited for YouTube, plus short clips to promote every episode",
        faq: { q: "Can you turn one episode into short clips?", a: "Yes, from every episode we cut short vertical clips with captions, ready for Shorts, Reels and TikTok" },
      },
      {
        id: "business",
        label: "Business or ads",
        hint: "Promo, product or ad videos",
        headline: ["VIDEOS THAT", "SELL YOUR"],
        highlight: "BUSINESS",
        subhead: "Promo, product and ad videos for your business, edited to grab attention and bring customers",
        faq: { q: "Can you edit ads for Facebook and Instagram?", a: "Yes, we edit promo and ad videos in every size the platforms need, with captions, your logo and a clear call to action" },
        showFirst: ["winter-jackets","suspicious-supplements"],
      },
      {
        id: "other",
        label: "Something else",
        hint: "Tell us later in the form",
        headline: ["EDITS THAT KEEP", "PEOPLE"],
        highlight: "WATCHING",
        subhead: "Long videos, Shorts and Reels for creators and brands, edited for retention, delivered on time",
      },
    ],
    budgetOptions: [
      { label: "Under $100", target: 90 },
      { label: "$100 – $300", target: 250 },
      { label: "$300 – $600", target: 500 },
      { label: "$600 – $1,000", target: 850 },
      { label: "$1,000+", target: 1500 },
    ],
    steps: [
      { title: "Send your files", text: "Share your script, voiceover or raw footage through Google Drive" },
      { title: "We edit", text: "Your video is cut, captioned and sound-designed in your channel's style" },
      { title: "You review", text: `Watch the first cut and ask for changes, ${REVISIONS} revisions are free` },
      { title: "Ready to upload", text: "You get the final file in full quality, ready for YouTube" },
    ],
    faqs: [
      PAY_FAQ,
      {
        q: "Can I get a free sample first?",
        a: "Yes. Send us your script, voiceover or footage and we will edit a free 30 second to 1 minute sample, so you can judge our work before paying anything. The sample comes with a watermark",
      },
      {
        q: "Do you edit for faceless YouTube channels?",
        a: "Yes, most of our work is faceless: documentaries, list videos, explainers and sports videos. We build them from your script and voiceover with stock footage, B-roll and text animation",
      },
      {
        q: "What do I need to send you?",
        a: "For faceless videos, your script and voiceover, plus a few videos you like. For anything else, your raw footage. Everything can go through Google Drive",
      },
      {
        q: "How fast is delivery?",
        a: "Shorts and Reels in about 48 hours, long videos in 3–4 days. Monthly clients get priority",
      },
      {
        q: "How many revisions do I get?",
        a: `Every video includes ${REVISIONS} free revisions, so you are happy with the final cut before you upload`,
      },
      {
        q: "Can I try one video first?",
        a: "Yes. Start with the free sample or the Essential package, and move to a monthly plan once you like the results",
      },
      {
        q: "Do you work with clients outside Pakistan?",
        a: "Yes, we work with creators and brands worldwide, fully remote, in English",
      },
    ],
  },
  web: {
    key: "web",
    href: "/websites",
    formValue: "Website Development",
    name: "Website Development",
    eyebrow: "WEBSITE DEVELOPMENT",
    headline: ["WEBSITES THAT BRING", "YOU"],
    highlight: "CUSTOMERS",
    subhead:
      "Fast, modern websites, landing pages and online stores for businesses that want to be found online and turn visitors into customers",
    audience: ["Restaurants, gyms & clinics", "Shops & online stores", "Startups & service businesses"],
    services: [
      "Business websites",
      "Landing pages",
      "E-commerce stores",
      "Portfolio websites",
      "Mobile-friendly design",
      "WhatsApp & contact forms",
      "Google-friendly (SEO) setup",
      "Website redesigns",
    ],
    startingFrom: "$199",
    packagesNote:
      "Want us to keep your site updated? Add our Care Plan for $49 / month: updates, small changes and backups",
    purposeQuestion: "What kind of website do you need?",
    purposes: [
      {
        id: "business",
        label: "Business website",
        hint: "Restaurant, gym, clinic, shop or company",
        headline: ["A WEBSITE THAT BRINGS", "YOU"],
        highlight: "CUSTOMERS",
        subhead: "A fast, modern website that shows your services, prices and location, and turns visitors into customers",
        faq: { q: "Will my business show up on Google?", a: "We set up every site so Google can read it, with page titles, descriptions, Google Maps and fast loading, which helps you get found" },
        showFirst: ["alaska-restaurant","dynamic-gym","new-fine-steel"],
      },
      {
        id: "landing",
        label: "Landing page",
        hint: "One page for an offer, ad or launch",
        headline: ["ONE PAGE THAT", "TURNS VISITORS INTO"],
        highlight: "LEADS",
        subhead: "A focused landing page for your offer, ad or launch, built to get people to call, book or buy",
        faq: { q: "Can the page work with my ads?", a: "Yes, we build the page for your offer and can add tracking for Facebook and Google ads so you can see what brings results" },
        showFirst: ["dynamic-gym","alaska-restaurant"],
      },
      {
        id: "store",
        label: "Online store",
        hint: "Sell products online",
        headline: ["AN ONLINE STORE", "THAT"],
        highlight: "SELLS",
        subhead: "A beautiful online store with product pages, cart and checkout, easy for you to manage",
        faq: { q: "Can I add and edit products myself?", a: "Yes, you get an easy dashboard to add products, change prices and manage orders, and we show you how it works" },
        showFirst: ["zelnivo","aysh-collection"],
      },
      {
        id: "portfolio",
        label: "Portfolio / personal",
        hint: "Show your work or personal brand",
        headline: ["A PORTFOLIO THAT", "GETS YOU"],
        highlight: "HIRED",
        subhead: "A clean personal website that shows your work and makes it easy for people to contact you",
      },
      {
        id: "redesign",
        label: "Redesign my website",
        hint: "Make an old site modern",
        headline: ["YOUR WEBSITE,", "BUT"],
        highlight: "BETTER",
        subhead: "We redesign your old website into a fast, modern site that works great on phones",
        faq: { q: "Will I lose anything from my old website?", a: "No, we keep your content, pages and Google rankings in mind and move everything over to the new design" },
      },
      {
        id: "notsure",
        label: "Not sure yet",
        hint: "We will help you decide",
        headline: ["WEBSITES THAT BRING", "YOU"],
        highlight: "CUSTOMERS",
        subhead: "Fast, modern websites, landing pages and online stores for businesses that want to be found online",
      },
    ],
    budgetOptions: [
      { label: "Under $250", target: 220 },
      { label: "$250 – $500", target: 450 },
      { label: "$500 – $1,000", target: 850 },
      { label: "$1,000 – $2,000", target: 1700 },
      { label: "$2,000+", target: 3000 },
    ],
    steps: [
      { title: "Tell us about your business", text: "What you sell, who your customers are and what the site should do" },
      { title: "We design", text: "You see the design first, before a single page is built" },
      { title: "We build", text: `Your site is built, tested on phones and polished with ${REVISIONS} free revisions` },
      { title: "Go live", text: "We launch your site and show you how everything works" },
    ],
    faqs: [
      PAY_FAQ,
      {
        q: "How long does a website take?",
        a: "Once we have your content, a landing page takes about 5–7 days, a business website 1–2 weeks and an online store 2–3 weeks",
      },
      {
        q: "Will my website work on phones?",
        a: "Yes, every site is designed mobile-first and tested on phones, tablets and computers",
      },
      {
        q: "How many revisions do I get?",
        a: `Every package includes ${REVISIONS} free revisions, so the site looks exactly the way you want`,
      },
      {
        q: "What do I need to give you?",
        a: "Your logo, photos and a little text about your business. Don't have everything yet? We will help you with the rest",
      },
      {
        q: "Do you also handle domain and hosting?",
        a: "Yes. We help you pick a domain and set up hosting. You pay those fees directly, so everything stays in your name",
      },
      {
        q: "Do you work with clients outside Pakistan?",
        a: "Yes, we work with businesses worldwide, fully remote, in English",
      },
    ],
  },
};

export const SERVICE_LIST: ServiceInfo[] = [SERVICES.video, SERVICES.web];

const CUSTOM_ID = "custom";

/** The visitor's answers to the welcome questions. */
export interface Choice {
  service: ServiceKey;
  /** Purpose id, or "custom" when the visitor typed their own. */
  purpose: string;
  /** What the visitor typed when none of the options fit. */
  purposeNote?: string;
  /** Budget as the visitor gave it, only used to prefill the contact form. */
  budgetLabel: string;
  /** Budget in USD that packages are built around. */
  budgetValue: number;
  /** Level of finish the visitor wants. Older saved answers have none. */
  quality?: QualityKey;
  /** Typical length of a long video (video only, long-form purposes). */
  length?: LengthKey;
}

export type QualityKey = "standard" | "pro" | "premium";
export type LengthKey = "short" | "medium" | "long" | "xlong";

export interface QualityOption {
  id: QualityKey;
  label: string;
  hint: string;
}

/** The "how polished should it be" question, worded per service. */
export const QUALITY_OPTIONS: Record<ServiceKey, QualityOption[]> = {
  video: [
    { id: "standard", label: "Clean & Simple", hint: "Smooth cuts, captions and music, great for regular uploads" },
    { id: "pro", label: "Professional", hint: "B-roll, text animation and sound design that keeps people watching" },
    { id: "premium", label: "Premium Cinematic", hint: "Color grading, custom motion graphics and story-driven editing" },
  ],
  web: [
    { id: "standard", label: "Essential", hint: "A clean, modern website that does the job well" },
    { id: "pro", label: "Professional", hint: "A custom design built around your brand" },
    { id: "premium", label: "Premium", hint: "Fully custom, with animations and advanced features" },
  ],
};

export const LENGTH_OPTIONS: Array<{ id: LengthKey; label: string }> = [
  { id: "short", label: "Under 10 minutes" },
  { id: "medium", label: "10 – 20 minutes" },
  { id: "long", label: "20 – 40 minutes" },
  { id: "xlong", label: "40 minutes or more" },
];

/** Purposes where most videos are long, so we ask how long. */
export const LONG_FORM_PURPOSES = new Set(["youtube", "podcast", "other", CUSTOM_ID]);

export const CUSTOM = CUSTOM_ID;

export function purposeOf(choice: Choice): Purpose {
  const info = SERVICES[choice.service];
  const found = info.purposes.find((p) => p.id === choice.purpose);
  if (found) return found;
  const fallback = info.purposes[info.purposes.length - 1];
  return choice.purposeNote ? { ...fallback, label: choice.purposeNote } : fallback;
}

/* ---------- Packages built around the visitor's budget ---------- */

/** Round to a friendly price that ends in 9 ($249, $499, $1,299). */
function nicePrice(n: number): number {
  if (n < 100) return Math.max(29, Math.round(n / 10) * 10 - 1);
  if (n < 1000) return Math.round(n / 50) * 50 - 1;
  return Math.round(n / 100) * 100 - 1;
}

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

// Per-video rates used only to work out how many videos a budget covers.
// The package price itself always follows the budget.
const BASE_LONG_UNIT = 30; // one long-form edit, 10–20 min
const BASE_SHORT_UNIT = 8; // one Short / Reel / TikTok
const SHORT_FIRST = new Set(["shorts", "reels", "tiktok", "facebook"]);
const SHORT_LABEL: Record<string, string> = {
  shorts: "YouTube Shorts",
  reels: "Instagram Reels",
  tiktok: "TikToks",
  facebook: "Facebook Reels",
};

/** Snap a count to a number a person would actually offer (no "7 videos" or "13 Shorts"). */
const ROUND_COUNTS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60];
function roundCount(n: number): number {
  if (n <= 0) return 0;
  return ROUND_COUNTS.reduce((best, c) => (Math.abs(c - n) < Math.abs(best - n) ? c : best), ROUND_COUNTS[0]);
}

const QUALITY_COST: Record<QualityKey, number> = { standard: 0.7, pro: 1, premium: 1.4 };
const LENGTH_COST: Record<LengthKey, number> = { short: 0.8, medium: 1, long: 1.3, xlong: 1.7 };
const LENGTH_TEXT: Record<LengthKey, string> = {
  short: "up to 10 min",
  medium: "up to 20 min",
  long: "up to 40 min",
  xlong: "40 min+",
};

interface Opts {
  quality: QualityKey;
  length: LengthKey;
}

function videoPackage(target: number, purpose: string, name: string, tagline: string, monthly: boolean, opts: Opts): Package {
  const q = QUALITY_COST[opts.quality];
  // Podcasts are mostly talking heads, so extra length costs less there.
  const lenCost = purpose === "business" ? 1 : purpose === "podcast" ? 1 + (LENGTH_COST[opts.length] - 1) * 0.5 : LENGTH_COST[opts.length];
  const LONG_UNIT = BASE_LONG_UNIT * q * lenCost;
  const SHORT_UNIT = BASE_SHORT_UNIT * q;
  const shortsOnly = SHORT_FIRST.has(purpose);
  const shortWord = SHORT_LABEL[purpose] ?? "Shorts or Reels";
  let longs = 0;
  let shorts = 0;
  if (shortsOnly) {
    shorts = Math.max(2, Math.round(target / SHORT_UNIT));
  } else if (purpose === "business") {
    shorts = Math.max(2, Math.round((target * 0.5) / SHORT_UNIT));
    longs = Math.max(0, Math.floor((target - shorts * SHORT_UNIT) / LONG_UNIT));
  } else {
    longs = Math.max(1, Math.round((target * 0.7) / LONG_UNIT));
    shorts = Math.max(0, Math.round((target - longs * LONG_UNIT) / SHORT_UNIT));
    // Keep a sensible mix: a few clips per long video, not a pile of Shorts.
    shorts = Math.min(shorts, longs * 4);
  }
  longs = roundCount(longs);
  shorts = shortsOnly ? Math.max(2, roundCount(shorts)) : shorts > 0 ? Math.max(2, roundCount(shorts)) : 0;
  const price = nicePrice(target);
  const raw = price;
  const per = monthly ? "/ month" : undefined;
  const features: string[] = [];
  const [longOne, longMany] =
    purpose === "podcast"
      ? ["full podcast episode", "full podcast episodes"]
      : purpose === "business"
        ? ["promo or ad video (up to 3 min)", "promo or ad videos (up to 3 min)"]
        : [`long-form video (${LENGTH_TEXT[opts.length]})`, `long-form videos (${LENGTH_TEXT[opts.length]})`];
  if (longs) features.push(`${plural(longs, longOne, longMany)}${monthly ? " a month" : ""}`);
  if (shorts) features.push(`${shorts === 1 ? "1 Short or Reel" : `${shorts} ${shortWord}`}${monthly ? " a month" : ""}`);
  if (opts.quality === "standard") features.push(shortsOnly ? "Clean cuts & animated captions" : "Clean cuts, captions & text");
  else features.push(shortsOnly ? "Strong hooks & animated captions" : "Stock footage, B-roll & text animation");
  features.push(opts.quality === "standard" ? "Background music" : "Music & sound design");
  if (opts.quality === "premium") features.push("Color grading & cinematic look");
  if (!shortsOnly && longs && (raw >= 400 || (opts.quality === "premium" && raw >= 150))) features.push("Thumbnail for every long video");
  if (raw >= 700 || (opts.quality === "premium" && raw >= 250)) features.push("Motion graphics & custom animations");
  if (raw >= 250) features.push("One dedicated editor");
  features.push(raw >= 600 ? "Priority, same-week delivery" : shortsOnly || longs === 0 ? "Delivered in 2–3 days" : "Delivered in 3–4 days");
  features.push(`${REVISIONS} free revisions on every video`);
  return { name, price: usd(price), value: price, per, tagline, features };
}

const WEB_MIN: Record<string, number> = { store: 199, business: 199, redesign: 199 };

const WEB_QUALITY_SCOPE: Record<QualityKey, number> = { standard: 1.3, pro: 1, premium: 0.7 };
const WEB_DESIGN: Record<QualityKey, string> = {
  standard: "Clean, modern design",
  pro: "Custom design built around your brand",
  premium: "Premium custom design with smooth animations",
};

function webPackage(target: number, purpose: string, name: string, tagline: string, _monthly: boolean, opts: Opts): Package {
  const actual = nicePrice(Math.max(target, WEB_MIN[purpose] ?? 149));
  // Scope (pages, products, extras) depends on the price and on how polished
  // the design is: a premium finish costs more per page.
  const price = actual * WEB_QUALITY_SCOPE[opts.quality];
  const features: string[] = [];
  const store = purpose === "store";
  const minPages = (purpose === "business" || purpose === "redesign") && actual >= 250 ? 3 : 1;
  const rawPages = price < 250 ? 1 : price < 400 ? 5 : price < 700 ? 8 : price < 1000 ? 10 : price < 1500 ? 15 : 20;
  const pages = purpose === "landing" ? 1 : Math.max(minPages, rawPages);
  if (store) {
    const products = price < 230 ? 10 : price < 300 ? 20 : price < 550 ? 30 : price < 800 ? 50 : price < 1500 ? 100 : price < 2500 ? 300 : 1000;
    features.push(`Online store with up to ${products} products`);
    features.push("Cart, checkout & payment setup");
  } else if (pages === 1) {
    features.push(purpose === "landing" ? "1 page, built to turn visitors into leads" : "1 page with everything about your business");
  } else {
    features.push(price >= 2500 ? "As many pages as you need" : `Up to ${pages} pages`);
  }
  features.push(WEB_DESIGN[opts.quality]);
  features.push("Mobile-friendly design");
  features.push("Contact form & WhatsApp button");
  if (price >= 250) features.push("Google Maps, gallery & SEO setup");
  if (price >= 700) features.push(store ? "Discount codes & order emails" : "Blog or booking system");
  if (price >= 1200) features.push("Copywriting for every page");
  if (price >= 2500) features.push("Custom features (member login, dashboards)");
  if (price >= 4000) features.push("Advanced SEO & speed optimization");
  if (price >= 4000) features.push("Dedicated project manager & strategy calls");
  features.push(price >= 1200 ? `${price >= 2500 ? 3 : 1} month${price >= 2500 ? "s" : ""} of free updates after launch` : "Speed & security setup");
  const days = actual < 300 ? "5–7 days" : actual < 800 ? "1–2 weeks" : actual < 1500 ? "2–3 weeks" : "3–5 weeks";
  features.push(`Ready in ${days}`);
  features.push(`${REVISIONS} free revisions`);
  return { name, price: usd(actual), value: actual, per: store || actual >= 1200 ? "starting" : undefined, tagline, features };
}

/**
 * Three packages built around the visitor's budget: a smaller option, the
 * recommended one right at their budget, and a bigger option. Prices and
 * what each package includes grow with the budget.
 */
export function buildPackages(choice: Choice): { packages: Package[]; recommended: Package } {
  const b = Math.max(30, choice.budgetValue);
  const purpose = choice.purpose === CUSTOM ? (choice.service === "video" ? "other" : "notsure") : choice.purpose;
  const opts: Opts = { quality: choice.quality ?? "pro", length: choice.length ?? "medium" };
  const build = choice.service === "video" ? videoPackage : webPackage;
  const make = (t: number, p: string, n: string, tag: string, m: boolean) => build(t, p, n, tag, m, opts);
  // One billing style per row: either all three are monthly plans or all one-time.
  const monthly = b >= 250;
  const tiers: Array<[number, string, string]> = [
    [b * 0.55, "Essential", "A great place to start"],
    [b, "Growth", "The best value for most clients"],
    [b * 1.7, "Premium", "Everything, done for you"],
  ];
  // Each tier must cost more than the one before (small budgets hit the
  // minimum price), so nudge a tier's target up until it does.
  const packages: Package[] = [];
  for (const [t, n, tag] of tiers) {
    let target = t;
    let pkg = make(target, purpose, n, tag, monthly);
    const prev = packages[packages.length - 1];
    for (let i = 0; prev && (pkg.value ?? 0) <= (prev.value ?? 0) && i < 30; i++) {
      target *= 1.15;
      pkg = make(target, purpose, n, tag, monthly);
    }
    packages.push(pkg);
  }
  const recommended = packages[1];
  recommended.featured = true;
  return { packages, recommended };
}

/* ---------- "Build your own package" estimates ---------- */

export const SHORT_FIRST_PURPOSES = SHORT_FIRST;

export interface VideoCustom {
  longs: number;
  shorts: number;
  quality: QualityKey;
  length: LengthKey;
}

/** Estimated price for a video package the visitor puts together. */
export function videoQuote(purpose: string, c: VideoCustom): number {
  const q = QUALITY_COST[c.quality];
  const lenCost =
    purpose === "business" ? 1 : purpose === "podcast" ? 1 + (LENGTH_COST[c.length] - 1) * 0.5 : LENGTH_COST[c.length];
  const raw = c.longs * BASE_LONG_UNIT * q * lenCost + c.shorts * BASE_SHORT_UNIT * q;
  return raw > 0 ? nicePrice(Math.max(29, raw)) : 0;
}

export const WEB_EXTRAS: Array<{ id: string; label: string; price: number; store?: boolean; site?: boolean }> = [
  { id: "booking", label: "Blog or booking system", price: 120, site: true },
  { id: "orders", label: "Discount codes & order emails", price: 90, store: true },
  { id: "seo", label: "Advanced SEO setup", price: 100 },
  { id: "copy", label: "We write the text for you", price: 80 },
  { id: "updates", label: "3 months of free updates", price: 90 },
];

export const STORE_PRODUCTS = [10, 20, 30, 50, 100, 300, 1000];
const STORE_PRODUCT_COST: Record<number, number> = { 10: 0, 20: 50, 30: 100, 50: 200, 100: 400, 300: 900, 1000: 2000 };
const WEB_QUALITY_COST: Record<QualityKey, number> = { standard: 0.8, pro: 1, premium: 1.4 };

export interface WebCustom {
  pages: number;
  products: number;
  quality: QualityKey;
  extras: string[];
}

/** Estimated price for a website the visitor puts together. */
export function webQuote(purpose: string, c: WebCustom): number {
  const q = WEB_QUALITY_COST[c.quality];
  const base =
    purpose === "store"
      ? (249 + (STORE_PRODUCT_COST[c.products] ?? 0) + Math.max(0, c.pages - 5) * 40) * q
      : (149 + Math.max(0, c.pages - 1) * 45) * q;
  const extras = WEB_EXTRAS.filter((e) => c.extras.includes(e.id)).reduce(
    (sum, e) => sum + (e.id === "copy" ? e.price + c.pages * 10 : e.price),
    0,
  );
  return nicePrice(base + extras);
}
