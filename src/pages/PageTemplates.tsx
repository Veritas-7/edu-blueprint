import { PageHeader } from "@/components/docs/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyBlock } from "@/components/docs/CopyBlock";
import { BadgeTag } from "@/components/docs/BadgeTag";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type TemplateSection = {
  name: string;
  purpose: string;
  required: boolean;
};

type Template = {
  name: string;
  slug: string;
  purpose: string;
  headline: string;
  coreCta: string;
  subCta: string;
  proof: string[];
  mobile: string;
  seo: string;
  performanceNote: string;
  skippable: string[];
  sections: TemplateSection[];
  wireframe: string;
};

const templates: Template[] = [
  {
    name: "홈페이지",
    slug: "home",
    purpose: "첫 방문자에게 대상 적합성·핵심 과정·행동 유도를 즉시 전달하는 허브 페이지",
    headline: "[대상] [과목/분야] 전문 · [핵심 가치 문장]",
    coreCta: "상담 신청하기",
    subCta: "과정 보기 / 체험수업 신청",
    proof: ["강사진 요약 카드", "성과 수치(근거·기간 동반)", "후기 요약 2~3건"],
    mobile: "히어로+CTA 1개 우선 노출, Quick Info Bar 축약, 하단 고정 CTA 바 필수",
    seo: "H1 1개(지역+대상+과목), Organization/EducationalOrganization 스키마, OG 이미지 필수",
    performanceNote: "성과 수치 사용 시 '예시 데이터' 명시 필수. '합격률 100%' 등 단정 금지.",
    skippable: ["후기 요약(미보유 시)", "성과 카드(미보유 시)", "설명회 배너(미운영 시)"],
    sections: [
      { name: "Hero (대상+과정+즉시 행동)", purpose: "5초 안에 누구를 위한 어떤 교육인지 인지", required: true },
      { name: "Quick Info Bar", purpose: "전화·상담시간·위치·설명회·체험수업 즉시 접근", required: true },
      { name: "대상별/과정별 빠른 진입", purpose: "학부모·학생이 자신에게 맞는 과정 바로 탐색", required: true },
      { name: "핵심 과정 카드 (3~6개)", purpose: "주력 과정 구조·대상·시간 한눈에 파악", required: true },
      { name: "강사진 요약", purpose: "전문성 신뢰 형성", required: true },
      { name: "성과/후기 요약", purpose: "사회적 증빙으로 전환 보조", required: false },
      { name: "시간표 요약", purpose: "실제 수강 가능 시간대 확인", required: false },
      { name: "설명회/체험수업 배너", purpose: "이벤트형 전환 유도", required: false },
      { name: "지점/위치", purpose: "접근성 확인", required: true },
      { name: "FAQ (3~5개)", purpose: "자주 묻는 질문 해소", required: false },
      { name: "최종 CTA 블록", purpose: "페이지 하단 최종 전환", required: true },
      { name: "Footer", purpose: "연락처·이용약관·개인정보처리방침", required: true },
    ],
    wireframe: `┌─────────────────────────────────────┐
│  Quick Info Bar (전화·위치·상담시간)    │
├─────────────────────────────────────┤
│  Header + Navigation                │
├─────────────────────────────────────┤
│  HERO                               │
│  [대상 태그] + 핵심 메시지 + CTA      │
├─────────────────────────────────────┤
│  대상별 빠른 진입 (초등/중등/고등/성인) │
├──────────┬──────────┬───────────────┤
│ 과정 카드  │ 과정 카드  │ 과정 카드      │
├──────────┴──────────┴───────────────┤
│  강사진 요약 (카드 3~4장)              │
├─────────────────────────────────────┤
│  성과/후기 요약 (슬라이드 or 그리드)    │
├─────────────────────────────────────┤
│  시간표 요약 + 설명회 배너             │
├─────────────────────────────────────┤
│  지점/위치 (지도 + 교통편)             │
├─────────────────────────────────────┤
│  FAQ (아코디언 3~5개)                 │
├─────────────────────────────────────┤
│  최종 CTA 블록                       │
├─────────────────────────────────────┤
│  Footer                             │
└─────────────────────────────────────┘`,
  },
  {
    name: "과정/프로그램 목록",
    slug: "programs",
    purpose: "다양한 과정을 대상/과목/레벨별로 비교 탐색할 수 있는 필터 페이지",
    headline: "[학원명] 과정 안내 · 대상과 목표에 맞는 수업을 찾아보세요",
    coreCta: "과정 상세 보기",
    subCta: "상담 신청 / 체험수업 신청",
    proof: ["과정별 커리큘럼 요약", "대상 태그", "수강 방식 표기"],
    mobile: "필터 1행 탭, 카드 1열 스택, 상단 고정 필터",
    seo: "/programs, 과정별 개별 URL, BreadcrumbList",
    performanceNote: "과정별 성과 수치 표기 시 출처·기간 동반 필수",
    skippable: ["비교 카드(과정 3개 이하 시)", "수강 FAQ"],
    sections: [
      { name: "타이틀 + 서브카피", purpose: "페이지 목적 안내", required: true },
      { name: "필터 (대상/과목/레벨/시간대)", purpose: "빠른 탐색", required: true },
      { name: "과정 카드 그리드", purpose: "과정별 핵심 정보 비교", required: true },
      { name: "비교 CTA", purpose: "관심 과정 비교", required: false },
      { name: "상담 CTA 배너", purpose: "전환 유도", required: true },
    ],
    wireframe: `┌─────────────────────────────────────┐
│  H1: 과정 안내                       │
├─────────────────────────────────────┤
│  필터: [대상▼] [과목▼] [레벨▼] [시간▼] │
├──────────┬──────────┬───────────────┤
│ 과정 카드  │ 과정 카드  │ 과정 카드      │
│ 대상태그   │ 대상태그   │ 대상태그       │
│ 시간·방식  │ 시간·방식  │ 시간·방식      │
│ [상세보기] │ [상세보기] │ [상세보기]     │
├──────────┴──────────┴───────────────┤
│  💬 맞는 과정을 찾기 어려우신가요?      │
│  [상담 신청하기]                      │
└─────────────────────────────────────┘`,
  },
  {
    name: "과정/프로그램 상세",
    slug: "program-detail",
    purpose: "개별 과정의 대상·커리큘럼·수강 방식·강사진을 상세 전달하고 체험/상담 전환",
    headline: "[대상] [과목] [레벨]반 · [핵심 학습 목표]",
    coreCta: "체험수업 신청 / 상담 신청",
    subCta: "커리큘럼 보기 / 시간표 확인",
    proof: ["커리큘럼 구조(주차별)", "담당 강사 프로필", "수강 후기 2~3건"],
    mobile: "커리큘럼 아코디언, 강사 카드 축약, 하단 CTA 고정",
    seo: "/programs/[대상]-[과목]-[레벨], Course 스키마, FAQ 스키마",
    performanceNote: "수강 후 변화를 서술할 때 '예시 데이터' 명시. 개인 성과 단정 금지.",
    skippable: ["수강료 테이블(비공개 시)", "비교 카드"],
    sections: [
      { name: "히어로 (과정명+대상+핵심 가치)", purpose: "이 과정이 누구를 위한 것인지 즉시 이해", required: true },
      { name: "과정 개요 (대상/기간/방식/정원)", purpose: "핵심 수강 정보 스캔", required: true },
      { name: "커리큘럼 타임라인 (주차별)", purpose: "학습 구조 상세 확인", required: true },
      { name: "수강 방식 안내", purpose: "오프라인/온라인/하이브리드 설명", required: true },
      { name: "수강료/안내 테이블", purpose: "비용 정보 또는 상담 안내", required: false },
      { name: "담당 강사진", purpose: "강사 전문성 신뢰", required: true },
      { name: "수강 후기", purpose: "사회적 증빙", required: false },
      { name: "관련 과정 추천", purpose: "내부 링크·탐색 확장", required: false },
      { name: "상담/체험 CTA", purpose: "최종 전환", required: true },
    ],
    wireframe: `┌─────────────────────────────────────┐
│  Breadcrumb: 홈 > 과정 > 중등 영어    │
├─────────────────────────────────────┤
│  HERO: 중등 내신 영어반                │
│  [중학생] [내신 대비] [소수정예]        │
│  "개념 이해 → 문제 풀이 → 실전 대비"   │
│  [체험수업 신청] [상담 신청]           │
├─────────────────────────────────────┤
│  과정 개요: 대상·기간·방식·정원 표     │
├─────────────────────────────────────┤
│  커리큘럼 (아코디언)                   │
│  ▶ 1~4주: 핵심 문법 기초              │
│  ▶ 5~8주: 독해·어휘 강화              │
│  ▶ 9~12주: 실전 문제 풀이             │
├─────────────────────────────────────┤
│  담당 강사 카드                       │
├─────────────────────────────────────┤
│  수강 후기 (2~3건)                   │
├─────────────────────────────────────┤
│  관련 과정 카드                       │
├─────────────────────────────────────┤
│  최종 CTA                            │
└─────────────────────────────────────┘`,
  },
  {
    name: "강사진 소개",
    slug: "teachers",
    purpose: "강사진 전문성과 교육 철학으로 신뢰 형성",
    headline: "[학원명] 강사진 · 전문성과 교육 철학을 소개합니다",
    coreCta: "상담 신청하기",
    subCta: "과정 보기",
    proof: ["담당 과목", "경력 요약(검증 필요)", "교육 철학"],
    mobile: "카드 1열 스택, 사진+이름+과목 우선",
    seo: "/teachers, Person 스키마",
    performanceNote: "허위 경력 금지. 미확보 시 교육 철학/수업 방식 중심 서술.",
    skippable: ["상세 경력(미확보 시)", "강사별 후기"],
    sections: [
      { name: "타이틀 + 교육 철학 요약", purpose: "학원 전체의 교육 방향 안내", required: true },
      { name: "강사 카드 그리드", purpose: "개별 강사 전문성 전달", required: true },
      { name: "교육 운영 방침", purpose: "학습 관리 프로세스 신뢰", required: false },
      { name: "상담 CTA", purpose: "전환 유도", required: true },
    ],
    wireframe: `┌─────────────────────────────────────┐
│  H1: 강사진 소개                     │
│  "학생 개개인의 성장을 돕는 전문 강사진" │
├──────────┬──────────┬───────────────┤
│ 📷 강사A  │ 📷 강사B  │ 📷 강사C      │
│ 수학 담당  │ 영어 담당  │ 국어 담당      │
│ 교육 철학  │ 교육 철학  │ 교육 철학      │
├──────────┴──────────┴───────────────┤
│  교육 운영 방침                       │
├─────────────────────────────────────┤
│  [상담 신청하기]                      │
└─────────────────────────────────────┘`,
  },
  {
    name: "지점/캠퍼스",
    slug: "locations",
    purpose: "다지점 구조에서 위치별 정보 제공, 단일 지점 시 접근성 강조",
    headline: "[학원명] 지점 안내 · 가까운 지점을 찾아보세요",
    coreCta: "해당 지점 상담 신청",
    subCta: "길찾기 / 전화 문의",
    proof: ["시설 사진(실제)", "운영 시간", "교통편 안내"],
    mobile: "지도 축소, 카드 리스트 우선, 전화 원터치",
    seo: "/locations, /locations/[지점명], LocalBusiness 스키마(지점별)",
    performanceNote: "허위 시설 사진 금지. 실제 사진 미확보 시 지도+운영 정보로 대체.",
    skippable: ["시설 갤러리(미확보 시)", "지점별 공지"],
    sections: [
      { name: "지점 필터/지도", purpose: "위치 기반 빠른 탐색", required: true },
      { name: "지점 카드 그리드", purpose: "각 지점 핵심 정보 비교", required: true },
      { name: "개별 지점 상세 (주소, 연락처, 시간표)", purpose: "접근성 확인", required: true },
      { name: "시설 갤러리", purpose: "학습 환경 신뢰", required: false },
      { name: "상담 CTA", purpose: "전환 유도", required: true },
    ],
    wireframe: `┌─────────────────────────────────────┐
│  H1: 지점 안내                       │
├─────────────────────────────────────┤
│  🗺️ 지도 (핀 표시)                   │
├──────────┬──────────────────────────┤
│ 지점 카드A │ 지점 카드B               │
│ 주소·전화  │ 주소·전화                │
│ 운영시간   │ 운영시간                 │
│ [길찾기]  │ [길찾기]                 │
├──────────┴──────────────────────────┤
│  시설 갤러리                         │
├─────────────────────────────────────┤
│  [상담 신청하기]                      │
└─────────────────────────────────────┘`,
  },
  {
    name: "성과/합격사례",
    slug: "results",
    purpose: "검증된 성과 사례로 신뢰 강화. 반드시 근거·기간·조건 동반.",
    headline: "[학원명] 성과 사례 · 학생들의 성장 기록",
    coreCta: "상담 신청하기",
    subCta: "과정 보기",
    proof: ["성과 수치(예시 데이터 표기 필수)", "기간/조건 명시", "출처 표기"],
    mobile: "카드 1열 스택, 수치+기간 우선 표기",
    seo: "/results, 과장 금지, 예시 데이터 명시",
    performanceNote: "⚠️ 가장 주의 필요한 페이지. 허위 합격률·점수향상 절대 금지. 모든 수치에 '예시 데이터' 또는 출처 표기.",
    skippable: ["상세 사례 스토리(미확보 시)", "통계 차트"],
    sections: [
      { name: "타이틀 + 주의 문구", purpose: "페이지 목적 안내 + 데이터 성격 명시", required: true },
      { name: "성과 요약 카드", purpose: "핵심 수치 한눈에", required: true },
      { name: "상세 사례 카드", purpose: "개별 성과 스토리", required: false },
      { name: "주의사항 안내", purpose: "예시 데이터·조건 명시", required: true },
      { name: "상담 CTA", purpose: "전환 유도", required: true },
    ],
    wireframe: `┌─────────────────────────────────────┐
│  H1: 성과 사례                       │
│  ⚠️ 아래 수치는 예시 데이터입니다       │
├──────────┬──────────┬───────────────┤
│ 성과 카드  │ 성과 카드  │ 성과 카드      │
│ 수치+기간  │ 수치+기간  │ 수치+기간      │
├──────────┴──────────┴───────────────┤
│  상세 사례 (아코디언)                  │
├─────────────────────────────────────┤
│  ⚠️ 주의: 개인별 결과는 다를 수 있음    │
├─────────────────────────────────────┤
│  [상담 신청하기]                      │
└─────────────────────────────────────┘`,
  },
  {
    name: "후기/수강생 이야기",
    slug: "reviews",
    purpose: "실제 수강생 경험 전달로 전환 보조",
    headline: "[학원명] 수강 후기 · 수강생들의 이야기",
    coreCta: "상담 신청하기",
    subCta: "과정 보기",
    proof: ["수강 기간/과정 명시", "실명 또는 익명 처리(OOO 형식)"],
    mobile: "카드 1열 스택",
    seo: "/reviews, 허위 후기 절대 금지",
    performanceNote: "허위 후기 절대 금지. 실제 수강생 동의 하에 게재. 작성일·수강 과정 표기.",
    skippable: ["영상 후기(미보유 시)", "별점 시스템(리뷰 수 부족 시)"],
    sections: [
      { name: "타이틀", purpose: "페이지 안내", required: true },
      { name: "후기 필터 (과정별/대상별)", purpose: "관련 후기 탐색", required: false },
      { name: "후기 카드 그리드", purpose: "수강 경험 전달", required: true },
      { name: "상담 CTA", purpose: "전환 유도", required: true },
    ],
    wireframe: `┌─────────────────────────────────────┐
│  H1: 수강 후기                       │
│  필터: [전체] [중등] [고등] [성인]     │
├──────────┬──────────────────────────┤
│ 후기 카드  │ 후기 카드                │
│ OOO 학부모 │ OOO 수강생              │
│ 중등 영어  │ 고등 수학                │
│ 수강 3개월 │ 수강 6개월              │
├──────────┴──────────────────────────┤
│  [상담 신청하기]                      │
└─────────────────────────────────────┘`,
  },
  {
    name: "시간표/운영안내",
    slug: "schedule",
    purpose: "시간표와 운영 정보를 명확하게 제공",
    headline: "[학원명] 시간표 · 운영 안내",
    coreCta: "상담 신청",
    subCta: "과정 보기",
    proof: ["정확한 시간표", "운영 시간"],
    mobile: "테이블 가로 스크롤, 요일 탭 분리",
    seo: "/schedule",
    performanceNote: "시간표는 정확해야 하며 변경 시 즉시 업데이트. 예시 데이터일 경우 명시.",
    skippable: ["학사 일정 캘린더", "휴무일 공지"],
    sections: [
      { name: "요일/시간대 테이블", purpose: "수강 가능 시간 확인", required: true },
      { name: "운영 시간 안내", purpose: "학원 운영 정보", required: true },
      { name: "학사 일정", purpose: "주요 일정 안내", required: false },
      { name: "상담 CTA", purpose: "전환 유도", required: true },
    ],
    wireframe: `┌─────────────────────────────────────┐
│  H1: 시간표/운영 안내                 │
├─────────────────────────────────────┤
│  [월] [화] [수] [목] [금] [토]        │
│  ┌───┬───┬───┬───┬───┬───┐          │
│  │14:│   │   │   │   │10:│          │
│  │중영│...│...│...│...│특강│         │
│  │16:│   │   │   │   │   │          │
│  │고수│...│...│...│...│   │          │
│  └───┴───┴───┴───┴───┴───┘          │
├─────────────────────────────────────┤
│  운영시간: 평일 14:00~22:00           │
│  토요일: 10:00~18:00 | 일·공휴일 휴무  │
├─────────────────────────────────────┤
│  [상담 신청하기]                      │
└─────────────────────────────────────┘`,
  },
  {
    name: "상담/문의 신청",
    slug: "contact",
    purpose: "상담 전환 페이지. 폼 최소화 + 다채널 제공.",
    headline: "상담 신청 · 궁금한 점을 편하게 문의하세요",
    coreCta: "상담 신청하기",
    subCta: "전화 문의 / 카카오 문의",
    proof: ["응답 시간 안내", "상담 프로세스 3단계", "개인정보 동의"],
    mobile: "폼 단일 컬럼, 하단 전화/카카오 고정 CTA",
    seo: "/contact, LocalBusiness 연락처 스키마",
    performanceNote: "응답 시간 과장 금지. '24시간 내 답변'처럼 현실적으로 안내.",
    skippable: ["상담 프로세스 도식(간단한 경우)", "FAQ 링크"],
    sections: [
      { name: "타이틀 + 안내 문구", purpose: "상담 기대치 설정", required: true },
      { name: "폼 (이름, 연락처, 관심 과정)", purpose: "최소 필드 상담 접수", required: true },
      { name: "응답 시간 안내", purpose: "기대치 관리", required: true },
      { name: "문의 채널 병렬 (전화, 카카오, 이메일)", purpose: "선호 채널 제공", required: true },
      { name: "개인정보 동의", purpose: "법적 요구 충족", required: true },
      { name: "상담 프로세스 안내", purpose: "신뢰 형성", required: false },
    ],
    wireframe: `┌─────────────────────────────────────┐
│  H1: 상담 신청                       │
│  "평일 기준 24시간 내 답변 드립니다"    │
├─────────────────────────────────────┤
│  이름: [____________]                │
│  연락처: [____________]              │
│  관심 과정: [____________▼]          │
│  문의 내용: [____________]           │
│  ☑ 개인정보 수집 동의                 │
│  [상담 신청하기]                      │
├─────────────────────────────────────┤
│  📞 전화  💬 카카오  ✉️ 이메일         │
├─────────────────────────────────────┤
│  상담 → 맞춤 안내 → 수업 시작         │
└─────────────────────────────────────┘`,
  },
  {
    name: "설명회/체험수업 신청",
    slug: "events",
    purpose: "설명회·체험수업 예약으로 첫 접점 전환",
    headline: "[학원명] 설명회/체험수업 · 직접 경험해 보세요",
    coreCta: "예약 신청",
    subCta: "전화 문의",
    proof: ["일정 정보", "참여 혜택(과장 금지)", "프로그램 안내"],
    mobile: "캘린더 간소화, 폼 단일 컬럼",
    seo: "/events, Event 스키마",
    performanceNote: "참여 혜택 과장 금지. '무료 레벨테스트' 정도가 적정.",
    skippable: ["이전 설명회 후기", "갤러리"],
    sections: [
      { name: "타이틀 + 일정 안내", purpose: "예약 가능 일정 확인", required: true },
      { name: "일정 선택 (캘린더/리스트)", purpose: "편리한 일정 선택", required: true },
      { name: "예약 폼", purpose: "예약 접수", required: true },
      { name: "참여 안내사항", purpose: "준비물·주의사항", required: true },
      { name: "프로그램 요약", purpose: "체험 내용 기대치 설정", required: false },
    ],
    wireframe: `┌─────────────────────────────────────┐
│  H1: 설명회/체험수업 예약              │
├─────────────────────────────────────┤
│  📅 일정 선택                        │
│  [3/15(토) 14:00] [3/22(토) 14:00]  │
├─────────────────────────────────────┤
│  이름: [____________]                │
│  연락처: [____________]              │
│  참여 대상: [____________▼]          │
│  [예약 신청하기]                      │
├─────────────────────────────────────┤
│  참여 안내: 본원 방문, 약 60분 소요    │
└─────────────────────────────────────┘`,
  },
  {
    name: "공지/학습정보/블로그",
    slug: "blog",
    purpose: "공지사항 및 학습 콘텐츠로 SEO 유입 + 전문성 신뢰",
    headline: "[학원명] 학습 정보 · 공지사항",
    coreCta: "상담 신청 배너",
    subCta: "관련 과정 보기",
    proof: ["콘텐츠 전문성", "정기적 업데이트"],
    mobile: "리스트 1열, 카테고리 탭",
    seo: "/blog, /blog/[slug], Article 스키마, 내부 링크 전략",
    performanceNote: "학습 팁 등 콘텐츠에서 허위 정보·과장된 효과 주장 금지.",
    skippable: ["댓글 기능", "공유 버튼"],
    sections: [
      { name: "카테고리 필터", purpose: "공지/학습정보/이벤트 분류", required: true },
      { name: "글 카드 리스트", purpose: "콘텐츠 탐색", required: true },
      { name: "상세 페이지", purpose: "개별 글 열람", required: true },
      { name: "관련 글 추천", purpose: "내부 링크 강화", required: false },
      { name: "상담 CTA 배너", purpose: "전환 유도", required: true },
    ],
    wireframe: `┌─────────────────────────────────────┐
│  H1: 학습 정보/공지사항               │
│  [전체] [공지] [학습 팁] [이벤트]      │
├──────────┬──────────────────────────┤
│ 📝 글 카드 │ 📝 글 카드              │
│ 제목·날짜  │ 제목·날짜               │
│ 요약 2줄   │ 요약 2줄                │
├──────────┴──────────────────────────┤
│  💬 상담 신청 배너                    │
└─────────────────────────────────────┘`,
  },
];

