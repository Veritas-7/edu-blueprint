import { useClientBrief } from "@/hooks/use-client-brief";
import { buildImplementationRules, getSiteTypeReason } from "@/lib/brief-engine";
import { PageHeader } from "@/components/docs/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const ImplementationRules = () => {
  const { brief, score } = useClientBrief();
  const rules = buildImplementationRules(brief);
  const showPartial = score.percent >= 30 && score.percent < 50;

  if (score.percent < 30) {
    return (
      <div className="space-y-6">
        <PageHeader title="구현 규칙 엔진" description="브리프 기반으로 제작 규칙을 동적 생성합니다." summaryCards={[]} quickApply={[]} />
        <Card><CardContent className="p-6 text-center"><p className="text-muted-foreground">브리프 완성도가 30% 미만입니다.</p><Button asChild className="mt-4"><Link to="/client-brief">브리프 작성하기</Link></Button></CardContent></Card>
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

      {showPartial && (
        <div className="flex items-center gap-2 rounded-md border border-warning bg-warning/10 p-3 text-sm">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <span>브리프 완성도가 50% 미만입니다. 결과가 부정확할 수 있습니다. <Link to="/client-brief" className="underline font-medium">브리프 보완하기</Link></span>
        </div>
      )}

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

      {/* 자산 기반 규칙 (proof-aware) */}
      <section>
        <h2 className="text-2xl font-bold">자산 기반 규칙</h2>
        <div className="mt-4 space-y-2">
          {rules.assetRules.map((r, i) => (
            <div key={i} className={`rounded-md border p-3 text-sm ${r.startsWith("✅") ? "border-success/30 bg-success/5" : r.startsWith("🔒") ? "border-border bg-muted" : "border-warning/30 bg-warning/5"}`}>
              {r}
            </div>
          ))}
        </div>
        {rules.proofFallbacks.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-base font-semibold">Proof 부족 대체 조합</h3>
            {rules.proofFallbacks.map((fb, i) => (
              <div key={i} className="rounded-md border border-info/30 bg-info/5 p-3 text-sm">
                <p className="font-medium">{fb.condition}</p>
                <ul className="mt-1 text-xs text-muted-foreground">{fb.alternatives.map(a => <li key={a}>→ {a}</li>)}</ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 예산별 구성 */}
      <section>
        <h2 className="text-2xl font-bold">예산별 구성</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {(["minimal", "standard", "full"] as const).map(tier => {
            const items = rules.budget[tier];
            const labels = { minimal: "최소 구성", standard: "표준 구성", full: "풀 구성" };
            const colors = { minimal: "bg-muted", standard: "bg-info/10", full: "bg-success/10" };
            return (
              <Card key={tier}>
                <CardHeader><CardTitle className="text-base">{labels[tier]}</CardTitle></CardHeader>
                <CardContent className="space-y-1.5">
                  {items.map(b => (
                    <div key={b.name} className={`rounded ${colors[tier]} px-2 py-1`}>
                      <span className="text-xs font-medium">{b.name}</span>
                      <p className="text-xs text-muted-foreground">{b.reason}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
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
            <div key={i} className={`rounded-md border p-3 text-sm ${g.startsWith("⚠️") ? "border-warning/30 bg-warning/5" : "border-accent/30 bg-accent/5"}`}>{g}</div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ImplementationRules;
