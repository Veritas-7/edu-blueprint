import { PageHeader } from "@/components/docs/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeTag } from "@/components/docs/BadgeTag";

const UxGuide = () => (
  <div className="space-y-10">
    <PageHeader
      title="UX 가이드"
      description="교육 사이트 방문자의 대표 여정, 방문 목적별 분기, Above the Fold 정보 우선순위, 폼 최소화 전략, 모바일 UX 원칙을 제공합니다."
      tocItems={[
        { id: "user-journey", label: "대표 사용자 여정" },
        { id: "purpose-routing", label: "방문 목적별 UX 분기" },
        { id: "above-fold", label: "Above the Fold 정보 우선순위" },
        { id: "form-minimize", label: "폼 최소화 전략" },
        { id: "drop-points", label: "이탈 지점과 개선" },
      ]}
      summaryCards={[
        { title: "핵심 여정", body: "유입 → 적합성 확인 → 과정 탐색 → 신뢰 판단 → 상담 전환" },
        { title: "5초 규칙", body: "첫 화면에서 대상 · 과정 · 행동(CTA)을 즉시 인지" },
        { title: "모바일 우선", body: "전화·카카오·길찾기 원터치 실행, 하단 고정 CTA" },
      ]}
      quickApply={[
        "Above the Fold: 대상 표시 + 핵심 과정 + CTA 1~2개",
        "폼 필드 3개 이하: 이름, 연락처, 관심 과정",
        "수강료 비공개 시 '개별 상담 안내' 대체 UX 제공",
        "성과/후기는 과장 없이 근거 중심으로 배치",
      ]}
    />

    <section>
      <h2 id="user-journey" className="text-2xl font-bold">대표 사용자 여정</h2>
      <div className="mt-4 space-y-3">
        {[
          { step: "1", title: "검색 유입", desc: "지역+과목+대상 키워드로 유입. 첫 화면에서 적합성을 확인하려 함." },
          { step: "2", title: "적합성 확인", desc: "'누구를 위한 교육인지' 즉시 파악. 대상 태그/칩, 학년 범위." },
          { step: "3", title: "과정 탐색", desc: "과목, 커리큘럼, 시간표, 수강 방식을 비교/탐색." },
          { step: "4", title: "신뢰 판단", desc: "강사진 경력, 성과 사례, 수강 후기, 시설 사진 확인." },
          { step: "5", title: "상담 전환", desc: "상담 신청, 체험수업, 설명회 예약 등 행동 전환." },
          { step: "6", title: "방문/등록", desc: "오프라인 방문 상담 후 최종 등록." },
        ].map((s) => (
          <div key={s.step} className="flex gap-4 rounded-md border bg-card p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">{s.step}</span>
            <div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 id="purpose-routing" className="text-2xl font-bold">방문 목적별 UX 분기</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {[
          { type: "과정 비교형", ux: "필터+비교 카드 제공, 커리큘럼 아코디언" },
          { type: "바로 상담형", ux: "히어로 CTA 강화, 전화/카카오 즉시 연결" },
          { type: "지점 확인형", ux: "지도+지점 카드, 위치별 필터" },
          { type: "시간표 확인형", ux: "요일·시간대 테이블, 모바일 가로 스크롤" },
          { type: "성인 수강 탐색형", ux: "야간/주말 과정 우선 노출, 실무 결과 중심" },
        ].map((item) => (
          <Card key={item.type}>
            <CardHeader><CardTitle className="text-base">{item.type}</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">{item.ux}</CardContent>
          </Card>
        ))}
      </div>
    </section>

    <section>
      <h2 id="above-fold" className="text-2xl font-bold">Above the Fold 정보 우선순위</h2>
      <div className="mt-4">
        <ol className="space-y-2">
          {[
            "대상 적합성 표시 (누구를 위한 과정인지)",
            "핵심 가치/과정 요약 (무엇을 배우는지)",
            "주요 CTA (상담 신청 / 과정 보기)",
            "Quick Info (전화, 위치, 운영시간)",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">{i + 1}</span>
              {item}
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section>
      <h2 id="form-minimize" className="text-2xl font-bold">폼 최소화 전략</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base text-success">권장 필드</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">이름, 연락처, 관심 과정 (3개 이하)</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base text-destructive">불필요 필드</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">주소, 학교명, 상세 요구사항 (상담 시 수집)</CardContent>
        </Card>
      </div>
    </section>

    <section>
      <h2 id="drop-points" className="text-2xl font-bold">이탈이 많이 발생하는 지점과 개선</h2>
      <div className="mt-4 space-y-3">
        {[
          { point: "첫 화면에서 대상 불명확", fix: "히어로에 대상 태그/학년 범위 명시" },
          { point: "과정 상세가 너무 길어 스크롤 포기", fix: "아코디언/탭으로 축약" },
          { point: "수강료 정보 없이 폼만 요구", fix: "가격 범위 또는 '개별 안내' 사유 설명" },
          { point: "모바일에서 CTA 찾기 어려움", fix: "하단 고정 CTA 바 적용" },
        ].map((item) => (
          <div key={item.point} className="rounded-md border bg-card p-4">
            <div className="flex items-start gap-2"><BadgeTag type="검토 필요" /><span className="text-sm font-medium">{item.point}</span></div>
            <p className="mt-2 text-sm text-muted-foreground">→ {item.fix}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default UxGuide;
