export type GuideNavItem = {
  label: string;
  path: string;
  shortLabel: string;
  description: string;
};

export const guideNavItems: GuideNavItem[] = [
  { label: "Overview", shortLabel: "Overview", path: "/", description: "시스템 개요 대시보드" },
  { label: "Industry", shortLabel: "Industry", path: "/industry-overview", description: "교육 업종 특성" },
  { label: "Design Guide", shortLabel: "Design", path: "/design-guide", description: "비주얼/토큰/이미지 규칙" },
  { label: "UI Guide", shortLabel: "UI", path: "/ui-guide", description: "컴포넌트 패턴 사전" },
  { label: "UX Guide", shortLabel: "UX", path: "/ux-guide", description: "사용자 흐름과 전환 UX" },
  { label: "Page Templates", shortLabel: "Templates", path: "/page-templates", description: "실전 페이지 템플릿" },
  { label: "Content Guide", shortLabel: "Content", path: "/content-guide", description: "카피/문장/CTA 가이드" },
  { label: "Proof System", shortLabel: "Proof", path: "/proof-system", description: "신뢰/성과 증빙 체계" },
  { label: "SEO/GEO", shortLabel: "SEO/GEO", path: "/seo-geo", description: "검색/지역 유입 구조" },
  { label: "Checklist", shortLabel: "Checklist", path: "/checklist", description: "실무 점검표" },
  { label: "Client Brief", shortLabel: "Brief", path: "/client-brief", description: "고객사 브리프 도구" },
  { label: "Site Blueprint", shortLabel: "Blueprint", path: "/site-blueprint", description: "공개용 청사진 생성" },
  { label: "Implementation Rules", shortLabel: "Rules", path: "/implementation-rules", description: "브리프 기반 제작 규칙" },
];

export const routeMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "학원/교육 웹 제작 시스템 | Overview",
    description: "학원/교육 업종 내부 가이드, 고객 브리프, 공개 사이트 청사진, 구현 규칙을 한 번에 제공하는 제작 기준서 시스템",
  },
  "/industry-overview": {
    title: "학원/교육 업종 특성 가이드",
    description: "학부모/학생/성인 학습자 관점과 전환형 교육 사이트 구조 차이를 정리한 업종 분석 페이지",
  },
  "/design-guide": {
    title: "학원/교육 디자인 가이드",
    description: "컬러 토큰, 타이포, 이미지 사용 기준, 금지 표현까지 포함한 교육 업종 디자인 시스템 가이드",
  },
  "/ui-guide": {
    title: "학원/교육 UI 컴포넌트 가이드",
    description: "상담 전환형 교육 사이트에서 필요한 헤더, 카드, CTA, 폼, 모바일 고정바 UI 패턴 모음",
  },
  "/ux-guide": {
    title: "학원/교육 UX 가이드",
    description: "첫 방문부터 상담 전환까지의 대표 사용자 여정과 모바일 우선 UX 원칙을 정의한 가이드",
  },
  "/page-templates": {
    title: "학원/교육 페이지 템플릿",
    description: "홈, 과정, 강사진, 지점, 성과, 상담 등 재사용 가능한 교육 사이트 페이지 템플릿 모음",
  },
  "/content-guide": {
    title: "학원/교육 콘텐츠 가이드",
    description: "과장 없는 신뢰형 문장 템플릿, CTA 라이브러리, 금지 표현 규칙을 제공하는 카피 가이드",
  },
  "/proof-system": {
    title: "학원/교육 신뢰/성과 증빙 시스템",
    description: "강한 증빙과 보조 증빙을 페이지/CTA 근처에 배치하는 증빙 운영 기준",
  },
  "/seo-geo": {
    title: "학원/교육 SEO/GEO 가이드",
    description: "지역+대상+과정 구조 기반의 검색 유입 전략, 메타, 스키마, 내부링크 기준을 제공",
  },
  "/checklist": {
    title: "학원/교육 제작 체크리스트",
    description: "제작 전부터 런칭 직전까지 디자인/UI/UX/콘텐츠/SEO/GEO를 점검하는 실무 체크리스트",
  },
  "/client-brief": {
    title: "고객사 브리프 도구",
    description: "교육 고객사 정보를 자동 저장하고 JSON으로 내보내는 브리프 수집/검증 도구",
  },
  "/site-blueprint": {
    title: "공개용 사이트 청사진 생성기",
    description: "Client Brief 기반으로 사이트 유형, 페이지 구조, CTA, SEO 포인트를 자동 제안하는 생성기",
  },
  "/implementation-rules": {
    title: "브리프 기반 구현 규칙 엔진",
    description: "브리프 상태에 따라 최소/표준/풀 구성과 유지/제거 블록을 동적으로 판단하는 규칙 엔진",
  },
};

export const getPrevNext = (path: string) => {
  const idx = guideNavItems.findIndex((item) => item.path === path);
  return {
    prev: idx > 0 ? guideNavItems[idx - 1] : null,
    next: idx >= 0 && idx < guideNavItems.length - 1 ? guideNavItems[idx + 1] : null,
  };
};
