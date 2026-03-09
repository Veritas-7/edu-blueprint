import { PageHeader } from "@/components/docs/PageHeader";
import { CopyBlock } from "@/components/docs/CopyBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const metaExamples = `[홈페이지]
title: "강남 영어학원 | 중·고등 내신·수능 영어 전문 - 학원명"
description: "강남역 도보 5분, 중등 내신부터 고등 수능까지 체계적인 영어 커리큘럼. 무료 상담 예약."

[과정 상세]
title: "중등 내신 영어반 | 중1~중3 내신 대비 - 학원명"
description: "중학생 내신 영어 전문반. 문법·독해·듣기 통합 커리큘럼. 체험수업 가능."

[지점]
title: "학원명 대치점 | 대치동 영어학원"
description: "대치동 위치, 중·고등 영어 전문. 운영시간 09:00~22:00. 주차 가능."`;

const urlStructure = `/
/programs
/programs/middle-english-basic
/programs/high-english-advanced
/teachers
/locations
/locations/gangnam
/results
/reviews
/schedule
/contact
/events
/blog
/blog/study-tips-2024`;

const schemaRecommendations = `홈: Organization, EducationalOrganization
과정: Course
지점: LocalBusiness, Place
FAQ: FAQPage
블로그: Article
목록: BreadcrumbList`;

const SeoGeo = () => (
  <div className="space-y-10">
    <PageHeader
      title="SEO/GEO 가이드"
      description="학원/교육 사이트의 검색 유입을 극대화하기 위한 메타 타이틀, URL 구조, 스키마, 내부 링크, 지역+대상 랜딩 전략을 제공합니다."
      summaryCards={[
        { title: "핵심 키워드 조합", body: "지역 + 대상 + 과목 (예: 강남 중등 영어학원)" },
        { title: "스키마 활용", body: "EducationalOrganization, Course, LocalBusiness, FAQPage" },
        { title: "AI 검색 대응", body: "명확한 H 구조, FAQ 섹션, 정형화된 답변 형태" },
      ]}
      quickApply={[
        "title < 60자, description < 160자",
        "H1 1개, H2 섹션 제목, H3 카드 제목",
        "canonical 명시, sitemap.xml 자동 생성",
        "지역+과목 조합 랜딩 페이지 설계",
      ]}
    />

    <section>
      <h2 className="text-2xl font-bold">메타 타이틀/디스크립션 예시</h2>
      <CopyBlock title="메타 예시" content={metaExamples} />
    </section>

    <section>
      <h2 className="text-2xl font-bold">URL 구조 예시</h2>
      <CopyBlock title="URL 구조" content={urlStructure} />
    </section>

    <section>
      <h2 className="text-2xl font-bold">구조화 데이터(JSON-LD) 권장</h2>
      <CopyBlock title="스키마 권장" content={schemaRecommendations} />
    </section>

    <section>
      <h2 className="text-2xl font-bold">검색 유입 랜딩 페이지 설계</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {[
          { pattern: "지역 + 과목", example: "강남 영어학원, 분당 수학학원" },
          { pattern: "지역 + 학년", example: "대치동 중등 학원, 목동 고등 학원" },
          { pattern: "지역 + 입시", example: "강남 입시학원, 노원 재수학원" },
          { pattern: "직장인 + 시간대", example: "직장인 주말 영어, 야간 자격증 강의" },
        ].map((l) => (
          <Card key={l.pattern}>
            <CardHeader><CardTitle className="text-base">{l.pattern}</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">{l.example}</CardContent>
          </Card>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold">H 태그 규칙</h2>
      <div className="mt-4 space-y-2 text-sm">
        <p><strong>H1:</strong> 페이지당 1개. 페이지 핵심 주제. 지역+대상+과목 조합 키워드 포함.</p>
        <p><strong>H2:</strong> 섹션 제목. 강사진, 과정, 성과, FAQ 등.</p>
        <p><strong>H3:</strong> 카드/항목 제목. 개별 과정명, 강사명 등.</p>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold">AI 검색/요약 대응</h2>
      <div className="mt-4 space-y-3">
        {[
          "FAQ 섹션에 자주 묻는 질문 + 명확한 답변 정형화",
          "대상 적합성 문장을 첫 문단에 명시",
          "성과/결과는 수치+기간+조건 포함",
          "각 페이지 상단에 핵심 요약 문단 제공",
        ].map((rule) => (
          <div key={rule} className="rounded-md border bg-card p-3 text-sm">{rule}</div>
        ))}
      </div>
    </section>
  </div>
);

export default SeoGeo;
