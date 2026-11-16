import SiteApp from "../components/SiteApp";
import { getCurrentYear } from "./year";

export default async function Home() {
  const year = await getCurrentYear();
  return <SiteApp year={year} />;
}
