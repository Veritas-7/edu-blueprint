---
version: public-reference-v1
name: edu-blueprint
description: "학부모/수강생 의사결정에 맞춘 교육 제작 기준서. 성과 증빙, 대상 적합성, 상담 전환을 균형 있게 보여준다."
colors:
  primary: "hsl(222 47% 18%)"
  secondary: "hsl(210 40% 96%)"
  tertiary: "hsl(24 90% 55%)"
  neutral: "hsl(210 20% 96%)"
  background: "hsl(0 0% 100%)"
  surface: "hsl(0 0% 100%)"
  foreground: "hsl(222 47% 11%)"
  muted: "hsl(215 16% 47%)"
  accent: "hsl(24 90% 55%)"
typography:
  h1:
    fontFamily: "Pretendard Variable"
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0em"
  body-md:
    fontFamily: "Pretendard Variable"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
rounded:
  sm: 4px
  md: 8px
  lg: 10px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 20px
  xl: 32px
components:
  guide-shell:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 20px
  primary-action:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: 10px
  accent-card:
    backgroundColor: "{colors.accent}"
    textColor: "#000000"
    rounded: "{rounded.md}"
    padding: 20px
  muted-note:
    backgroundColor: "{colors.muted}"
    textColor: "#FFFFFF"
    rounded: "{rounded.sm}"
    padding: 12px
  neutral-panel:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: 12px
---

# DESIGN.md

## Overview

학원/교육 업종 웹 제작 시스템 is a public reference system for 학원/교육 homepage production. This document captures the implementation-facing visual contract needed to recreate the same site style, color behavior, spacing rhythm, and guide/tool surface from source alone.

The project should feel like a practical industry workbench: a curated guide, a client brief tool, a site blueprint generator, and implementation rules in one interface. It is not a marketing landing page. Preserve the source system's dense but readable documentation rhythm.

## Source-Derived Identity

학부모/수강생 의사결정에 맞춘 교육 제작 기준서. 성과 증빙, 대상 적합성, 상담 전환을 균형 있게 보여준다.

Core visual rules:

- Use navy for trust and orange for energy/action, not for large background dominance.
- Proof states must separate strong proof, supporting proof, and review-required assets.
- Korean body copy must stay readable for long academy names, course labels, and parent-facing explanations.

## Palette

Use semantic HSL tokens from `src/index.css` and Tailwind aliases from `tailwind.config.ts`. Do not hard-code unrelated one-off colors into pages.

- Primary: `hsl(222 47% 18%)`
- Secondary: `hsl(210 40% 96%)`
- Tertiary: `hsl(24 90% 55%)`
- Neutral: `hsl(210 20% 96%)`
- Background: `hsl(0 0% 100%)`
- Surface: `hsl(0 0% 100%)`
- Foreground: `hsl(222 47% 11%)`
- Muted text: `hsl(215 16% 47%)`
- Accent: `hsl(24 90% 55%)`

### Local CSS Variable Evidence

- `background` = `0 0% 100%`
- `foreground` = `222 47% 11%`
- `card` = `0 0% 100%`
- `card-foreground` = `222 47% 11%`
- `popover` = `0 0% 100%`
- `popover-foreground` = `222 47% 11%`
- `primary` = `222 47% 18%`
- `primary-foreground` = `210 40% 98%`
- `secondary` = `210 40% 96%`
- `secondary-foreground` = `222 47% 11%`
- `muted` = `210 20% 96%`
- `muted-foreground` = `215 16% 47%`
- `accent` = `24 90% 55%`
- `accent-foreground` = `0 0% 100%`
- `destructive` = `0 84% 60%`
- `destructive-foreground` = `210 40% 98%`
- `border` = `214 32% 91%`
- `input` = `214 32% 91%`
- `ring` = `222 47% 18%`
- `radius` = `0.5rem`
- `info` = `199 89% 48%`
- `info-foreground` = `0 0% 100%`
- `success` = `142 76% 36%`
- `success-foreground` = `0 0% 100%`
- `warning` = `38 92% 50%`
- `warning-foreground` = `0 0% 100%`
- `proof-strong` = `142 76% 36%`
- `proof-strong-foreground` = `0 0% 100%`

## Typography

Use `Pretendard Variable` for page titles and `Pretendard Variable` for body/UI text. Preserve Korean readability over decorative density: body copy uses at least `1.55` line-height, stable letter spacing, and no viewport-width font scaling.

