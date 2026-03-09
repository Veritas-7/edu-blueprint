import { PageHeader } from "@/components/docs/PageHeader";
import { CopyBlock } from "@/components/docs/CopyBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeTag } from "@/components/docs/BadgeTag";

const heroFormula = `[대상 태그] + [핵심 가치 문장] + [구체적 결과]

✅ 좋은 예시:
"중·고등 내신 전문 | 학생 수준에 맞는 단계별 커리큘럼으로, 내신 성적 향상을 돕습니다."
"직장인 영어회화 | 실무 상황 중심 수업으로, 비즈니스 커뮤니케이션 역량을 키웁니다."
"초등 코딩 교육 | 놀이와 프로젝트 중심으로 논리적 사고력을 키웁니다."
"성인 자격증 | 출퇴근 시간 맞춤 야간/주말 수업으로 합격까지 체계적으로 준비합니다."

❌ 나쁜 예시:
"최고의 교육을 경험하세요" → 대상·과정 불명확
"꿈을 현실로 만드는 학원" → 추상적, 행동 유도 없음
"합격률 100% 보장" → 단정/과장 표현`;

const ctaLibrary = `[상담 전환 — 가장 높은 우선순위]
• 상담 신청하기
• 무료 상담 예약
• 전화 문의하기
• 1:1 맞춤 상담 받기

[체험/설명회 — 첫 접점 전환]
• 체험수업 신청
• 설명회 예약
• 무료 레벨테스트 신청

[탐색 유도 — 정보 탐색 단계]
• 과정 보기
• 강사진 보기
• 시간표 확인
• 커리큘럼 살펴보기

[보조 행동 — 즉시 실행]
• 전화하기 (모바일)
• 카카오톡 문의
• 길찾기
• 주차 안내`;

const programTemplate = `[구조] [대상] + [과목/주제] + [학습 방식] + [기대 결과]

✅ 좋은 예시:
"중등 내신 수학반은 개념 이해와 문제 풀이 훈련을 병행하여, 학교 시험 대비 능력을 키웁니다."
"고등 수능 영어반은 유형별 독해 전략과 어휘력 강화를 통해, 실전 문제 풀이 속도를 높입니다."
"성인 비즈니스 영어반은 이메일, 프레젠테이션, 회의 등 실무 상황 중심으로 진행합니다."
"초등 코딩반은 블록 코딩부터 시작해 텍스트 코딩까지 단계적으로 학습합니다."

❌ 나쁜 예시:
"최고의 커리큘럼으로 완벽하게 준비" → 구체성 부족, 과장
"성적 폭풍 상승 보장" → 단정 표현, 검증 불가`;

const teacherTemplate = `[구조] [담당 과목] + [경력 요약(검증 필요)] + [교육 철학/방식]

✅ 좋은 예시:
"수학 담당 홍길동 선생님은 개념 이해 중심의 단계별 학습을 통해 학생 스스로 문제를 풀 수 있도록 지도합니다."
"영어 담당 김영희 선생님은 읽기·듣기·말하기 통합 수업으로 영어 사용 자신감을 키웁니다."

⚠️ 경력 미확보 시:
교육 철학/수업 방식 중심 서술로 대체합니다.
"학생 개개인의 수준에 맞춘 1:1 피드백을 제공하여, 자기 주도 학습 습관을 형성합니다."

❌ 금지:
• 허위 경력 (학위, 근무처, 수상 등)
• 검증 불가능한 실적 주장`;

const reviewTemplate = `[구조] [수강생/학부모 구분] + [수강 과정·기간] + [경험 요약]

✅ 좋은 예시:
"OOO 학부모 | 중등 영어 3개월 수강
아이가 영어 수업을 즐기게 되었고, 학교 영어 성적도 조금씩 오르고 있습니다."

"OOO 수강생 | 직장인 영어회화 6개월 수강
실무에서 영어 이메일 쓰는 것이 훨씬 편해졌습니다."

⚠️ 규칙:
• 허위 후기 절대 금지
• 실제 수강생 동의 하에 게재
• 익명 시 'OOO 학부모', 'OOO 수강생' 형식
• 수강 과정과 기간 반드시 표기
• 과장된 성과 주장 금지 ("성적이 50점 올랐어요" 등 구체적 수치는 검증 필요)`;

const faqTemplate = `[구조] 질문: 방문자가 실제로 물어볼 법한 문장 / 답변: 구체적이고 명확한 정보

✅ 좋은 예시:
Q: 수강료는 얼마인가요?
A: 과정과 수강 기간에 따라 다르며, 상담을 통해 맞춤 안내해 드립니다. 전화 또는 온라인으로 문의해 주세요.

Q: 체험수업은 어떻게 신청하나요?
A: 홈페이지 체험수업 신청 페이지에서 원하는 일정을 선택하시거나, 전화(000-0000-0000)로 문의해 주세요.

Q: 주차가 가능한가요?
A: 건물 내 무료 주차 30분 가능하며, 인근 공영주차장도 이용하실 수 있습니다.

❌ 나쁜 예시:
Q: 왜 저희 학원이 최고인가요? → 질문 자체가 광고성`;

