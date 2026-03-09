export type EducationSubtype =
  | "보습"
  | "입시"
  | "영어/어학"
  | "수학"
  | "국어/과학"
  | "성인어학"
  | "자격증"
  | "취업/직무"
  | "코딩/디지털"
  | "예체능"
  | "교습소/공부방"
  | "기타";

export type SiteType =
  | "상담전환형"
  | "과정탐색형"
  | "성과신뢰형"
  | "지점형"
  | "성인교육형"
  | "하이브리드형";

export const BRIEF_SCHEMA_VERSION = "1.0.0";

export type ClientBriefData = {
  academyName: string;
  educationSubtype: EducationSubtype;
  targetAges: string[];
  corePrograms: string;
  operationType: "오프라인" | "온라인" | "하이브리드";
  branchType: "단일 지점" | "다지점";
  region: string;
  schedule: string;
  tuitionPublic: "공개" | "비공개" | "부분 공개";
  consultingFeatures: string[];
  consultingChannels: string[];
  hasTeacherProfile: boolean;
  hasResults: boolean;
  hasReviews: boolean;
  hasFacilityAssets: boolean;
  requiredPages: string[];
  ctaPriority: string[];
  brandTone: string;
  forbiddenPhrases: string;
  positioningMemo: string;
};

export type BriefEnvelope = {
  schemaVersion: string;
  lastSavedAt: string;
  data: ClientBriefData;
};

export const defaultBriefData: ClientBriefData = {
  academyName: "",
  educationSubtype: "기타",
  targetAges: [],
  corePrograms: "",
  operationType: "오프라인",
  branchType: "단일 지점",
  region: "",
  schedule: "",
  tuitionPublic: "비공개",
  consultingFeatures: [],
  consultingChannels: [],
  hasTeacherProfile: false,
  hasResults: false,
  hasReviews: false,
  hasFacilityAssets: false,
  requiredPages: [],
  ctaPriority: [],
  brandTone: "",
  forbiddenPhrases: "",
  positioningMemo: "",
};

export const briefRequiredFields: Array<keyof ClientBriefData> = [
  "academyName",
  "educationSubtype",
  "targetAges",
  "corePrograms",
  "operationType",
  "branchType",
  "region",
  "consultingChannels",
  "ctaPriority",
  "brandTone",
];

export const validateBriefShape = (candidate: unknown): candidate is BriefEnvelope => {
  if (!candidate || typeof candidate !== "object") return false;
  const envelope = candidate as Partial<BriefEnvelope>;
  return !!envelope.schemaVersion && !!envelope.lastSavedAt && !!envelope.data;
};

export const calculateBriefScore = (data: ClientBriefData) => {
  const completed = briefRequiredFields.filter((field) => {
    const value = data[field];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value.trim().length > 0;
    return !!value;
  });

  return {
    completed: completed.length,
    total: briefRequiredFields.length,
    percent: Math.round((completed.length / briefRequiredFields.length) * 100),
    missing: briefRequiredFields.filter((field) => !completed.includes(field)),
  };
};
