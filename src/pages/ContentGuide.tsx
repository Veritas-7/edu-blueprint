import { PageHeader } from "@/components/docs/PageHeader";
import { CopyBlock } from "@/components/docs/CopyBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeTag } from "@/components/docs/BadgeTag";

const heroFormula = `[대상 태그] + [핵심 가치 문장] + [구체적 결과]

예시:
"중·고등 내신 전문 | 학생 수준에 맞는 단계별 커리큘럼으로, 내신 성적 향상을 돕습니다."
"직장인 영어회화 | 실무 상황 중심 수업으로, 비즈니스 커뮤니케이션 역량을 키웁니다."`;

const ctaLibrary = `[상담 전환]
• 상담 신청하기
• 무료 상담 예약
• 전화 문의하기

[체험/설명회]
• 체험수업 신청
• 설명회 예약

[탐색 유도]
• 과정 보기
• 강사진 보기
• 시간표 확인`;

const forbiddenPhrases = `❌ "성적이 반드시 오릅니다"
❌ "합격 보장"
❌ "업계 최고" / "유일" / "최초"
❌ "100% 성공률"
❌ "무조건 합격"
❌ 출처 없는 "00% 향상"`;

const ContentGuide = () => (
  <div className="space-y-10">
    <PageHeader
      title="콘텐츠 가이드"
      description="학원/교육 업종에서 신뢰를 높이는 문장 톤, 과정/강사진 소개 템플릿, 성과 서술 방식, CTA 라이브러리, 금지 표현을 제공합니다."
      summaryCards={[
        { title: "톤 원칙", body: "신뢰형 · 구체적 · 과장 없음 · 대상 명확" },
        { title: "핵심 템플릿", body: "히어로 카피, 과정 소개, 강사진 소개, CTA 문구" },
        { title: "금지 규칙", body: "'합격 보장', '100%', '업계 최고' 등 단정 표현 금지" },
      ]}
      quickApply={[
        "히어로: 대상 태그 + 핵심 가치 + 구체적 결과",
        "CTA: 모호하지 않게, '상담 신청하기', '체험수업 신청'",
        "성과: 예시 데이터 명시, 기간·조건 동반",
        "후기: 허위 금지, 익명 처리 시 'OOO 학부모' 형식",
      ]}
    />

    {/* 톤 원칙 */}
    <section>
      <h2 className="text-2xl font-bold">신뢰를 높이는 문장 톤</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {[
          { title: "구체적 대상 명시", body: "'학생 여러분'보다 '중2~고1 내신 대비 학생을 위한'" },
          { title: "결과 중심", body: "추상적 '최고의 교육'보다 '단계별 커리큘럼으로 학습 습관 형성'" },
          { title: "과장 배제", body: "'무조건 성적 향상'보다 '학생 수준에 맞는 맞춤 피드백 제공'" },
          { title: "행동 유도 명확화", body: "'문의하기'보다 '상담 신청하기', '체험수업 신청'" },
        ].map((c) => (
          <Card key={c.title}>
            <CardHeader><CardTitle className="text-base">{c.title}</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">{c.body}</CardContent>
          </Card>
        ))}
      </div>
    </section>

    {/* 히어로 카피 */}
    <section>
      <h2 className="text-2xl font-bold">히어로 카피 공식</h2>
      <CopyBlock title="히어로 문장 구조" content={heroFormula} />
    </section>

    {/* CTA 라이브러리 */}
    <section>
      <h2 className="text-2xl font-bold">CTA 문구 라이브러리</h2>
      <CopyBlock title="CTA 문구 모음" content={ctaLibrary} />
    </section>

    {/* 과정 소개 */}
    <section>
      <h2 className="text-2xl font-bold">과정 소개 문장 템플릿</h2>
      <Card className="mt-4">
        <CardContent className="p-4 space-y-2 text-sm text-muted-foreground">
          <p><strong>구조:</strong> [대상] + [과목/주제] + [학습 방식] + [기대 결과]</p>
          <p><strong>예시:</strong> "중등 내신 수학반은 개념 이해와 문제 풀이 훈련을 병행하여, 학교 시험 대비 능력을 키웁니다."</p>
        </CardContent>
      </Card>
    </section>

    {/* 강사진 소개 */}
    <section>
      <h2 className="text-2xl font-bold">강사진 소개 문장 템플릿</h2>
      <Card className="mt-4">
        <CardContent className="p-4 space-y-2 text-sm text-muted-foreground">
          <p><strong>구조:</strong> [담당 과목] + [경력 요약(검증 필요)] + [교육 철학]</p>
          <p><strong>예시:</strong> "수학 담당 홍길동 선생님은 개념 이해 중심의 단계별 학습을 통해 학생 스스로 문제를 풀 수 있도록 지도합니다."</p>
          <p className="text-warning"><strong>주의:</strong> 허위 경력 금지. 경력 미확보 시 교육 철학 중심 서술.</p>
        </CardContent>
      </Card>
    </section>

    {/* 성과 서술 */}
    <section>
      <h2 className="text-2xl font-bold">성과/합격 사례 서술 방식</h2>
      <Card className="mt-4">
        <CardContent className="p-4 space-y-2 text-sm text-muted-foreground">
          <p><strong>원칙:</strong> 예시 데이터 명시, 기간/조건 동반, 출처 표기</p>
          <p><strong>예시:</strong> "(예시 데이터) 2024년 상반기 기준, 내신 2등급 이상 향상 학생 15명"</p>
          <p className="text-destructive"><strong>금지:</strong> "100% 합격", "무조건 성적 향상" 등 단정 표현</p>
        </CardContent>
      </Card>
    </section>

    {/* 금지 표현 */}
    <section>
      <h2 className="text-2xl font-bold">금지 표현</h2>
      <div className="mt-2 flex items-center gap-1"><BadgeTag type="금지" /></div>
      <CopyBlock title="사용 금지 문구" content={forbiddenPhrases} />
    </section>
  </div>
);

export default ContentGuide;
