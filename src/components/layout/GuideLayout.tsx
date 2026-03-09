import { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { guideNavItems, getPrevNext, routeMeta } from "@/lib/navigation";
import { useSeo } from "@/hooks/use-seo";
import { ChevronLeft, ChevronRight, BookOpen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const AppSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const guidePages = guideNavItems.filter((i) => !["/client-brief", "/site-blueprint", "/implementation-rules"].includes(i.path));
  const toolPages = guideNavItems.filter((i) => ["/client-brief", "/site-blueprint", "/implementation-rules"].includes(i.path));

  return (
    <Sidebar collapsible="icon">
      <div className="flex h-14 items-center gap-2 px-4 text-sidebar-foreground">
        <BookOpen className="h-5 w-5 shrink-0 text-sidebar-primary" />
        {!collapsed && <span className="font-bold text-sm truncate">학원/교육 가이드</span>}
      </div>
      <SidebarContent>
        <ScrollArea className="flex-1">
          <SidebarGroup>
            <SidebarGroupLabel>가이드</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {guidePages.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                      <NavLink to={item.path} end className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold">
                        {!collapsed && <span className="text-sm">{item.shortLabel}</span>}
                        {collapsed && <span className="text-xs">{item.shortLabel.slice(0, 2)}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>도구</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {toolPages.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                      <NavLink to={item.path} end className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold">
                        {!collapsed && <span className="text-sm">{item.shortLabel}</span>}
                        {collapsed && <span className="text-xs">{item.shortLabel.slice(0, 2)}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};

export const GuideLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const meta = routeMeta[location.pathname] || routeMeta["/"];
  const { prev, next } = getPrevNext(location.pathname);

  useSeo({ title: meta.title, description: meta.description, path: location.pathname, noindex: location.pathname === "*" });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 flex h-14 items-center border-b bg-background/95 backdrop-blur px-4 gap-4">
            <SidebarTrigger />
            <nav className="hidden lg:flex gap-1 overflow-x-auto">
              {guideNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  className="rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                  activeClassName="text-primary bg-primary/10"
                >
                  {item.shortLabel}
                </NavLink>
              ))}
            </nav>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>

          {(prev || next) && (
            <>
              <Separator />
              <footer className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                {prev ? (
                  <Link to={prev.path} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <ChevronLeft className="h-4 w-4" /> {prev.label}
                  </Link>
                ) : <span />}
                {next ? (
                  <Link to={next.path} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    {next.label} <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : <span />}
              </footer>
            </>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};