const consultingTemplate = `[구조] [응답 시간 안내] + [상담 방법] + [기대 결과]

✅ 좋은 예시:
"평일 기준 24시간 내 답변 드립니다."
"상담 신청 후, 전문 상담사가 학생에 맞는 과정을 안내해 드립니다."
"전화·카카오·온라인 폼 중 편한 방법으로 문의하세요."

❌ 나쁜 예시:
"지금 바로 문의! 인생이 바뀝니다!" → 과장, 광고성`;

const eventTemplate = `[구조] [일정] + [대상] + [내용 요약] + [참여 방법]

✅ 좋은 예시:
"3월 15일(토) 오후 2시 | 중등 신입생 설명회
내신 대비 커리큘럼 안내, 강사진 소개, 학부모 Q&A
참여 신청: 홈페이지 또는 전화(000-0000-0000)"

❌ 나쁜 예시:
"놓치면 후회할 초특급 설명회!" → 과장`;

const labelingGuide = `[수강 대상 표기]
• 초등 저학년(1~3학년) / 초등 고학년(4~6학년)
• 중학생(중1~중3) / 고등학생(고1~고3)
• 대학생 / 성인 / 직장인

[레벨 표기]
• 입문 / 기초 / 중급 / 심화 / 실전
• 또는 Level 1~5 (학원 자체 기준 명시)

[기간 표기]
• 3개월 과정 / 6개월 과정 / 12개월 과정
• 주 2회 / 주 3회 / 주 5회

[운영 방식 표기]
• 오프라인 (대면 수업)
• 온라인 (실시간 화상 수업 / 녹화 강의)
• 하이브리드 (대면 + 온라인 병행)`;

const forbiddenPhrases = `❌ 단정/과장 표현
• "성적이 반드시 오릅니다"
• "합격 보장"
• "업계 최고" / "유일" / "최초"
• "100% 성공률" / "무조건 합격"
• 출처 없는 "00% 향상"
• "혁신적 교육" (구체성 부족)

❌ 허위 정보
• 허위 합격률/점수 향상 수치
• 허위 수강생 후기
• 허위 강사 경력/학위
• 허위 수상/언론 노출
• 허위 지점 수/학생 수

❌ 모호한 표현
• "최고의 교육" / "완벽한 커리큘럼"
• "남다른 강사진" / "특별한 학습법"
• "꿈을 실현하는" / "미래를 여는"
• "다양한 프로그램" (구체적으로 나열할 것)

✅ 대체 표현 예시
• "업계 최고" → "○○ 분야 전문 강사 ○명 운영"
• "합격 보장" → "체계적인 단계별 커리큘럼으로 시험 대비"
• "100% 성공" → "(예시 데이터) 최근 1년간 수강생 ○명 중 ○명 목표 달성"`;

