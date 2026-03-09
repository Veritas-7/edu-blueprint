import { PageHeader } from "@/components/docs/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const checklists = [
  {
    category: "홈페이지 제작 전",
    items: [
      "교육 세부 유형 확정 (보습, 입시, 어학, 자격증 등)",
      "타겟 연령대/대상 정의",
      "핵심 과정/프로그램 목록 확보",
      "강사진 정보 확보 여부 확인",
      "성과/합격 사례 확보 여부 확인",
      "시설/교실 사진 확보 여부 확인",
      "상담 채널 결정 (전화, 카카오, 폼)",
      "수강료 공개 여부 결정",
    ],
  },
  {
    category: "디자인 검수",
    items: [
      "컬러 토큰 일관성 확인 (primary, accent, muted)",
      "타이포 위계 적용 (H1-H2-H3-Body-Caption)",
      "간격/라운드/그림자 일관성",
      "강사진/시설 사진 과도한 보정 여부",
      "과도한 글래스모피즘/네온 컬러 사용 금지",
      "유치한 캐릭터풍 일러스트 남발 금지",
    ],
  },
  {
    category: "UI 검수",
    items: [
      "상단 정보 바 적용 (전화, 위치, 상담 CTA)",
      "히어로에 대상+가치+CTA 포함",
      "과정 카드에 대상/과목/시간 정보 포함",
      "강사진 카드에 경력 또는 교육 철학 포함",
      "모바일 하단 고정 CTA 바 적용 (2~4개)",
      "버튼/폼/링크 hover/focus/disabled 상태 구현",
      "폼 최소 필드 (이름, 연락처, 관심 과정)",
    ],
  },
  {
    category: "UX 검수",
    items: [
      "첫 화면에서 대상·과정·CTA 5초 내 인지",
      "Above the Fold 정보 우선순위 적용",
      "CTA 문구 구체적 (상담 신청하기, 체험수업 신청)",
      "과정 상세 아코디언/탭 축약",
      "수강료 비공개 시 대체 UX 제공",
    ],
  },
  {
    category: "모바일 검수",
    items: [
      "하단 고정 CTA 바 작동 확인",
      "전화/카카오 원터치 실행",
      "터치 타겟 44px 이상",
      "필터 1행 탭/칩 적용",
      "테이블 가로 스크롤 적용",
    ],
  },
  {
    category: "콘텐츠 검수",
    items: [
      "히어로 카피 공식 적용 (대상+가치+결과)",
      "CTA 문구 라이브러리 준수",
      "성과 표현 근거/기간/예시 데이터 동반",
      "금지 표현 사용 여부 ('합격 보장', '100%' 등)",
      "허위 후기/경력 사용 금지",
    ],
  },
  {
    category: "신뢰/성과 증빙 검수",
    items: [
      "강한 증빙 2개 이상 CTA 근처 배치",
      "허위 경력/성과/후기 금지",
      "부족 증빙 대체 요소 적용",
      "검토 필요 요소 내부 검증 완료",
    ],
  },
  {
    category: "SEO/GEO 검수",
    items: [
      "title < 60자, description < 160자",
      "H1 1개 / H2 섹션 / H3 카드",
      "canonical 적용",
      "sitemap.xml 생성",
      "robots.txt 설정",
      "JSON-LD 스키마 적용 (Organization, Course, LocalBusiness)",
      "Open Graph / Twitter 메타 설정",
    ],
  },
  {
    category: "런칭 전 최종 점검",
    items: [
      "모든 링크 작동 확인",
      "404 페이지 noindex 적용",
      "페이지 로드 속도 3초 이내",
      "이미지 alt 텍스트 적용",
      "개인정보 동의 문구 포함",
      "연락처/위치 정보 정확성",
    ],
  },
];

const Checklist = () => (
  <div className="space-y-10">
    <PageHeader
      title="실무 체크리스트"
      description="홈페이지 제작 전부터 런칭 직전까지 디자인/UI/UX/콘텐츠/SEO/GEO를 점검하는 9개 카테고리 체크리스트입니다."
      summaryCards={[
        { title: "9개 카테고리", body: "제작 전, 디자인, UI, UX, 모바일, 콘텐츠, 증빙, SEO, 런칭" },
        { title: "활용 방법", body: "각 단계별로 체크 후 누락 항목 보완" },
        { title: "핵심 목표", body: "과장 없는 신뢰 · 명확한 전환 · 모바일 우선" },
      ]}
      quickApply={[
        "제작 전: 자산 확보 여부 확인",
        "디자인/UI: 토큰 일관성, 상태 구현",
        "콘텐츠: 금지 표현 체크",
        "런칭: 링크·속도·메타 최종 검증",
      ]}
    />

    {checklists.map((cl) => (
      <section key={cl.category}>
        <h2 className="text-xl font-bold">{cl.category}</h2>
        <Card className="mt-4">
          <CardContent className="p-4 space-y-3">
            {cl.items.map((item) => (
              <label key={item} className="flex items-start gap-3 cursor-pointer">
                <Checkbox />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </CardContent>
        </Card>
      </section>
    ))}
  </div>
);

export default Checklist;
