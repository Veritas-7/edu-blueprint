import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, FileText, ClipboardCheck, Layers } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const quickLinks = [
    { label: "가이드 홈", path: "/", icon: Home },
    { label: "Client Brief", path: "/client-brief", icon: FileText },
    { label: "Site Blueprint", path: "/site-blueprint", icon: Layers },
    { label: "Checklist", path: "/checklist", icon: ClipboardCheck },
  ];

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-lg text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <p className="text-xl text-muted-foreground">요청하신 페이지를 찾을 수 없습니다</p>
          <p className="text-sm text-muted-foreground">
            <code className="rounded bg-muted px-2 py-0.5">{location.pathname}</code> 경로가 존재하지 않습니다.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <p className="mb-4 text-sm font-medium">아래 페이지로 이동해 보세요:</p>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map(link => (
                <Button key={link.path} asChild variant="outline" className="h-auto flex-col gap-1 py-3">
                  <Link to={link.path}>
                    <link.icon className="h-5 w-5 text-accent" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
