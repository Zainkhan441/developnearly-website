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
  a: "Only after the work is delivered and you are happy with it, no upfront payment",
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
        faq: { q: "Do you edit faceless documentary-style videos?", a: "Yes, that is our speciality: script and voiceover in, finished video out, with stock footage, B-roll, maps, text animation and sound design" },
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
        a: "Yes, send us your script, voiceover or footage and we will edit a free 30 second to 1 minute sample, so you can see our quality before you pay anything",
      },
      {
        q: "Do you edit for faceless YouTube channels?",
        a: "Yes, most of our work is faceless content: documentaries, list videos, explainers and sports videos, built from a script and voiceover with stock footage, B-roll and text animation",
      },
      {
        q: "What do I need to send you?",
        a: "For faceless videos, the script and voiceover, plus any example videos you like, for other videos, your raw footage, everything can be shared through Google Drive",
      },
      {
        q: "How fast is delivery?",
        a: "Shorts and Reels in about 48 hours, long-form videos in 3–4 days, monthly clients get priority",
      },
      {
        q: "How many revisions do I get?",
        a: `Every video includes ${REVISIONS} free revisions, so you are happy with the final cut before you upload`,
      },
      {
        q: "Can I try one video first?",
        a: "Yes, start with the free sample edit or the Essential package, if you like the result you can move to a monthly plan",
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
        a: "A landing page takes about 5–7 days, a business website 1–2 weeks and an online store 2–3 weeks, once we have your content",
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
        a: "Your logo, photos and some text about your business, if you do not have everything yet, we will help you",
      },
      {
        q: "Do you also handle domain and hosting?",
        a: "Yes, we help you choose a domain and set up hosting, domain and hosting fees are paid directly by you, so you own everything",
      },
      {
        q: "Do you work with clients outside Pakistan?",
        a: "Yes, we work with businesses worldwide, fully remote, in English",
      },
    ],
  },
};

export const SERVICE_LIST: ServiceInfo[] = [SERVICES.video, SERVICES.web];

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
}

export const CUSTOM = "custom";

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

const LONG_UNIT = 89; // one long-form edit, up to 15 min
const SHORT_UNIT = 25; // one Short / Reel / TikTok
const SHORT_FIRST = new Set(["shorts", "reels", "tiktok", "facebook"]);
const SHORT_LABEL: Record<string, string> = {
  shorts: "YouTube Shorts",
  reels: "Instagram Reels",
  tiktok: "TikToks",
  facebook: "Facebook Reels",
};

function videoPackage(target: number, purpose: string, name: string, tagline: string): Package {
  const monthly = target >= 250;
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
    longs = Math.max(1, Math.floor((target * 0.8) / LONG_UNIT));
    shorts = Math.max(0, Math.round((target - longs * LONG_UNIT) / SHORT_UNIT));
  }
  const raw = longs * LONG_UNIT + shorts * SHORT_UNIT;
  const price = nicePrice(raw);
  const per = monthly ? "/ month" : undefined;
  const features: string[] = [];
  const [longOne, longMany] =
    purpose === "podcast"
      ? ["full podcast episode", "full podcast episodes"]
      : purpose === "business"
        ? ["promo or ad video (up to 3 min)", "promo or ad videos (up to 3 min)"]
        : ["long-form video (up to 15 min)", "long-form videos (up to 15 min)"];
  if (longs) features.push(`${plural(longs, longOne, longMany)}${monthly ? " a month" : ""}`);
  if (shorts) features.push(`${shorts === 1 ? "1 Short or Reel" : `${shorts} ${shortWord}`}${monthly ? " a month" : ""}`);
  features.push(shortsOnly ? "Strong hooks & animated captions" : "Stock footage, B-roll & text animation");
  features.push("Music & sound design");
  if (raw >= 400) features.push("Thumbnail for every long video");
  if (raw >= 700) features.push("Motion graphics & custom animations");
  if (raw >= 250) features.push("One dedicated editor");
  features.push(raw >= 600 ? "Priority, same-week delivery" : shortsOnly || longs === 0 ? "Delivered in 2–4 days" : "Delivered in 3–5 days");
  features.push(`${REVISIONS} free revisions on every video`);
  return { name, price: usd(price), value: price, per, tagline, features };
}

