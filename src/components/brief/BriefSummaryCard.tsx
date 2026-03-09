import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { inferSiteType, getSiteTypeReason } from "@/lib/brief-engine";
import { ClientBriefData } from "@/lib/brief-schema";
import { SaveStatus } from "@/hooks/use-client-brief";
import { CheckCircle, AlertTriangle, Loader2, Clock } from "lucide-react";

type BriefSummaryCardProps = {
  brief: ClientBriefData;
  score: { completed: number; total: number; percent: number; missing: string[] };
  lastSavedAt: string | null;
  saveStatus: SaveStatus;
};

const saveStatusConfig: Record<SaveStatus, { icon: typeof CheckCircle; label: string; className: string }> = {
  idle: { icon: Clock, label: "대기", className: "text-muted-foreground" },
  saving: { icon: Loader2, label: "저장 중...", className: "text-info animate-spin" },
  saved: { icon: CheckCircle, label: "저장 완료", className: "text-success" },
  error: { icon: AlertTriangle, label: "저장 실패", className: "text-destructive" },
};

const missingFieldGroups = (missing: string[]) => {
  const groups: { label: string; fields: string[] }[] = [
    { label: "기본 정보", fields: [] },
    { label: "자산/채널", fields: [] },
    { label: "CTA/톤", fields: [] },
  ];
  const basicFields = ["academyName", "educationSubtype", "operationType", "branchType", "region"];
  const assetFields = ["targetAges", "corePrograms", "consultingChannels"];
  const ctaFields = ["ctaPriority", "brandTone"];

  for (const f of missing) {
    if (basicFields.includes(f)) groups[0].fields.push(f);
    else if (assetFields.includes(f)) groups[1].fields.push(f);
    else if (ctaFields.includes(f)) groups[2].fields.push(f);
    else groups[0].fields.push(f);
  }
  return groups.filter(g => g.fields.length > 0);
};

export const BriefSummaryCard = ({ brief, score, lastSavedAt, saveStatus }: BriefSummaryCardProps) => {
  const siteType = inferSiteType(brief);
  const siteTypeReason = getSiteTypeReason(brief);
  const StatusIcon = saveStatusConfig[saveStatus].icon;
  const groups = missingFieldGroups(score.missing);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">완성도</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{score.percent}%</div>
            <p className="text-xs text-muted-foreground">{score.completed}/{score.total} 필수 항목</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">예상 사이트 유형</CardTitle></CardHeader>
          <CardContent>
            <Badge className="bg-accent text-accent-foreground">{siteType}</Badge>
            <p className="mt-1 text-xs text-muted-foreground">{siteTypeReason}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">저장 상태</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-1.5">
              <StatusIcon className={`h-4 w-4 ${saveStatusConfig[saveStatus].className}`} />
              <span className="text-sm">{saveStatusConfig[saveStatus].label}</span>
            </div>
            {lastSavedAt && <p className="mt-1 text-xs text-muted-foreground">{new Date(lastSavedAt).toLocaleString("ko-KR")}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">스키마 버전</CardTitle></CardHeader>
          <CardContent>
            <span className="text-sm font-mono">1.0.0</span>
          </CardContent>
        </Card>
      </div>

      {groups.length > 0 && (
        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">누락 필드 ({score.missing.length}개)</span>
            </div>
            <div className="grid gap-2 md:grid-cols-3">
              {groups.map(g => (
                <div key={g.label}>
                  <p className="text-xs font-medium text-muted-foreground mb-1">{g.label}</p>
                  <div className="flex flex-wrap gap-1">
                    {g.fields.map(f => (
                      <Badge key={f} variant="outline" className="text-xs">{f}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
