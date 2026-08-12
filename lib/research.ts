export type Category =
  | "Technology"
  | "Macro"
  | "Financials"
  | "Healthcare"
  | "Industrials"
  | "Consumer"
  | "Energy";

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
  date: string;
  updatedDate?: string;
  readingTime: number;
  featured?: boolean;
  tags: string[];
  marketCap?: string;
  coverImage?: string;
  sections: ArticleContentSection[];
}

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
