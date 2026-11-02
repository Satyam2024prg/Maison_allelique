import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocale } from "@/i18n/LocaleContext";

const SITE_URL = "https://maisonallelique.ai";
const DEFAULT_IMAGE = `${SITE_URL}/og-default.jpg`;

const OG_LOCALE = { en: "en_GB", fr: "fr_FR", es: "es_ES" };

// Human labels for path segments — used to build the auto BreadcrumbList.
const CRUMB_LABELS = {
  "": "Maison Allélique",
  maison: "About Us",
  values: "Values",
  worlds: "Maison",
  host: "The Host",
  master: "The Master",
  observer: "The Observer",
  editions: "Editions",
  parfum: "Parfum · The Grail Perfume",
  skincare: "Skincare",
  ecosystem: "Objects",
  sets: "Sets · Layering",
  layering: "AI Layering · Allelium",
  access: "Waiting list",
  preorder: "Waiting list",
  enter: "Welcome",
  contact: "Contact",
  allelium: "Allelium — Personal Formulation System",
  "personalized-skincare": "Personalized Skincare Formulas",
  "personalized-fragrance": "Personalized Fragrance Composition",
  "paris-apothecary": "A Private Apothecary at Home",
  "how-it-works": "How Maison Allélique Works",
  journal: "Journal",
  "art-pieces": "The Art Pieces · Paris · Shanghai",
};

const buildBreadcrumb = (pathname) => {
  const parts = pathname.split("/").filter(Boolean);
  const items = [
    { "@type": "ListItem", position: 1, name: CRUMB_LABELS[""], item: `${SITE_URL}/` },
  ];
  let path = "";
  parts.forEach((seg, i) => {
    path += `/${seg}`;
    items.push({
      "@type": "ListItem",
      position: i + 2,
      name: CRUMB_LABELS[seg] || seg,
      item: `${SITE_URL}${path}`,
    });
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
};

const upsertMeta = (attr, key, value) => {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
};

const upsertLink = (rel, href) => {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

// Add / replace a route-specific JSON-LD block. We tag it with data-route-ld
// so we can atomically replace it on each navigation without accumulating.
const upsertJsonLd = (data) => {
  if (typeof document === "undefined") return;
  document
    .head
    .querySelectorAll('script[type="application/ld+json"][data-route-ld]')
    .forEach((n) => n.remove());
  if (!data) return;
  const blocks = Array.isArray(data) ? data : [data];
  blocks.forEach((block) => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-route-ld", "true");
    s.text = JSON.stringify(block);
    document.head.appendChild(s);
  });
};

/**
 * Sets document.title, OG/Twitter meta, canonical, hreflang alternates,
 * keywords, and route-scoped JSON-LD structured data.
 */
export const Head = ({
  title,
  description,
  image = DEFAULT_IMAGE,
  keywords,
  jsonLd,
}) => {
  const { pathname } = useLocation();
  const { locale } = useLocale();
  const url = `${SITE_URL}${pathname}`;
  const fullTitle = title
    ? `${title} · Maison Allélique`
    : "Maison Allélique · Éditions Vivantes";
  const desc =
    description ||
    "A Parisian maison at the intersection of biology and new technologies. Éditions Vivantes — limited, numbered, intimate. By appointment.";

  useEffect(() => {
    document.title = fullTitle;
    upsertMeta("name", "description", desc);
    if (keywords) upsertMeta("name", "keywords", keywords);

    upsertMeta("property", "og:site_name", "Maison Allélique");
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", desc);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:locale", OG_LOCALE[locale] || "en_GB");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", desc);
    upsertMeta("name", "twitter:image", image);

    upsertLink("canonical", url);

    // Always inject an auto-generated BreadcrumbList in addition to any
    // page-specific jsonLd blocks the caller passes.
    const auto = [buildBreadcrumb(pathname)];
    if (jsonLd) {
      const extras = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      // De-duplicate: if the page already provided a BreadcrumbList, keep theirs.
      const hasBreadcrumb = extras.some(
        (b) => b && b["@type"] === "BreadcrumbList"
      );
      upsertJsonLd(hasBreadcrumb ? extras : [...auto, ...extras]);
    } else {
      upsertJsonLd(auto);
    }
  }, [fullTitle, desc, image, url, locale, keywords, jsonLd, pathname]);

  return null;
};

export default Head;
