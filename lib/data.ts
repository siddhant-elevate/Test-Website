import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Content-driven data layer for Elevate Research.
 *
 * Single source of truth: every markdown file in /content/research.
 * This module discovers, parses, and normalizes those files into the
 * same `Article` shape the UI has always consumed — so the exported
 * function signatures below (getArticleBySlug, getFeaturedArticle,
 * getLatestArticles, getRelatedArticles, formatDate) are unchanged
 * from before this refactor, and no component that only calls those
 * functions needs to change when a new report is published.
 *
 * See /RESEARCH_GUIDE.md for the authoring workflow.
 */

export type Category =
  | "Technology"
  | "Macro"
  | "Financials"
  | "Healthcare"
  | "Industrials"
  | "Consumer"
  | "Energy";

// Sector taxonomy + editorial descriptions shown on the homepage
// coverage rail. This stays hand-curated (not auto-derived from
// frontmatter) because the description copy is editorial voice, not
// metadata. Adding a genuinely new sector (rare — distinct from
// publishing a new report) means adding one entry here; see the guide.
export const categories: { name: Category; description: string }[] = [
  {
    name: "Technology",
    description: "Semiconductors, software, and the infrastructure of compute.",
  },
  {
    name: "Macro",
    description: "Rates, currencies, and the forces that move every portfolio.",
  },
  {
    name: "Financials",
    description: "Banks, credit markets, and the plumbing of capital.",
  },
  {
    name: "Healthcare",
    description: "Therapeutics, payers, and the economics of care.",
  },
  {
    name: "Industrials",
    description: "Supply chains, capital goods, and the built world.",
  },
  {
    name: "Consumer",
    description: "Brands, behavior, and where spending goes next.",
  },
  {
    name: "Energy",
    description: "Power markets, the grid, and the transition in progress.",
  },
];

// A single H2-delimited chunk of a report's body, pre-rendered to
// HTML. `heading` stays a plain string (not HTML) so the article page
// can render it as a real React element and keep exact control over
// its markup; `html` covers everything under that heading (paragraphs,
// blockquotes, lists, links) and is rendered via the existing
// `.prose-editorial` styles, extended in globals.css to cover markdown
// elements the old hand-written sections never used.
export interface ArticleContentSection {
  id: string;
  heading: string;
  html: string;
}

export interface Article {
  slug: string;
  category: Category;
  title: string;
  dek: string;
  summary: string;
  author: string;
  authorRole?: string;
  date: string; // ISO YYYY-MM-DD, from frontmatter `publishedDate`
  updatedDate?: string; // ISO YYYY-MM-DD, from frontmatter `updatedDate`
  readingTime: number;
  featured?: boolean;
  tags: string[];
  marketCap?: string; // optional, company-specific reports only
  coverImage?: string; // captured for a future visual treatment; not yet rendered
  sections: ArticleContentSection[];
}

const CONTENT_DIR = path.join(process.cwd(), "content", "research");

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toISODate(value: unknown): string {
  // js-yaml (used by gray-matter) auto-parses unquoted YAML dates like
  // `publishedDate: 2026-07-18` into a native Date. Authors may also
  // quote it as a plain string. Handle both.
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value.slice(0, 10);
  return "";
}

