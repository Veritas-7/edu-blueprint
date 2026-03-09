import { useClientBrief } from "@/hooks/use-client-brief";
import { inferSiteType, getPageSet, buildBlueprintBlocks, getSiteTypeReason, buildLovablePrompt, buildMetaSuggestions, getProofStatuses, getProofFallbacks, serializeBlueprintBlock } from "@/lib/brief-engine";
import { PageHeader } from "@/components/docs/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyBlock } from "@/components/docs/CopyBlock";
import { BadgeTag } from "@/components/docs/BadgeTag";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const copyBlockText = async (block: { section: string }, serialized: string) => {
  await navigator.clipboard.writeText(serialized);
  toast({ title: "복사 완료", description: `${block.section} 블록을 복사했습니다.` });
};

const SiteBlueprint = () => {
  const { brief, score } = useClientBrief();
  const siteType = inferSiteType(brief);
  const siteTypeReason = getSiteTypeReason(brief);
  const pageSet = getPageSet(siteType);
  const blocks = buildBlueprintBlocks(brief);
  const lovablePrompt = buildLovablePrompt(brief);
  const metaSuggestions = buildMetaSuggestions(brief);
  const proofStatuses = getProofStatuses(brief);
  const proofFallbacks = getProofFallbacks(proofStatuses);

  if (score.percent < 50) {
    return (
      <div className="space-y-6">
        <PageHeader title="사이트 청사진" description="Client Brief 기반으로 공개용 사이트 구조를 자동 생성합니다." summaryCards={[]} quickApply={[]} />
        <Card><CardContent className="p-6 text-center"><p className="text-muted-foreground">브리프 완성도가 50% 미만입니다. 먼저 브리프를 작성해 주세요.</p><Button asChild className="mt-4"><Link to="/client-brief">브리프 작성하기</Link></Button></CardContent></Card>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <PageHeader
        title="사이트 청사진"
        description={`${brief.academyName || "고객사"} 브리프 기반으로 생성된 공개용 교육 사이트 구조입니다.`}
        summaryCards={[
          { title: "추천 사이트 유형", body: siteType },
          { title: "브리프 완성도", body: `${score.percent}%` },
          { title: "필수 페이지", body: `${pageSet.required.length}개` },
        ]}
        quickApply={["각 블록 복사 후 Lovable 프롬프트에 활용", "SEO 포인트 및 CTA 확인", "자산 부족 시 대체안 참고"]}
      />

      {/* 판별 근거 */}
      <section className="rounded-lg border bg-card p-4">
        <h2 className="text-lg font-bold">사이트 유형 판별 근거</h2>
        <p className="mt-2 text-sm text-muted-foreground">{siteTypeReason}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge className="bg-accent text-accent-foreground">{siteType}</Badge>
          <Badge variant="outline">{brief.educationSubtype}</Badge>
          <Badge variant="outline">{brief.branchType}</Badge>
          <Badge variant="outline">{brief.operationType}</Badge>
        </div>
      </section>

      {/* 페이지 구성 */}
      <section>
        <h2 className="text-2xl font-bold">페이지 구성</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card><CardHeader><CardTitle className="text-base text-success">필수 페이지</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{pageSet.required.map(p => <span key={p} className="rounded-md bg-success/10 px-2 py-1 text-xs">{p}</span>)}</CardContent></Card>
          <Card><CardHeader><CardTitle className="text-base text-info">선택 페이지</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{pageSet.optional.map(p => <span key={p} className="rounded-md bg-info/10 px-2 py-1 text-xs">{p}</span>)}</CardContent></Card>
          <Card><CardHeader><CardTitle className="text-base text-muted-foreground">제거 가능</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{pageSet.removable.map(p => <span key={p} className="rounded-md bg-muted px-2 py-1 text-xs">{p}</span>)}</CardContent></Card>
          <Card><CardHeader><CardTitle className="text-base text-destructive">금지</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{pageSet.forbidden.map(p => <span key={p} className="rounded-md bg-destructive/10 px-2 py-1 text-xs">{p}</span>)}</CardContent></Card>
        </div>
      </section>

      {/* Proof 상태 요약 */}
      <section>
        <h2 className="text-2xl font-bold">Proof 자산 상태</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {proofStatuses.map(ps => (
            <div key={ps.name} className={`rounded-md border p-3 text-sm ${ps.status === "보유" ? "border-success/30 bg-success/5" : ps.status === "비공개" ? "border-border bg-muted" : ps.status === "검토 필요" ? "border-warning/30 bg-warning/5" : "border-warning/30 bg-warning/5"}`}>
              <div className="flex items-center justify-between">
                <span className="font-medium">{ps.name}</span>
                <Badge variant="outline" className="text-xs">{ps.status}</Badge>
              </div>
              {ps.status !== "보유" && <p className="mt-1 text-xs text-muted-foreground">대체: {ps.fallback}</p>}
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

      {/* 블록 출력 */}
      {blocks.map((block) => {
        const serialized = serializeBlueprintBlock(block);
        return (
          <section key={block.section}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{block.section}</h2>
              <Button type="button" variant="outline" size="sm" onClick={() => copyBlockText(block, serialized)}>
                <Copy className="h-4 w-4" /> 복사
              </Button>
            </div>
            <Card className="mt-4">
              <CardContent className="p-4 space-y-4 text-sm">
                <div className="grid gap-4 md:grid-cols-2">
                  <div><h3 className="font-semibold mb-1">필수 블록</h3><div className="flex flex-wrap gap-1">{block.required.map(b => <span key={b} className="rounded bg-primary/10 px-2 py-0.5 text-xs">{b}</span>)}</div></div>
                  <div><h3 className="font-semibold mb-1">선택 블록</h3><div className="flex flex-wrap gap-1">{block.optional.map(b => <span key={b} className="rounded bg-muted px-2 py-0.5 text-xs">{b}</span>)}</div></div>
                  <div><h3 className="font-semibold mb-1">조건부 블록</h3><div className="flex flex-wrap gap-1">{block.conditional.map(b => <span key={b} className="rounded bg-warning/10 px-2 py-0.5 text-xs">{b}</span>)}</div></div>
                  <div><h3 className="font-semibold mb-1">금지 블록</h3><div className="flex flex-wrap gap-1">{block.forbidden.map(b => <span key={b} className="rounded bg-destructive/10 px-2 py-0.5 text-xs">{b}</span>)}</div></div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div><h3 className="font-semibold mb-1">핵심 CTA</h3><p className="text-muted-foreground">{block.coreCta}</p></div>
                  <div><h3 className="font-semibold mb-1">보조 CTA</h3><p className="text-muted-foreground">{block.subCta}</p></div>
                  <div><h3 className="font-semibold mb-1">Proof 요소</h3><p className="text-muted-foreground">{block.proof.join(", ")}</p></div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div><h3 className="font-semibold mb-1">모바일 축약</h3><p className="text-muted-foreground">{block.mobileRule}</p></div>
                  <div><h3 className="font-semibold mb-1">SEO 포인트</h3><p className="text-muted-foreground">{block.seoPoint}</p></div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div><h3 className="font-semibold mb-1">자산 부족 시</h3><p className="text-muted-foreground">{block.fallback}</p></div>
                  <div><h3 className="font-semibold mb-1">유형별 변경점</h3><p className="text-muted-foreground">{block.bySubtype || "해당 없음"}</p></div>
                </div>
                {block.reviewClaim && (
                  <div className="flex items-center gap-2"><BadgeTag type="검토 필요" /><span className="text-muted-foreground">{block.reviewClaim}</span></div>
                )}
              </CardContent>
            </Card>
          </section>
        );
      })}

      {/* 메타 타이틀/디스크립션 */}
      <section>
        <h2 className="text-2xl font-bold">메타 타이틀/디스크립션 예시</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {Object.entries(metaSuggestions).map(([key, meta]) => (
            <Card key={key}>
              <CardHeader><CardTitle className="text-base capitalize">{key}</CardTitle></CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p><span className="font-medium">title:</span> <span className="text-muted-foreground">{meta.title}</span></p>
                <p><span className="font-medium">description:</span> <span className="text-muted-foreground">{meta.description}</span></p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* JSON-LD 추천 */}
      <section>
        <h2 className="text-2xl font-bold">JSON-LD 유형 추천</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {["EducationalOrganization", "Course", "LocalBusiness", "FAQPage", "BreadcrumbList"].map(schema => (
            <Badge key={schema} variant="outline" className="text-sm">{schema}</Badge>
          ))}
        </div>
      </section>

      {/* Lovable 프롬프트 */}
      <section>
        <CopyBlock title="Lovable용 공개 사이트 생성 프롬프트" content={lovablePrompt} />
      </section>
    </div>
  );
};

export default SiteBlueprint;
