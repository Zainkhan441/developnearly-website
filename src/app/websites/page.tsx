import type { Metadata } from "next";
import ServicePage from "../../components/ServicePage";
import { getCurrentYear } from "../year";

const description =
  "Websites, landing pages and online stores for businesses, from $199 with 3 free revisions, mobile-friendly and built to bring you customers";

export const metadata: Metadata = {
  title: "Website Development for Businesses | DevelopNearly",
  description,
  alternates: { canonical: "/websites" },
  openGraph: { title: "Website Development | DevelopNearly", description, url: "/websites", images: ["/og.png"] },
};

export default async function WebsitesPage() {
  const year = await getCurrentYear();
  return <ServicePage service="web" year={year} />;
}