function estimateReadingTime(plainText: string): number {
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Splits a report's markdown body into H2-delimited sections and
// renders each one's remaining content (paragraphs, blockquotes,
// lists, links, etc.) to HTML via the default `marked` renderer —
// deliberately unstyled at the HTML level; all visual styling comes
// from the `.prose-editorial` CSS rules, so a new report never needs
// a code change to look right.
function parseSections(markdownBody: string): {
  sections: ArticleContentSection[];
  plainText: string;
} {
  const tokens = marked.lexer(markdownBody);
  const sections: ArticleContentSection[] = [];
  const usedIds = new Set<string>();

  let current: { heading: string; id: string; tokens: any[] } | null = null;
  const leading: any[] = [];

  const uniqueId = (base: string) => {
    let id = base || "section";
    let n = 2;
    while (usedIds.has(id)) {
      id = `${base}-${n}`;
      n += 1;
    }
    usedIds.add(id);
    return id;
  };

  const flush = () => {
    if (current) {
      sections.push({
        id: current.id,
        heading: current.heading,
        html: marked.parser(current.tokens),
      });
    }
  };

  for (const token of tokens) {
    if (token.type === "heading" && token.depth === 2) {
      flush();
      current = {
        heading: token.text,
        id: uniqueId(slugifyHeading(token.text)),
        tokens: [],
      };
    } else if (current) {
      current.tokens.push(token);
    } else {
      leading.push(token);
    }
  }
  flush();

  if (leading.length > 0) {
    sections.unshift({
      id: uniqueId("overview"),
      heading: "Overview",
      html: marked.parser(leading),
    });
  }

  return { sections, plainText: markdownBody.replace(/[#>*`_[\]()-]/g, " ") };
}

function loadArticle(filename: string): Article | null {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const fallbackSlug = filename.replace(/\.md$/, "");
  const slug: string = typeof data.slug === "string" && data.slug.trim() ? data.slug.trim() : fallbackSlug;

  const missing = ["title", "sector", "summary", "author", "publishedDate"].filter(
    (key) => !data[key]
  );
  if (missing.length > 0) {
    console.warn(
      `[content/research] "${filename}" is missing required frontmatter field(s): ${missing.join(
        ", "
      )}. Skipping this report until it's fixed. See RESEARCH_GUIDE.md.`
    );
    return null;
  }

  const { sections, plainText } = parseSections(content);

  return {
    slug,
    category: data.sector as Category,
    title: String(data.title),
    dek: typeof data.dek === "string" && data.dek.trim() ? data.dek : String(data.summary),
    summary: String(data.summary),
    author: String(data.author),
    authorRole: typeof data.authorRole === "string" ? data.authorRole : undefined,
    date: toISODate(data.publishedDate),
    updatedDate: data.updatedDate ? toISODate(data.updatedDate) : undefined,
    readingTime:
      typeof data.readingTime === "number" ? data.readingTime : estimateReadingTime(plainText),
    featured: Boolean(data.featured),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    marketCap: typeof data.marketCap === "string" ? data.marketCap : undefined,
    coverImage: typeof data.coverImage === "string" ? data.coverImage : undefined,
    sections,
  };
}

function loadAllArticles(): Article[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const filenames = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const loaded: Article[] = [];
  const seenSlugs = new Map<string, string>();

  for (const filename of filenames) {
    let article: Article | null;
    try {
      article = loadArticle(filename);
    } catch (err) {
      console.warn(`[content/research] Failed to parse "${filename}": ${(err as Error).message}`);
      continue;
    }
    if (!article) continue;

    const existingFile = seenSlugs.get(article.slug);
    if (existingFile) {
      console.warn(
        `[content/research] Duplicate slug "${article.slug}" in "${filename}" (already used by "${existingFile}"). Skipping "${filename}".`
      );
      continue;
    }
    seenSlugs.set(article.slug, filename);
    loaded.push(article);
  }

  return loaded.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Computed once at module load (build time for `next build`, per
// server-process start in `next dev`). This is the one and only
// place the filesystem is touched — everything below is plain
// in-memory array logic, unchanged from before the refactor.
export const articles: Article[] = loadAllArticles();

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticle(): Article {
  return articles.find((a) => a.featured) ?? articles[0];
}

export function getLatestArticles(excludeSlug?: string, limit = 6): Article[] {
  return articles
    .filter((a) => a.slug !== excludeSlug)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}

export function getRelatedArticles(current: Article, limit = 3): Article[] {
  const sameCategory = articles.filter(
    (a) => a.slug !== current.slug && a.category === current.category
  );
  const rest = articles.filter(
    (a) => a.slug !== current.slug && a.category !== current.category
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
