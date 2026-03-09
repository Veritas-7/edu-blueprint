import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { guideNavItems } from "@/lib/navigation";
import { ArrowRight, BookOpen, ClipboardCheck, FileText, Layers, Search, Shield, Smartphone } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "/industry-overview": <Layers className="h-5 w-5" />,
  "/design-guide": <BookOpen className="h-5 w-5" />,
  "/ui-guide": <FileText className="h-5 w-5" />,
  "/ux-guide": <Smartphone className="h-5 w-5" />,
  "/proof-system": <Shield className="h-5 w-5" />,
  "/seo-geo": <Search className="h-5 w-5" />,
  "/checklist": <ClipboardCheck className="h-5 w-5" />,
};

const Index = () => {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="rounded-xl bg-primary px-6 py-12 text-primary-foreground md:px-12 md:py-16">
        <Badge className="mb-4 bg-accent text-accent-foreground">내부 제작 기준서 시스템</Badge>
        <h1 className="text-3xl font-bold md:text-5xl">학원/교육 업종 웹 제작 가이드</h1>
        <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
          신뢰 · 적합성 · 전환을 동시에 달성하는 교육 사이트 제작 시스템.
          디자인 가이드부터 브리프 도구, 공개 사이트 청사진, 구현 규칙까지 한 곳에 제공합니다.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/client-brief">브리프 작성 시작</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
            <Link to="/industry-overview">업종 특성 보기</Link>
          </Button>
        </div>
      </section>

      {/* 핵심 요약 */}
      <section>
        <h2 className="text-2xl font-bold">교육 업종 핵심 요약</h2>
        <p className="mt-2 text-muted-foreground">방문자가 가장 먼저 확인하는 정보 3가지</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { title: "대상 적합성", body: "누구를 위한 과정인지 첫 화면에서 즉시 확인 가능해야 합니다." },
            { title: "과정/커리큘럼 구조", body: "어떤 과목을 어떤 방식으로 배우는지 한눈에 보여야 합니다." },
            { title: "상담/전환 CTA", body: "상담 신청·체험수업·설명회 등 행동을 즉시 유도해야 합니다." },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{item.body}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 빠른 이동 */}
      <section>
        <h2 className="text-2xl font-bold">빠른 이동</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guideNavItems.filter(i => i.path !== "/").map((item) => (
            <Link key={item.path} to={item.path} className="group">
              <Card className="h-full transition-colors hover:border-accent">
                <CardHeader className="flex flex-row items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {iconMap[item.path] || <FileText className="h-5 w-5" />}
                  </span>
                  <CardTitle className="text-base group-hover:text-accent transition-colors">{item.label}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{item.description}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 브리프→청사진→규칙 흐름 */}
      <section className="rounded-lg border bg-card p-6">
        <h2 className="text-2xl font-bold">브리프 → 청사진 → 구현 규칙</h2>
        <p className="mt-2 text-muted-foreground">고객사 정보를 입력하면 공개 사이트 구조와 제작 규칙이 자동 생성됩니다.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { step: "1", title: "Client Brief", desc: "고객사 정보 입력 · 자동 저장 · JSON 내보내기", path: "/client-brief" },
            { step: "2", title: "Site Blueprint", desc: "사이트 유형 판별 · 페이지/CTA/SEO 자동 제안", path: "/site-blueprint" },
            { step: "3", title: "Implementation Rules", desc: "자산 유무에 따른 최소/표준/풀 구성 · 즉시 제작 지침", path: "/implementation-rules" },
          ].map((item) => (
            <Link key={item.step} to={item.path} className="group">
              <Card className="h-full transition-colors hover:border-accent">
                <CardHeader>
                  <span className="mb-2 inline-flex w-fit items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">Step {item.step}</span>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{item.desc}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 모바일 우선 */}
      <section>
        <h2 className="text-2xl font-bold">모바일 우선 설계</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground space-y-2">
              <p>• 하단 고정 CTA 바: 전화 / 상담신청 / 카카오문의 / 위치</p>
              <p>• 터치 친화적 탭/필터/카드 크기</p>
              <p>• 첫 화면에서 대상·과정·행동 인지</p>
              <p>• 3초 이내 페이지 로드 목표</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground space-y-2">
              <p>• 과정 상세는 아코디언 축약</p>
              <p>• 이미지 최적화 + lazy loading</p>
              <p>• 폼 최소 필드(이름·연락처·관심 과정)</p>
              <p>• 카카오/전화 원터치 연결</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 최종 CTA */}
      <section className="rounded-xl bg-primary px-6 py-10 text-center text-primary-foreground">
        <h2 className="text-2xl font-bold">지금 브리프를 작성하고 사이트 청사진을 확인하세요</h2>
        <p className="mt-2 text-primary-foreground/80">고객사 정보만 입력하면 페이지 구조, CTA, 증빙, SEO 포인트까지 자동 생성됩니다.</p>
        <Button asChild size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/client-brief">브리프 작성 시작 <ArrowRight className="h-4 w-4 ml-1" /></Link>
        </Button>
      </section>
    </div>
  );
};

export default Index;
