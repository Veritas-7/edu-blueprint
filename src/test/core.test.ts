import { describe, it, expect } from "vitest";
import { inferSiteType, getPageSet, buildImplementationRules, buildBlueprintBlocks, getSiteTypeReason, getProofStatuses, buildLovablePrompt, buildMetaSuggestions, getProofFallbacks, serializeBlueprintBlock } from "@/lib/brief-engine";
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

  it("calculates partial score correctly", () => {
    const partial = { ...defaultBriefData, academyName: "테스트", region: "서울" };
    const score = calculateBriefScore(partial);
    expect(score.percent).toBeGreaterThan(0);
    expect(score.percent).toBeLessThan(100);
    expect(score.missing).not.toContain("academyName");
    expect(score.missing).not.toContain("region");
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

  it("rejects envelope with empty data", () => {
    expect(validateBriefShape({ schemaVersion: "1.0.0", lastSavedAt: "2024-01-01", data: null })).toBe(false);
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

  it("infers 과정탐색형 for detailed programs", () => {
    const brief = { ...defaultBriefData, corePrograms: "매우 긴 프로그램 설명이 들어갑니다 충분히 길게 작성해야 합니다" };
    expect(inferSiteType(brief)).toBe("과정탐색형");
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

  it("builds blueprint blocks including 설명회/체험수업", () => {
    const blocks = buildBlueprintBlocks({ ...defaultBriefData, academyName: "테스트" });
    expect(blocks.length).toBeGreaterThanOrEqual(8);
    expect(blocks.some(b => b.section.includes("설명회"))).toBe(true);
  });

  it("builds implementation rules with enriched focus types", () => {
    const rules = buildImplementationRules({ ...defaultBriefData, hasTeacherProfile: true, hasResults: true, hasReviews: true, corePrograms: "매우 긴 프로그램 설명이 들어갑니다 충분히 길게 작성해야 합니다", consultingFeatures: ["상담", "체험수업"] });
    expect(rules.focusTypes).toContain("강사진 중심형");
    expect(rules.focusTypes).toContain("성과 중심형");
    expect(rules.focusTypes).toContain("상담 강화형");
    expect(rules.focusTypes).toContain("증빙 풍부형");
  });

  it("includes mustKeep items in implementation rules", () => {
    const rules = buildImplementationRules(defaultBriefData);
    expect(rules.mustKeep.length).toBeGreaterThan(0);
    expect(rules.mustKeep).toContain("상담 CTA (모든 페이지)");
  });

  it("returns proof statuses with 10 items", () => {
    const statuses = getProofStatuses(defaultBriefData);
    expect(statuses).toHaveLength(10);
  });

  it("returns proof statuses based on brief", () => {
    const statuses = getProofStatuses({ ...defaultBriefData, hasTeacherProfile: true, hasReviews: false });
    const teacher = statuses.find(s => s.name === "강사진 경력");
    const reviews = statuses.find(s => s.name === "수강 후기");
    expect(teacher?.status).toBe("보유");
    expect(reviews?.status).toBe("부족");
  });

  it("generates proof fallbacks when assets lacking", () => {
    const statuses = getProofStatuses(defaultBriefData);
    const fallbacks = getProofFallbacks(statuses);
    expect(fallbacks.length).toBeGreaterThan(0);
    expect(fallbacks.some(f => f.alternatives.length > 0)).toBe(true);
  });

  it("generates Lovable prompt with proof info", () => {
    const prompt = buildLovablePrompt({ ...defaultBriefData, academyName: "테스트학원", educationSubtype: "입시" });
    expect(prompt).toContain("테스트학원");
    expect(prompt).toContain("입시");
    expect(prompt).toContain("부족 자산 대체안");
  });

  it("builds meta suggestions with 7 pages", () => {
    const meta = buildMetaSuggestions({ ...defaultBriefData, academyName: "테스트" });
    expect(Object.keys(meta)).toHaveLength(7);
    expect(meta.results).toBeDefined();
    expect(meta.reviews).toBeDefined();
    expect(meta.campus).toBeDefined();
  });

  it("serializes blueprint block to copyable text", () => {
    const blocks = buildBlueprintBlocks(defaultBriefData);
    const text = serializeBlueprintBlock(blocks[0]);
    expect(text).toContain("## 공개용 홈페이지 구조");
    expect(text).toContain("필수 블록");
  });

  it("budget items include reason field", () => {
    const rules = buildImplementationRules(defaultBriefData);
    expect(rules.budget.minimal[0].reason).toBeDefined();
    expect(rules.budget.minimal[0].reason.length).toBeGreaterThan(0);
  });

  it("inferSiteType priority: adult > multi-branch", () => {
    const brief = { ...defaultBriefData, educationSubtype: "성인어학" as const, branchType: "다지점" as const };
    expect(inferSiteType(brief)).toBe("성인교육형");
  });

  it("inferSiteType priority: multi-branch > strong proof", () => {
    const brief = { ...defaultBriefData, branchType: "다지점" as const, hasResults: true, hasTeacherProfile: true, hasReviews: true };
    expect(inferSiteType(brief)).toBe("지점형");
  });

  it("inferSiteType returns 상담전환형 for multiple channels", () => {
    const brief = { ...defaultBriefData, consultingChannels: ["전화", "카카오"] };
    expect(inferSiteType(brief)).toBe("상담전환형");
  });

  it("inferSiteType returns 하이브리드형 for default brief", () => {
    expect(inferSiteType(defaultBriefData)).toBe("하이브리드형");
  });

  it("getProofFallbacks returns empty when all proofs present", () => {
    const statuses = getProofStatuses({ ...defaultBriefData, hasTeacherProfile: true, hasResults: true, hasReviews: true, hasFacilityAssets: true, corePrograms: "충분히 긴 프로그램", targetAges: ["중학생"], consultingFeatures: ["상담"] });
    const fallbacks = getProofFallbacks(statuses);
    expect(fallbacks.length).toBe(0);
  });

  it("calculateBriefScore percent matches completed ratio", () => {
    const partial = { ...defaultBriefData, academyName: "테스트", region: "서울" };
    const score = calculateBriefScore(partial);
    expect(score.percent).toBe(Math.round((score.completed / score.total) * 100));
  });

  it("budget standard includes all minimal items", () => {
    const rules = buildImplementationRules(defaultBriefData);
    const minNames = rules.budget.minimal.map((i: { name: string }) => i.name);
    const stdNames = rules.budget.standard.map((i: { name: string }) => i.name);
    for (const name of minNames) {
      expect(stdNames).toContain(name);
    }
  });

  it("instantGuide includes proof-specific guidance when assets lacking", () => {
    const rules = buildImplementationRules(defaultBriefData);
    expect(rules.instantGuide.some((g: string) => g.includes("후기 부족"))).toBe(true);
    expect(rules.instantGuide.some((g: string) => g.includes("강사진 미확보"))).toBe(true);
  });

  it("serializeBlueprintBlock includes conditional and forbidden sections", () => {
    const blocks = buildBlueprintBlocks({ ...defaultBriefData, academyName: "테스트" });
    const homeBlock = blocks[0];
    const text = serializeBlueprintBlock(homeBlock);
    expect(text).toContain("조건부 블록");
    expect(text).toContain("금지 블록");
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

  it("noindex routes are correct", async () => {
    const { seoConfig } = await import("@/data/seo-config");
    const noindexRoutes = ["/client-brief", "/site-blueprint", "/implementation-rules"];
    for (const route of noindexRoutes) {
      expect(seoConfig[route].robots).toContain("noindex");
    }
  });

  it("notFoundSeo has noindex,nofollow", async () => {
    const { notFoundSeo } = await import("@/data/seo-config");
    expect(notFoundSeo.robots).toBe("noindex,nofollow");
  });

  it("breadcrumb JSON-LD has correct structure", async () => {
    const { buildBreadcrumbJsonLd } = await import("@/data/seo-config");
    const breadcrumb = buildBreadcrumbJsonLd("/design-guide");
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
    expect(breadcrumb.itemListElement.length).toBe(2);
    expect(breadcrumb.itemListElement[0].name).toBe("Overview");
  });

  it("FAQPage JSON-LD built for pages with faqItems", async () => {
    const { seoConfig, buildFaqPageJsonLd } = await import("@/data/seo-config");
    const seoGeo = seoConfig["/seo-geo"];
    expect(seoGeo.jsonLdType).toContain("FAQPage");
    expect(seoGeo.faqItems!.length).toBeGreaterThan(0);
    const faqJsonLd = buildFaqPageJsonLd(seoGeo.faqItems!);
    expect(faqJsonLd["@type"]).toBe("FAQPage");
    expect(faqJsonLd.mainEntity[0]["@type"]).toBe("Question");
  });

  it("all seoConfig entries have jsonLdType array", async () => {
    const { seoConfig } = await import("@/data/seo-config");
    for (const [route, config] of Object.entries(seoConfig)) {
      expect(Array.isArray(config.jsonLdType)).toBe(true);
    }
  });

  it("noindex routes have follow policy", async () => {
    const { seoConfig } = await import("@/data/seo-config");
    const noindexRoutes = ["/client-brief", "/site-blueprint", "/implementation-rules"];
    for (const route of noindexRoutes) {
      expect(seoConfig[route].robots).toBe("noindex,follow");
    }
  });
});
