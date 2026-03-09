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

export type ProofStatus = "보유" | "부족" | "비공개" | "검토 필요";

export type ProofAssetStatus = {
  name: string;
  status: ProofStatus;
  strength: "강함" | "보조";
  placement: string;
  fallback: string;
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

export const getSiteTypeReason = (brief: ClientBriefData): string => {
  const isAdult = brief.educationSubtype === "성인어학" || brief.educationSubtype === "취업/직무" || brief.educationSubtype === "자격증";
  if (isAdult) return `교육 유형이 '${brief.educationSubtype}'이므로 성인교육형으로 판별`;
  if (brief.branchType === "다지점") return "다지점 운영이므로 지점형으로 판별";
  if (brief.hasResults && brief.hasTeacherProfile && brief.hasReviews) return "성과+강사진+후기 모두 보유하므로 성과신뢰형으로 판별";
  if (brief.corePrograms.length > 30) return "핵심 프로그램 설명이 상세하므로 과정탐색형으로 판별";
  if (brief.consultingChannels.length >= 2) return `상담 채널 ${brief.consultingChannels.length}개 운영으로 상담전환형으로 판별`;
  return "기본 조건으로 하이브리드형으로 판별";
};

export const getProofStatuses = (brief: ClientBriefData): ProofAssetStatus[] => [
  { name: "강사진 경력", status: brief.hasTeacherProfile ? "보유" : "부족", strength: "강함", placement: "홈, 강사진, 과정 상세", fallback: "교육 철학/운영 방식 중심 대체" },
  { name: "커리큘럼 구조", status: brief.corePrograms.length > 10 ? "보유" : "부족", strength: "강함", placement: "과정 목록/상세", fallback: "학습 목표/단계 텍스트 제공" },
  { name: "대상 적합성", status: brief.targetAges.length > 0 ? "보유" : "부족", strength: "강함", placement: "홈 히어로, 과정 카드", fallback: "일반적 대상 표기" },
  { name: "성과/합격 사례", status: brief.hasResults ? "보유" : "비공개", strength: "강함", placement: "홈, 성과 페이지", fallback: "운영 프로세스/학습 방식 강조" },
  { name: "수강 후기", status: brief.hasReviews ? "보유" : "부족", strength: "강함", placement: "홈, 후기 페이지", fallback: "FAQ + 상담 프로세스 상세로 대체" },
  { name: "지점/시설/학습환경", status: brief.hasFacilityAssets ? "보유" : "부족", strength: "보조", placement: "홈, 지점/캠퍼스", fallback: "지도/주소/운영시간 텍스트" },
  { name: "운영 방식/학습 프로세스", status: "보유", strength: "보조", placement: "과정 상세, 홈", fallback: "단계별 학습 흐름 텍스트" },
  { name: "설명회/상담 프로세스", status: brief.consultingFeatures.length > 0 ? "보유" : "부족", strength: "보조", placement: "상담 페이지", fallback: "전화/폼 이중 채널 안내" },
  { name: "교재/자료/학습 시스템", status: "검토 필요", strength: "보조", placement: "과정 상세", fallback: "주차별 학습 목표 텍스트" },
  { name: "FAQ/정책 안내", status: "보유", strength: "보조", placement: "상담, 홈 하단", fallback: "기본 FAQ 템플릿 제공" },
];

export const getPageSet = (siteType: SiteType) => {
  const requiredCommon = ["홈", "과정 목록", "과정 상세", "강사진", "상담/문의", "시간표/운영안내"];
  const optionalCommon = ["설명회/체험수업", "학습정보/블로그", "FAQ"];
  const forbiddenCommon = ["근거 없는 합격률 전용 랜딩", "검증되지 않은 후기 모음"];

  if (siteType === "지점형") {
    return { required: [...requiredCommon, "지점/캠퍼스"], optional: [...optionalCommon, "지점별 공지"], removable: ["성과/합격사례"], forbidden: forbiddenCommon };
  }
  if (siteType === "성과신뢰형") {
    return { required: [...requiredCommon, "성과/합격사례", "후기/수강생 이야기"], optional: [...optionalCommon, "성과 검증 기준 안내"], removable: ["지점/캠퍼스"], forbidden: forbiddenCommon };
  }
  if (siteType === "성인교육형") {
    return { required: [...requiredCommon, "상담 예약", "주말/야간 운영 안내"], optional: [...optionalCommon, "취업/자격 FAQ"], removable: ["학부모 전용 섹션"], forbidden: ["아동용 표현", ...forbiddenCommon] };
  }
  if (siteType === "과정탐색형") {
    return { required: [...requiredCommon, "과정 비교"], optional: [...optionalCommon, "레벨 테스트 안내"], removable: ["성과/합격사례"], forbidden: forbiddenCommon };
  }
  if (siteType === "상담전환형") {
    return { required: [...requiredCommon, "상담 프로세스 안내"], optional: [...optionalCommon], removable: ["지점/캠퍼스", "블로그"], forbidden: forbiddenCommon };
  }
  return { required: requiredCommon, optional: optionalCommon, removable: ["성과/합격사례", "지점/캠퍼스"], forbidden: forbiddenCommon };
};

export const buildBlueprintBlocks = (brief: ClientBriefData): BlueprintBlock[] => {
  const siteType = inferSiteType(brief);
  const mainCta = brief.ctaPriority[0] || "상담 신청하기";
  const subCta = brief.ctaPriority[1] || "과정 보기";
  const isAdult = siteType === "성인교육형";
  const hasKakao = brief.consultingChannels.includes("카카오");

  return [
    {
      section: "공개용 홈페이지 구조",
      required: ["Hero(대상+과정+즉시행동)", "Quick Info Bar", "핵심 과정 카드", "강사진 요약", "최종 CTA"],
      optional: ["후기 요약", "설명회 배너", "학습 프로세스 인포그래픽"],
      conditional: [
        brief.hasResults ? "성과 카드" : "성과 카드 생략 + 운영 방식 강조",
        brief.branchType === "다지점" ? "지점 미리보기 카드" : "단일 지점 지도 임베드",
        isAdult ? "야간/주말 과정 우선 노출" : "학년별 과정 진입점",
      ],
      forbidden: ["과장 카피", "근거 없는 수치 강조", "'업계 최고' 표현"],
      coreCta: mainCta,
      subCta,
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
      optional: ["비교 카드", "수강 FAQ", "교재 미리보기"],
      conditional: [
        brief.tuitionPublic === "공개" ? "수강료 테이블" : "비공개 사유 + 상담 안내 UX",
        isAdult ? "실무 적용 결과 중심 설명" : "학년별 커리큘럼 타임라인",
      ],
      forbidden: ["대상 불명확 제목", "과정명만 나열"],
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
      section: "강사진 소개 구조",
      required: ["강사 프로필 카드(과목+경력)", "교육 철학/방식", "상담 CTA"],
      optional: ["담당 과정 링크", "수업 스타일 키워드"],
      conditional: [
        brief.hasTeacherProfile ? "경력 상세 표기" : "교육 철학/운영 방식 중심 대체",
      ],
      forbidden: ["허위 경력", "과장된 수상/언론 노출"],
      coreCta: mainCta,
      subCta: "과정 보기",
      proof: ["강사 경력(검증된 것만)", "교육 철학"],
      mobileRule: "카드형 가로 스크롤 또는 아코디언",
      seoPoint: "강사명+과목 조합 키워드",
      fallback: "경력 미확보 시 수업 방식/운영 철학 중심 프로필",
      bySubtype: isAdult ? "실무 경험/자격증 중심" : "학년별 전문 교수 경험 중심",
      reviewClaim: "허위 경력/학위 절대 금지",
    },
    {
      section: "상담/체험수업 페이지 구조",
      required: ["신청 폼(최소 필드)", "응답 시간 안내", "개인정보 동의", "문의 채널 병렬 제공"],
      optional: ["상담 프로세스 3단계", "자주 묻는 질문"],
      conditional: [
        hasKakao ? "카카오 즉시 문의 버튼" : "전화/폼 우선",
        brief.consultingFeatures.includes("체험수업") ? "체험수업 신청 전용 섹션" : "일반 상담 폼만 제공",
        brief.consultingFeatures.includes("설명회") ? "설명회 일정 캘린더" : "설명회 섹션 생략",
      ],
      forbidden: ["불필요한 긴 폼", "개인정보 동의 없는 폼"],
      coreCta: "상담 신청하기",
      subCta: "전화 문의",
      proof: ["상담 진행 절차", "운영 시간"],
      mobileRule: "하단 고정 CTA 2~4개 유지",
      seoPoint: "LocalBusiness 성격의 연락처/지역 정보 구조화",
      fallback: "메신저 미운영 시 전화+폼 이중 채널 제공",
      bySubtype: isAdult ? "야간/주말 상담 가능 여부 상단 표기" : "학부모 전용 상담 안내 포함",
      reviewClaim: "응답 시간 과장 금지",
    },
    {
      section: "후기/성과 페이지 구조",
      required: ["수강 후기 카드", "후기 필터(과정별)"],
      optional: ["성과 사례 카드", "비디오 후기"],
      conditional: [
        brief.hasResults ? "성과/합격 사례 섹션" : "성과 섹션 생략 + 학습 과정 중심",
        brief.hasReviews ? "실제 수강생 후기" : "FAQ + 상담 프로세스로 대체",
      ],
      forbidden: ["허위 후기", "허위 합격률", "허위 점수향상"],
      coreCta: mainCta,
      subCta: "과정 보기",
      proof: ["실제 수강생 후기(동의 필요)", "성과 근거/출처"],
      mobileRule: "카드형 세로 스크롤, 필터는 상단 칩",
      seoPoint: "후기 페이지 URL은 /reviews, 성과는 /results",
      fallback: "후기 부족 시 FAQ + 상담 과정 상세 제공",
      bySubtype: brief.educationSubtype === "입시" ? "합격 사례는 연도/학교명 표기(검증된 것만)" : "수강 기간/과정명 표기",
      reviewClaim: "모든 성과 수치에 기간/출처 동반 필수",
    },
    {
      section: "지점/캠퍼스 페이지 구조",
      required: ["지점 카드(주소+전화+운영시간)", "지도 임베드"],
      optional: ["시설 사진 갤러리", "주차 안내"],
      conditional: [
        brief.branchType === "다지점" ? "지점별 필터/탭" : "단일 지점 상세 정보",
        brief.hasFacilityAssets ? "시설 사진 갤러리" : "텍스트 기반 시설 안내",
      ],
      forbidden: ["과도하게 보정된 시설 사진"],
      coreCta: "길찾기",
      subCta: "전화 문의",
      proof: ["실제 시설 사진", "교통 안내"],
      mobileRule: "지도 + 전화/길찾기 원터치",
      seoPoint: "지점별 URL 분리, LocalBusiness 스키마",
      fallback: "시설 사진 없으면 주소+지도+운영시간 중심",
      bySubtype: "",
      reviewClaim: "",
    },
    {
      section: "학습정보/블로그 구조",
      required: ["게시글 카드(제목+요약+날짜)", "카테고리 필터"],
      optional: ["인기글 사이드바", "관련 과정 링크"],
      conditional: [],
      forbidden: ["광고성 글만 나열", "SEO 스팸 콘텐츠"],
      coreCta: "과정 보기",
      subCta: mainCta,
      proof: ["전문성 기반 콘텐츠"],
      mobileRule: "카드형 세로 스크롤",
      seoPoint: "Article 스키마, 카테고리별 URL",
      fallback: "블로그 미운영 시 FAQ 강화로 대체",
      bySubtype: "",
      reviewClaim: "",
    },
  ];
};

export const buildImplementationRules = (brief: ClientBriefData) => {
  const siteType = inferSiteType(brief);
  const isAdult = siteType === "성인교육형";
  const minSet = ["Hero", "핵심 과정", "강사진 요약", "상담 CTA", "연락처/위치"];
  const standardSet = [...minSet, "과정 상세", "시간표", "FAQ", "후기 요약"];
  const fullSet = [...standardSet, "성과/증빙", "지점 정보", "블로그", "설명회/체험수업", "커리큘럼 타임라인", "수강료 안내"];

  // Site focus type
  const focusTypes: string[] = [];
  if (brief.corePrograms.length > 30) focusTypes.push("과정 중심형");
  if (brief.hasTeacherProfile) focusTypes.push("강사진 중심형");
  if (brief.hasResults) focusTypes.push("성과 중심형");
  if (brief.branchType === "다지점") focusTypes.push("지점 중심형");
  if (isAdult) focusTypes.push("성인교육형");
  if (focusTypes.length === 0) focusTypes.push("일반 균형형");

  return {
    siteType,
    focusTypes,
    branchRule: brief.branchType === "다지점"
      ? "지점별 랜딩 + 공통 과정 허브 구성. 각 지점 페이지에 고유 연락처/운영시간/지도 포함"
      : "단일 지점 기준 연락처/지도 고정. 모든 페이지 하단에 위치 정보 노출",
    audienceRule: isAdult
      ? "성인형 문체/야간·주말 운영/실무 결과 중심. '학부모' 관련 문구 제거"
      : "학부모+학생 동시 이해형 문체/학습 관리 프로세스 강조. 학년별 대상 태그 필수",
    assetRules: [
      brief.hasResults ? "✅ 성과 블록 유지 — 홈+성과 페이지에 근거/출처 포함하여 배치" : "⚠️ 성과 블록 축소 — 과정 구조/강사진 증빙으로 신뢰 확보",
      brief.hasTeacherProfile ? "✅ 강사진 상세 노출 — 경력 검증 후 과목별 프로필 카드 제공" : "⚠️ 강사진 철학/운영 방식 중심 대체 — 경력 미확보 시 수업 방식 강조",
      brief.hasReviews ? "✅ 후기 섹션 유지 — 과정/기간 표기, 수강생 동의 확인" : "⚠️ FAQ + 상담 프로세스 상세로 대체 — 후기 미확보 시 대체 신뢰 요소",
      brief.hasFacilityAssets ? "✅ 시설 사진 활용 — 실제 사진 기준, 과도한 보정 금지" : "⚠️ 시설 사진 미확보 — 주소+지도+운영시간 텍스트 중심",
    ],
    channelRule: brief.consultingChannels.includes("카카오")
      ? "모바일 고정바에 카카오 포함 (전화 + 카카오 + 상담신청)"
      : brief.consultingChannels.includes("전화")
        ? "전화+폼 우선 CTA 구성 (전화 + 상담신청 + 위치)"
        : "폼 중심 CTA 구성 (상담신청 + 과정 보기)",
    budget: {
      minimal: minSet,
      standard: standardSet,
      full: fullSet,
    },
    removable: [
      "장식용 비주얼 섹션",
      "근거 없는 성과 배너",
      !brief.hasResults ? "성과/합격사례 페이지" : "",
      !brief.hasReviews ? "후기 전용 페이지" : "",
      brief.branchType !== "다지점" ? "지점/캠퍼스 페이지" : "",
    ].filter(Boolean),
    mustKeep: [
      "대상 적합성 (히어로 영역)",
      "과정 구조 (과정 목록/상세)",
      "강사진/운영 체계",
      "상담 CTA (모든 페이지)",
      "위치/문의 정보 (헤더+푸터)",
      "모바일 하단 고정 CTA 바",
      "개인정보 수집 동의",
    ],
    instantGuide: [
      "첫 화면 5초 내 대상·과정·행동을 인지시키기",
      "모바일 하단 고정 CTA 2~4개 유지",
      "성과 표현은 근거/출처/기간 동반",
      `핵심 CTA: "${brief.ctaPriority[0] || "상담 신청하기"}" 기준으로 모든 페이지 배치`,
      isAdult ? "야간/주말 운영 정보를 히어로 영역에 명시" : "학년별 과정 진입점을 히어로 하단에 배치",
      brief.branchType === "다지점" ? "지점 선택 UI를 홈 상단에 배치" : "단일 지점 주소/전화를 헤더에 고정",
      brief.tuitionPublic !== "공개" ? "수강료 비공개 시 '개별 상담 안내' 사유 UX 제공" : "수강료 테이블을 과정 상세에 포함",
    ],
  };
};

export const buildLovablePrompt = (brief: ClientBriefData): string => {
  const siteType = inferSiteType(brief);
  const pageSet = getPageSet(siteType);
  const mainCta = brief.ctaPriority[0] || "상담 신청하기";

  return `아래 조건으로 ${brief.educationSubtype} 교육 사이트를 만들어 주세요.

[기본 정보]
- 학원명: ${brief.academyName || "(미입력)"}
- 유형: ${brief.educationSubtype} / ${brief.operationType}
- 대상: ${brief.targetAges.join(", ") || "(미입력)"}
- 지역: ${brief.region || "(미입력)"}
- 지점: ${brief.branchType}

[필수 페이지]
${pageSet.required.map(p => `- ${p}`).join("\n")}

[핵심 CTA]
- 1차: ${mainCta}
- 2차: ${brief.ctaPriority[1] || "과정 보기"}

[디자인 방향]
- 톤: ${brief.brandTone || "신뢰형, 구조적"}
- 금지: ${brief.forbiddenPhrases || "합격 보장, 100%, 업계 최고"}

[자산 현황]
- 강사진 프로필: ${brief.hasTeacherProfile ? "보유" : "미보유"}
- 성과/합격 사례: ${brief.hasResults ? "보유" : "미보유"}
- 수강 후기: ${brief.hasReviews ? "보유" : "미보유"}
- 시설 사진: ${brief.hasFacilityAssets ? "보유" : "미보유"}

[모바일]
- 하단 고정 CTA: ${brief.consultingChannels.slice(0, 4).join(", ")}
- 전화/카카오 원터치 실행

[SEO]
- 메타 타이틀: ${brief.region} ${brief.educationSubtype} ${brief.academyName}
- JSON-LD: EducationalOrganization, Course, LocalBusiness`;
};

export const buildMetaSuggestions = (brief: ClientBriefData) => {
  const region = brief.region || "[지역]";
  const subtype = brief.educationSubtype || "[유형]";
  const name = brief.academyName || "[학원명]";

  return {
    home: { title: `${region} ${subtype} ${name} | 홈`, description: `${region} ${subtype} 전문 ${name}. ${brief.targetAges.join("/")} 대상 ${brief.corePrograms.split(",")[0] || "맞춤 과정"} 운영. 상담 신청 가능.` },
    programs: { title: `과정 안내 | ${name}`, description: `${name}의 전체 과정 목록. ${brief.targetAges.join("/")} 대상 ${subtype} 프로그램을 확인하세요.` },
    teachers: { title: `강사진 소개 | ${name}`, description: `${name} 강사진의 경력과 교육 철학을 확인하세요.` },
    contact: { title: `상담 신청 | ${name}`, description: `${name}에 상담을 신청하세요. ${brief.consultingChannels.join(", ")} 가능.` },
  };
};
