# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite, localhost:5173)
npm run build      # Production build → dist/
npm run lint       # ESLint check
npm run preview    # Preview production build locally
```

There are no tests in this project.

## Deployment

Pushing to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`), which runs `npm ci && npm run build` and deploys the `dist/` folder to GitHub Pages. The site is served at the custom domain configured in `public/CNAME`.

## Architecture

This is a static React SPA (Vite + TypeScript + Tailwind + shadcn/ui) for the Capibots robotics team — a group of 9–10-year-old students from Uberlândia, MG who compete in the TBR (Torneio Brasil de Robótica).

### Routing

All routes are defined in `src/App.tsx` using React Router v6. Routes are in Portuguese:

| Route | Page |
|---|---|
| `/` | Home (Index) |
| `/sobre` | About |
| `/projetos` | Projects list |
| `/projetos/:slug` | Project detail |
| `/blog` | Blog list |
| `/blog/:slug` | Blog post |
| `/contato` | Contact |
| `/cardapio-futsal` | Special page |

New routes must be added **above** the `*` catch-all in `App.tsx`.

### Data layer

All content is stored as static JSON in `src/data/`:

- **`team.json`** — 9 team members with name, role, category, image path, and minibio.
- **`projects.json`** — Projects with id (used as slug), technologies, timeline, team members, etc.
- **`blog.json`** — Blog posts with id (used as slug), content in Markdown-like plain text, and a `featured: boolean` flag.
- **`achievements.json`** — Competition awards and highlights.

Pages import these JSON files directly; there is no API or CMS. To add/edit content, edit the relevant JSON file.

### Blog post rendering

`BlogPost.tsx` renders post content by splitting on `\n` and parsing prefixes (`## `, `### `, `- `, `✅ `) manually — it does **not** use a Markdown library. When writing blog post content in `blog.json`, use only those supported prefixes. The `image` field accepts either an emoji string or an absolute path starting with `/` (e.g. `/images/blog/photo.jpg`); paths are rendered as `<img>`, emojis as text.

Optional `season` field (number, e.g. `2026`): links the post to a season (the `season` of an entry in `projects.json`). The season page (`/projetos/:slug`) lists, under Timeline, the published posts of that season in the categories Ações Empreendedoras, Divulgação, Mérito Científico, Competições and Tecnologia & Engenharia (`SEASON_NEWS_CATEGORIES` in `src/lib/blog.ts`). Posts of the `Diário de Bordo` category are hidden from the home, blog list and "Continue Lendo", and appear only as a list on the season page.

Optional `images` field: list of photos shown as a gallery (grid with click-to-enlarge) right after the cover image. Each item is either a path string (`"/images/blog/foto.jpg"`) or `{ "src": "/images/blog/foto.jpg", "alt": "descrição" }`.

Inline formatting supports `**bold**` and `[text](url)` links (links open in a new tab; local files such as `/docs/arquivo.pdf` work too).

**Writing style:** whenever creating or editing a post in `blog.json`, invoke the `anthropic-skills:anti-ai-slop` skill before writing, so the text does not read as AI-generated.

Blog posts in `_legacy` inside `BlogPost.tsx` are hardcoded fallbacks for old slugs not yet migrated to `blog.json` — they are not displayed, only used if `blogData.find()` returns nothing for those specific ids.

### Scheduled posts and the pending post backlog

A post with a future `date` in `blog.json` stays hidden (list, home, featured carousel, "Continue Lendo" and the direct URL) until that date; no redeploy is needed. Dates are compared in UTC, so a post appears about 21h (Brasília) on the day before.

**Partial disclosure is a goal.** Last year the team was penalized for not showing partial results of its work, so the Mérito Científico research is published openly: the 2026 theme (connectivity), the choice process, public data, the Escola Dom Bosco visits, the survey method and its numbers, and the navigable Capi-Aprende prototype (capiaprende.capibots.com.br, public since 15 Oct 2026; it was ready on 21 Sep but only ran inside the team). Posts dated in the past go live on the next deploy, which is intended: the technical notebooks were delivered to the judges, who may check the site.

