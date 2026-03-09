import { Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CopyBlockProps = {
  title: string;
  content: string;
};

export const CopyBlock = ({ title, content }: CopyBlockProps) => {
  const onCopy = async () => {
    await navigator.clipboard.writeText(content);
    toast({ title: "복사 완료", description: `${title} 블록을 복사했습니다.` });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">{title}</CardTitle>
        <Button type="button" variant="outline" size="sm" onClick={onCopy}>
          <Copy className="h-4 w-4" /> 복사
        </Button>
      </CardHeader>
      <CardContent>
        <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm text-foreground">
          <code>{content}</code>
        </pre>
      </CardContent>
    </Card>
  );
};
