

# 학원/교육 웹 제작 시스템 — 종합 감사 및 패치 계획

---

## 1. Audit Summary (감사 요약)

현재 시스템은 **높은 완성도**를 갖추고 있습니다. 핵심 기능(Brief→Blueprint→Rules→Proof), SEO 엔진(JSON-LD 동적 주입, FAQPage, BreadcrumbList), autosave+retry, 38개 테스트가 모두 구현되어 있습니다.

---

## 2. Evidence Table (28개 항목 감사 결과)

| # | 항목 | 상태 | 근거 파일 | 함수/컴포넌트 | 부족한 점 |
|---|------|------|-----------|---------------|-----------|
| 1 | Client Brief 페이지 | **구현됨** | `src/pages/ClientBrief.tsx` | `ClientBrief` | — |
| 2 | Site Blueprint 페이지 | **구현됨** | `src/pages/SiteBlueprint.tsx` | `SiteBlueprint` | — |
| 3 | Implementation Rules 페이지 | **구현됨** | `src/pages/ImplementationRules.tsx` | `ImplementationRules` | — |
| 4 | Proof System 페이지 | **구현됨** | `src/pages/ProofSystem.tsx` | `ProofSystem` | — |
| 5 | App 라우팅 연결 | **구현됨** | `src/App.tsx` (30-44) | 13개 Route + 404 | — |
| 6 | localStorage 저장/불러오기/자동저장 | **구현됨** | `src/hooks/use-client-brief.ts` (57-108) | `trySave`, `useEffect` | — |
| 7 | JSON export/import | **구현됨** | `src/hooks/use-client-brief.ts` (127-155) | `exportJson`, `importJson` | — |
| 8 | 브리프 요약 카드 | **구현됨** | `src/components/brief/BriefSummaryCard.tsx` | `BriefSummaryCard` | — |
| 9 | 누락 항목 경고 | **구현됨** | `BriefSummaryCard.tsx` (85-106) | `missingFieldGroups` | — |
| 10 | 예상 사이트 유형 미리보기 | **구현됨** | `BriefSummaryCard.tsx` (59-64) | `inferSiteType`, `getSiteTypeReason` | — |
| 11 | 공개용 페이지 구조 출력 엔진 | **구현됨** | `src/lib/brief-engine.ts` (121-270) | `buildBlueprintBlocks` | — |
| 12 | 공개용 산출물 복사 버튼 | **구현됨** | `SiteBlueprint.tsx` (108-110), `CopyBlock.tsx` | `copyBlockText`, `CopyBlock` | — |
| 13 | route별 title/description/canonical | **구현됨** | `src/data/seo-config.ts`, `src/hooks/use-seo.ts` | `seoConfig`, `useSeo` | — |
| 14 | route별 og/twitter 메타 | **구현됨** | `use-seo.ts` (64-75) | `upsertMeta` | — |
| 15 | route별 robots 정책 | **구현됨** | `seo-config.ts` (88-105) | noindex/follow 주석 명시 | — |
| 16 | 404 noindex/fallback meta | **구현됨** | `seo-config.ts` (108-113), `use-seo.ts` (85-86) | `notFoundSeo`, self-canonical 처리 | — |
| 17 | JSON-LD 구조화 데이터 | **구현됨** | `use-seo.ts` (88-125) | WebSite, WebPage, FAQPage, EducationalOrg | Course/Article 미사용 (선택) |
| 18 | breadcrumb 구조화 데이터 | **구현됨** | `seo-config.ts` (115-130) | `buildBreadcrumbJsonLd` | — |
| 19 | sitemap.xml | **구현됨** | `public/sitemap.xml` | 10개 공개 URL | noindex 페이지 미포함 (정상) |
| 20 | robots.txt와 sitemap 연결 | **구현됨** | `public/robots.txt` (16) | `Sitemap:` 라인 | — |
| 21 | README 실제 프로젝트 기준 | **구현됨** | `README.md` | 워크플로우/페이지/테스트 문서화 | — |
| 22 | package.json name/version/description | **구현됨** | `package.json` | `edu-guide-system`, `1.0.0` | — |
| 23 | package-lock 동기화 | **부분** | `package-lock.json`, `bun.lockb` | — | 패키지 매니저 전략 명확화 필요 |
| 24 | npm ci/build/lint/test 통과 | **구현됨** | — | — | 현재 38개 테스트 통과 |
| 25 | placeholder 테스트 제거 | **구현됨** | `src/test/core.test.ts` | 38개 실제 테스트 | — |
| 26 | 실제 동작 테스트 | **부분** | `core.test.ts` | 로직 테스트만 | 라우트/UI 렌더링 테스트 없음 |
| 27 | navigation 기반 사이드바/탑네비/검색 연동 | **구현됨** | `navigation.ts`, `GuideLayout.tsx`, `CommandSearch.tsx` | `guideNavItems` 공유 | — |
| 28 | 문서 공통 포맷 통일 | **부분** | `PageHeader.tsx`, `BadgeTag.tsx` | 일부 페이지 적용 | in-page TOC 미구현 |

