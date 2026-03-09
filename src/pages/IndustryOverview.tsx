import { PageHeader } from "@/components/docs/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeTag } from "@/components/docs/BadgeTag";

const IndustryOverview = () => (
  <div className="space-y-10">
    <PageHeader
      title="학원/교육 업종 특성"
      description="학원/교육 홈페이지가 일반 서비스업과 근본적으로 다른 이유와, 방문자별 기대 정보, 사이트 유형 분류, 전환 흐름을 정리합니다."
      tocItems={[
        { id: "industry-diff", label: "교육 홈페이지가 다른 이유" },
        { id: "site-types", label: "사이트 유형 분류" },
        { id: "fail-patterns", label: "자주 실패하는 패턴" },
        { id: "conversion-flow", label: "대표 전환 흐름" },
      ]}
      summaryCards={[
        { title: "핵심 차이", body: "교육 사이트는 '정보 확인 → 신뢰 판단 → 상담 전환'의 3단계 흐름이 핵심입니다." },
        { title: "핵심 방문자", body: "학부모(K-12), 학생 본인(고·대학생), 성인 학습자가 대표 유형입니다." },
        { title: "전환 목표", body: "상담 신청, 체험수업, 설명회 예약이 주요 전환 행동입니다." },
      ]}
      quickApply={[
        "첫 화면에서 대상·과정·CTA를 5초 내에 인지시킬 것",
        "성과 주장은 반드시 근거/출처/기간을 동반",
        "모바일 하단 고정 CTA 필수 적용",
        "과정 구조는 복잡해도 스캔 가능하도록 설계",
      ]}
    />

    {/* 일반 서비스업과의 차이 */}
    <section>
      <h2 id="industry-diff" className="text-2xl font-bold">교육 홈페이지가 다른 이유</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {[
          { title: "신뢰 우선", body: "제품 판매와 달리 '내 아이/나에게 맞는지'를 판단해야 하므로 강사진·운영·성과 증빙이 핵심입니다." },
          { title: "지역 밀착", body: "대부분 통학/통근 가능 범위에서 검색하므로 지역+과목+대상 조합 키워드가 유입 핵심입니다." },
          { title: "복합 대상", body: "학부모와 학생이 동시에 방문하며, 각각 기대하는 정보 깊이가 다릅니다." },
          { title: "전환 경로", body: "온라인에서 결제가 끝나는 것이 아니라 '상담 예약 → 방문 → 등록'으로 이어집니다." },
        ].map((c) => (
          <Card key={c.title}>
            <CardHeader><CardTitle className="text-base">{c.title}</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">{c.body}</CardContent>
          </Card>
        ))}
      </div>
    </section>

    {/* 사이트 유형 분류 */}
    <section>
      <h2 id="site-types" className="text-2xl font-bold">사이트 유형 분류</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted">
            <tr>
              <th className="px-4 py-3 text-left font-medium">유형</th>
              <th className="px-4 py-3 text-left font-medium">특성</th>
              <th className="px-4 py-3 text-left font-medium">적합 업종</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[
              { type: "상담전환형", desc: "빠른 CTA, 최소 정보로 상담 유도", fit: "보습, 교습소, 소규모 학원" },
              { type: "과정탐색형", desc: "다양한 과정·레벨별 필터링", fit: "어학, 자격증, 코딩 교육" },
              { type: "성과신뢰형", desc: "합격·성과 사례 중심 구성", fit: "입시, 자격증" },
              { type: "지점형", desc: "지점별 정보·위치·강사진 분리", fit: "다지점 프랜차이즈" },
              { type: "성인교육형", desc: "직무/실용 결과 중심, 야간/주말 운영 강조", fit: "성인 어학, 취업/직무, 자격증" },
              { type: "하이브리드형", desc: "위 요소 2~3개 혼합", fit: "복합형 학원" },
            ].map((r) => (
              <tr key={r.type}>
                <td className="px-4 py-3 font-medium">{r.type}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.desc}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.fit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    {/* 자주 실패하는 패턴 */}
    <section>
      <h2 id="fail-patterns" className="text-2xl font-bold">교육 사이트에서 자주 실패하는 패턴</h2>
      <div className="mt-4 space-y-3">
        {[
          "어떤 대상에게 맞는지 첫 화면에서 불명확함",
          "과정 구조가 복잡하고 한눈에 안 보임",
          "강사진 정보가 부실하거나 없음",
          "상담 CTA가 너무 약하거나 반대로 과도하게 팝업/배너로 남발",
          "시간표·위치·문의 정보가 찾기 어려움",
          "성과를 과장하거나 근거 없이 주장",
          "모바일에서 전화·카카오·길찾기가 즉시 실행되지 않음",
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 rounded-md border bg-card p-4">
            <BadgeTag type="금지" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>
    </section>

    {/* 전환 흐름 */}
    <section>
      <h2 id="conversion-flow" className="text-2xl font-bold">대표 전환 흐름</h2>
      <div className="mt-4 flex flex-wrap gap-2 items-center">
        {["검색 유입", "→", "첫 화면 대상 확인", "→", "과정 탐색", "→", "강사진/성과 확인", "→", "상담 CTA 클릭", "→", "방문 상담", "→", "등록"].map((step, i) => (
          <span key={i} className={step === "→" ? "text-accent font-bold" : "rounded-md bg-muted px-3 py-1.5 text-sm"}>
            {step}
          </span>
        ))}
      </div>
    </section>
  </div>
);

export default IndustryOverview;
