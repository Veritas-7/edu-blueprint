import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TagType = "필수" | "권장" | "선택" | "조건부" | "금지" | "proof 필요" | "검토 필요";

const classMap: Record<TagType, string> = {
  필수: "bg-primary text-primary-foreground",
  권장: "bg-info text-info-foreground",
  선택: "bg-muted text-muted-foreground",
  조건부: "bg-proof-supporting text-proof-supporting-foreground",
  금지: "bg-destructive text-destructive-foreground",
  "proof 필요": "bg-proof-strong text-proof-strong-foreground",
  "검토 필요": "bg-review-required text-review-required-foreground",
};

export const BadgeTag = ({ type }: { type: TagType }) => {
  return <Badge className={cn("rounded-md px-2 py-1 text-xs", classMap[type])}>{type}</Badge>;
};
