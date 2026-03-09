import { useEffect, useState } from "react";

type TocItem = { id: string; label: string };

type TableOfContentsProps = {
  items: TocItem[];
};

export const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="rounded-lg border bg-card p-4">
      <h2 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">목차</h2>
      <ul className="space-y-1">
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted ${
                activeId === id
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
