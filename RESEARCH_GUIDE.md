# Publishing a research report

Elevate Research's research section is content-driven. There is exactly
one source of truth: the markdown files in `/content/research`. Nothing
about a report — its listing, its featured status, its search
indexing, its category filter, or its page at `/research/[slug]` — is
hardcoded anywhere in the React code. Add a file, and everything above
happens automatically.

## The short version

1. Duplicate any file in `/content/research` as a starting point (or
   copy the template below).
2. Fill in the frontmatter.
3. Write the report body in plain markdown.
4. Save it as `content/research/your-slug.md`.
5. Run `npm run dev` (or deploy). That's it — no other file needs to
   change.

## Frontmatter reference

Every report starts with a YAML frontmatter block between `---` lines.

```yaml
---
title: "Your Report Title"
slug: "your-report-title"
sector: "Technology"
publishedDate: 2026-08-01
summary: "One or two sentences. Shown on cards and used for search."
dek: "Optional. The larger sub-headline shown at the top of the report
  page. Falls back to `summary` if omitted."
tags: ["Tag One", "Tag Two"]
featured: false
author: "Your Name"
authorRole: "Your Title"
readingTime: 8
marketCap: "Mid Cap"
coverImage: "/research/your-cover.jpg"
updatedDate: 2026-08-05
---
```

| Field | Required | Notes |
|---|---|---|
| `title` | **Yes** | Report headline. |
| `slug` | No | Becomes the URL: `/research/your-slug`. If omitted, the filename (without `.md`) is used instead. Must be unique across all reports. |
| `sector` | **Yes** | One of: `Technology`, `Macro`, `Financials`, `Healthcare`, `Industrials`, `Consumer`, `Energy`. See "Adding a new sector" below if you need one that doesn't exist yet. |
| `publishedDate` | **Yes** | `YYYY-MM-DD`. Can be written unquoted (`2026-08-01`) or as a quoted string. |
| `updatedDate` | No | Same format. Captured for future use; not yet shown anywhere. |
| `summary` | **Yes** | Used on research cards and matched against when someone searches. Keep it to one or two sentences. |
| `dek` | No | The large sub-headline on the report page itself. If you skip it, `summary` is reused. |
| `author` | **Yes** | Display name. |
| `authorRole` | No | Shown under the author's name on the report page. |
| `tags` | No | YAML list. Matched against when someone searches. |
| `featured` | No | Set `true` on exactly one report at a time to make it the homepage lead story. If more than one file has `featured: true`, the first one found wins — so keep it to one. |
| `readingTime` | No | Minutes, as a number. If omitted, it's calculated automatically from the word count (~200 words/minute). |
| `marketCap` | No | Free text (e.g. `"Large Cap"`, `"$40B–$60B"`). For company-specific reports; leave it out for sector/macro notes. Captured for future use; not yet shown anywhere. |
| `coverImage` | No | A path or URL. Captured for a future visual treatment; the current design doesn't render report images. |

## Writing the body

Everything after the frontmatter is the report itself, in plain
markdown.

- **`## Heading`** — every `##` (H2) starts a new section. Each section
  automatically becomes an entry in the report's sticky table of
  contents, so section headings should be short and specific — they're
  what readers see in the sidebar.
- **`### Sub-heading`** — supported for a sub-point within a section;
  it won't appear in the table of contents.
- **Plain paragraphs** — just write them. Blank line between
  paragraphs.
- **`> A pull quote.`** — a blockquote renders as a large styled pull
  quote (this replaces what used to be a separate `pullQuote` field).
  Use it sparingly, for the one line in a section worth pulling out.
- **Links** — standard markdown `[text](https://example.com)`.
- **Lists** — standard `-` or `1.` lists.
- **Bold** — `**text**`.

You do not need to add HTML, ids, or anchors anywhere — section ids
for the table of contents and in-page anchor links are generated
automatically from your `##` heading text.

### Minimal example

```markdown
---
title: "A New Report"
slug: "a-new-report"
sector: "Technology"
publishedDate: 2026-08-01
summary: "What this report is about, in one or two sentences."
author: "Jane Doe"
authorRole: "Analyst, Technology"
tags: ["Example"]
---

## The setup

Opening paragraph of the first section.

> A pull quote worth calling out.

## What we found

More paragraphs here.

## What would change our view

Closing analysis.
```

See `content/research/semiconductor-capex-supercycle-2026.md` (or any
other file in that folder) for a complete real example.

## What happens automatically

Once the file is saved, without touching any component:

- It appears in **All research** (`/research`), and is filterable by
  sector and matched by the search box.
- If `featured: true`, it becomes the **homepage lead story**; the
  next few most recent reports (by `publishedDate`) fill the secondary
  featured slots and the "Recently published" grid.
- It gets its own page at **`/research/[slug]`**, with a working table
  of contents, a "More research" quick-jump list in the sticky
  sidebar, and related-reports suggestions (same sector first, then
  others) at the bottom.
- It's included in **related research** on other reports in the same
  sector.

## Adding a new sector

Sectors are a small, deliberately curated taxonomy (the homepage
"Coverage" rail shows a hand-written description for each one), so a
brand-new sector — not just a new report in an existing sector — is
the one case that needs a one-line code change: add an entry to the
`categories` array near the top of `lib/data.ts`. This is rare;
publishing reports in the existing seven sectors never requires it.

## Validation and mistakes

If a report is missing a required field (`title`, `sector`,
`summary`, `author`, or `publishedDate`), it's skipped — with a
warning logged to the server console explaining which file and which
field — rather than breaking the build or the rest of the site. Check
your terminal (or your host's build logs) if a report you added isn't
showing up.

Two reports can't share the same `slug`. If they do, the second one
found is skipped with a console warning.

## What this is not

This is not a CMS. There's no editing UI, no drafts/scheduling, and no
database — files in `/content/research` are the entire content
model. If you later want a visual editor, an API-backed CMS (e.g.
Sanity, Contentful) or a git-based one (e.g. Tina, Decap) can usually
be layered on top of this same markdown-plus-frontmatter shape without
changing how reports render.

## Compliance reminder

Elevate Research is positioned as an **educational, informational**
platform — not investment advice. When writing a report:

- No buy, sell, or hold ratings.
- No price targets, expected returns, entry/exit prices, or stop
  losses.
- No wording that reads as a personalized recommendation ("you
  should buy…", "we recommend allocating…").
- Frame valuation as an analytical discussion (what a multiple or
  spread implies, what would have to be true for it to close) rather
  than a call to action.
- Every report page automatically shows a disclaimer at the bottom —
  you don't need to add your own, but the body copy itself should
  still hold to this standard.