const ContentGuide = () => (
  <div className="space-y-10">
    <PageHeader
      title="콘텐츠 가이드"
      description="학원/교육 업종에서 신뢰를 높이는 문장 톤, 과정/강사진 소개 템플릿, 성과 서술 방식, CTA 라이브러리, 금지 표현을 제공합니다."
      tocItems={[
        { id: "tone-principles", label: "신뢰 문장 톤" },
        { id: "hero-copy", label: "히어로 카피 공식" },
        { id: "cta-library", label: "CTA 문구 라이브러리" },
        { id: "program-template", label: "과정 소개 템플릿" },
        { id: "teacher-template", label: "강사진 소개 템플릿" },
        { id: "results-writing", label: "성과/합격 서술 방식" },
        { id: "review-template", label: "후기 요약 방식" },
        { id: "consulting-template", label: "상담 안내 템플릿" },
        { id: "event-template", label: "설명회/체험수업 템플릿" },
        { id: "faq-writing", label: "FAQ 작성 방식" },
        { id: "labeling-guide", label: "표기 가이드" },
        { id: "forbidden-phrases", label: "금지 표현 + 대체 표현" },
      ]}
      summaryCards={[
        { title: "톤 원칙", body: "신뢰형 · 구체적 · 과장 없음 · 대상 명확" },
        { title: "핵심 템플릿 8종", body: "히어로, 과정, 강사진, 후기, FAQ, 상담, 설명회, 표기 가이드" },
        { title: "금지 규칙", body: "'합격 보장', '100%', '업계 최고' 등 단정 표현 금지" },
      ]}
      quickApply={[
        "히어로: 대상 태그 + 핵심 가치 + 구체적 결과",
        "CTA: 모호하지 않게, '상담 신청하기', '체험수업 신청'",
        "성과: 예시 데이터 명시, 기간·조건 동반",
        "후기: 허위 금지, 익명 처리 시 'OOO 학부모' 형식",
        "모든 수치: 출처 또는 '예시 데이터' 표기",
      ]}
    />

    <section>
      <h2 id="tone-principles" className="text-2xl font-bold">신뢰를 높이는 문장 톤</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {[
          { title: "구체적 대상 명시", good: "'중2~고1 내신 대비 학생을 위한'", bad: "'학생 여러분'" },
          { title: "결과 중심 서술", good: "'단계별 커리큘럼으로 학습 습관 형성'", bad: "'최고의 교육'" },
          { title: "과장 배제", good: "'학생 수준에 맞는 맞춤 피드백 제공'", bad: "'무조건 성적 향상'" },
          { title: "행동 유도 명확화", good: "'상담 신청하기', '체험수업 신청'", bad: "'문의하기', '자세히 보기'" },
          { title: "근거 동반", good: "'(예시 데이터) 수강생 80% 2등급 이상 향상'", bad: "'성적이 폭풍 상승'" },
          { title: "대상 적합성 우선", good: "'직장인을 위한 주말/야간 수업'", bad: "'누구나 환영합니다'" },
        ].map((c) => (
          <Card key={c.title}>
            <CardHeader><CardTitle className="text-base">{c.title}</CardTitle></CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p className="text-success">✅ {c.good}</p>
              <p className="text-destructive">❌ {c.bad}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>

    <section>
      <h2 id="hero-copy" className="text-2xl font-bold">히어로 카피 공식</h2>
      <CopyBlock title="히어로 문장 구조 + 예시" content={heroFormula} />
    </section>

    <section>
      <h2 id="cta-library" className="text-2xl font-bold">CTA 문구 라이브러리</h2>
      <CopyBlock title="CTA 문구 모음 (우선순위별)" content={ctaLibrary} />
    </section>

    <section>
      <h2 id="program-template" className="text-2xl font-bold">과정 소개 문장 템플릿</h2>
      <CopyBlock title="과정 소개 구조 + 예시" content={programTemplate} />
    </section>

    <section>
      <h2 id="teacher-template" className="text-2xl font-bold">강사진 소개 문장 템플릿</h2>
      <CopyBlock title="강사진 소개 구조 + 예시" content={teacherTemplate} />
    </section>

    <section>
      <h2 id="results-writing" className="text-2xl font-bold">성과/합격 사례 서술 방식</h2>
      <Card className="mt-4 border-warning">
        <CardContent className="p-4 space-y-3 text-sm">
          <div className="flex items-center gap-2"><BadgeTag type="검토 필요" /><span className="font-semibold">가장 주의 필요한 영역</span></div>
          <div className="space-y-2 text-muted-foreground">
            <p><strong>원칙:</strong> 모든 수치에 '예시 데이터' 또는 출처 표기, 기간/조건 동반, 개인별 결과 다를 수 있음 명시</p>
            <p><strong>✅ 좋은 예시:</strong> "(예시 데이터) 2024년 상반기 기준, 내신 2등급 이상 향상 학생 15명 (총 수강생 50명 중)"</p>
            <p><strong>✅ 좋은 예시:</strong> "(예시 데이터) TOEIC 800점 이상 달성 수강생: 10명 (6개월 과정, 2024년 1~6월 기준)"</p>
            <p className="text-destructive"><strong>❌ 금지:</strong> "합격률 100%", "성적 무조건 향상", "업계 최고 실적"</p>
          </div>
        </CardContent>
      </Card>
    </section>

    <section>
      <h2 id="review-template" className="text-2xl font-bold">후기 요약 방식</h2>
      <CopyBlock title="후기 작성 구조 + 규칙" content={reviewTemplate} />
    </section>

    <section>
      <h2 id="consulting-template" className="text-2xl font-bold">상담 안내 문장 템플릿</h2>
      <CopyBlock title="상담 안내 예시" content={consultingTemplate} />
    </section>

    <section>
      <h2 id="event-template" className="text-2xl font-bold">설명회/체험수업 안내 템플릿</h2>
      <CopyBlock title="설명회/체험수업 예시" content={eventTemplate} />
    </section>

    <section>
      <h2 id="faq-writing" className="text-2xl font-bold">FAQ 작성 방식</h2>
      <CopyBlock title="FAQ 작성 구조 + 예시" content={faqTemplate} />
    </section>

    <section>
      <h2 id="labeling-guide" className="text-2xl font-bold">수강 대상/레벨/기간/운영 표기 가이드</h2>
      <CopyBlock title="표기 가이드" content={labelingGuide} />
    </section>

    <section>
      <h2 id="forbidden-phrases" className="text-2xl font-bold">금지 표현 + 대체 표현</h2>
      <div className="mt-2 flex items-center gap-2"><BadgeTag type="금지" /><span className="text-sm text-muted-foreground">아래 표현은 어떤 페이지에서도 사용하지 않습니다</span></div>
      <CopyBlock title="금지 표현 + 대체안" content={forbiddenPhrases} />
    </section>
  </div>
);

export default ContentGuide;
