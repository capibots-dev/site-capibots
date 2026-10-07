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

Optional `images` field: list of photos shown as a gallery (grid with click-to-enlarge) right after the cover image. Each item is either a path string (`"/images/blog/foto.jpg"`) or `{ "src": "/images/blog/foto.jpg", "alt": "descrição" }`.

Inline formatting supports `**bold**` and `[text](url)` links (links open in a new tab; local files such as `/docs/arquivo.pdf` work too).

**Writing style:** whenever creating or editing a post in `blog.json`, invoke the `anthropic-skills:anti-ai-slop` skill before writing, so the text does not read as AI-generated.

Blog posts in `_legacy` inside `BlogPost.tsx` are hardcoded fallbacks for old slugs not yet migrated to `blog.json` — they are not displayed, only used if `blogData.find()` returns nothing for those specific ids.

### Scheduled posts and the pending post backlog

A post with a future `date` in `blog.json` stays hidden (list, home, featured carousel, "Continue Lendo" and the direct URL) until that date; no redeploy is needed. Dates are compared in UTC, so a post appears about 21h (Brasília) on the day before.

**Never publish (competitive advantage until after the national stage):** Robôvara design (parts, levers, what the 3D-printed pieces do), number and order of base exits, round times, projected scores, mission strategy, gyroscope and wheel-alignment techniques; Capi-Aprende architecture (AI models, sync), prototype URL, hypotheses, experiment design and any partial survey result. The 2026 research theme (connectivity / Capi-Aprende) is not announced yet: only talk about it after the regional presentation. Do not name volunteers or Escola Dom Bosco staff without authorization, and never show photos of children from other schools.

**Backlog (to write later, ask the team for the date first):**

- *Quando o treino dá errado* (`Desafio Prático`): the 2026 logbook (ten meetings in six weeks, training at team members' homes, a day when missions that worked started failing). No mission names, parts or strategy.
- *Como a equipe aplica uma pesquisa com crianças* (`Mérito Científico`): consent, nobody photographed or recorded, questionnaire identified only by a code. Method and care only, no results. Publish only after the Dom Bosco visit (5–9 Oct 2026) and with the school's OK.
- *Aprendendo a usar impressora 3D* (`Formação e Tecnologia`): only the learning and the volunteers who helped; never what is printed or why.

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
