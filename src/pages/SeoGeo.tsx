import { PageHeader } from "@/components/docs/PageHeader";
import { CopyBlock } from "@/components/docs/CopyBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeTag } from "@/components/docs/BadgeTag";

const metaExamples = `[홈페이지]
title: "강남 영어학원 | 중·고등 내신·수능 영어 전문 - 학원명"
description: "강남역 도보 5분, 중등 내신부터 고등 수능까지 체계적인 영어 커리큘럼. 무료 상담 예약."

[과정 목록]
title: "과정 안내 | 대상·과목별 프로그램 - 학원명"
description: "초등·중등·고등·성인 대상 맞춤 과정. 영어, 수학, 국어, 과학 등 전 과목 안내."

[과정 상세]
title: "중등 내신 영어반 | 중1~중3 내신 대비 - 학원명"
description: "중학생 내신 영어 전문반. 문법·독해·듣기 통합 커리큘럼. 체험수업 가능."

[강사진]
title: "강사진 소개 | 전문 강사진 안내 - 학원명"
description: "각 과목 전문 강사진의 교육 철학과 수업 방식을 소개합니다."

[지점]
title: "학원명 대치점 | 대치동 영어학원"
description: "대치동 위치, 중·고등 영어 전문. 운영시간 09:00~22:00. 주차 가능."

[상담]
title: "상담 신청 | 무료 맞춤 상담 - 학원명"
description: "전화·카카오·온라인 폼으로 편하게 문의하세요. 평일 24시간 내 답변."

[성과]
title: "성과 사례 | 학생 성장 기록 - 학원명"
description: "체계적인 커리큘럼으로 달성한 학생들의 성장 사례를 소개합니다."`;

const urlStructure = `/                          # 홈
/programs                  # 과정 목록
/programs/middle-english   # 과정 상세 (대상-과목)
/programs/high-math-adv    # 과정 상세 (대상-과목-레벨)
/teachers                  # 강사진
/locations                 # 지점 목록
/locations/gangnam         # 지점 상세
/results                   # 성과/합격사례
/reviews                   # 후기
/schedule                  # 시간표/운영안내
/contact                   # 상담/문의
/events                    # 설명회/체험수업
/blog                      # 학습정보/블로그
/blog/study-tips-2024      # 블로그 상세
/faq                       # FAQ (홈 페이지 내 섹션 또는 별도 페이지)`;

const jsonLdOrg = `{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "학원명",
  "description": "중·고등 영어·수학 전문 학원",
  "url": "https://example.com",
  "telephone": "+82-2-0000-0000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "서울 강남구 대치동 000-00",
    "addressLocality": "서울",
    "addressRegion": "강남구",
    "postalCode": "06000",
    "addressCountry": "KR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.4967,
    "longitude": 127.0628
  },
  "openingHours": "Mo-Fr 14:00-22:00, Sa 10:00-18:00"
}`;

const jsonLdCourse = `{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "중등 내신 영어반",
  "description": "중1~중3 내신 대비 영어 전문반. 문법·독해·듣기 통합 커리큘럼.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "학원명"
  },
  "educationalLevel": "중학교",
  "coursePrerequisites": "영어 기초 수준",
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "오프라인",
    "courseSchedule": {
      "@type": "Schedule",
      "repeatFrequency": "P1W",
      "repeatCount": 12,
      "byDay": ["Monday", "Wednesday", "Friday"]
    }
  }
}`;

const jsonLdFaq = `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "수강료는 얼마인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "과정과 수강 기간에 따라 다르며, 상담을 통해 맞춤 안내해 드립니다."
      }
    },
    {
      "@type": "Question",
      "name": "체험수업은 어떻게 신청하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "홈페이지 체험수업 페이지에서 신청하시거나 전화로 문의해 주세요."
      }
    }
  ]
}`;

const internalLinkStrategy = `[내부 링크 전략]
1. 홈 → 과정 목록: "전체 과정 보기" 링크
2. 과정 목록 → 과정 상세: 각 카드에 상세 링크
3. 과정 상세 → 강사진: 담당 강사 프로필 링크
4. 과정 상세 → 관련 과정: 동일 대상/과목 추천
5. 강사진 → 과정 상세: 담당 과정 링크
6. 성과 → 관련 과정: 해당 성과 과정 링크
7. 후기 → 과정 상세: 수강 과정 링크
8. 블로그 → 과정 상세: 관련 과정 CTA 배너
9. 모든 페이지 → 상담: 하단/사이드 상담 CTA
10. 지점 → 해당 지점 상담: 지점별 상담 링크

[Breadcrumb 구조]
홈 > 과정 > 중등 영어
홈 > 강사진 > 홍길동 선생님
홈 > 지점 > 강남점
홈 > 블로그 > 학습 팁`;

