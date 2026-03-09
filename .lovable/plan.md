

# 학원/교육 웹 제작 시스템 — 최종 마감 보강 계획

## 현재 상태 감사 요약

| # | 항목 | 상태 | 파일 | 부족한 점 |
|---|------|------|------|-----------|
| 1 | Client Brief 페이지 | 구현됨 | `src/pages/ClientBrief.tsx` | 수강료 공개, 필수 페이지, 포지셔닝 메모 필드는 있으나 사이트유형 미리보기/import 실패 UI 부족 |
| 2 | Site Blueprint 페이지 | 구현됨 | `src/pages/SiteBlueprint.tsx` | 7개 블록 출력, 복사버튼은 Lovable 프롬프트만 |
| 3 | Implementation Rules | 구현됨 | `src/pages/ImplementationRules.tsx` | 기본 분기 있으나 focusTypes 상세 판별 부족 |
| 4 | Proof System | 구현됨 | `src/pages/ProofSystem.tsx` | 브리프 연동 있으나 Blueprint/Rules에 proof 상태 미반영 |
| 5 | 라우팅 | 구현됨 | `src/App.tsx` | 404가 GuideLayout 밖에 있음 |
| 6 | localStorage | 구현됨 | `src/hooks/use-client-brief.ts` | autosave 실패 재시도 없음, 성공/실패 분리 없음 |
| 7 | JSON export/import | 구현됨 | 같은 파일 | import 실패 시 화면 상태 표시 약함 |
| 8 | 브리프 요약 카드 | 부분 구현 | `ClientBrief.tsx` PageHeader | 재사용 컴포넌트 아님 |
| 9 | 누락 경고 | 구현됨 | `ClientBrief.tsx` | 구조화 부족 (단순 문자열 나열) |
| 10 | 사이트 유형 미리보기 | 미구현 | — | ClientBrief에서 실시간 사이트유형/근거 미표시 |
| 11 | 출력 엔진 | 구현됨 | `brief-engine.ts` | 블록별 개별 복사 버튼 없음 |
| 12 | 복사 버튼 | 부분 구현 | `CopyBlock.tsx` | Lovable 프롬프트만, 블록별 복사 미지원 |
| 13 | route별 title/desc/canonical | 구현됨 | `seo-config.ts`, `use-seo.ts` | 잘 동작함 |
| 14 | OG/Twitter 메타 | 구현됨 | `use-seo.ts` | 잘 동작함 |
| 15 | robots 정책 | 구현됨 | `seo-config.ts` | noindex 3개 route 포함 |
| 16 | 404 meta | 부분 구현 | `NotFound.tsx` | useSeo 호출하나 GuideLayout 밖이라 불일치 |
| 17 | JSON-LD | 구현됨 | `use-seo.ts` | WebSite/EducationalOrg/WebPage/Breadcrumb 있음, FAQPage 미구현 |
| 18 | Breadcrumb JSON-LD | 구현됨 | `seo-config.ts` | 동작함 |
| 19 | sitemap.xml | 구현됨 | `public/sitemap.xml` | 존재함 |
| 20 | robots.txt + sitemap | 구현됨 | `public/robots.txt` | Sitemap 경로 있음 |
| 21 | README | 구현됨 | `README.md` | 실제 프로젝트 문서, 빌드/테스트 절차 포함 |
| 22 | package.json 정리 | 구현됨 | `package.json` | name/version/description 정리됨 |
| 23 | package-lock 동기화 | 미확인 | `package-lock.json` | 직접 수정 불가, npm install 필요 |
| 24 | build/test 통과 | 부분 | — | 테스트는 로직만 |
| 25 | placeholder 테스트 제거 | 완료 | `src/test/core.test.ts` | example.test 이미 교체됨 |
| 26 | 실제 동작 테스트 | 부분 구현 | `core.test.ts` | 로직 테스트만 14개, UI/라우트/메타 테스트 없음 |
| 27 | navigation 연동 | 구현됨 | `navigation.ts`, `GuideLayout.tsx`, `CommandSearch.tsx` | 공유 데이터 사용 중 |
| 28 | 문서 포맷 통일 | 부분 | 각 페이지 | PageHeader는 있으나 in-page TOC 없음 |

---

## 작업 계획 (9개 배치)

### Batch 1: 404 통합 + SEO JSON-LD 고도화

**파일**: `src/pages/NotFound.tsx`, `src/App.tsx`, `src/data/seo-config.ts`, `src/hooks/use-seo.ts`

- 404를 `GuideLayout`으로 감싸서 일관된 네비게이션 제공
- `notFoundSeo`를 `useSeo`에 통합 (현재 이미 호출 중이나 layout 밖)
- `seo-config.ts`에 `jsonLdType` 확장: `"Course"` 추가
- Checklist/SeoGeo 등 FAQ 섹션이 있는 페이지에 `FAQPage` JSON-LD 타입 추가 가능하도록 타입 확장
- `use-seo.ts`에서 `jsonLdType` 배열을 실제로 읽어 해당 타입만 주입하도록 개선 (현재는 homepage에만 WebSite/EduOrg 하드코딩)

### Batch 2: Client Brief 강화

**파일**: `src/hooks/use-client-brief.ts`, `src/pages/ClientBrief.tsx`, 신규 `src/components/brief/BriefSummaryCard.tsx`