const PageTemplates = () => (
  <div className="space-y-10">
    <PageHeader
      title="페이지 템플릿"
      description="실제 고객사 사이트 제작에 바로 재사용할 수 있는 11개 페이지별 섹션 구조, 와이어프레임, CTA, 증빙 요소, 모바일 축약 규칙, SEO 포인트를 제공합니다."
      tocItems={templates.map((t) => ({ id: `template-${t.slug}`, label: t.name }))}
      summaryCards={[
        { title: "총 11개 템플릿", body: "홈, 과정 목록, 과정 상세, 강사진, 지점, 성과, 후기, 시간표, 상담, 설명회, 블로그" },
        { title: "재사용 목표", body: "섹션 순서·CTA·proof를 복사해 빠르게 와이어프레임 구성" },
        { title: "SEO 연동", body: "각 템플릿별 URL·스키마·H1 구조 포함" },
      ]}
      quickApply={[
        "홈페이지: Hero + Quick Info + 핵심 과정 + CTA",
        "과정 상세: 커리큘럼 아코디언 + 강사진 + 상담 CTA",
        "성과 페이지: ⚠️ 예시 데이터 명시 + 근거/기간 동반",
        "상담 페이지: 폼 3필드 이하 + 응답 시간 안내",
        "전체: 모바일 하단 고정 CTA 바 필수 적용",
      ]}
    />

    <Accordion type="multiple" className="space-y-4">
      {templates.map((t, idx) => (
        <AccordionItem key={t.slug} value={t.slug} className="rounded-lg border bg-card">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">{idx + 1}</span>
              <div>
                <span className="font-bold">{t.name}</span>
                <span className="ml-2 text-xs text-muted-foreground">{t.slug === "home" ? "/" : `/${t.slug}`}</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-6">
            {/* 목적 & 헤드라인 */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold mb-1">목적</h3>
                <p className="text-sm text-muted-foreground">{t.purpose}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">추천 헤드라인 구조</h3>
                <p className="text-sm font-mono text-muted-foreground">{t.headline}</p>
              </div>
            </div>

            {/* CTA & Proof */}
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold mb-1">핵심 CTA</h3>
                <p className="text-sm text-muted-foreground">{t.coreCta}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">보조 CTA</h3>
                <p className="text-sm text-muted-foreground">{t.subCta}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Proof 요소</h3>
                <div className="flex flex-wrap gap-1">{t.proof.map(p => <span key={p} className="rounded bg-success/10 px-2 py-0.5 text-xs text-success">{p}</span>)}</div>
              </div>
            </div>

            {/* 섹션 구조 */}
            <div>
              <h3 className="text-sm font-semibold mb-2">섹션 구조</h3>
              <div className="space-y-1">
                {t.sections.map((s, i) => (
                  <div key={s.name} className="flex items-start gap-2 rounded-md border bg-background p-2 text-sm">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-muted text-[10px] font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <span className="font-medium">{s.name}</span>
                      <span className="ml-2 text-muted-foreground">— {s.purpose}</span>
                    </div>
                    {s.required ? <BadgeTag type="필수" /> : <BadgeTag type="선택" />}
                  </div>
                ))}
              </div>
            </div>

            {/* 생략 가능 */}
            <div>
              <h3 className="text-sm font-semibold mb-1">생략 가능 요소</h3>
              <div className="flex flex-wrap gap-1">{t.skippable.map(s => <span key={s} className="rounded bg-muted px-2 py-0.5 text-xs">{s}</span>)}</div>
            </div>

            {/* 모바일 & SEO */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader><CardTitle className="text-sm">📱 모바일 축약</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground">{t.mobile}</CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-sm">🔍 SEO 포인트</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground">{t.seo}</CardContent>
              </Card>
            </div>

            {/* 성과 주의 */}
            <div className="rounded-md border border-warning bg-warning/5 p-3">
              <div className="flex items-center gap-1 mb-1"><BadgeTag type="검토 필요" /><span className="text-sm font-semibold">성과 주장 시 주의</span></div>
              <p className="text-sm text-muted-foreground">{t.performanceNote}</p>
            </div>

            {/* 와이어프레임 */}
            <CopyBlock title={`${t.name} 와이어프레임`} content={t.wireframe} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export default PageTemplates;
