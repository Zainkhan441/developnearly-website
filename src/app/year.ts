import { cacheLife } from "next/cache";

/**
 * Current year for the footer. Computed inside "use cache" because Next.js
 * forbids reading the current time during prerendering; cached for a day so
 * the year rolls over promptly after New Year.
 */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
