import { getCurrentYear } from "./year";
import SiteApp from "../components/SiteApp";

/** Unknown links also start with the welcome questions, then show the site. */
export default async function NotFound() {
  const year = await getCurrentYear();
  return <SiteApp year={year} />;
}
