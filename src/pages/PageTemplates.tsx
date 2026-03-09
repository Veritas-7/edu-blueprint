import { PageHeader } from "@/components/docs/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyBlock } from "@/components/docs/CopyBlock";
import { BadgeTag } from "@/components/docs/BadgeTag";

const templates = [
  {
    name: "홈페이지",
    sections: ["Hero", "Quick Info Bar", "대상별 진입", "핵심 과정", "강사진 요약", "성과/후기 요약", "시간표 요약", "지점/위치", "FAQ", "최종 CTA", "Footer"],
    purpose: "첫 방문자에게 대상 적합성·핵심 과정·행동 유도를 즉시 전달",
    cta: "상담 신청하기 / 과정 보기",
    proof: ["강사진 요약", "성과 수치(근거)", "후기 요약"],
    mobile: "히어로+CTA 우선, 하단 고정바 필수",
    seo: "H1 1개, 지역+대상+과목 키워드, Organization 스키마",
  },
  {
    name: "과정/프로그램 목록",
    sections: ["타이틀+필터", "과정 카드 그리드", "비교 CTA", "상담 CTA"],
    purpose: "다양한 과정을 대상/과목/레벨별로 탐색",
    cta: "상세 보기 / 상담 신청",
    proof: ["과정별 커리큘럼 요약", "대상 태그"],
    mobile: "필터 1행 탭, 카드 1열 스택",
    seo: "/programs, 각 과정 개별 URL",
  },
  {
    name: "과정/프로그램 상세",
    sections: ["히어로(과정명+대상)", "커리큘럼 타임라인", "수강 방식", "수강료/안내", "강사진", "후기", "상담 CTA"],
    purpose: "개별 과정의 상세 구조와 수강 방식 전달",
    cta: "체험수업 신청 / 상담 신청",
    proof: ["커리큘럼 구조", "강사 프로필", "수강 후기"],
    mobile: "커리큘럼 아코디언 축약",
    seo: "/programs/[대상]-[과목]-[레벨], Course 스키마",
  },
  {
    name: "강사진 소개",
    sections: ["타이틀", "강사 카드 그리드", "교육 철학", "상담 CTA"],
    purpose: "강사진 전문성과 신뢰 전달",
    cta: "상담 신청하기",
    proof: ["경력(검증 필요)", "담당 과목", "수업 철학"],
    mobile: "카드 1열 스택",
    seo: "/teachers, Person 스키마",
  },
  {
    name: "지점/캠퍼스",
    sections: ["지점 필터/지도", "지점 카드 그리드", "개별 지점 상세(주소, 연락처, 시간표)", "상담 CTA"],
    purpose: "다지점 구조에서 위치별 정보 제공",
    cta: "해당 지점 상담 신청",
    proof: ["시설 사진", "운영 시간"],
    mobile: "지도 축소, 카드 리스트 우선",
    seo: "/locations, LocalBusiness 스키마",
  },
  {
    name: "성과/합격사례",
    sections: ["타이틀(예시 데이터 명시)", "성과 카드 그리드", "주의 문구", "상담 CTA"],
    purpose: "검증된 성과 사례로 신뢰 강화",
    cta: "상담 신청하기",
    proof: ["성과 수치(예시 데이터 표기)", "기간/조건 명시"],
    mobile: "카드 1열 스택",
    seo: "/results, 과장 금지",
  },
  {
    name: "후기/수강생 이야기",
    sections: ["타이틀", "후기 카드 그리드", "상담 CTA"],
    purpose: "실제 수강생 경험 전달",
    cta: "상담 신청하기",
    proof: ["후기(실명 또는 익명 처리)", "수강 기간/과정 명시"],
    mobile: "카드 1열 스택",
    seo: "/reviews, 허위 금지",
  },
  {
    name: "시간표/운영안내",
    sections: ["요일/시간대 테이블", "운영 시간", "휴무일", "상담 CTA"],
    purpose: "시간표와 운영 정보 제공",
    cta: "상담 신청",
    proof: ["정확한 시간표"],
    mobile: "테이블 가로 스크롤",
    seo: "/schedule",
  },
  {
    name: "상담/문의 신청",
    sections: ["타이틀", "폼(이름, 연락처, 관심 과정)", "응답 안내", "상담 채널 병렬"],
    purpose: "상담 전환 페이지",
    cta: "상담 신청하기",
    proof: ["응답 시간 안내", "개인정보 동의"],
    mobile: "폼 단일 컬럼",
    seo: "/contact",
  },
  {
    name: "설명회/체험수업 신청",
    sections: ["타이틀", "일정 선택", "폼", "안내 사항"],
    purpose: "설명회/체험수업 예약 전환",
    cta: "예약 신청",
    proof: ["일정 정보", "참여 혜택(과장 금지)"],
    mobile: "캘린더 간소화",
    seo: "/events",
  },
  {
    name: "공지/학습정보/블로그",
    sections: ["카테고리 필터", "글 카드 리스트", "상세 페이지"],
    purpose: "공지사항 및 학습 콘텐츠 제공",
    cta: "상담 신청 배너",
    proof: ["콘텐츠 전문성"],
    mobile: "리스트 1열",
    seo: "/blog, Article 스키마",
  },
];

const PageTemplates = () => (
  <div className="space-y-10">
    <PageHeader
      title="페이지 템플릿"
      description="실제 고객사 사이트 제작에 바로 재사용할 수 있는 페이지별 섹션 구조, CTA, 증빙 요소, 모바일 축약 규칙, SEO 포인트를 제공합니다."
      summaryCards={[
        { title: "총 11개 템플릿", body: "홈, 과정, 강사진, 지점, 성과, 후기, 시간표, 상담, 설명회, 블로그" },
        { title: "재사용 목표", body: "섹션 순서·CTA·proof를 복사해 빠르게 와이어프레임 구성" },
        { title: "SEO 연동", body: "각 템플릿별 URL·스키마 권장 포함" },
      ]}
      quickApply={[
        "홈페이지: Hero + Quick Info + 핵심 과정 + CTA",
        "과정 상세: 커리큘럼 아코디언 + 강사진 + 상담 CTA",
        "성과 페이지: 예시 데이터 명시 + 근거/기간 동반",
        "상담 페이지: 폼 3필드 이하 + 응답 시간 안내",
      ]}
    />

    {templates.map((t) => (
      <section key={t.name} className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">{t.name}</h2>
          <BadgeTag type="필수" />
        </div>
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-sm mb-1">목적</h3>
              <p className="text-sm text-muted-foreground">{t.purpose}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">섹션 순서</h3>
              <div className="flex flex-wrap gap-2">
                {t.sections.map((s, i) => (
                  <span key={s} className="rounded-md bg-muted px-2 py-1 text-xs">{i + 1}. {s}</span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-sm mb-1">CTA</h3>
                <p className="text-sm text-muted-foreground">{t.cta}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">Proof 요소</h3>
                <p className="text-sm text-muted-foreground">{t.proof.join(", ")}</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-sm mb-1">모바일 축약</h3>
                <p className="text-sm text-muted-foreground">{t.mobile}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">SEO 포인트</h3>
                <p className="text-sm text-muted-foreground">{t.seo}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    ))}
  </div>
);

export default PageTemplates;