const canonicalRules = `[canonical 규칙]
• 각 페이지에 self-referencing canonical 적용
• www/non-www 통일 (하나로 리다이렉트)
• trailing slash 통일 (/programs vs /programs/)
• 필터/정렬 파라미터는 canonical에서 제거
  예: /programs?sort=popular → canonical: /programs
• 페이지네이션: rel="next", rel="prev" + canonical은 1페이지
• 지점별 페이지: 각 지점 URL이 canonical

[robots.txt]
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Sitemap: https://example.com/sitemap.xml

[sitemap.xml 필수 포함]
• 홈, 과정 목록, 과정 상세(전체), 강사진
• 지점(전체), 성과, 후기, 시간표, 상담
• 블로그(전체), FAQ
• 각 URL에 lastmod, changefreq, priority 포함`;

const SeoGeo = () => (
  <div className="space-y-10">
    <PageHeader
      title="SEO/GEO 가이드"
      description="학원/교육 사이트의 검색 유입을 극대화하기 위한 메타 타이틀, URL 구조, JSON-LD 스키마, 내부 링크, 지역+대상 랜딩 전략을 제공합니다."
      tocItems={[
        { id: "meta-examples", label: "메타 타이틀/디스크립션" },
        { id: "url-structure", label: "URL 구조" },
        { id: "h-tag-rules", label: "H 태그 규칙" },
        { id: "json-ld", label: "구조화 데이터 (JSON-LD)" },
        { id: "internal-links", label: "내부 링크 전략" },
        { id: "canonical-robots", label: "Canonical / Robots / Sitemap" },
        { id: "landing-design", label: "검색 유입 랜딩 설계" },
        { id: "og-twitter", label: "Open Graph / Twitter 메타" },
        { id: "ai-search", label: "AI 검색/요약 대응" },
      ]}
      summaryCards={[
        { title: "핵심 키워드 조합", body: "지역 + 대상 + 과목 (예: 강남 중등 영어학원)" },
        { title: "스키마 활용", body: "EducationalOrganization, Course, LocalBusiness, FAQPage" },
        { title: "AI 검색 대응", body: "명확한 H 구조, FAQ 섹션, 정형화된 답변" },
      ]}
      quickApply={[
        "title < 60자, description < 160자",
        "H1 1개, H2 섹션 제목, H3 카드 제목",
        "canonical 명시, sitemap.xml 자동 생성",
        "지역+과목 조합 랜딩 페이지 설계",
        "각 페이지 JSON-LD 스키마 적용",
      ]}
    />

    <section>
      <h2 id="meta-examples" className="text-2xl font-bold">메타 타이틀/디스크립션 예시</h2>
      <p className="mt-1 text-sm text-muted-foreground">title 60자 이내, description 160자 이내. 핵심 키워드를 앞쪽에 배치.</p>
      <CopyBlock title="페이지별 메타 예시" content={metaExamples} />
    </section>

    <section>
      <h2 id="url-structure" className="text-2xl font-bold">URL 구조 예시</h2>
      <CopyBlock title="URL 구조" content={urlStructure} />
    </section>

    <section>
      <h2 id="h-tag-rules" className="text-2xl font-bold">H 태그 규칙</h2>
      <div className="mt-4 space-y-3">
        {[
          { tag: "H1", rule: "페이지당 1개. 페이지 핵심 주제. 지역+대상+과목 키워드 포함.", example: "강남 중등 영어학원 | 내신 전문" },
          { tag: "H2", rule: "섹션 제목. 강사진, 과정, 성과, FAQ 등 주요 섹션 분류.", example: "핵심 과정 안내 / 강사진 소개 / 수강 후기" },
          { tag: "H3", rule: "카드/항목 제목. 개별 과정명, 강사명, FAQ 질문 등.", example: "중등 내신 영어반 / 홍길동 선생님" },
        ].map((h) => (
          <Card key={h.tag}>
            <CardContent className="flex items-start gap-3 p-4">
              <span className="flex h-8 w-12 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">{h.tag}</span>
              <div className="text-sm">
                <p className="font-medium">{h.rule}</p>
                <p className="mt-1 font-mono text-muted-foreground">예: {h.example}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>

    <section>
      <h2 id="json-ld" className="text-2xl font-bold">구조화 데이터 (JSON-LD)</h2>
      <p className="mt-1 text-sm text-muted-foreground">각 페이지 유형에 맞는 스키마를 적용합니다.</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { page: "홈", schema: "Organization, EducationalOrganization" },
          { page: "과정 상세", schema: "Course, BreadcrumbList" },
          { page: "지점", schema: "LocalBusiness, Place" },
          { page: "FAQ", schema: "FAQPage" },
          { page: "블로그", schema: "Article, BreadcrumbList" },
          { page: "설명회/이벤트", schema: "Event" },
        ].map((s) => (
          <Card key={s.page}>
            <CardContent className="p-3 text-sm">
              <span className="font-medium">{s.page}</span>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{s.schema}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        <CopyBlock title="EducationalOrganization (홈)" content={jsonLdOrg} />
        <CopyBlock title="Course (과정 상세)" content={jsonLdCourse} />
        <CopyBlock title="FAQPage (FAQ)" content={jsonLdFaq} />
      </div>
    </section>

    <section>
      <h2 id="internal-links" className="text-2xl font-bold">내부 링크 전략</h2>
      <CopyBlock title="내부 링크 + Breadcrumb 구조" content={internalLinkStrategy} />
    </section>

    <section>
      <h2 id="canonical-robots" className="text-2xl font-bold">Canonical / Robots / Sitemap</h2>
      <CopyBlock title="canonical 규칙 + robots.txt + sitemap" content={canonicalRules} />
    </section>

    <section>
      <h2 id="landing-design" className="text-2xl font-bold">검색 유입 랜딩 페이지 설계</h2>
      <p className="mt-1 text-sm text-muted-foreground">지역+대상+과목 조합으로 검색 의도에 맞는 랜딩 페이지를 설계합니다.</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { pattern: "지역 + 과목", examples: ["강남 영어학원", "분당 수학학원", "목동 국어학원"], intent: "과목 전문성 탐색" },
          { pattern: "지역 + 학년", examples: ["대치동 중등 학원", "잠실 고등 학원", "일산 초등 학원"], intent: "연령대별 맞춤 탐색" },
          { pattern: "지역 + 입시", examples: ["강남 입시학원", "노원 재수학원", "분당 수시 대비"], intent: "입시 전문 탐색" },
          { pattern: "지역 + 어학", examples: ["강남 영어회화", "홍대 일본어학원", "신촌 중국어 교육"], intent: "어학 교육 탐색" },
          { pattern: "지역 + 자격증", examples: ["강남 토익학원", "신림 공무원학원", "종로 자격증 교육"], intent: "자격증/시험 대비" },
          { pattern: "직장인 + 시간대", examples: ["직장인 주말 영어", "야간 자격증 강의", "직장인 주말 코딩"], intent: "성인/직장인 시간 맞춤" },
        ].map((l) => (
          <Card key={l.pattern}>
            <CardHeader className="pb-2"><CardTitle className="text-base">{l.pattern}</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex flex-wrap gap-1">{l.examples.map(e => <span key={e} className="rounded bg-primary/10 px-2 py-0.5 text-xs">{e}</span>)}</div>
              <p className="text-muted-foreground">검색 의도: {l.intent}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>

    <section>
      <h2 id="og-twitter" className="text-2xl font-bold">Open Graph / Twitter 메타</h2>
      <CopyBlock title="OG/Twitter 메타 태그" content={`<meta property="og:type" content="website" />
<meta property="og:title" content="강남 영어학원 | 중·고등 내신 전문 - 학원명" />
<meta property="og:description" content="강남역 도보 5분, 체계적인 영어 커리큘럼. 무료 상담." />
<meta property="og:image" content="https://example.com/og-image.jpg" />
<meta property="og:url" content="https://example.com" />
<meta property="og:locale" content="ko_KR" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="강남 영어학원 | 중·고등 내신 전문" />
<meta name="twitter:description" content="체계적인 영어 커리큘럼. 무료 상담 예약." />
<meta name="twitter:image" content="https://example.com/og-image.jpg" />`} />
    </section>

    <section>
      <h2 id="ai-search" className="text-2xl font-bold">AI 검색/요약 대응</h2>
      <p className="mt-1 text-sm text-muted-foreground">AI 검색 엔진(Google SGE, ChatGPT 등)에 잘 인용되기 위한 콘텐츠 구조.</p>
      <div className="mt-4 space-y-3">
        {[
          { rule: "FAQ 섹션에 자주 묻는 질문 + 명확한 1~2문장 답변", badge: "필수" as const },
          { rule: "대상 적합성 문장을 각 페이지 첫 문단에 명시", badge: "필수" as const },
          { rule: "성과/결과는 수치+기간+조건 포함 (AI가 인용할 수 있는 형태)", badge: "권장" as const },
          { rule: "각 페이지 상단에 핵심 요약 문단 제공 (1~2문장)", badge: "권장" as const },
          { rule: "리스트/표 형태로 정보 구조화 (스캔 가능한 형태)", badge: "권장" as const },
          { rule: "질문-답변 형태의 콘텐츠 패턴 활용", badge: "권장" as const },
        ].map((r) => (
          <div key={r.rule} className="flex items-start gap-2 rounded-md border bg-card p-3 text-sm">
            <BadgeTag type={r.badge} />
            <span>{r.rule}</span>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default SeoGeo;
