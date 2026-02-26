"use client";

import { useEffect, useState } from "react";

const sections = [
  {
    id: "getting-started",
    label: "Getting Started",
    children: [],
  },
  {
    id: "http-api",
    label: "SDK Reference",
    children: [
      { id: "endpoint-check", label: "POST /sdk/check" },
      { id: "endpoint-record", label: "POST /sdk/record" },
      { id: "endpoint-log", label: "POST /sdk/log" },
    ],
  },
  {
    id: "typescript-sdk",
    label: "TypeScript SDK",
    children: [
      { id: "sdk-install", label: "Installation" },
      { id: "sdk-check", label: "client.sdk.check()" },
      { id: "sdk-record", label: "client.sdk.record()" },
      { id: "sdk-log", label: "client.sdk.log()" },
    ],
  },
];

// Collect all section IDs (parents + children) for IntersectionObserver
const allIds = sections.flatMap((s) => [
  s.id,
  ...s.children.map((c) => c.id),
]);

export function DocsSidebar() {
  const [activeId, setActiveId] = useState<string>("getting-started");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          intersecting.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveId(intersecting[0].target.id);
        }
      },
      { rootMargin: "-20% 0% -70% 0%", threshold: 0 }
    );

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const linkClass = (id: string) =>
    `block rounded px-3 py-1.5 text-sm transition-colors ${
      activeId === id
        ? "bg-[var(--accent-light)] text-[var(--accent)] font-medium border-l-2 border-[var(--accent)]"
        : "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-elevated)]"
    }`;

  return (
    <aside aria-label="Page navigation" className="w-56 shrink-0">
      <div className="sticky top-24 space-y-6">
        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]/60">
          On this page
        </p>
        <nav aria-label="On this page" className="space-y-1">
          {sections.map((section) => (
            <div key={section.id}>
              <a href={`#${section.id}`} className={linkClass(section.id)}>
                {section.label}
              </a>
              {section.children.length > 0 && (
                <div className="ml-3 mt-1 space-y-0.5 border-l border-[var(--border)] pl-3">
                  {section.children.map((child) => (
                    <a
                      key={child.id}
                      href={`#${child.id}`}
                      className={linkClass(child.id)}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
