"use client";

import { useEffect, useState } from "react";

export default function TableOfContents({
  items,
}: {
  items: { id: string; heading: string }[];
}) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Table of contents">
      <p className="eyebrow">In this note</p>
      <ul className="mt-4 space-y-3 border-l border-black/10 dark:border-white/10">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`-ml-px block border-l pl-4 text-[13.5px] leading-snug transition-colors duration-300 ${
                activeId === item.id
                  ? "border-brand font-medium text-brand dark:border-brand-glow dark:text-brand-glow"
                  : "border-transparent text-ink-500 hover:text-ink dark:text-paper-100/45 dark:hover:text-paper-100/80"
              }`}
            >
              <span className="mr-1.5 font-mono text-[11px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