- `useClientBrief`에 `saveStatus: "saved" | "error" | "saving"` 상태 추가
- autosave 실패 시 3초 후 재시도 (최대 2회)
- `importJson` 반환값을 `{ success, errorType: "invalid_json" | "invalid_shape" | "version_mismatch" }` 구조로 확장
- `BriefSummaryCard` 컴포넌트 분리: 완성도, 사이트유형, 판별근거, 마지막 저장 표시
- ClientBrief 페이지 하단에 실시간 사이트유형 미리보기 섹션 추가 (`inferSiteType` + `getSiteTypeReason` 호출)
- 누락 필드 경고를 카테고리별(기본정보/자산/CTA)로 그룹화
- 수강료 공개/필수 페이지/포지셔닝 메모 필드가 이미 스키마에 있으나 UI에서 누락 — `tuitionPublic` Select, `requiredPages` 체크박스, `positioningMemo` Textarea 추가

### Batch 3: Site Blueprint 출력 엔진 강화

**파일**: `src/pages/SiteBlueprint.tsx`, `src/lib/brief-engine.ts`

- 각 blueprint 블록 카드에 개별 복사 버튼 추가 (블록 데이터를 텍스트로 직렬화)
- `buildBlueprintBlocks`에 설명회/체험수업 전용 블록 추가 (현재 상담 블록에 통합됨)
- proof 상태(`getProofStatuses`)를 블록별 proof 필드와 크로스체크하여 "자산 부족" 경고 표시
- Lovable 프롬프트를 더 구조화: 페이지별 섹션 구성, proof 상태, 모바일 CTA 구성까지 포함
- `buildMetaSuggestions`에 results/reviews/campus 메타 추가

### Batch 4: Implementation Rules 강화

**파일**: `src/pages/ImplementationRules.tsx`, `src/lib/brief-engine.ts`

- `buildImplementationRules`의 focusTypes 판별 조건 세분화:
  - `corePrograms.length > 20` (현재 30) → 과정 중심형
  - `consultingFeatures.length >= 2` → 상담 강화형 추가
  - `hasReviews && hasResults` → 증빙 풍부형 추가
- 예산별 구성(minimal/standard/full)에 각 항목의 "왜 필요한지" 설명 추가
- 즉시 제작 지침에 proof 상태 기반 조건 추가 (proof 부족 시 대체 지침)
- 브리프 불완전(30~50%) 상태에서도 부분 결과를 보여주되 경고 배너 표시

### Batch 5: Proof System ↔ Blueprint/Rules 연동

**파일**: `src/lib/brief-engine.ts`, `src/pages/SiteBlueprint.tsx`, `src/pages/ImplementationRules.tsx`

- `getProofStatuses` 결과를 `buildBlueprintBlocks`와 `buildImplementationRules`에서 참조
- Blueprint 각 블록에 proof 상태 배지 표시 (보유/부족/비공개)
- Implementation Rules의 `assetRules`에 proof 상태 배지 추가
- proof 부족 시 대체 조합 로직: `getProofFallbacks(statuses)` 함수 추가
  - 예: 강사진 부족 + 후기 부족 → "운영 프로세스 + FAQ 강화" 대체안 제시

### Batch 6: 문서 탐색 UX 강화

**파일**: `src/components/CommandSearch.tsx`, `src/components/layout/GuideLayout.tsx`

- CommandSearch에 검색 키워드 매핑 추가 (현재 `searchKeywords` 정의되어 있으나 실제 필터에 미사용)
- 검색에 description도 표시하여 UX 개선
- 결과 없음 시 "가이드 홈으로 이동" CTA 표시
- GuideLayout prev/next 이미 구현됨 — 모바일 대응 확인

### Batch 7: 테스트 확장

**파일**: `src/test/core.test.ts`

기존 14개 테스트 유지 + 추가:
- brief `educationSubtype` 변경 시 `inferSiteType` 결과 변화 검증 (다양한 조합)
- `buildImplementationRules` 결과에서 `mustKeep` 항목 존재 검증
- `getProofStatuses` 전체 10개 항목 반환 검증
- `buildMetaSuggestions` 4개 페이지 반환 검증
- `buildBreadcrumbJsonLd` 구조 검증
- `seoConfig` noindex 정책 3개 route 검증
- `notFoundSeo.robots`가 `noindex,nofollow` 검증
- `validateBriefShape` edge cases (빈 data, null data 등)
- `calculateBriefScore` 부분 입력 시 percent 검증

### Batch 8: README / index.html 마감

**파일**: `README.md`, `index.html`

- README에 워크플로우 다이어그램 추가: `브리프 입력 → 사이트유형 판별 → 청사진 생성 → 구현 규칙 도출 → 공개용 산출물 복사`
- README에 `npm run build`, `npm run lint` 추가
- index.html에 `<link rel="icon" href="/favicon.ico">` 확인 및 누락 시 추가
- package-lock.json 동기화는 Lovable 환경에서 자동 처리되므로 별도 조치 불필요 (bun.lockb 유지)

### Batch 9: 전체 페이지 포맷 통일 패치

**대상**: 모든 가이드 페이지 (12개)

현재 상태: PageHeader + summaryCards + quickApply는 대부분 적용됨. 부족한 부분만 패치:
- `BadgeTag` 사용 통일 — 섹션별 필수/권장/조건부/금지 배지 누락된 페이지에 추가
- `CopyBlock` 사용 통일 — 복사 가능한 출력이 있는 섹션에 적용 (Content Guide CTA 라이브러리, SEO/GEO 메타 예시 등)
- in-page TOC는 각 페이지의 `<h2>` 기반으로 간단한 앵커 목록 섹션을 PageHeader 하단에 추가 (별도 컴포넌트 불필요, 각 페이지에 인라인)

---

## 작업 우선순위

1. Batch 1 (404 + SEO) → 2. Batch 2 (Brief 강화) → 3. Batch 5 (Proof 연동) → 4. Batch 3 (Blueprint) → 5. Batch 4 (Rules) → 6. Batch 6 (탐색 UX) → 7. Batch 9 (포맷 통일) → 8. Batch 7 (테스트) → 9. Batch 8 (README)

총 수정 대상: ~15개 파일, 신규 1개 파일

