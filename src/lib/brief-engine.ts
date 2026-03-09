import { ClientBriefData, SiteType } from "@/lib/brief-schema";

export type BlueprintBlock = {
  section: string;
  required: string[];
  optional: string[];
  conditional: string[];
  forbidden: string[];
  coreCta: string;
  subCta: string;
  proof: string[];
  mobileRule: string;
  seoPoint: string;
  fallback: string;
  bySubtype: string;
  reviewClaim: string;
};

export const inferSiteType = (brief: ClientBriefData): SiteType => {
  const isAdult = brief.educationSubtype === "성인어학" || brief.educationSubtype === "취업/직무" || brief.educationSubtype === "자격증";
  const hasStrongProof = brief.hasResults && brief.hasTeacherProfile && brief.hasReviews;

  if (isAdult) return "성인교육형";
  if (brief.branchType === "다지점") return "지점형";
  if (hasStrongProof) return "성과신뢰형";
  if (brief.corePrograms.length > 30) return "과정탐색형";
  if (brief.consultingChannels.length >= 2) return "상담전환형";
  return "하이브리드형";
};

export const getPageSet = (siteType: SiteType) => {
  const requiredCommon = ["홈", "과정 목록", "과정 상세", "강사진", "상담/문의", "시간표/운영안내"];
  const optionalCommon = ["설명회/체험수업", "학습정보/블로그", "FAQ"];
  const forbiddenCommon = ["근거 없는 합격률 전용 랜딩", "검증되지 않은 후기 모음"];

  if (siteType === "지점형") {
    return {
      required: [...requiredCommon, "지점/캠퍼스"],
      optional: [...optionalCommon, "지점별 공지"],
      removable: ["성과/합격사례"],
      forbidden: forbiddenCommon,
    };
  }

  if (siteType === "성과신뢰형") {
    return {
      required: [...requiredCommon, "성과/합격사례", "후기/수강생 이야기"],
      optional: [...optionalCommon, "성과 검증 기준 안내"],
      removable: ["지점/캠퍼스"],
      forbidden: forbiddenCommon,
    };
  }

  if (siteType === "성인교육형") {
    return {
      required: [...requiredCommon, "상담 예약", "주말/야간 운영 안내"],
      optional: [...optionalCommon, "취업/자격 FAQ"],
      removable: ["학부모 전용 섹션"],
      forbidden: ["아동용 표현", ...forbiddenCommon],
    };
  }

  return {
    required: requiredCommon,
    optional: optionalCommon,
    removable: ["성과/합격사례", "지점/캠퍼스"],
    forbidden: forbiddenCommon,
  };
};

