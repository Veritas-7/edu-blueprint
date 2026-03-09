import { PageHeader } from "@/components/docs/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeTag } from "@/components/docs/BadgeTag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, MessageCircle, MapPin, Calendar } from "lucide-react";

const UiGuide = () => (
  <div className="space-y-10">
    <PageHeader
      title="UI 가이드"
      description="학원/교육 사이트에서 반복 사용되는 UI 컴포넌트 패턴, 사용 목적, 배치 기준, 접근성 주의사항을 정리합니다."
      tocItems={[
        { id: "info-bar", label: "상단 정보 바" },
        { id: "hero-section", label: "히어로 섹션 패턴" },
        { id: "course-cards", label: "과정/프로그램 카드" },
        { id: "teacher-cards", label: "강사진 프로필 카드" },
        { id: "mobile-cta-bar", label: "모바일 하단 고정 CTA 바" },
        { id: "contact-form", label: "문의 폼" },
        { id: "button-system", label: "버튼 시스템" },
        { id: "faq-accordion", label: "FAQ 아코디언" },
      ]}
      summaryCards={[
        { title: "핵심 컴포넌트", body: "상단 정보바, 히어로, 과정 카드, 강사진 카드, 상담 CTA, 모바일 고정바" },
        { title: "상태 관리", body: "hover / focus / active / disabled 4가지 상태를 모든 인터랙션 요소에 적용" },
        { title: "모바일 우선", body: "하단 고정 CTA 2~4개, 터치 친화적 44px 최소 높이" },
      ]}
      quickApply={[
        "버튼·링크·폼은 반드시 포커스 가시 상태 포함",
        "CTA 문구는 구체적으로: '상담 신청하기', '체험수업 신청'",
        "과정 카드는 대상·과목·기간·레벨 정보를 포함",
        "모바일 고정바는 핵심 CTA 2~4개로 제한",
      ]}
    />

    <section>
      <h2 id="info-bar" className="text-2xl font-bold">상단 정보 바</h2>
      <div className="mt-2 flex items-center gap-1"><BadgeTag type="필수" /></div>
      <Card className="mt-4">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-primary px-4 py-2 text-xs text-primary-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> 02-1234-5678</span>
              <span>평일 09:00~21:00</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> 서울 강남구 대치동</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" className="h-6 text-xs">설명회 신청</Button>
              <Button size="sm" className="h-6 bg-accent text-xs text-accent-foreground">상담 신청</Button>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">사용 목적: 핵심 연락처·위치·상담 채널을 즉시 노출. 모든 페이지 상단 고정.</p>
        </CardContent>
      </Card>
    </section>

    <section>
      <h2 id="hero-section" className="text-2xl font-bold">히어로 섹션 패턴</h2>
      <div className="mt-2 flex items-center gap-1"><BadgeTag type="필수" /></div>
      <Card className="mt-4 overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-primary px-6 py-12 text-primary-foreground">
            <Badge className="mb-3 bg-accent text-accent-foreground">중·고등 내신 + 입시 전문</Badge>
            <h3 className="text-2xl font-bold md:text-3xl">내 아이에게 맞는 학습 설계,<br />체계적인 커리큘럼으로 시작합니다</h3>
            <p className="mt-3 text-sm text-primary-foreground/80">중등 내신부터 고등 수능까지, 학생 수준별 맞춤 과정을 운영합니다.</p>
            <div className="mt-6 flex gap-3">
              <Button className="bg-accent text-accent-foreground">상담 신청하기</Button>
              <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground">과정 보기</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <p className="mt-3 text-sm text-muted-foreground">핵심: 대상(누구를 위한) + 가치(무엇을 얻는) + CTA(지금 무엇을 하는) 3요소 필수. 과장된 성과 문구 금지.</p>
    </section>

    <section>
      <h2 id="course-cards" className="text-2xl font-bold">과정/프로그램 카드</h2>
      <div className="mt-2 flex items-center gap-1"><BadgeTag type="필수" /></div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "중등 내신 관리반", target: "중1~중3", subjects: "국·영·수·과", schedule: "평일 16:00~19:00" },
          { title: "고등 수능 대비반", target: "고1~고3", subjects: "국·영·수·탐", schedule: "평일 17:00~22:00" },
          { title: "주말 심화 특강", target: "중3~고2", subjects: "수학·영어", schedule: "토 10:00~17:00" },
        ].map((p) => (
          <Card key={p.title}>
            <CardHeader>
              <Badge className="w-fit bg-muted text-muted-foreground">{p.target}</Badge>
              <CardTitle className="text-base">{p.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground">
              <p>과목: {p.subjects}</p>
              <p>시간: {p.schedule}</p>
              <Button size="sm" className="mt-3 w-full bg-accent text-accent-foreground">상세 보기</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">카드에 대상·과목·시간 포함 필수. 수강료 비공개 시 "상담 안내" CTA 대체.</p>
    </section>

    <section>
      <h2 id="teacher-cards" className="text-2xl font-bold">강사진 프로필 카드</h2>
      <div className="mt-2 flex items-center gap-1"><BadgeTag type="필수" /> <BadgeTag type="proof 필요" /></div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {[
          { name: "예시 강사 A", subject: "수학", career: "경력 정보 입력 필요", philosophy: "개념 이해 중심의 단계별 학습 설계" },
          { name: "예시 강사 B", subject: "영어", career: "경력 정보 입력 필요", philosophy: "의사소통 중심 실전 영어 훈련" },
        ].map((t) => (
          <Card key={t.name}>
            <CardContent className="flex gap-4 p-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muted text-lg font-bold text-muted-foreground">{t.name[5]}</div>
              <div>
                <h3 className="font-semibold">{t.name}</h3>
                <p className="text-sm text-accent">{t.subject} 담당</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.career}</p>
                <p className="mt-1 text-xs text-muted-foreground">"{t.philosophy}"</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">허위 경력 금지. 경력 미확보 시 교육 철학/운영 방식 중심으로 대체.</p>
    </section>

    <section>
      <h2 id="mobile-cta-bar" className="text-2xl font-bold">모바일 하단 고정 CTA 바</h2>
      <div className="mt-2 flex items-center gap-1"><BadgeTag type="필수" /></div>
      <Card className="mt-4">
        <CardContent className="p-4">
          <div className="mx-auto max-w-sm rounded-xl border-2 border-primary/20 bg-card p-2">
            <div className="flex items-center justify-around rounded-lg bg-primary py-3 text-primary-foreground">
              <button className="flex flex-col items-center gap-1 text-xs"><Phone className="h-5 w-5" />전화</button>
              <button className="flex flex-col items-center gap-1 text-xs"><Calendar className="h-5 w-5" />상담신청</button>
              <button className="flex flex-col items-center gap-1 text-xs"><MessageCircle className="h-5 w-5" />카카오</button>
              <button className="flex flex-col items-center gap-1 text-xs"><MapPin className="h-5 w-5" />위치</button>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">모바일 전용. 핵심 CTA 2~4개. 전화·카카오는 원터치 실행. 스크롤 시에도 항상 고정.</p>
        </CardContent>
      </Card>
    </section>

    <section>
      <h2 id="contact-form" className="text-2xl font-bold">문의 폼</h2>
      <div className="mt-2 flex items-center gap-1"><BadgeTag type="필수" /></div>
      <Card className="mt-4">
        <CardContent className="p-6">
          <div className="mx-auto max-w-md space-y-4">
            <div><label className="mb-1 block text-sm font-medium">이름</label><Input placeholder="홍길동" /></div>
            <div><label className="mb-1 block text-sm font-medium">연락처</label><Input placeholder="010-0000-0000" /></div>
            <div><label className="mb-1 block text-sm font-medium">관심 과정</label><Input placeholder="예: 중등 내신 수학" /></div>
            <Button className="w-full bg-accent text-accent-foreground">상담 신청하기</Button>
            <p className="text-xs text-muted-foreground">* 개인정보 수집·이용에 동의합니다.</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">최소 필드 원칙: 이름·연락처·관심 과정. 불필요한 주소·학교명 등 제거. 개인정보 동의 필수.</p>
        </CardContent>
      </Card>
    </section>

    <section>
      <h2 id="button-system" className="text-2xl font-bold">버튼 시스템</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button>Primary CTA</Button>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Accent CTA</Button>
        <Button variant="outline">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">CTA 계층: 1차(Accent) → 2차(Primary) → 보조(Outline/Ghost). Disabled 상태 필수 구현.</p>
    </section>

    <section>
      <h2 id="faq-accordion" className="text-2xl font-bold">FAQ 아코디언</h2>
      <div className="mt-2 flex items-center gap-1"><BadgeTag type="권장" /></div>
      <Card className="mt-4">
        <CardContent className="p-4 space-y-2">
          {["수강 신청은 어떻게 하나요?", "체험수업은 무료인가요?", "주차 시설이 있나요?"].map((q) => (
            <div key={q} className="rounded-md border p-3">
              <span className="font-medium text-sm">{q}</span>
              <p className="mt-1 text-xs text-muted-foreground">답변 내용이 여기에 표시됩니다.</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  </div>
);

export default UiGuide;
