import { useEffect } from "react";
import {
  seoConfig,
  notFoundSeo,
  OG_IMAGE,
  SITE_URL,
  buildBreadcrumbJsonLd,
  buildWebSiteJsonLd,
  buildEducationalOrgJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
} from "@/data/seo-config";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    Object.entries(attrs).forEach(([key, value]) => tag?.setAttribute(key, value));
    document.head.appendChild(tag);
    return tag;
  }
  Object.entries(attrs).forEach(([key, value]) => tag?.setAttribute(key, value));
  return tag;
};

const upsertJsonLd = (id: string, data: object) => {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
};

const removeJsonLd = (id: string) => {
  document.getElementById(id)?.remove();
};

const ALL_JSONLD_IDS = ["jsonld-breadcrumb", "jsonld-webpage", "jsonld-website", "jsonld-eduorg", "jsonld-faqpage"];

export const useSeo = ({ title, description, path, noindex }: SeoInput) => {
  useEffect(() => {
    const config = seoConfig[path] || notFoundSeo;
    const resolvedRobots = noindex ? "noindex,nofollow" : config.robots;
    const ogImage = `${SITE_URL}${config.ogImage || OG_IMAGE}`;
    const ogUrl = `${SITE_URL}${path === "*" ? "" : path}`;

    document.title = title;

    // Basic meta
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: resolvedRobots });

    // OG
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: ogUrl });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: ogImage });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "학원/교육 웹 제작 시스템" });

    // Twitter
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: ogImage });

    // Canonical
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    // 404(unknown route)는 canonical을 홈으로, noindex 내부 도구 페이지는 self-referencing canonical 유지
    const isNotFound = !seoConfig[path];
    canonical.href = isNotFound ? `${SITE_URL}/` : ogUrl;

    // --- JSON-LD: driven by jsonLdType array ---
    const types = config.jsonLdType || [];

    // BreadcrumbList
    if (types.includes("BreadcrumbList") && path !== "*") {
      upsertJsonLd("jsonld-breadcrumb", buildBreadcrumbJsonLd(path));
    } else {
      removeJsonLd("jsonld-breadcrumb");
    }

    // WebPage
    if (types.includes("WebPage")) {
      const pageJsonLd = buildWebPageJsonLd(path);
      if (pageJsonLd) upsertJsonLd("jsonld-webpage", pageJsonLd);
    } else {
      removeJsonLd("jsonld-webpage");
    }

    // WebSite (homepage)
    if (types.includes("WebSite")) {
      upsertJsonLd("jsonld-website", buildWebSiteJsonLd());
    } else {
      removeJsonLd("jsonld-website");
    }

    // EducationalOrganization (homepage)
    if (types.includes("EducationalOrganization")) {
      upsertJsonLd("jsonld-eduorg", buildEducationalOrgJsonLd());
    } else {
      removeJsonLd("jsonld-eduorg");
    }

    // FAQPage
    if (types.includes("FAQPage") && config.faqItems && config.faqItems.length > 0) {
      upsertJsonLd("jsonld-faqpage", buildFaqPageJsonLd(config.faqItems));
    } else {
      removeJsonLd("jsonld-faqpage");
    }

    return () => {
      ALL_JSONLD_IDS.forEach(removeJsonLd);
    };
  }, [title, description, path, noindex]);
};
