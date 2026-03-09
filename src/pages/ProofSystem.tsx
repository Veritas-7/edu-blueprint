import { useClientBrief } from "@/hooks/use-client-brief";
import { getProofStatuses, getProofFallbacks } from "@/lib/brief-engine";
import { PageHeader } from "@/components/docs/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeTag } from "@/components/docs/BadgeTag";
import { CopyBlock } from "@/components/docs/CopyBlock";
import { Badge } from "@/components/ui/badge";

type ProofElement = {
  name: string;
  strength: "강함" | "보조";
  pages: string;
  cta: string;
  fallback: string;
  forbidden: string;
  reviewExpressions: string[];
  description: string;
};

const proofElements: ProofElement[] = [
  { name: "강사진 경력", strength: "강함", pages: "홈, 강사진, 과정 상세", cta: "상담 신청하기", fallback: "교육 철학/운영 방식 중심 대체", forbidden: "허위 경력, 허위 학위, 허위 수상", reviewExpressions: ["경력 ~년", "전공", "자격증"], description: "강사의 실제 교육 경력, 전공, 자격을 기반으로 전문성을 전달합니다." },
  { name: "커리큘럼 구조", strength: "강함", pages: "과정 목록, 과정 상세", cta: "과정 보기", fallback: "주차별 학습 목표 텍스트", forbidden: "허위 커리큘럼 구성", reviewExpressions: ["주차별 계획", "단계별 과정"], description: "체계적인 학습 흐름을 보여주어 교육의 구조적 신뢰를 높입니다." },
  { name: "수강 대상 적합성", strength: "강함", pages: "홈 히어로, 과정 카드", cta: "과정 보기", fallback: "일반적 대상 표기 + FAQ로 보충", forbidden: "대상 불명확 제목", reviewExpressions: ["학년", "레벨", "대상"], description: "'누구를 위한 과정인지'를 명확히 전달하여 방문자의 적합성 판단을 돕습니다." },
  { name: "운영 방식/학습 프로세스", strength: "보조", pages: "과정 상세, 홈", cta: "체험수업 신청", fallback: "단계별 학습 흐름 텍스트", forbidden: "과장된 학습 효과 주장", reviewExpressions: ["수업 방식", "관리 시스템"], description: "학습 관리 프로세스와 운영 방식을 통해 체계적 운영을 보여줍니다." },
  { name: "성과/합격 사례", strength: "강함", pages: "홈, 성과 페이지", cta: "상담 신청하기", fallback: "운영 프로세스/학습 방식 강조", forbidden: "허위 합격률, 허위 점수향상, 허위 성과 보장", reviewExpressions: ["합격", "점수 향상", "수료"], description: "검증된 학습 성과를 근거와 함께 제시하여 결과에 대한 신뢰를 높입니다." },
  { name: "수강 후기", strength: "강함", pages: "홈, 후기 페이지", cta: "상담 신청하기", fallback: "FAQ + 상담 프로세스 상세", forbidden: "허위 후기, 동의 없는 후기 게시", reviewExpressions: ["수강 기간", "수강 과정", "만족도"], description: "실제 수강생의 경험을 바탕으로 교육 서비스의 품질을 전달합니다." },
  { name: "지점/시설/학습환경", strength: "보조", pages: "홈, 지점/캠퍼스", cta: "길찾기", fallback: "지도/주소/운영시간 텍스트", forbidden: "과도하게 보정된 시설 사진", reviewExpressions: ["교실", "시설", "학습 환경"], description: "실제 학습 환경을 보여주어 오프라인 방문에 대한 신뢰를 높입니다." },
  { name: "설명회/상담 프로세스", strength: "보조", pages: "상담 페이지", cta: "설명회 예약", fallback: "전화/폼 이중 채널 안내", forbidden: "응답 시간 과장", reviewExpressions: ["상담 절차", "응답 시간"], description: "상담부터 등록까지의 과정을 안내하여 행동 전환의 심리적 장벽을 낮춥니다." },
  { name: "교재/자료/학습 시스템", strength: "보조", pages: "과정 상세", cta: "과정 보기", fallback: "주차별 학습 목표 텍스트", forbidden: "허위 교재/자료 이미지", reviewExpressions: ["교재", "학습 자료", "LMS"], description: "학습에 사용되는 교재와 자료를 보여주어 교육 품질을 전달합니다." },
  { name: "FAQ/정책 안내", strength: "보조", pages: "상담, 홈 하단", cta: "상담 신청하기", fallback: "기본 FAQ 템플릿 제공", forbidden: "광고성 FAQ", reviewExpressions: ["자주 묻는 질문", "환불 정책"], description: "자주 묻는 질문을 통해 의사결정에 필요한 정보를 사전 제공합니다." },
];