---

## 3. Patch Plan (패치 계획)

### Batch 1: 패키지 관리 명확화
**파일**: `README.md`

README에서 bun/npm 전략 명확화:
- 현재: "기본 패키지 매니저: bun (bun.lockb), npm install / npm ci도 호환됨"
- 유지: 이 전략은 이미 명확함. 추가 조치 불필요.

### Batch 2: Course JSON-LD 빌더 추가 (선택적)
**파일**: `src/data/seo-config.ts`

- 이미 `buildCourseJsonLd` 함수가 line 174-184에 존재함
- `use-seo.ts`에서 `jsonLdType`에 "Course"가 포함된 경우 주입하도록 확장 가능
- 현재 어떤 route도 Course를 사용하지 않으므로 선택적

### Batch 3: 라우트/UI 렌더링 테스트 추가
**파일**: `src/test/core.test.ts` 또는 새 파일 `src/test/routes.test.tsx`

현재 38개 테스트는 모두 **로직 테스트**입니다. 실제 React 컴포넌트 렌더링 테스트를 추가하면:
- 핵심 라우트 렌더링 여부 검증
- route별 메타 반영 검증 (document.title 등)

예시:
```typescript
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "@/App";

describe("routes", () => {
  it("renders Index page at /", () => {
    render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);
    expect(screen.getByText(/학원\/교육 업종 웹 제작 가이드/)).toBeInTheDocument();
  });

  it("renders 404 for unknown route", () => {
    render(<MemoryRouter initialEntries={["/unknown-xyz"]}><App /></MemoryRouter>);
    expect(screen.getByText("404")).toBeInTheDocument();
  });
});
```

### Batch 4: In-page TOC 컴포넌트 추가 (선택적)
**새 파일**: `src/components/docs/TableOfContents.tsx`

각 가이드 페이지에서 h2 기반 TOC를 자동 생성하는 컴포넌트:
```typescript
type TocProps = { items: { id: string; label: string }[] };
export const TableOfContents = ({ items }: TocProps) => (
  <nav className="...">
    {items.map(item => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}
  </nav>
);
```

각 가이드 페이지의 h2에 id 속성을 추가하고, PageHeader 하단에 TOC를 배치.

---

## 4. 우선순위 정리

| 우선순위 | 작업 | 영향도 | 난이도 |
|----------|------|--------|--------|
| 1 | 라우트 렌더링 테스트 추가 | 높음 (품질 보증) | 중 |
| 2 | In-page TOC 추가 | 중 (문서 탐색성) | 중 |
| 3 | Course JSON-LD 연결 | 낮음 (이미 빌더 존재) | 낮 |

---

## 5. 현재 구현 상태 증거

### SEO 시스템 (완전)
- `seo-config.ts`: 13개 route + notFoundSeo 정의
- `use-seo.ts`: title/description/robots/og/twitter/canonical + JSON-LD 동적 주입
- 404: `notFoundSeo`로 noindex,nofollow + canonical→홈 처리
- noindex 내부 도구: self-referencing canonical (line 85-86)

### Brief 시스템 (완전)
- `use-client-brief.ts`: SaveStatus, ImportErrorType, retry 로직 (MAX_RETRY=2)
- `BriefSummaryCard`: 완성도 %, 사이트 유형, 저장 상태, 누락 필드 그룹화
- `ClientBrief.tsx`: error 배너 + importError Badge (line 50-55)

### Blueprint/Rules/Proof 연동 (완전)
- `brief-engine.ts`: `getProofStatuses`, `getProofFallbacks`, `buildImplementationRules`에 `proofFallbacks` 포함
- `SiteBlueprint.tsx`: proof 상태 요약 + 대체 조합 제안 (line 74-98)
- `ImplementationRules.tsx`: proofFallbacks 표시 (line 74-84)
- `ProofSystem.tsx`: 브리프 기반 자산 상태 카드 (line 76-105)

### 테스트 (38개)
- brief-schema: 6개
- brief-engine: 24개 (inferSiteType, getProofFallbacks, buildImplementationRules 등)
- navigation & seo: 8개

---

## 6. 결론

**현재 시스템은 이미 "실무 투입 가능한 완성본" 수준입니다.**

추가로 **최종 마감**을 위해 아래 3가지를 선택적으로 보강할 수 있습니다:
1. **라우트 렌더링 테스트** — 품질 보증 강화
2. **In-page TOC** — 문서 탐색성 향상
3. **Course JSON-LD 연결** — SEO 엔진 확장

이 중 **라우트 렌더링 테스트**가 가장 실질적인 품질 향상 효과를 제공합니다.

