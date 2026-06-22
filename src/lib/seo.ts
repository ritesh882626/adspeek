import type { Metadata } from "next";

const siteUrl = "https://adspeek.in";

export function createMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = new URL(path, siteUrl).toString();

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "AdsPeek",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
