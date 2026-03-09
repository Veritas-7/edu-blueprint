import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { guideNavItems } from "@/lib/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const searchKeywords: Record<string, string[]> = {
  "/": ["개요", "대시보드", "홈", "overview"],
  "/industry-overview": ["업종", "교육", "학원", "학부모", "학생", "전환"],
  "/design-guide": ["디자인", "컬러", "타이포", "폰트", "색상", "토큰"],
  "/ui-guide": ["UI", "컴포넌트", "카드", "버튼", "헤더", "CTA", "폼"],
  "/ux-guide": ["UX", "여정", "흐름", "모바일", "전환율"],
  "/page-templates": ["템플릿", "페이지", "홈페이지", "와이어프레임"],
  "/content-guide": ["카피", "문구", "콘텐츠", "CTA", "금지", "표현"],
  "/proof-system": ["증빙", "신뢰", "성과", "후기", "강사"],
  "/seo-geo": ["SEO", "검색", "메타", "스키마", "JSON-LD", "GEO"],
  "/checklist": ["체크리스트", "점검", "검수", "런칭"],
  "/client-brief": ["브리프", "고객사", "입력", "저장"],
  "/site-blueprint": ["청사진", "구조", "사이트", "생성"],
  "/implementation-rules": ["규칙", "엔진", "구현", "예산"],
};

export const CommandSearch = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = useCallback((path: string) => {
    setOpen(false);
    navigate(path);
  }, [navigate]);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="relative h-8 w-8 p-0 lg:h-8 lg:w-56 lg:justify-start lg:px-3"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 lg:mr-2" />
        <span className="hidden lg:inline-flex text-muted-foreground text-xs">페이지 검색...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 lg:flex">
          ⌘K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="페이지 검색... (예: 디자인, SEO, 브리프)" />
        <CommandList>
          <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          <CommandGroup heading="가이드 페이지">
            {guideNavItems.map(item => (
              <CommandItem
                key={item.path}
                value={`${item.label} ${item.description} ${(searchKeywords[item.path] || []).join(" ")}`}
                onSelect={() => handleSelect(item.path)}
              >
                <span className="font-medium">{item.label}</span>
                <span className="ml-2 text-xs text-muted-foreground">{item.description}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
