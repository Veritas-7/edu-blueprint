import { useClientBrief } from "@/hooks/use-client-brief";
import { buildImplementationRules, getSiteTypeReason } from "@/lib/brief-engine";
import { PageHeader } from "@/components/docs/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ImplementationRules = () => {
  const { brief, score } = useClientBrief();
  const rules = buildImplementationRules(brief);

  if (score.percent < 50) {
    return (
      <div className="space-y-6">
        <PageHeader title="구현 규칙 엔진" description="브리프 기반으로 제작 규칙을 동적 생성합니다." summaryCards={[]} quickApply={[]} />
        <Card><CardContent className="p-6 text-center"><p className="text-muted-foreground">브리프 완성도가 50% 미만입니다.</p><Button asChild className="mt-4"><Link to="/client-brief">브리프 작성하기</Link></Button></CardContent></Card>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <PageHeader
        title="구현 규칙 엔진"
        description={`${brief.academyName || "고객사"} 브리프 기반 제작 규칙입니다.`}
        summaryCards={[
          { title: "사이트 유형", body: rules.siteType },
          { title: "사이트 초점", body: rules.focusTypes.join(", ") },
          { title: "판별 근거", body: getSiteTypeReason(brief) },
        ]}
        quickApply={["최소/표준/풀 구성 중 예산에 맞게 선택", "mustKeep 블록은 절대 제거 금지", "즉시 제작 지침 카드 참고"]}
      />

      {/* 사이트 초점 유형 */}
      <section>
        <h2 className="text-2xl font-bold">사이트 초점 유형</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {rules.focusTypes.map(f => (
            <Badge key={f} className="bg-accent text-accent-foreground">{f}</Badge>
          ))}
        </div>
      </section>

      {/* 분기 규칙 */}
      <section>
        <h2 className="text-2xl font-bold">분기 규칙</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card><CardHeader><CardTitle className="text-base">지점 규칙</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">{rules.branchRule}</CardContent></Card>
          <Card><CardHeader><CardTitle className="text-base">대상 규칙</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">{rules.audienceRule}</CardContent></Card>
          <Card><CardHeader><CardTitle className="text-base">상담 채널 규칙</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">{rules.channelRule}</CardContent></Card>
        </div>
      </section>

      {/* 자산 기반 규칙 */}
      <section>
        <h2 className="text-2xl font-bold">자산 기반 규칙</h2>
        <div className="mt-4 space-y-2">
          {rules.assetRules.map((r, i) => (
            <div key={i} className={`rounded-md border p-3 text-sm ${r.startsWith("✅") ? "border-success/30 bg-success/5" : "border-warning/30 bg-warning/5"}`}>
              {r}
            </div>
          ))}
        </div>
      </section>

      {/* 예산별 구성 */}
      <section>
        <h2 className="text-2xl font-bold">예산별 구성</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader><CardTitle className="text-base">최소 구성</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-1">
              {rules.budget.minimal.map(b => <span key={b} className="rounded bg-muted px-2 py-0.5 text-xs">{b}</span>)}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">표준 구성</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-1">
              {rules.budget.standard.map(b => <span key={b} className="rounded bg-info/10 px-2 py-0.5 text-xs">{b}</span>)}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">풀 구성</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-1">
              {rules.budget.full.map(b => <span key={b} className="rounded bg-success/10 px-2 py-0.5 text-xs">{b}</span>)}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 블록 관리 */}
      <section>
        <h2 className="text-2xl font-bold">블록 관리</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-base text-muted-foreground">제거 가능</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-1">
              {rules.removable.map(b => <span key={b} className="rounded bg-muted px-2 py-0.5 text-xs">{b}</span>)}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base text-success">절대 유지</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-1">
              {rules.mustKeep.map(b => <span key={b} className="rounded bg-success/10 px-2 py-0.5 text-xs">{b}</span>)}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 즉시 제작 지침 */}
      <section>
        <h2 className="text-2xl font-bold">즉시 제작 지침</h2>
        <div className="mt-4 space-y-2">
          {rules.instantGuide.map((g, i) => (
            <div key={i} className="rounded-md border border-accent/30 bg-accent/5 p-3 text-sm">{g}</div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ImplementationRules;