export const buildBlueprintBlocks = (brief: ClientBriefData): BlueprintBlock[] => {
  const siteType = inferSiteType(brief);
  const mainCta = brief.ctaPriority[0] || "상담 신청하기";

  return [
    {
      section: "공개용 홈페이지 구조",
      required: ["Hero(대상+과정+즉시행동)", "Quick Info Bar", "핵심 과정 카드", "강사진 요약", "최종 CTA"],
      optional: ["후기 요약", "설명회 배너"],
      conditional: [brief.hasResults ? "성과 카드" : "성과 카드 생략 + 운영 방식 강조"],
      forbidden: ["과장 카피", "근거 없는 수치 강조"],
      coreCta: mainCta,
      subCta: "과정 보기",
      proof: ["강사진", "과정 구조", brief.hasResults ? "성과 근거" : "운영 프로세스"],
      mobileRule: "모바일 첫 화면에 CTA 1개 + 보조 CTA 1개만 노출",
      seoPoint: "H1 1개, 대상+과목+지역 조합 키워드 포함",
      fallback: "성과 자산 부족 시 후기 대신 수업 진행 방식/강의 샘플 제공",
      bySubtype: `${brief.educationSubtype} 유형은 대상 적합성 문장을 첫 화면 상단에 배치`,
      reviewClaim: "'보장', '100%' 표현 금지",
    },
    {
      section: "과정 목록/상세 구조",
      required: ["대상 필터", "레벨 필터", "커리큘럼 요약", "수강 방식", "상담 CTA"],
      optional: ["비교 카드", "수강 FAQ"],
      conditional: [brief.tuitionPublic === "공개" ? "수강료 테이블" : "비공개 사유 + 상담 안내 UX"],
      forbidden: ["대상 불명확 제목"],
      coreCta: "체험수업 신청",
      subCta: "커리큘럼 보기",
      proof: ["강의 계획", "학습 자료 예시"],
      mobileRule: "필터는 탭형 1행, 상세는 아코디언으로 축약",
      seoPoint: "과정 상세 URL은 /programs/[대상]-[과목]-[레벨]",
      fallback: "교재 이미지 없으면 주차별 학습 목표 텍스트 제공",
      bySubtype: "입시/자격증은 단계별 일정 블록 강화",
      reviewClaim: "점수/합격 사례는 예시 데이터 표기 필요",
    },
    {
      section: "상담/체험수업 페이지 구조",
      required: ["신청 폼(최소 필드)", "응답 시간 안내", "개인정보 동의", "문의 채널 병렬 제공"],
      optional: ["상담 프로세스 3단계"],
      conditional: [brief.consultingChannels.includes("카카오") ? "카카오 즉시 문의 버튼" : "전화/폼 우선"],
      forbidden: ["불필요한 긴 폼"],
      coreCta: "상담 신청하기",
      subCta: "전화 문의",
      proof: ["상담 진행 절차", "운영 시간"],
      mobileRule: "하단 고정 CTA 2~4개 유지",
      seoPoint: "LocalBusiness 성격의 연락처/지역 정보 구조화",
      fallback: "메신저 미운영 시 전화+폼 이중 채널 제공",
      bySubtype: "성인교육형은 야간/주말 상담 가능 여부 상단 표기",
      reviewClaim: "응답 시간 과장 금지",
    },
  ];
};

export const buildImplementationRules = (brief: ClientBriefData) => {
  const siteType = inferSiteType(brief);
  const minSet = ["Hero", "핵심 과정", "강사진 요약", "상담 CTA", "연락처/위치"];
  const standardSet = [...minSet, "과정 상세", "시간표", "FAQ", "후기 요약"];
  const fullSet = [...standardSet, "성과/증빙", "지점 정보", "블로그", "설명회/체험수업"];

  return {
    siteType,
    branchRule: brief.branchType === "다지점" ? "지점별 랜딩 + 공통 과정 허브 구성" : "단일 지점 기준 연락처/지도 고정",
    audienceRule:
      brief.educationSubtype === "성인어학" || brief.educationSubtype === "취업/직무" || brief.educationSubtype === "자격증"
        ? "성인형 문체/야간 운영/실무 결과 중심"
        : "학부모+학생 동시 이해형 문체/학습 관리 프로세스 강조",
    assetRules: [
      brief.hasResults ? "성과 블록 유지" : "성과 블록 축소 + 과정 구조/강사진 증빙 강화",
      brief.hasTeacherProfile ? "강사진 상세 노출" : "강사진 철학/운영 방식 중심 대체",
      brief.hasReviews ? "후기 섹션 유지" : "FAQ + 상담 프로세스 상세로 대체",
    ],
    channelRule: brief.consultingChannels.includes("카카오") ? "모바일 고정바에 카카오 포함" : "전화/폼 우선 CTA 구성",
    budget: {
      minimal: minSet,
      standard: standardSet,
      full: fullSet,
    },
    removable: ["장식용 비주얼 섹션", "근거 없는 성과 배너"],
    mustKeep: ["대상 적합성", "과정 구조", "강사진/운영 체계", "상담 CTA", "위치/문의 정보"],
    instantGuide: [
      "첫 화면 5초 내 대상·과정·행동을 인지시키기",
      "모바일 하단 고정 CTA 2~4개 유지",
      "성과 표현은 근거/출처/기간 동반",
    ],
  };
};
