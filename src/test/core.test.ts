import { describe, it, expect } from "vitest";
import { inferSiteType, getPageSet, buildImplementationRules, buildBlueprintBlocks, getSiteTypeReason, getProofStatuses, buildLovablePrompt } from "@/lib/brief-engine";
import { defaultBriefData, calculateBriefScore, validateBriefShape, BRIEF_SCHEMA_VERSION } from "@/lib/brief-schema";

describe("brief-schema", () => {
  it("calculates low score for default brief", () => {
    const score = calculateBriefScore(defaultBriefData);
    expect(score.percent).toBeLessThan(50);
    expect(score.missing.length).toBeGreaterThan(0);
  });

  it("calculates score for filled brief", () => {
    const filled = { ...defaultBriefData, academyName: "테스트학원", educationSubtype: "입시" as const, targetAges: ["중학생"], corePrograms: "수학, 영어", region: "서울 강남", consultingChannels: ["전화"], ctaPriority: ["상담 신청하기"], brandTone: "신뢰형" };
    const score = calculateBriefScore(filled);
    expect(score.percent).toBe(100);
  });

  it("validates correct envelope shape", () => {
    const valid = { schemaVersion: "1.0.0", lastSavedAt: "2024-01-01", data: defaultBriefData };
    expect(validateBriefShape(valid)).toBe(true);
  });

  it("rejects invalid envelope", () => {
    expect(validateBriefShape(null)).toBe(false);
    expect(validateBriefShape({})).toBe(false);
    expect(validateBriefShape({ schemaVersion: "1.0.0" })).toBe(false);
  });
});

describe("brief-engine", () => {
  it("infers 성인교육형 for adult subtypes", () => {
    expect(inferSiteType({ ...defaultBriefData, educationSubtype: "성인어학" })).toBe("성인교육형");
    expect(inferSiteType({ ...defaultBriefData, educationSubtype: "자격증" })).toBe("성인교육형");
    expect(inferSiteType({ ...defaultBriefData, educationSubtype: "취업/직무" })).toBe("성인교육형");
  });

  it("infers 지점형 for multi-branch", () => {
    expect(inferSiteType({ ...defaultBriefData, branchType: "다지점" })).toBe("지점형");
  });

  it("infers 성과신뢰형 when all proofs present", () => {
    const brief = { ...defaultBriefData, hasResults: true, hasTeacherProfile: true, hasReviews: true };
    expect(inferSiteType(brief)).toBe("성과신뢰형");
  });

  it("provides reason for site type", () => {
    const reason = getSiteTypeReason({ ...defaultBriefData, educationSubtype: "자격증" });
    expect(reason).toContain("성인교육형");
  });

  it("returns different page sets per site type", () => {
    const adultPages = getPageSet("성인교육형");
    const branchPages = getPageSet("지점형");
    expect(adultPages.required).toContain("주말/야간 운영 안내");
    expect(branchPages.required).toContain("지점/캠퍼스");
  });

  it("builds blueprint blocks from brief", () => {
    const blocks = buildBlueprintBlocks({ ...defaultBriefData, academyName: "테스트" });
    expect(blocks.length).toBeGreaterThanOrEqual(5);
    expect(blocks[0].section).toContain("홈페이지");
  });

  it("builds implementation rules with focus types", () => {
    const rules = buildImplementationRules({ ...defaultBriefData, hasTeacherProfile: true, hasResults: true, corePrograms: "매우 긴 프로그램 설명이 들어갑니다" });
    expect(rules.focusTypes).toContain("강사진 중심형");
    expect(rules.focusTypes).toContain("성과 중심형");
  });

  it("returns proof statuses based on brief", () => {
    const statuses = getProofStatuses({ ...defaultBriefData, hasTeacherProfile: true, hasReviews: false });
    const teacher = statuses.find(s => s.name === "강사진 경력");
    const reviews = statuses.find(s => s.name === "수강 후기");
    expect(teacher?.status).toBe("보유");
    expect(reviews?.status).toBe("부족");
  });

  it("generates Lovable prompt", () => {
    const prompt = buildLovablePrompt({ ...defaultBriefData, academyName: "테스트학원", educationSubtype: "입시" });
    expect(prompt).toContain("테스트학원");
    expect(prompt).toContain("입시");
  });
});

describe("navigation & seo", () => {
  it("seo-config has entries for all routes", async () => {
    const { seoConfig } = await import("@/data/seo-config");
    const { guideNavItems } = await import("@/lib/navigation");
    for (const item of guideNavItems) {
      expect(seoConfig[item.path]).toBeDefined();
      expect(seoConfig[item.path].title.length).toBeGreaterThan(0);
      expect(seoConfig[item.path].description.length).toBeGreaterThan(0);
    }
  });
});