const WEB_MIN: Record<string, number> = { store: 199, business: 199, redesign: 199 };

function webPackage(target: number, purpose: string, name: string, tagline: string): Package {
  const price = nicePrice(Math.max(target, WEB_MIN[purpose] ?? 149));
  const features: string[] = [];
  const store = purpose === "store";
  const minPages = (purpose === "business" || purpose === "redesign") && price >= 250 ? 3 : 1;
  const pages = purpose === "landing" ? 1 : Math.max(minPages, price < 300 ? 1 : Math.round(price / 110));
  if (store) {
    const products = price < 230 ? 3 : price < 300 ? 5 : price < 550 ? 10 : price < 620 ? 20 : price < 800 ? 30 : price < 1500 ? 50 : price < 2500 ? 150 : 500;
    features.push(`Online store with up to ${products} products`);
    features.push("Cart, checkout & payment setup");
  } else if (pages === 1) {
    features.push("1 page, built to turn visitors into leads");
  } else {
    features.push(price >= 2500 ? "As many pages as you need" : `Up to ${pages} pages`);
  }
  features.push("Mobile-friendly design");
  features.push("Contact form & WhatsApp button");
  if (price >= 300) features.push("Google Maps, gallery & SEO setup");
  if (price >= 700) features.push(store ? "Discount codes & order emails" : "Blog or booking system");
  if (price >= 1200) features.push("Fully custom design & animations");
  if (price >= 1200) features.push("Copywriting for every page");
  if (price >= 2500) features.push("Custom features (member login, dashboards)");
  if (price >= 4000) features.push("Advanced SEO & speed optimization");
  if (price >= 4000) features.push("Dedicated project manager & strategy calls");
  features.push(price >= 1200 ? `${price >= 2500 ? 3 : 1} month${price >= 2500 ? "s" : ""} of free updates after launch` : "Speed & security setup");
  const days = price < 300 ? "5–7 days" : price < 800 ? "1–2 weeks" : price < 1500 ? "2–3 weeks" : "3–5 weeks";
  features.push(`Ready in ${days}`);
  features.push(`${REVISIONS} free revisions`);
  return { name, price: usd(price), value: price, per: store || price >= 1200 ? "starting" : undefined, tagline, features };
}

/**
 * Three packages built around the visitor's budget: a smaller option, the
 * recommended one right at their budget, and a bigger option. Prices and
 * what each package includes grow with the budget.
 */
export function buildPackages(choice: Choice): { packages: Package[]; recommended: Package } {
  const b = Math.max(30, choice.budgetValue);
  const purpose = choice.purpose === CUSTOM ? (choice.service === "video" ? "other" : "notsure") : choice.purpose;
  const make = choice.service === "video" ? videoPackage : webPackage;
  const tiers: Array<[number, string, string]> = [
    [b * 0.55, "Essential", "A great place to start"],
    [b, "Growth", "Our most popular choice"],
    [b * 1.7, "Premium", "Everything, done for you"],
  ];
  // Each tier must cost more than the one before (small budgets hit the
  // minimum price), so nudge a tier's target up until it does.
  const packages: Package[] = [];
  for (const [t, n, tag] of tiers) {
    let target = t;
    let pkg = make(target, purpose, n, tag);
    const prev = packages[packages.length - 1];
    for (let i = 0; prev && (pkg.value ?? 0) <= (prev.value ?? 0) && i < 30; i++) {
      target *= 1.15;
      pkg = make(target, purpose, n, tag);
    }
    packages.push(pkg);
  }
  const recommended = packages[1];
  recommended.featured = true;
  return { packages, recommended };
}
