import { useEffect, useMemo, useRef, useState } from "react";
import {
  BRIEF_SCHEMA_VERSION,
  BriefEnvelope,
  ClientBriefData,
  calculateBriefScore,
  defaultBriefData,
  validateBriefShape,
} from "@/lib/brief-schema";

const STORAGE_KEY = "edu-guide-client-brief";
const MAX_RETRY = 2;
const RETRY_DELAY = 3000;

export type SaveStatus = "idle" | "saving" | "saved" | "error";
export type ImportErrorType = "invalid_json" | "invalid_shape" | "version_mismatch" | null;
export type ImportResult = { success: boolean; errorType: ImportErrorType };

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
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [importError, setImportError] = useState<ImportErrorType>(null);
  const retryCountRef = useRef(0);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from localStorage
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
        setError(`스키마 버전이 다릅니다. 현재: ${BRIEF_SCHEMA_VERSION}, 저장본: ${parsed.schemaVersion}. 기본값으로 시작합니다.`);
        return;
      }

      setBrief({ ...defaultBriefData, ...parsed.data });
      setLastSavedAt(parsed.lastSavedAt);
    } catch {
      setError("브리프 데이터를 불러오지 못했습니다.");
    }
  }, []);

  // Autosave with retry
  const trySave = (data: ClientBriefData) => {
    try {
      setSaveStatus("saving");
      const envelope = createEnvelope(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope));
      setLastSavedAt(envelope.lastSavedAt);
      setSaveStatus("saved");
      setError(null);
      retryCountRef.current = 0;
    } catch {
      setSaveStatus("error");
      setError("자동 저장에 실패했습니다.");
      if (retryCountRef.current < MAX_RETRY) {
        retryCountRef.current += 1;
        retryTimerRef.current = setTimeout(() => trySave(data), RETRY_DELAY);
      }
    }
  };

  useEffect(() => {
    retryCountRef.current = 0;
    trySave(brief);
    return () => {
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brief]);

  const score = useMemo(() => calculateBriefScore(brief), [brief]);

  const updateField = <K extends keyof ClientBriefData>(key: K, value: ClientBriefData[K]) => {
    setBrief((prev) => ({ ...prev, [key]: value }));
    setImportError(null);
  };

  const reset = () => {
    setBrief(defaultBriefData);
    setImportError(null);
  };

  const fillExample = () => {
    setBrief(exampleBriefData);
    setImportError(null);
  };

  const exportJson = () => JSON.stringify(createEnvelope(brief), null, 2);

  const importJson = (jsonText: string): ImportResult => {
    try {
      const parsed = JSON.parse(jsonText) as unknown;
      if (!validateBriefShape(parsed)) {
        const errType: ImportErrorType = "invalid_shape";
        setImportError(errType);
        setError("JSON 구조가 올바르지 않습니다. schemaVersion, lastSavedAt, data 필드를 확인하세요.");
        return { success: false, errorType: errType };
      }
      if (parsed.schemaVersion !== BRIEF_SCHEMA_VERSION) {
        const errType: ImportErrorType = "version_mismatch";
        setImportError(errType);
        setError(`버전 불일치: ${parsed.schemaVersion} → ${BRIEF_SCHEMA_VERSION} 필요`);
        return { success: false, errorType: errType };
      }
      setBrief({ ...defaultBriefData, ...parsed.data });
      setLastSavedAt(parsed.lastSavedAt);
      setError(null);
      setImportError(null);
      return { success: true, errorType: null };
    } catch {
      const errType: ImportErrorType = "invalid_json";
      setImportError(errType);
      setError("JSON 파싱에 실패했습니다. 올바른 JSON 파일인지 확인하세요.");
      return { success: false, errorType: errType };
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
    saveStatus,
    importError,
    schemaVersion: BRIEF_SCHEMA_VERSION,
  };
};
