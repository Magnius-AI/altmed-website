import type { Metadata } from "next";
import { clinic } from "./site-content";
import { getAbsoluteUrl } from "./site-url";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
};

export function absoluteUrl(path: string) {
  return getAbsoluteUrl(path, clinic.canonicalUrl);
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = "/assets/img/logo.png",
  keywords
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title: {
      absolute: title
    },
    description,
    keywords,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: clinic.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: image,
          alt: `${clinic.name} in Manassas VA`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}
