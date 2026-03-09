import { useState, useCallback } from "react";
import { PageHeader } from "@/components/docs/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { BadgeTag } from "@/components/docs/BadgeTag";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type ChecklistCategory = {
  category: string;
  badge: "필수" | "권장" | "선택";
  items: string[];
};

const checklists: ChecklistCategory[] = [
  {
    category: "홈페이지 제작 전 체크리스트",
    badge: "필수",
    items: [
      "교육 세부 유형 확정 (보습, 입시, 어학, 자격증, 코딩, 예체능 등)",
      "타겟 연령대/대상 정의 (초등, 중학생, 고등학생, 성인, 직장인)",
      "핵심 과정/프로그램 목록 확보",
      "강사진 정보 확보 여부 확인 (경력 검증 필요)",
      "성과/합격 사례 확보 여부 확인 (예시 데이터 vs 실데이터 구분)",
      "수강 후기 확보 여부 확인 (실제 수강생 동의)",
      "시설/교실 사진 확보 여부 확인 (실제 사진, 과도한 보정 금지)",
      "상담 채널 결정 (전화, 카카오, 폼, 이메일)",
      "수강료 공개 여부 결정 (공개/비공개/부분공개)",
      "단일 지점 / 다지점 여부 확인",
      "운영 시간 및 시간표 확보",
      "브랜드 톤 & 금지 표현 정의",
    ],
  },
  {
    category: "디자인 검수 체크리스트",
    badge: "필수",
    items: [
      "컬러 토큰 일관성 확인 (primary, accent, muted, success, warning 등)",
      "타이포 위계 적용 확인 (H1→H2→H3→Body→Caption)",
      "간격/라운드/그림자 시스템 일관성",
      "강사진 사진: 실제 사진 사용, 과도한 보정 금지",
      "시설/교실 사진: 실제 사진 사용, 연출 최소화",
      "아이콘 스타일 일관성 (라인/필/듀톤 중 택1)",
      "과도한 글래스모피즘/네온 컬러 사용 금지",
      "유치한 캐릭터풍 일러스트 남발 금지",
      "정보 가독성이 사진/디자인 요소에 묻히지 않는지 확인",
      "다크 모드 대응 (적용 시) 컬러 대비 확인",
    ],
  },
  {
    category: "UI 검수 체크리스트",
    badge: "필수",
    items: [
      "상단 정보 바 적용 (전화, 위치, 상담시간, 설명회, 체험수업 CTA)",
      "히어로에 대상 태그 + 핵심 가치 + CTA 포함",
      "과정 카드에 대상/과목/시간/방식 정보 포함",
      "강사진 카드에 경력 또는 교육 철학 포함",
      "커리큘럼 타임라인/아코디언 구현",
      "시간표/스케줄 표 구현 (가로 스크롤 또는 탭)",
      "모바일 하단 고정 CTA 바 적용 (전화/상담/카카오/위치 중 2~4개)",
      "버튼 hover/focus/active/disabled 상태 구현",
      "폼 필드 focus/error/success 상태 구현",
      "폼 최소 필드 적용 (이름, 연락처, 관심 과정)",
      "FAQ 아코디언 구현",
      "지점 카드/지도 구현 (다지점 시)",
      "성과 카드에 '예시 데이터' 라벨 적용 (해당 시)",
      "후기 카드에 수강 과정/기간 표기",
    ],
  },
  {
    category: "UX 검수 체크리스트",
    badge: "필수",
    items: [
      "첫 화면에서 대상·과정·CTA 5초 내 인지 가능",
      "Above the Fold 정보 우선순위 적용 (대상→과정→CTA→강사진)",
      "CTA 문구 구체적 확인 (상담 신청하기, 체험수업 신청, 과정 보기 등)",
      "상담/설명회/체험수업 CTA 배치 적절성 확인",
      "과정 상세 아코디언/탭 축약 적용",
      "수강료 비공개 시 대체 UX 제공 (상담 안내 + 응답 시간)",
      "폼 제출 후 확인/감사 메시지 제공",
      "탐색 흐름: 홈→과정→상세→상담 자연스러운 이동 확인",
      "이탈 방지: 상담 CTA가 항상 접근 가능한지 확인",
    ],
  },
  {
    category: "모바일 검수 체크리스트",
    badge: "필수",
    items: [
      "하단 고정 CTA 바 작동 확인 (전화/상담/카카오/길찾기)",
      "전화 원터치 실행 (tel: 링크)",
      "카카오톡 문의 원터치 실행",
      "길찾기 원터치 실행 (네이버/카카오 지도 연동)",
      "터치 타겟 44px 이상",
      "필터 1행 탭/칩 적용 (가로 스크롤)",
      "테이블 가로 스크롤 적용 (시간표 등)",
      "이미지 로딩 최적화 (lazy loading)",
      "폼 키보드 사용성 확인 (입력 시 화면 가림 방지)",
      "모바일 네비게이션 햄버거 메뉴 작동 확인",
    ],
  },
  {
    category: "콘텐츠 검수 체크리스트",
    badge: "필수",
    items: [
      "히어로 카피 공식 적용 (대상 태그 + 핵심 가치 + 구체적 결과)",
      "CTA 문구 라이브러리 준수 (모호한 '자세히 보기' 금지)",
      "성과 표현에 근거/기간/출처 동반 확인",
      "예시 데이터 사용 시 '예시 데이터' 명시 확인",
      "금지 표현 사용 여부 ('합격 보장', '100%', '업계 최고', '유일')",
      "허위 후기/경력/성과 사용 여부 확인",
      "대상 적합성 문장 첫 화면 포함 확인",
      "과정 소개 구조 적용 (대상+과목+방식+기대결과)",
      "강사진 소개 구조 적용 (과목+경력/철학+방식)",
      "FAQ 실제 질문 기반 작성 확인 (광고성 FAQ 금지)",
    ],
  },
  {
    category: "신뢰/성과 증빙 검수 체크리스트",
    badge: "필수",
    items: [
      "강한 증빙 2개 이상 CTA 근처 배치 확인",
      "허위 경력/성과/후기 사용 여부 확인",
      "성과 수치에 '예시 데이터' 또는 출처 표기 확인",
      "부족 증빙 대체 요소 적용 확인",
      "검토 필요 요소 내부 검증 완료 확인",
      "시설 사진 실제 사진 여부 확인",
      "후기에 수강 과정/기간 표기 확인",
      "강사 경력 검증 완료 확인",
    ],
  },
  {
    category: "SEO/GEO 검수 체크리스트",
    badge: "필수",
    items: [
      "title 60자 이내, description 160자 이내",
      "H1 페이지당 1개 적용",
      "H2 섹션 제목, H3 카드/항목 제목 위계 확인",
      "canonical 태그 적용 (self-referencing)",
      "sitemap.xml 생성 및 등록",
      "robots.txt 설정 확인",
      "JSON-LD 스키마 적용 (Organization, Course, LocalBusiness, FAQPage)",
      "Open Graph 메타 태그 설정 (title, description, image, url)",
      "Twitter Card 메타 태그 설정",
      "이미지 alt 텍스트 적용 (모든 이미지)",
      "내부 링크 구조 확인 (과정→강사, 후기→과정, 블로그→과정)",
      "지역+대상+과목 키워드 포함 확인",
      "BreadcrumbList 스키마 적용",
    ],
  },
  {
    category: "런칭 전 최종 점검 체크리스트",
    badge: "필수",
    items: [
      "모든 페이지 링크 작동 확인",
      "404 페이지 noindex 적용",
      "페이지 로드 속도 3초 이내 (모바일 기준)",
      "이미지 최적화 (WebP/AVIF, lazy loading)",
      "개인정보 수집 동의 문구 포함",
      "연락처/위치 정보 정확성 확인",
      "폼 제출 테스트 (정상 전송 + 오류 처리)",
      "모바일 전화/카카오/길찾기 원터치 테스트",
      "크로스 브라우저 테스트 (Chrome, Safari, Edge, Samsung Internet)",
      "Lighthouse 점수 확인 (Performance, Accessibility, SEO)",
      "Google Search Console 등록",
      "네이버 Search Advisor 등록",
      "최종 콘텐츠 교정 (오탈자, 금지 표현)",
    ],
  },
];

