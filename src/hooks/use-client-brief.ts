import { useEffect, useMemo, useState } from "react";
import {
  BRIEF_SCHEMA_VERSION,
  BriefEnvelope,
  ClientBriefData,
  calculateBriefScore,
  defaultBriefData,
  validateBriefShape,
} from "@/lib/brief-schema";

const STORAGE_KEY = "edu-guide-client-brief";

export const exampleBriefData: ClientBriefData = {
  academyName: "예시 데이터 | 에듀브릿지 학습센터",
  educationSubtype: "보습",
  targetAges: ["중학생", "고등학생"],
  corePrograms: "예시 데이터 | 내신 관리반, 수능 대비반, 주말 심화 특강",
  operationType: "오프라인",
  branchType: "단일 지점",
  region: "예시 데이터 | 서울 강남구 대치동",
  schedule: "예시 데이터 | 평일 14:00~22:00 / 토 10:00~18:00",
  tuitionPublic: "부분 공개",
  consultingFeatures: ["상담", "체험수업", "설명회"],
  consultingChannels: ["전화", "카카오", "폼"],
  hasTeacherProfile: true,
  hasResults: true,
  hasReviews: true,
  hasFacilityAssets: true,
  requiredPages: ["홈", "과정 목록", "강사진", "상담/문의"],
  ctaPriority: ["상담 신청하기", "체험수업 신청", "과정 보기"],
  brandTone: "신뢰형, 구조적, 과장 없는 안내형",
  forbiddenPhrases: "합격 보장, 100%, 업계 최고",
  positioningMemo: "예시 데이터 | 학부모 신뢰 기반의 내신+입시 통합 운영",
};

const createEnvelope = (data: ClientBriefData): BriefEnvelope => ({
  schemaVersion: BRIEF_SCHEMA_VERSION,
  lastSavedAt: new Date().toISOString(),
  data,
});

export const useClientBrief = () => {
  const [brief, setBrief] = useState<ClientBriefData>(defaultBriefData);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as unknown;
      if (!validateBriefShape(parsed)) {
        setError("저장 데이터 형태가 올바르지 않아 기본값으로 시작합니다.");
        return;
      }

      if (parsed.schemaVersion !== BRIEF_SCHEMA_VERSION) {
        setError(`스키마 버전이 다릅니다. 현재: ${BRIEF_SCHEMA_VERSION}, 저장본: ${parsed.schemaVersion}`);
        return;
      }

      setBrief({ ...defaultBriefData, ...parsed.data });
      setLastSavedAt(parsed.lastSavedAt);
    } catch {
      setError("브리프 데이터를 불러오지 못했습니다.");
    }
  }, []);

  useEffect(() => {
    try {
      const envelope = createEnvelope(brief);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope));
      setLastSavedAt(envelope.lastSavedAt);
      setError(null);
    } catch {
      setError("자동 저장에 실패했습니다.");
    }
  }, [brief]);

  const score = useMemo(() => calculateBriefScore(brief), [brief]);

  const updateField = <K extends keyof ClientBriefData>(key: K, value: ClientBriefData[K]) => {
    setBrief((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => setBrief(defaultBriefData);

  const fillExample = () => setBrief(exampleBriefData);

  const exportJson = () => JSON.stringify(createEnvelope(brief), null, 2);

  const importJson = (jsonText: string) => {
    try {
      const parsed = JSON.parse(jsonText) as unknown;
      if (!validateBriefShape(parsed)) {
        setError("invalid shape: JSON 구조가 맞지 않습니다.");
        return false;
      }
      if (parsed.schemaVersion !== BRIEF_SCHEMA_VERSION) {
        setError(`version mismatch: ${parsed.schemaVersion} -> ${BRIEF_SCHEMA_VERSION} 필요`);
        return false;
      }
      setBrief({ ...defaultBriefData, ...parsed.data });
      setLastSavedAt(parsed.lastSavedAt);
      setError(null);
      return true;
    } catch {
      setError("invalid JSON: JSON 파싱에 실패했습니다.");
      return false;
    }
  };

  return {
    brief,
    updateField,
    reset,
    fillExample,
    exportJson,
    importJson,
    lastSavedAt,
    score,
    error,
    schemaVersion: BRIEF_SCHEMA_VERSION,
  };
};
