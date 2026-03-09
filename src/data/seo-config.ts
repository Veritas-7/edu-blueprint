import { guideNavItems } from "@/lib/navigation";

export const SITE_NAME = "학원/교육 웹 제작 시스템";
export const SITE_URL = typeof window !== "undefined" ? window.location.origin : "https://edu-guide.lovable.app";
export const OG_IMAGE = "/og-image.png";

export type JsonLdType = "WebSite" | "WebPage" | "FAQPage" | "EducationalOrganization" | "BreadcrumbList" | "Course" | "Article";

export type RouteSeoConfig = {
  title: string;
  description: string;
  robots: string;
  ogImage?: string;
  jsonLdType: JsonLdType[];
  /** FAQ items for FAQPage JSON-LD */
  faqItems?: { question: string; answer: string }[];
};

export const seoConfig: Record<string, RouteSeoConfig> = {
  "/": {
    title: "학원/교육 웹 제작 시스템 | Overview",
    description: "학원/교육 업종 내부 가이드, 고객 브리프, 공개 사이트 청사진, 구현 규칙을 한 번에 제공하는 제작 기준서 시스템",
    robots: "index,follow",
    jsonLdType: ["WebSite", "WebPage", "EducationalOrganization", "BreadcrumbList"],
  },
  "/industry-overview": {
    title: "학원/교육 업종 특성 가이드",
    description: "학부모/학생/성인 학습자 관점과 전환형 교육 사이트 구조 차이를 정리한 업종 분석 페이지",
    robots: "index,follow",
    jsonLdType: ["WebPage", "BreadcrumbList"],
  },
  "/design-guide": {
    title: "학원/교육 디자인 가이드",
    description: "컬러 토큰, 타이포, 이미지 사용 기준, 금지 표현까지 포함한 교육 업종 디자인 시스템 가이드",
    robots: "index,follow",
    jsonLdType: ["WebPage", "BreadcrumbList"],
  },
  "/ui-guide": {
    title: "학원/교육 UI 컴포넌트 가이드",
    description: "상담 전환형 교육 사이트에서 필요한 헤더, 카드, CTA, 폼, 모바일 고정바 UI 패턴 모음",
    robots: "index,follow",
    jsonLdType: ["WebPage", "BreadcrumbList"],
  },
  "/ux-guide": {
    title: "학원/교육 UX 가이드",
    description: "첫 방문부터 상담 전환까지의 대표 사용자 여정과 모바일 우선 UX 원칙을 정의한 가이드",
    robots: "index,follow",
    jsonLdType: ["WebPage", "BreadcrumbList"],
  },
  "/page-templates": {
    title: "학원/교육 페이지 템플릿",
    description: "홈, 과정, 강사진, 지점, 성과, 상담 등 재사용 가능한 교육 사이트 페이지 템플릿 모음",
    robots: "index,follow",
    jsonLdType: ["WebPage", "BreadcrumbList"],
  },
  "/content-guide": {
    title: "학원/교육 콘텐츠 가이드",
    description: "과장 없는 신뢰형 문장 템플릿, CTA 라이브러리, 금지 표현 규칙을 제공하는 카피 가이드",
    robots: "index,follow",
    jsonLdType: ["WebPage", "BreadcrumbList"],
  },
  "/proof-system": {
    title: "학원/교육 신뢰/성과 증빙 시스템",
    description: "강한 증빙과 보조 증빙을 페이지/CTA 근처에 배치하는 증빙 운영 기준",
    robots: "index,follow",
    jsonLdType: ["WebPage", "BreadcrumbList"],
  },
  "/seo-geo": {
    title: "학원/교육 SEO/GEO 가이드",
    description: "지역+대상+과정 구조 기반의 검색 유입 전략, 메타, 스키마, 내부링크 기준을 제공",
    robots: "index,follow",
    jsonLdType: ["WebPage", "BreadcrumbList", "FAQPage"],
    faqItems: [
      { question: "교육 사이트에 필수인 JSON-LD 유형은?", answer: "EducationalOrganization, Course, BreadcrumbList, LocalBusiness가 기본이며, FAQ 섹션이 있으면 FAQPage도 추가합니다." },
      { question: "지역 키워드 전략은 어떻게 구성하나요?", answer: "지역+대상+과목 조합으로 URL, 메타 타이틀, H1을 구성합니다. 예: '강남 중학생 수학학원'" },
    ],
  },
  "/checklist": {
    title: "학원/교육 제작 체크리스트",
    description: "제작 전부터 런칭 직전까지 디자인/UI/UX/콘텐츠/SEO/GEO를 점검하는 실무 체크리스트",
    robots: "index,follow",
    jsonLdType: ["WebPage", "BreadcrumbList", "FAQPage"],
    faqItems: [
      { question: "교육 사이트 런칭 전 필수 점검 항목은?", answer: "대상 적합성, CTA 동작, 모바일 하단 고정바, 메타/OG, 개인정보 동의 폼, 성과 근거 표기를 반드시 확인합니다." },
    ],
  },
  "/client-brief": {
    title: "고객사 브리프 도구",
    description: "교육 고객사 정보를 자동 저장하고 JSON으로 내보내는 브리프 수집/검증 도구",
    robots: "noindex,follow",
    jsonLdType: ["WebPage"],
  },
  "/site-blueprint": {
    title: "공개용 사이트 청사진 생성기",
    description: "Client Brief 기반으로 사이트 유형, 페이지 구조, CTA, SEO 포인트를 자동 제안하는 생성기",
    robots: "noindex,follow",
    jsonLdType: ["WebPage"],
  },
  "/implementation-rules": {
    title: "브리프 기반 구현 규칙 엔진",
    description: "브리프 상태에 따라 최소/표준/풀 구성과 유지/제거 블록을 동적으로 판단하는 규칙 엔진",
    robots: "noindex,follow",
    jsonLdType: ["WebPage"],
  },
};

export const notFoundSeo: RouteSeoConfig = {
  title: "페이지를 찾을 수 없습니다 | 학원/교육 웹 제작 시스템",
  description: "요청하신 페이지가 존재하지 않습니다. 가이드 홈으로 이동하세요.",
  robots: "noindex,nofollow",
  jsonLdType: [],
};

export const buildBreadcrumbJsonLd = (path: string) => {
  const items = [
    guideNavItems[0], // home always
    ...guideNavItems.filter(i => i.path === path && i.path !== "/"),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      item: `${SITE_URL}${item.path}`,
    })),
  };
};

export const buildWebSiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: seoConfig["/"].description,
});

export const buildEducationalOrgJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  url: SITE_URL,
  description: seoConfig["/"].description,
});

export const buildWebPageJsonLd = (path: string) => {
  const config = seoConfig[path];
  if (!config) return null;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.title,
    description: config.description,
    url: `${SITE_URL}${path}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };
};

export const buildFaqPageJsonLd = (faqItems: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(item => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const buildCourseJsonLd = (courseName: string, provider: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: courseName,
  description,
  provider: {
    "@type": "EducationalOrganization",
    name: provider,
    url: SITE_URL,
  },
});