Headings may be strong and compact, but guide pages should keep H1 around `2.25rem` desktop and avoid oversized hero treatment. Cards, sidebars, and tool panels use tighter headings so dense Korean content remains scannable.

## Layout

Primary shell: guide layout with document cards, quick-apply panels, TOC blocks, and proof/status surfaces.

Rules:

- Keep sidebar navigation and top command/search affordances persistent on desktop.
- Keep content width constrained; current source centers guide content around `max-w-4xl` to `max-w-5xl`.
- Cards are for repeated guide objects, status blocks, summary cards, and generated outputs. Do not nest broad page sections inside decorative cards.
- Mobile order: sidebar trigger/header, command/search where available, page title, summary/quick-apply, content, previous/next navigation.
- Long Korean labels, business names, menu names, course names, regions, and CTA labels must wrap without clipping.

## Components

| Component | Contract | Confidence |
|---|---|---|
| `GuideLayout` | Preserve source behavior and state language from current implementation. | high |
| `CommandSearch` | Preserve source behavior and state language from current implementation. | high |
| `PageHeader` | Preserve source behavior and state language from current implementation. | high |
| `TableOfContents` | Preserve source behavior and state language from current implementation. | high |
| `BadgeTag` | Preserve source behavior and state language from current implementation. | high |
| `BriefSummaryCard` | Preserve source behavior and state language from current implementation. | high |
| `CopyBlock` | Preserve source behavior and state language from current implementation. | high |

Common component rules:

- Navigation items need active, hover, and focus-visible states.
- Command search must remain keyboard reachable and visually stable.
- Copyable prompt/meta/code blocks need clear label, monospaced output, and copied feedback.
- Status/proof/review states cannot rely on color alone; use label text or border/shape difference too.
- Icon buttons require accessible labels. Text buttons must not overflow on mobile.

## States And Accessibility

- Normal text contrast target: 4.5:1 or higher.
- Large text and non-text UI indicators: 3:1 minimum.
- Focus-visible styles must be present on sidebar links, command search, buttons, copy controls, form fields, and TOC links.
- A selected nav route needs both color and active styling.
- Form validation in client brief tools must use visible text and cannot rely only on red color.
- Motion must be subtle and non-blocking; prefer opacity/transform only. Honor reduced-motion expectations when adding new animation.

## Content And Copy Rules

- Keep Korean labels direct and specific.
- Do not show hidden implementation instructions in the UI.
- Guide pages should use evidence-oriented headings: industry traits, design guide, UI guide, UX guide, page templates, content guide, SEO/GEO, checklist, client brief, site blueprint, implementation rules.
- Public-site generation outputs must be copyable and source-grounded.

## Routes And Information Architecture

Detected route/page evidence:

- `/`
- `/industry-overview`
- `/design-guide`
- `/ui-guide`
- `/ux-guide`
- `/page-templates`
- `/content-guide`
- `/proof-system`
- `/seo-geo`
- `/checklist`
- `/client-brief`
- `/site-blueprint`
- `/implementation-rules`
- `*`

## Verification Gates

Before publishing style changes:

1. Run `npm run build`.
2. Run `npm test`.
3. Run `npm run lint`.
4. Run `design-md-lint DESIGN.md`.
5. Inspect mobile widths for Korean text wrapping, sidebar collapse, command search, copy blocks, and generated blueprint cards.
6. Re-run secret scan before public GitHub publication if new files include external integrations.

## Evidence Map

| Rule | Evidence | Confidence |
|---|---|---|
| Palette and semantic token names | `src/index.css`, `tailwind.config.ts` | high |
| Industry positioning and trust/CTA rules | industry config and README | high |
| Layout shell and navigation behavior | layout/sidebar components | high |
| Component state vocabulary | guide components and shadcn/ui wrappers | high |
| Route and information architecture | App/routes/navigation data | high |
| Public reproduction guidance | this DESIGN.md synthesized from source on 2026-06-18 | derived |

## Local Evidence Files

- `src/index.css`
- `tailwind.config.ts`
- `src/lib/navigation.ts`
- `src/data/seo-config.ts`
- `src/components/layout/GuideLayout.tsx`
- `src/components/docs/PageHeader.tsx`
- `src/components/docs/TableOfContents.tsx`
- `src/pages/DesignGuide.tsx`
