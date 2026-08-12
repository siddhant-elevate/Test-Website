import { Suspense } from "react";
import type { Metadata } from "next";
import ResearchExplorer from "@/components/ResearchExplorer";
import { articles, categories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Browse independent equity research from Elevate Research, organized by sector and publication date.",
};

export default function ResearchPage() {
  return (
    <div className="container-content py-16 md:py-20">
      <p className="eyebrow">Archive</p>
      <h1 className="mt-3 max-w-2xl text-balance font-display text-[38px] font-medium leading-tight text-ink dark:text-white md:text-[50px]">
        All research
      </h1>
      <p className="prose-editorial mt-5 max-w-lg text-[16px]">
        Every note we&rsquo;ve published, organized by sector. Filter by
        coverage area or search for a company, theme, or ticker.
      </p>

      <div className="mt-12">
        <Suspense fallback={null}>
          <ResearchExplorer articles={articles} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
