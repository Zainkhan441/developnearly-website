"use client";

import { BadgePercent, Minus, Plus, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { Choice, LengthKey, QualityKey } from "../data/services";
import {
  LENGTH_OPTIONS,
  QUALITY_OPTIONS,
  STORE_PRODUCTS,
  SHORT_FIRST_PURPOSES,
  WEB_EXTRAS,
  purposeOf,
  videoQuote,
  webQuote,
} from "../data/services";
import { waLink } from "../data/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

function Stepper({
  label,
  value,
  onChange,
  min = 0,
  max = 60,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[15px] text-white/90">{label}</span>
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
        <button
          type="button"
          aria-label={`Fewer ${label.toLowerCase()}`}
          onClick={() => onChange(Math.max(min, value - step))}
          disabled={value <= min}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 disabled:opacity-30"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-display text-base font-bold text-white" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          aria-label={`More ${label.toLowerCase()}`}
          onClick={() => onChange(Math.min(max, value + step))}
          disabled={value >= max}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 disabled:opacity-30"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Pills<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ id: T; label: string }>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm text-mist">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={value === o.id}
            onClick={() => onChange(o.id)}
            className={`min-h-9 rounded-full border px-3 text-[13px] font-medium transition-colors ${
              value === o.id
                ? "border-bright bg-[#2563eb]/25 text-white"
                : "border-white/10 bg-white/5 text-white/75 hover:border-white/30 hover:text-white"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/** Fourth card next to the packages: the visitor builds their own deal. */
export default function CustomBuilder({ choice }: { choice: Choice }) {
  const purpose = purposeOf(choice).id;
  const purposeLabel = purposeOf(choice).label;
  const video = choice.service === "video";
  const shortsOnly = SHORT_FIRST_PURPOSES.has(purpose);

  const [quality, setQuality] = useState<QualityKey>(choice.quality ?? "pro");
  const [length, setLength] = useState<LengthKey>(choice.length ?? "medium");
  const [longs, setLongs] = useState(shortsOnly ? 0 : 2);
  const [shorts, setShorts] = useState(shortsOnly ? 10 : 4);
  const [monthly, setMonthly] = useState(true);
  const [pages, setPages] = useState(purpose === "landing" ? 1 : 5);
  const [products, setProducts] = useState(30);
  const [extras, setExtras] = useState<string[]>([]);
  const [offer, setOffer] = useState("");

  const store = purpose === "store";
  const price = video
    ? videoQuote(purpose, { longs, shorts, quality, length })
    : webQuote(purpose, { pages, products, quality, extras });

  const qualityLabel = QUALITY_OPTIONS[choice.service].find((q) => q.id === quality)?.label ?? "";
  const longWord = purpose === "podcast" ? "Podcast episodes" : purpose === "business" ? "Promo or ad videos" : "Long videos";
  const shortWord = shortsOnly ? "Short videos" : "Shorts or Reels";

  const lines: string[] = [];
  if (video) {
    if (longs) lines.push(`${longs} ${longWord.toLowerCase()} (${LENGTH_OPTIONS.find((l) => l.id === length)?.label.toLowerCase()})`);
    if (shorts) lines.push(`${shorts} ${shortsOnly ? "short videos" : shortWord}`);
    lines.push(`${qualityLabel} editing`);
    lines.push(monthly ? "Every month" : "One-time");
  } else {
    lines.push(store ? `Online store with up to ${products} products` : `${pages} page${pages === 1 ? "" : "s"}`);
    if (store && pages > 5) lines.push(`${pages} extra pages`);
    lines.push(`${qualityLabel} design`);
    for (const e of WEB_EXTRAS) if (extras.includes(e.id)) lines.push(e.label);
  }
  const empty = video && longs === 0 && shorts === 0;
  const per = video && monthly ? " / month" : "";
  const priceText = `${usd(price)}${per}`;
  const offerNum = Math.round(Number(offer));
  const offerText = offer.trim() && offerNum > 0 ? `${usd(offerNum)}${per}` : "";
  const message = `Hi DevelopNearly! I built my own ${video ? "video editing" : "website"} package for ${purposeLabel}:\n${lines
    .map((l) => `• ${l}`)
    .join("\n")}\nEstimated price: ${priceText}${offerText ? `\nMy offer: ${offerText}` : ""}. Can we talk about it?`;
  const discount = `Hi DevelopNearly! I built my own package for ${purposeLabel} (${lines.join(", ")}), estimated at ${priceText}.${offerText ? ` My offer is ${offerText}.` : ""} Is there any discount you can offer?`;

  const toggleExtra = (id: string) =>
    setExtras((xs) => (xs.includes(id) ? xs.filter((x) => x !== id) : [...xs, id]));

  return (
    <div className="relative flex h-full flex-col rounded-3xl border border-dashed border-bright/40 bg-gradient-to-b from-white/[0.06] to-ink p-7 sm:p-8">
      <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-bright/40 bg-ink px-3.5 py-1.5 text-[11px] font-semibold tracking-wider text-bright">
        <SlidersHorizontal className="h-3.5 w-3.5" />
        BUILD YOUR OWN
      </span>
      <h3 className="font-display text-2xl font-bold text-white">Custom</h3>
      <p className="mt-1.5 text-sm text-mist">Put together exactly what you need</p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <p className="text-[11px] font-semibold tracking-wider text-mist">ESTIMATED</p>
          <p className="mt-1 font-display text-3xl font-bold tracking-tight text-white">{empty ? "$0" : usd(price)}</p>
          {per ? <p className="text-xs text-mist">per month</p> : null}
        </div>
        <label className="block rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-3 focus-within:border-emerald-300">
          <span className="text-[11px] font-semibold tracking-wider text-emerald-300">YOUR PRICE</span>
          <span className="mt-1 flex items-baseline gap-1">
            <span className="font-display text-3xl font-bold text-white/70">$</span>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder={empty ? "0" : String(price)}
              aria-label="Your price in US dollars"
              className="w-full min-w-0 bg-transparent outline-none focus-visible:!outline-none font-display text-3xl font-bold tracking-tight text-white placeholder:text-white/25 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </span>
          {per ? <span className="block text-xs text-emerald-300/70">per month</span> : null}
        </label>
      </div>
      <p className="mt-2 text-xs text-mist">Write the price that works for you, we will reply on WhatsApp</p>

      <div className="mt-6 flex-1 space-y-5">
        {video ? (
          <>
            {!shortsOnly && <Stepper label={longWord} value={longs} onChange={setLongs} max={30} />}
            <Stepper label={shortWord} value={shorts} onChange={setShorts} max={60} />
            {!shortsOnly && purpose !== "business" && longs > 0 && (
              <Pills
                label="Video length"
                options={LENGTH_OPTIONS.map((l) => ({ id: l.id, label: l.label.replace(" minutes", " min") }))}
                value={length}
                onChange={setLength}
              />
            )}
            <Pills
              label="Editing style"
              options={QUALITY_OPTIONS.video.map((q) => ({ id: q.id, label: q.label }))}
              value={quality}
              onChange={setQuality}
            />
            <Pills
              label="Plan"
              options={[
                { id: "monthly", label: "Every month" },
                { id: "once", label: "One-time" },
              ]}
              value={monthly ? "monthly" : "once"}
              onChange={(v) => setMonthly(v === "monthly")}
            />
          </>
        ) : (
          <>
            {store ? (
              <Pills
                label="Number of products"
                options={STORE_PRODUCTS.map((n) => ({ id: String(n), label: `Up to ${n}` }))}
                value={String(products)}
                onChange={(v) => setProducts(Number(v))}
              />
            ) : null}
            {purpose !== "landing" && (
              <Stepper label="Pages" value={pages} onChange={setPages} min={1} max={30} />
            )}
            <Pills
              label="Design level"
              options={QUALITY_OPTIONS.web.map((q) => ({ id: q.id, label: q.label }))}
              value={quality}
              onChange={setQuality}
            />
            <fieldset>
              <legend className="mb-2 text-sm text-mist">Add extras</legend>
              <div className="space-y-2">
                {WEB_EXTRAS.filter((e) => (store ? !e.site : !e.store)).map((e) => (
                  <label key={e.id} className="flex cursor-pointer items-center gap-3 text-[15px] text-white/90">
                    <input
                      type="checkbox"
                      checked={extras.includes(e.id)}
                      onChange={() => toggleExtra(e.id)}
                      className="h-4 w-4 accent-[#2563eb]"
                    />
                    {e.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </>
        )}
      </div>

      <a
        href={empty ? undefined : waLink(message)}
        aria-disabled={empty}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
          empty
            ? "pointer-events-none border border-white/10 bg-white/5 text-white/40"
            : "bg-emerald-500 text-ink hover:bg-emerald-400"
        }`}
      >
        <WhatsAppIcon className="h-5 w-5" />
        Send my offer
      </a>
      <a
        href={empty ? undefined : waLink(discount)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 text-[15px] font-semibold text-emerald-300 transition-colors hover:border-emerald-300 hover:bg-emerald-500/20 hover:text-emerald-200"
      >
        <BadgePercent className="h-5 w-5 shrink-0" />
                  Ask for a discount
      </a>
    </div>
  );
}
