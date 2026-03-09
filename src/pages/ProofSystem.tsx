import { PageHeader } from "@/components/docs/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeTag } from "@/components/docs/BadgeTag";

const proofElements = [
  { name: "강사진 경력", strength: "강함", pages: "강사진, 홈 요약", cta: "상담 CTA", fallback: "교육 철학/운영 방식", forbidden: "허위 경력" },
  { name: "커리큘럼 구조", strength: "강함", pages: "과정 상세, 홈 요약", cta: "체험수업 CTA", fallback: "주차별 학습 목표 텍스트", forbidden: "없음" },
  { name: "수강 대상 적합성", strength: "강함", pages: "홈 히어로, 과정 목록", cta: "전체 CTA", fallback: "없음(필수)", forbidden: "모호한 대상 표현" },
  { name: "운영 방식/학습 프로세스", strength: "보조", pages: "과정 상세, 홈", cta: "상담 CTA", fallback: "강사진 철학", forbidden: "없음" },
  { name: "성과/합격 사례", strength: "강함", pages: "성과 페이지, 홈 요약", cta: "상담 CTA", fallback: "운영 프로세스 강조", forbidden: "허위 수치, 과장" },
  { name: "수강 후기", strength: "보조", pages: "후기 페이지, 홈 요약", cta: "상담 CTA", fallback: "FAQ + 상담 프로세스", forbidden: "허위 후기" },
  { name: "지점/시설/학습환경", strength: "보조", pages: "지점, 홈", cta: "위치 CTA", fallback: "운영 시간/접근성 안내", forbidden: "허위 시설 사진" },
  { name: "설명회/상담 프로세스", strength: "보조", pages: "상담, 설명회", cta: "상담 CTA", fallback: "응답 시간 안내", forbidden: "없음" },
  { name: "교재/자료/학습 시스템", strength: "보조", pages: "과정 상세", cta: "체험수업 CTA", fallback: "커리큘럼 요약", forbidden: "저작권 침해" },
  { name: "FAQ/정책 안내", strength: "보조", pages: "홈, 상담", cta: "상담 CTA", fallback: "상담 프로세스", forbidden: "없음" },
];

const ProofSystem = () => (
  <div className="space-y-10">
    <PageHeader
      title="신뢰/성과 증빙 시스템"
      description="학원/교육 사이트에서 신뢰를 형성하는 10가지 증빙 요소의 강도, 배치 페이지, CTA 연결, 대체 방안, 금지 사항을 체계화합니다."
      summaryCards={[
        { title: "강한 증빙", body: "강사진 경력, 커리큘럼 구조, 대상 적합성, 성과/합격 사례" },
        { title: "보조 증빙", body: "후기, 시설, 교재, FAQ, 상담 프로세스" },
        { title: "상태 체계", body: "보유 / 부족 / 비공개 / 검토 필요" },
      ]}
      quickApply={[
        "강한 증빙 중 최소 2개 이상 CTA 근처에 배치",
        "허위 증빙 절대 금지: 경력, 성과, 후기",
        "부족 시 대체 증빙 요소로 보완",
        "검토 필요 요소는 표기 후 내부 검증",
      ]}
    />

    <section>
      <h2 className="text-2xl font-bold">증빙 요소 체계</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted">
            <tr>
              <th className="px-3 py-2 text-left font-medium">증빙 요소</th>
              <th className="px-3 py-2 text-left font-medium">강도</th>
              <th className="px-3 py-2 text-left font-medium">배치 페이지</th>
              <th className="px-3 py-2 text-left font-medium">CTA 연결</th>
              <th className="px-3 py-2 text-left font-medium">대체 방안</th>
              <th className="px-3 py-2 text-left font-medium">금지</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {proofElements.map((p) => (
              <tr key={p.name}>
                <td className="px-3 py-2 font-medium">{p.name}</td>
                <td className="px-3 py-2">
                  {p.strength === "강함" ? <BadgeTag type="proof 필요" /> : <BadgeTag type="권장" />}
                </td>
                <td className="px-3 py-2 text-muted-foreground">{p.pages}</td>
                <td className="px-3 py-2 text-muted-foreground">{p.cta}</td>
                <td className="px-3 py-2 text-muted-foreground">{p.fallback}</td>
                <td className="px-3 py-2 text-destructive">{p.forbidden}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold">증빙 상태 체계</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-4">
        {[
          { status: "보유", desc: "자산 확보됨, 바로 적용 가능", color: "bg-success text-success-foreground" },
          { status: "부족", desc: "자산 미확보, 대체 증빙 필요", color: "bg-muted text-muted-foreground" },
          { status: "비공개", desc: "자산은 있으나 공개 불가", color: "bg-secondary text-secondary-foreground" },
          { status: "검토 필요", desc: "내용 검증 필요", color: "bg-review-required text-review-required-foreground" },
        ].map((s) => (
          <Card key={s.status}>
            <CardHeader><div className={`inline-block rounded-md px-2 py-1 text-xs font-medium ${s.color}`}>{s.status}</div></CardHeader>
            <CardContent className="text-sm text-muted-foreground">{s.desc}</CardContent>
          </Card>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold">증빙 배치 원칙</h2>
      <div className="mt-4 space-y-3">
        {[
          "CTA 바로 위 또는 직전 섹션에 강한 증빙 배치",
          "홈페이지 히어로 직후에 대상 적합성 + 과정 요약",
          "상담 CTA 근처에 강사진 요약 또는 후기 요약",
          "성과 표현은 근거/기간/예시 데이터 동반 필수",
        ].map((rule) => (
          <div key={rule} className="rounded-md border bg-card p-3 text-sm">{rule}</div>
        ))}
      </div>
    </section>
  </div>
);

export default ProofSystem;