const STORAGE_KEY = "edu-guide-checklist";

const Checklist = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  });

  const toggle = useCallback((key: string) => {
    setChecked(prev => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setChecked({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const totalItems = checklists.reduce((s, c) => s + c.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const percent = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  return (
    <div className="space-y-10">
      <PageHeader
        title="실무 체크리스트"
        description="홈페이지 제작 전부터 런칭 직전까지 디자인/UI/UX/콘텐츠/SEO/GEO를 점검하는 9개 카테고리 체크리스트입니다. 체크 상태는 자동 저장됩니다."
        tocItems={checklists.map((cl) => ({
          id: `checklist-${cl.category.replace(/\s+/g, '-')}`,
          label: cl.category,
        }))}
        summaryCards={[
          { title: "전체 진행률", body: `${percent}% (${checkedCount}/${totalItems})` },
          { title: "9개 카테고리", body: "제작 전, 디자인, UI, UX, 모바일, 콘텐츠, 증빙, SEO, 런칭" },
          { title: "핵심 목표", body: "과장 없는 신뢰 · 명확한 전환 · 모바일 우선" },
        ]}
        quickApply={[
          "제작 전: 자산 확보 + 브랜드 톤 정의",
          "디자인/UI: 토큰 일관성 + 상태 구현",
          "콘텐츠: 금지 표현 + 예시 데이터 표기",
          "런칭: 속도 + SEO + 크로스브라우저 테스트",
        ]}
      />

      {/* 전체 진행 바 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">전체 진행률: {percent}%</span>
          <Button variant="outline" size="sm" onClick={resetAll}><RotateCcw className="mr-1 h-3 w-3" />전체 초기화</Button>
        </div>
        <Progress value={percent} className="h-2" />
      </div>

      {checklists.map((cl) => {
        const catChecked = cl.items.filter((_, i) => checked[`${cl.category}-${i}`]).length;
        const catPercent = cl.items.length > 0 ? Math.round((catChecked / cl.items.length) * 100) : 0;

        return (
          <section key={cl.category}>
            <div className="flex items-center gap-2 mb-2">
              <h2 id={`checklist-${cl.category.replace(/\s+/g, '-')}`} className="text-xl font-bold">{cl.category}</h2>
              <BadgeTag type={cl.badge} />
              <span className="ml-auto text-sm text-muted-foreground">{catChecked}/{cl.items.length}</span>
            </div>
            <Progress value={catPercent} className="mb-3 h-1.5" />
            <Card>
              <CardContent className="p-4 space-y-2">
                {cl.items.map((item, i) => {
                  const key = `${cl.category}-${i}`;
                  return (
                    <label key={key} className={`flex items-start gap-3 cursor-pointer rounded-md p-2 transition-colors hover:bg-muted/50 ${checked[key] ? "opacity-60" : ""}`}>
                      <Checkbox checked={!!checked[key]} onCheckedChange={() => toggle(key)} className="mt-0.5" />
                      <span className={`text-sm ${checked[key] ? "line-through text-muted-foreground" : ""}`}>{item}</span>
                    </label>
                  );
                })}
              </CardContent>
            </Card>
          </section>
        );
      })}
    </div>
  );
};

export default Checklist;
