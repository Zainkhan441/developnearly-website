import type { Metadata } from "next";
import SiteApp from "../../components/SiteApp";
import { getCurrentYear } from "../year";

const description =
  "Video editing for faceless YouTube channels, creators and brands: long-form videos, Shorts and Reels, from $59 with 3 free revisions";

export const metadata: Metadata = {
  title: "Video Editing for YouTube Channels | DevelopNearly",
  description,
  alternates: { canonical: "/video" },
  openGraph: { title: "Video Editing | DevelopNearly", description, url: "/video", images: ["/og.png"] },
};

export default async function VideoPage() {
  const year = await getCurrentYear();
  return <SiteApp year={year} initialService="video" />;
}
