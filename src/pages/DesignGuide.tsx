import { PageHeader } from "@/components/docs/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyBlock } from "@/components/docs/CopyBlock";

const colorTokens = `--primary: 222 47% 18%   (네이비)
--accent: 24 90% 55%     (오렌지)
--background: 0 0% 100%  (화이트)
--muted: 210 20% 96%     (라이트 그레이)
--foreground: 222 47% 11%(딥 네이비)
--success: 142 76% 36%   (그린 = proof-strong)
--info: 199 89% 48%      (블루 = proof-supporting)
--warning: 38 92% 50%    (앰버 = review-required)
--destructive: 0 84% 60% (레드 = 금지)`;

const typoScale = `H1: 2.25rem / bold / tracking-tight
H2: 1.5rem / bold
H3: 1.25rem / semibold
Body: 0.875rem(md:1rem) / normal
Caption: 0.75rem / medium / text-muted-foreground
Label: 0.75rem / semibold / uppercase tracking-wide`;

const DesignGuide = () => (
  <div className="space-y-10">
    <PageHeader
      title="디자인 가이드"
      description="학원/교육 업종 사이트의 브랜드 톤, 컬러 토큰, 타이포그래피, 간격, 이미지 사용 기준, 금지 표현까지 체계화합니다."
      tocItems={[
        { id: "visual-keywords", label: "비주얼 키워드" },
        { id: "color-system", label: "추천 컬러 시스템" },
        { id: "typography", label: "타이포그래피 시스템" },
        { id: "spacing", label: "간격/라운드/그림자" },
        { id: "image-rules", label: "이미지 사용 기준" },
        { id: "forbidden-visuals", label: "금지 시각 표현" },
      ]}
      summaryCards={[
        { title: "브랜드 톤", body: "Trustworthy · Organized · Clear · Modern · Academic but not stiff" },
        { title: "컬러 축", body: "네이비 + 슬레이트 + 화이트 기본, 오렌지/틸 보조색 1~2개" },
        { title: "핵심 원칙", body: "정보 우선형 레이아웃, 과장 금지, 부모·학생 동시 가독성" },
      ]}
      quickApply={[
        "컬러 토큰은 HSL로 관리하고 시맨틱 이름 사용",
        "H1은 페이지당 1개, 타이포 위계 3~4단으로 제한",
        "강사진·수업 사진은 자연스러운 실사, 과도한 보정 금지",
        "그림자는 sm/md 수준, 글래스모피즘 금지",
      ]}
    />

    <section>
      <h2 id="visual-keywords" className="text-2xl font-bold">비주얼 키워드</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {["trustworthy", "organized", "clear", "modern", "academic", "motivating", "parent-friendly", "student-friendly", "professional", "mobile-first", "conversion-oriented"].map((w) => (
          <span key={w} className="rounded-full border bg-muted px-3 py-1 text-sm">{w}</span>
        ))}
      </div>
    </section>

    <section>
      <h2 id="color-system" className="text-2xl font-bold">추천 컬러 시스템</h2>
      <CopyBlock title="컬러 토큰 (HSL)" content={colorTokens} />
      <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {[
          { label: "Primary", cls: "bg-primary text-primary-foreground" },
          { label: "Accent", cls: "bg-accent text-accent-foreground" },
          { label: "Success", cls: "bg-success text-success-foreground" },
          { label: "Info", cls: "bg-info text-info-foreground" },
          { label: "Warning", cls: "bg-warning text-warning-foreground" },
          { label: "Destructive", cls: "bg-destructive text-destructive-foreground" },
        ].map((c) => (
          <div key={c.label} className={`flex h-20 items-end rounded-lg p-2 text-xs font-medium ${c.cls}`}>{c.label}</div>
        ))}
      </div>
    </section>

    <section>
      <h2 id="typography" className="text-2xl font-bold">타이포그래피 시스템</h2>
      <CopyBlock title="타이포 스케일" content={typoScale} />
      <div className="mt-6 space-y-4">
        <div><h1 className="text-4xl font-bold tracking-tight">H1 — 학원 이름 또는 메인 가치 (페이지당 1개)</h1></div>
        <div><h2 className="text-2xl font-bold">H2 — 섹션 제목 (과정 소개, 강사진, 성과)</h2></div>
        <div><h3 className="text-xl font-semibold">H3 — 카드 타이틀 (개별 과정명, 강사명)</h3></div>
        <div><p className="text-sm md:text-base">Body — 일반 설명 텍스트</p></div>
        <div><p className="text-xs text-muted-foreground">Caption — 보조 설명, 날짜, 출처</p></div>
      </div>
    </section>

    <section>
      <h2 id="spacing" className="text-2xl font-bold">간격/라운드/그림자 시스템</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card><CardHeader><CardTitle className="text-base">간격</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">4px 단위, 섹션 간 48~64px, 카드 내부 16~24px</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">라운드</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">sm 2px / md 6px / lg 8px / full(칩·뱃지만)</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">그림자</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">shadow-sm(카드), shadow-md(드롭다운), 글래스모피즘 금지</CardContent></Card>
      </div>
    </section>

    <section>
      <h2 id="image-rules" className="text-2xl font-bold">이미지 사용 기준</h2>
      <div className="mt-4 space-y-3">
        {[
          { label: "강사진 사진", rule: "자연스러운 상반신, 과도한 보정 금지, 실제 촬영 권장" },
          { label: "교실/시설", rule: "정돈된 학습 환경, 과도한 연출 금지, 학습 분위기 전달" },
          { label: "수업 장면", rule: "실제 수업 모습 우선, 스톡 사진 사용 시 자연스러운 컷 선택" },
          { label: "교재/자료", rule: "실제 사용 자료 일부 공개, 저작권 확인 필수" },
          { label: "일러스트", rule: "정보 보조 목적에 한해 사용, 메인 비주얼 대체 금지" },
        ].map((item) => (
          <div key={item.label} className="rounded-md border bg-card p-4">
            <span className="font-medium">{item.label}</span>
            <p className="mt-1 text-sm text-muted-foreground">{item.rule}</p>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 id="forbidden-visuals" className="text-2xl font-bold">금지해야 할 시각 표현</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {[
          "과도한 글래스모피즘/투명 효과",
          "유치한 캐릭터풍 일러스트 남발",
          "네온 컬러/과도한 원색 조합",
          "텍스트 위 이미지 오버레이로 가독성 저하",
          "과장된 수치·성과 강조 배너",
          "학원 광고 전단지 스타일의 과밀 레이아웃",
        ].map((item) => (
          <div key={item} className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm">{item}</div>
        ))}
      </div>
    </section>
  </div>
);

export default DesignGuide;
