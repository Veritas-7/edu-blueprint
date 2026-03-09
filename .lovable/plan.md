

# 학원/교육 웹 제작 시스템 — 최종 마감 보강 계획

## 현재 상태 평가

이전 배치에서 대부분의 핵심 기능이 이미 구현됨:
- 404가 GuideLayout 내부로 통합됨 (App.tsx line 44)
- BriefSummaryCard 재사용 컴포넌트 분리 완료
- use-client-brief에 SaveStatus/ImportResult/retry 로직 구현됨
- brief-engine에 getProofFallbacks, serializeBlueprintBlock 구현됨
- SiteBlueprint에 블록별 복사 버튼, proof 상태, 대체 조합 표시됨
- ImplementationRules에 focusTypes 세분화, proof-aware assetRules 구현됨
- seo-config에 jsonLdType 배열 + faqItems 필드 존재
- use-seo에서 jsonLdType 기반 동적 JSON-LD 주입 구현됨 (FAQPage 포함)
- CommandSearch에 searchKeywords + description 표시됨
- core.test에 27개 테스트 존재

## 남은 개선 사항 (4개 배치)

### Batch 1: SEO 미세 조정 + 404 SEO 일원화

**문제**: NotFound.tsx가 GuideLayout 안에 있지만, `seoConfig["*"]`이 없어 `notFoundSeo`로 폴백됨. 이 동작은 작동하나, 404 경로에서 `useSeo`가 `path: location.pathname`(존재하지 않는 경로)을 canonical에 사용함. 또한 `notFoundSeo.jsonLdType`이 빈 배열이라 JSON-LD cleanup은 되지만 명시적 noindex가 코드 흐름에서 더 명확해야 함.

**변경**:
- `src/hooks/use-seo.ts`: 404 경로일 때 canonical을 홈(`/`)으로 설정하는 로직 추가 (현재 존재하지 않는 URL이 canonical이 됨)
- `src/data/seo-config.ts`: `notFoundSeo`에 `jsonLdType: []` 유지하되, `seoConfig`의 noindex 3개 route에 주석으로 정책 근거 명시
- `src/pages/NotFound.tsx`: 변경 불필요 (이미 잘 구현됨)

### Batch 2: brief-engine 판별 로직 정교화

**문제**: `inferSiteType`에서 `corePrograms.length > 20`은 문자열 길이 체크인데, 20자는 너무 짧음 (이전에 30에서 20으로 줄임). 또한 `상담 강화형`이 focusTypes에는 있으나 SiteType enum에는 없어 `inferSiteType` 결과와 `focusTypes` 간 불일치 가능.

**변경**:
- `src/lib/brief-engine.ts`:
  - `inferSiteType`: `corePrograms.length > 30` 복원 (20자는 "수학, 영어, 과학" 수준으로 너무 짧음)
  - `buildImplementationRules`의 `instantGuide`에 proof 상태별 더 구체적인 제작 지침 추가 (예: 후기 부족 시 "체험수업 CTA를 홈 히어로에 추가")
  - `buildBlueprintBlocks`의 각 블록에 proof 상태 크로스체크 로직 추가 — 현재 블록은 정적인 proof 배열만 가짐, `getProofStatuses` 결과를 참조하여 `reviewClaim`에 동적 경고 추가

### Batch 3: 테스트 확장

**문제**: 현재 27개 테스트가 있으나 모두 로직 테스트. 라우트/메타/UI 검증 없음.

**변경 — `src/test/core.test.ts`에 추가**:
- `inferSiteType` 다양한 조합 테스트 (성인+다지점, 모든 proof 보유+성인 등 우선순위 검증)
- `getProofFallbacks` 빈 배열 반환 검증 (모든 proof 보유 시)
- `calculateBriefScore` 정확한 percent 값 검증 (예: 2/10 = 20%)
- `seoConfig` 전체 route에 `jsonLdType` 배열 존재 검증
- `buildImplementationRules` budget.standard가 budget.minimal을 포함하는지 검증
- `serializeBlueprintBlock` 조건부/금지 블록 포함 여부 검증

### Batch 4: README 마감 + index.html 정리

**변경**:
- `README.md`: `npm run lint` 커맨드 추가, 테스트 수 업데이트
- `index.html`: 이미 잘 구현됨 — 변경 불필요

---

## 작업 순서

Batch 1 (SEO 미세조정) → Batch 2 (엔진 정교화) → Batch 3 (테스트) → Batch 4 (README)

총 수정 대상: 4개 파일

