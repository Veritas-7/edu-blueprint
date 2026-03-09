import { ReactNode } from "react";
import { BadgeTag } from "@/components/docs/BadgeTag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PageHeaderProps = {
  title: string;
  description: string;
  summaryCards: { title: string; body: string }[];
  quickApply: string[];
  children?: ReactNode;
};

export const PageHeader = ({ title, description, summaryCards, quickApply, children }: PageHeaderProps) => {
  return (
    <header className="space-y-6">
      <div className="space-y-3">
        <BadgeTag type="필수" />
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
        <p className="max-w-4xl text-muted-foreground">{description}</p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle className="text-base">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{card.body}</CardContent>
          </Card>
        ))}
      </section>

      <section className="rounded-lg border bg-card p-4">
        <h2 className="mb-3 text-lg font-semibold">빠른 적용 포인트</h2>
        <ul className="grid gap-2 md:grid-cols-2">
          {quickApply.map((point) => (
            <li key={point} className="text-sm text-muted-foreground">
              • {point}
            </li>
          ))}
        </ul>
      </section>

      {children}
    </header>
  );
};
