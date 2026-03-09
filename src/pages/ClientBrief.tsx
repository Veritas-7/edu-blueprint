import { useClientBrief } from "@/hooks/use-client-brief";
import { PageHeader } from "@/components/docs/PageHeader";
import { BriefSummaryCard } from "@/components/brief/BriefSummaryCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, Upload, RotateCcw, Sparkles, AlertTriangle } from "lucide-react";
import { EducationSubtype } from "@/lib/brief-schema";

const subtypes: EducationSubtype[] = ["보습", "입시", "영어/어학", "수학", "국어/과학", "성인어학", "자격증", "취업/직무", "코딩/디지털", "예체능", "교습소/공부방", "기타"];
const ageOptions = ["초등", "중학생", "고등학생", "대학생", "성인", "직장인"];
const channelOptions = ["전화", "카카오", "폼", "채팅", "이메일"];
const featureOptions = ["상담", "체험수업", "설명회"];
const pageOptions = ["홈", "과정 목록", "과정 상세", "강사진", "지점", "성과", "후기", "시간표", "상담/문의", "설명회/체험", "블로그"];
const ctaOptions = ["상담 신청하기", "체험수업 신청", "설명회 예약", "전화 문의", "카카오 문의", "과정 보기"];

const ClientBrief = () => {
  const { brief, updateField, reset, fillExample, exportJson, importJson, lastSavedAt, score, error, saveStatus, importError } = useClientBrief();

  const handleExport = () => {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "client-brief.json"; a.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { importJson(ev.target?.result as string); };
    reader.readAsText(file);
  };

  const toggleArray = (arr: string[], val: string) => arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];

  return (
    <div className="space-y-8">
      <PageHeader
        title="고객사 브리프 도구"
        description="교육 고객사 정보를 입력하고 자동 저장합니다. JSON 내보내기/불러오기, 예시 데이터 채우기, 누락 항목 경고를 지원합니다."
        summaryCards={[]}
        quickApply={["자동 저장 활성화 (실패 시 자동 재시도)", "JSON 내보내기로 백업", "예시 데이터로 빠른 테스트"]}
      />

      <BriefSummaryCard brief={brief} score={score} lastSavedAt={lastSavedAt} saveStatus={saveStatus} />

      {error && (
        <div className="flex items-center gap-2 rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
          {importError && <Badge variant="outline" className="ml-auto text-xs">{importError}</Badge>}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={fillExample}><Sparkles className="h-4 w-4" />예시 데이터</Button>
        <Button variant="outline" size="sm" onClick={reset}><RotateCcw className="h-4 w-4" />초기화</Button>
        <Button variant="outline" size="sm" onClick={handleExport}><Download className="h-4 w-4" />JSON 내보내기</Button>
        <label className="inline-flex cursor-pointer items-center gap-1 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"><Upload className="h-4 w-4" />JSON 불러오기<input type="file" accept=".json" className="hidden" onChange={handleImport} /></label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card><CardHeader><CardTitle className="text-base">학원명/브랜드명</CardTitle></CardHeader><CardContent><Input value={brief.academyName} onChange={e => updateField("academyName", e.target.value)} placeholder="예: 에듀브릿지 학습센터" /></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">교육 세부 유형</CardTitle></CardHeader><CardContent><Select value={brief.educationSubtype} onValueChange={v => updateField("educationSubtype", v as EducationSubtype)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{subtypes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">타겟 연령대</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{ageOptions.map(a => <label key={a} className="flex items-center gap-1 text-sm"><Checkbox checked={brief.targetAges.includes(a)} onCheckedChange={() => updateField("targetAges", toggleArray(brief.targetAges, a))} />{a}</label>)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">핵심 과목/프로그램</CardTitle></CardHeader><CardContent><Textarea value={brief.corePrograms} onChange={e => updateField("corePrograms", e.target.value)} placeholder="예: 내신 관리반, 수능 대비반, 주말 심화 특강" /></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">운영 방식</CardTitle></CardHeader><CardContent><Select value={brief.operationType} onValueChange={v => updateField("operationType", v as "오프라인"|"온라인"|"하이브리드")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="오프라인">오프라인</SelectItem><SelectItem value="온라인">온라인</SelectItem><SelectItem value="하이브리드">하이브리드</SelectItem></SelectContent></Select></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">지점 유형</CardTitle></CardHeader><CardContent><Select value={brief.branchType} onValueChange={v => updateField("branchType", v as "단일 지점"|"다지점")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="단일 지점">단일 지점</SelectItem><SelectItem value="다지점">다지점</SelectItem></SelectContent></Select></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">지역/상권</CardTitle></CardHeader><CardContent><Input value={brief.region} onChange={e => updateField("region", e.target.value)} placeholder="예: 서울 강남구 대치동" /></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">시간표/운영시간</CardTitle></CardHeader><CardContent><Input value={brief.schedule} onChange={e => updateField("schedule", e.target.value)} placeholder="예: 평일 14:00~22:00" /></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">수강료 공개 여부</CardTitle></CardHeader><CardContent><Select value={brief.tuitionPublic} onValueChange={v => updateField("tuitionPublic", v as "공개"|"비공개"|"부분 공개")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="공개">공개</SelectItem><SelectItem value="비공개">비공개</SelectItem><SelectItem value="부분 공개">부분 공개</SelectItem></SelectContent></Select></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">상담 채널</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{channelOptions.map(c => <label key={c} className="flex items-center gap-1 text-sm"><Checkbox checked={brief.consultingChannels.includes(c)} onCheckedChange={() => updateField("consultingChannels", toggleArray(brief.consultingChannels, c))} />{c}</label>)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">상담/체험/설명회</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{featureOptions.map(f => <label key={f} className="flex items-center gap-1 text-sm"><Checkbox checked={brief.consultingFeatures.includes(f)} onCheckedChange={() => updateField("consultingFeatures", toggleArray(brief.consultingFeatures, f))} />{f}</label>)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">보유 자산</CardTitle></CardHeader><CardContent className="space-y-2">{[{k:"hasTeacherProfile",l:"강사진 프로필"},{k:"hasResults",l:"성과/합격 사례"},{k:"hasReviews",l:"수강 후기"},{k:"hasFacilityAssets",l:"시설/교실 사진"}].map(({k,l})=><label key={k} className="flex items-center gap-2 text-sm"><Checkbox checked={brief[k as keyof typeof brief] as boolean} onCheckedChange={v=>updateField(k as any,!!v)} />{l}</label>)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">필수 페이지</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{pageOptions.map(p => <label key={p} className="flex items-center gap-1 text-sm"><Checkbox checked={brief.requiredPages.includes(p)} onCheckedChange={() => updateField("requiredPages", toggleArray(brief.requiredPages, p))} />{p}</label>)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">CTA 우선순위</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{ctaOptions.map(c => <label key={c} className="flex items-center gap-1 text-sm"><Checkbox checked={brief.ctaPriority.includes(c)} onCheckedChange={() => updateField("ctaPriority", toggleArray(brief.ctaPriority, c))} />{c}</label>)}</CardContent></Card>
        <Card className="md:col-span-2"><CardHeader><CardTitle className="text-base">브랜드 톤</CardTitle></CardHeader><CardContent><Input value={brief.brandTone} onChange={e => updateField("brandTone", e.target.value)} placeholder="예: 신뢰형, 구조적, 과장 없는 안내형" /></CardContent></Card>
        <Card className="md:col-span-2"><CardHeader><CardTitle className="text-base">금지 표현</CardTitle></CardHeader><CardContent><Input value={brief.forbiddenPhrases} onChange={e => updateField("forbiddenPhrases", e.target.value)} placeholder="예: 합격 보장, 100%, 업계 최고" /></CardContent></Card>
        <Card className="md:col-span-2"><CardHeader><CardTitle className="text-base">포지셔닝 메모</CardTitle></CardHeader><CardContent><Textarea value={brief.positioningMemo} onChange={e => updateField("positioningMemo", e.target.value)} placeholder="예: 학부모 신뢰 기반의 내신+입시 통합 운영" rows={3} /></CardContent></Card>
      </div>
    </div>
  );
};

export default ClientBrief;