**Editorial line:** the blog celebrates achievements and shows relevant events and facts. Team backstage (what went wrong, internal difficulties, plans that failed) is not the subject of a post; those lessons live in the technical notebooks. A post may include a failure and the course correction when it is a small part of an achievement or event, never as the main theme.

**Never publish (competitive advantage):**

- *Table strategy and robot (until after the national stage):* Robôvara design (parts, levers, what the 3D-printed pieces do), number and order of base exits, round times, projected scores and practice averages or records, mission strategy, gyroscope and wheel-alignment techniques, how the Maker mission was built and what object the robot carries.
- *Capi-Aprende research internals:* hypotheses, experiment design (pre/post test, groups, draw), what the children picked as functions for the "professor de bolso", and the ideas each research group imagined before the vote. Survey numbers, the navigable prototype, the downloadable app, the public tutorial and the beta-tester group are fine. The app's architecture (AI models, how it runs offline, sync, voice input, Android choice) used to be restricted too, but since the work became public it can be described, as long as it stays at the level shown in the app and the tutorial.
- *The technical notebooks themselves* (`trabalhos/`, PDFs of Mérito Científico, Organização e Método, Tecnologia e Engenharia): they hold table strategy and must never be public. The folder is in `.gitignore`; never remove it from there, commit it, copy it into `public/` or `dist/`, or link to it. Posts may use their facts only within the limits above.
  Exception decided by the team: **summarized versions** (not the official notebooks delivered to the tournament) are public. `/2026/cadernos-tecnicos` (page `CadernosTecnicos.tsx`, `noindex`, not in the sitemap or any menu, linked from the TBR 2026 project page) is the cover: each notebook has a "Ler online" card (static HTML in `public/2026/cadernos/`, `noindex`, deliberately vague on robot and strategy details) and a "Baixar PDF" card, which requires a sign-up and gets the `*-resumido.pdf` files from a private Cloudflare R2 bucket via the Worker in `worker/` (see `worker/README.md`). The page carries a disclaimer that these are not the final versions. The official PDFs are not in the bucket and the summarized PDFs never go into the repo, `public/` or `dist/`. The HTML in `public/2026/cadernos/` must not link directly to any PDF; its "Baixar PDF" button points to the cover page.
- *People:* do not name volunteers or Escola Dom Bosco staff without authorization, never show photos of children from other schools, and do not publish what was learned about the school's own structure or routine without the school's OK.

**Post plan:** `trabalhos/posts-planejados.md` (local only, not versioned) lists the planned posts with date, category and cautions. Follow it, and ask the team for the date when the plan says "a confirmar".

**Backlog items with extra rules:**

- *Quando o treino não sai como o planejado* (`Desafio Prático`): generic post on resilience and emotional maturity, with hypothetical situations ("imagine que...") and how the team records one lesson per training in the logbook. Tell no real event of the season; no mission names, parts or strategy.
- *Como a equipe aplica uma pesquisa com crianças* (`Mérito Científico`): consent, nobody photographed or recorded, questionnaire identified only by a code. Method and care only; results go in a separate post. Publish with the school's OK.
- *Aprendendo a usar impressora 3D* (`Tecnologia & Engenharia`): only the learning and the volunteers who helped; never what is printed or why.

### Styling conventions

- **Primary color**: orange (`hsl(25 95% 53%)`) — represents the Cerrado sun/earth
- **Secondary color**: green (`hsl(142 76% 36%)`) — represents native vegetation
- **Gradient utility**: `.gradient-orange-green` (diagonal orange → green, used for hero sections and CTAs)
- **Text gradient utility**: `.text-gradient` (applied to section headings)
- Animations defined in `tailwind.config.ts`: `animate-fade-in`, `animate-slide-in`, `animate-bounce-gentle`
- UI primitives come from shadcn/ui (`src/components/ui/`) — do not edit these files manually; use the shadcn CLI if new components are needed.

### Path alias

`@/` maps to `src/` (configured in Vite and `tsconfig.app.json`).

### Images

Static assets are in `public/`:
- `public/images/team/` — cartoon portraits of team members (referenced in `team.json`)
- `public/images/blog/` — blog post photos
- `public/lovable-uploads/` — photos uploaded via the Lovable platform (team photo, logo)
- `public/mediakit/` — downloadable press kit files