const placementMatrix = `CTA 배치 규칙
- 강한 증빙 2개 이상을 상담 CTA 근처에 배치
- 홈페이지: 강사진 + 과정 구조 + 성과(있는 경우)
- 과정 상세: 커리큘럼 + 수강 대상 + 수강료(공개 시)
- 상담 페이지: 상담 프로세스 + 운영 시간 + FAQ

페이지별 필수 proof
- 홈: 대상 적합성 + 핵심 과정 + 강사진 요약
- 과정 상세: 커리큘럼 + 대상 + 수강 방식
- 강사진: 경력(검증된 것만) + 교육 철학
- 상담: 상담 프로세스 + 응답 시간`;

const statusColorMap: Record<string, string> = {
  "보유": "bg-success/10 text-success border-success/30",
  "부족": "bg-warning/10 text-warning border-warning/30",
  "비공개": "bg-muted text-muted-foreground border-border",
  "검토 필요": "bg-review-required/10 text-review-required border-review-required/30",
};

const ProofSystem = () => {
  const { brief, score } = useClientBrief();
  const proofStatuses = getProofStatuses(brief);
  const proofFallbacks = getProofFallbacks(proofStatuses);
  const hasBrief = score.percent >= 30;

  return (
    <div className="space-y-10">
      <PageHeader
        title="신뢰/성과 증빙 시스템"
        description="교육 사이트에서 신뢰를 구축하는 10가지 증빙 요소의 운영 기준과 배치 규칙을 제공합니다."
        tocItems={[
          ...(hasBrief ? [{ id: "brief-asset-status", label: "브리프 기반 자산 상태" }] : []),
          { id: "proof-details", label: "증빙 요소 상세" },
          { id: "proof-comparison", label: "증빙 강도 비교" },
          { id: "placement-rules", label: "배치 규칙 매트릭스" },
          { id: "proof-status-system", label: "증빙 상태 체계" },
          { id: "core-rules", label: "핵심 규칙" },
        ]}
        summaryCards={[
          { title: "강한 증빙", body: "강사진, 커리큘럼, 대상, 성과, 후기 (5개)" },
          { title: "보조 증빙", body: "시설, 운영, 상담, 교재, FAQ (5개)" },
          { title: "핵심 원칙", body: "허위 금지 · 근거 중심 · 대체안 제시" },
        ]}
        quickApply={[
          "강한 증빙 2개 이상을 CTA 근처에 배치",
          "성과 수치는 반드시 기간/출처 동반",
          "허위 경력/후기/성과 절대 금지",
          "부족 증빙은 대체 요소 활용",
        ]}
      />

      {hasBrief && (
        <section>
          <h2 id="brief-asset-status" className="text-2xl font-bold">브리프 기반 자산 상태</h2>
          <p className="mt-1 text-sm text-muted-foreground">현재 브리프 데이터 기준으로 각 증빙 요소의 보유 상태를 표시합니다.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {proofStatuses.map((ps) => (
              <div key={ps.name} className={`rounded-md border p-3 ${statusColorMap[ps.status]}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{ps.name}</span>
                  <Badge variant="outline" className="text-xs">{ps.status}</Badge>
                </div>
                <p className="mt-1 text-xs opacity-80">강도: {ps.strength} | 배치: {ps.placement}</p>
                {ps.status !== "보유" && <p className="mt-1 text-xs opacity-70">대체안: {ps.fallback}</p>}
              </div>
            ))}
          </div>

          {proofFallbacks.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="text-base font-semibold">대체 조합 제안</h3>
              {proofFallbacks.map((fb, i) => (
                <div key={i} className="rounded-md border border-info/30 bg-info/5 p-3 text-sm">
                  <p className="font-medium">{fb.condition}</p>
                  <ul className="mt-1 text-xs text-muted-foreground">{fb.alternatives.map(a => <li key={a}>→ {a}</li>)}</ul>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <section>
        <h2 id="proof-details" className="text-2xl font-bold">증빙 요소 상세</h2>
        <div className="mt-4 space-y-4">
          {proofElements.map((el) => (
            <Card key={el.name}>
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <CardTitle className="text-base">{el.name}</CardTitle>
                <Badge className={el.strength === "강함" ? "bg-proof-strong text-proof-strong-foreground" : "bg-proof-supporting text-proof-supporting-foreground"}>{el.strength}</Badge>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-muted-foreground">{el.description}</p>
                <div className="grid gap-2 md:grid-cols-2">
                  <p><span className="font-medium">배치 페이지:</span> <span className="text-muted-foreground">{el.pages}</span></p>
                  <p><span className="font-medium">근접 CTA:</span> <span className="text-muted-foreground">{el.cta}</span></p>
                  <p><span className="font-medium">대체 요소:</span> <span className="text-muted-foreground">{el.fallback}</span></p>
                  <div><span className="font-medium">검토 표현:</span> <span className="text-muted-foreground">{el.reviewExpressions.join(", ")}</span></div>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeTag type="금지" />
                  <span className="text-muted-foreground">{el.forbidden}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 id="proof-comparison" className="text-2xl font-bold">증빙 강도 비교</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-3 py-2 text-left font-medium">요소</th>
                <th className="px-3 py-2 text-left font-medium">강도</th>
                <th className="px-3 py-2 text-left font-medium">배치</th>
                <th className="px-3 py-2 text-left font-medium">CTA</th>
              </tr>
            </thead>
            <tbody>
              {proofElements.map((el) => (
                <tr key={el.name} className="border-b">
                  <td className="px-3 py-2 font-medium">{el.name}</td>
                  <td className="px-3 py-2">
                    <Badge className={el.strength === "강함" ? "bg-proof-strong text-proof-strong-foreground" : "bg-proof-supporting text-proof-supporting-foreground"}>{el.strength}</Badge>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{el.pages}</td>
                  <td className="px-3 py-2 text-muted-foreground">{el.cta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section><CopyBlock title="배치 규칙 매트릭스" content={placementMatrix} /></section>

      <section>
        <h2 id="proof-status-system" className="text-2xl font-bold">증빙 상태 체계</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {(["보유", "부족", "비공개", "검토 필요"] as const).map(status => (
            <Card key={status}>
              <CardContent className={`p-4 rounded-md ${statusColorMap[status]}`}>
                <h3 className="font-semibold">{status}</h3>
                <p className="mt-1 text-xs opacity-80">
                  {status === "보유" && "자산이 확보되어 즉시 사용 가능"}
                  {status === "부족" && "자산 미확보. 대체 요소 활용 필요"}
                  {status === "비공개" && "자산은 있으나 공개하지 않음"}
                  {status === "검토 필요" && "내부 검증 후 사용 가능 여부 결정"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 id="core-rules" className="text-2xl font-bold">핵심 규칙</h2>
        <div className="mt-4 space-y-2">
          {[
            "강한 증빙 2개 이상을 상담 CTA 근처에 배치해야 한다",
            "성과/합격 수치는 반드시 기간, 출처, 조건을 함께 표기한다",
            "허위 후기, 허위 경력, 허위 합격률, 허위 점수향상을 만들지 않는다",
            "증빙 부족 시 대체 요소를 반드시 활용한다",
            "검토 필요 요소는 내부 검증 완료 후에만 공개한다",
            "예시 데이터 사용 시 반드시 '예시 데이터'라고 명시한다",
          ].map((rule, i) => (
            <div key={i} className="rounded-md border bg-card p-3 text-sm">{rule}</div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProofSystem;
