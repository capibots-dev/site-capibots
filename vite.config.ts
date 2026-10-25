import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import type { Plugin } from "vite";
import { componentTagger } from "lovable-tagger";

const SITE_URL = "https://capibots.com.br";

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Os rastreadores do WhatsApp, Facebook e Instagram não executam JavaScript, então as meta tags
// de cada post precisam estar no HTML. Depois do build, gera dist/blog/<id>/index.html a partir do
// index.html, trocando título, descrição e imagem. Posts com data futura não ganham página: a
// agenda deles continua valendo e eles não vazam pela meta tag.
type Post = {
  id: string; title: string; excerpt: string; date: string; image: string; category: string;
};

// Posts já publicados; os de data futura ficam de fora de tudo que é gerado no build
const publishedPosts = () => {
  const posts = JSON.parse(fs.readFileSync(path.resolve(__dirname, "src/data/blog.json"), "utf-8")) as Post[];
  const today = new Date().toISOString().slice(0, 10);
  return posts.filter((p) => p.date <= today).sort((a, b) => b.date.localeCompare(a.date));
};

const postMetaTags = (): Plugin => {
  let outDir = "dist";
  return {
    name: "post-meta-tags",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const template = fs.readFileSync(path.join(outDir, "index.html"), "utf-8");

      for (const post of publishedPosts()) {
        const url = `${SITE_URL}/blog/${post.id}`;
        const hasPhoto = post.image.startsWith("/");
        const image = hasPhoto ? `${SITE_URL}${encodeURI(post.image)}` : `${SITE_URL}/capibots-logo.png`;
        const title = escapeHtml(`${post.title} | Capibots`);
        const description = escapeHtml(post.excerpt);
        const tags = [
          `<title>${title}</title>`,
          `<meta name="description" content="${description}" />`,
          `<link rel="canonical" href="${url}" />`,
          `<meta property="og:title" content="${escapeHtml(post.title)}" />`,
          `<meta property="og:description" content="${description}" />`,
          `<meta property="og:type" content="article" />`,
          `<meta property="og:url" content="${url}" />`,
          `<meta property="og:image" content="${image}" />`,
          `<meta property="og:locale" content="pt_BR" />`,
          `<meta property="article:published_time" content="${post.date}" />`,
          `<meta name="twitter:card" content="${hasPhoto ? "summary_large_image" : "summary"}" />`,
          `<meta name="twitter:image" content="${image}" />`,
        ].join("\n    ");

        const html = template
          .replace(/<title>[\s\S]*?<\/title>\s*/, "")
          .replace(/<meta name="description"[^>]*>\s*/, "")
          .replace(/<meta property="og:[^>]*>\s*/g, "")
          .replace(/<meta name="twitter:(card|image)"[^>]*>\s*/g, "")
          .replace("</head>", `    ${tags}\n  </head>`);

        const dir = path.join(outDir, "blog", post.id);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), html);
      }
    },
  };
};

// Gera sitemap.xml e feed.xml (RSS) com os posts publicados na data do build. Posts agendados entram
// no sitemap e no feed no primeiro deploy depois da data deles.
const seoFiles = (): Plugin => {
  let outDir = "dist";
  return {
    name: "seo-files",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const posts = publishedPosts();
      const projects = JSON.parse(fs.readFileSync(path.resolve(__dirname, "src/data/projects.json"), "utf-8")) as { id: string }[];
      const today = new Date().toISOString().slice(0, 10);

      const urls: { loc: string; lastmod: string }[] = [
        { loc: "/", lastmod: today },
        { loc: "/sobre", lastmod: today },
        { loc: "/projetos", lastmod: today },
        ...projects.map((p) => ({ loc: `/projetos/${p.id}`, lastmod: today })),
        { loc: "/blog", lastmod: posts[0]?.date ?? today },
        { loc: "/capi-aprende", lastmod: today },
        { loc: "/contato", lastmod: today },
        ...posts.map((p) => ({ loc: `/blog/${p.id}`, lastmod: p.date })),
      ];
      const sitemap =
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        urls.map((u) => `  <url><loc>${SITE_URL}${encodeURI(u.loc)}</loc><lastmod>${u.lastmod}</lastmod></url>`).join("\n") +
        `\n</urlset>\n`;
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap);

      // O Diário de Bordo não aparece no blog, então também fica fora do feed
      const items = posts
        .filter((p) => p.category !== "Diário de Bordo")
        .slice(0, 30)
        .map((p) => {
          const url = `${SITE_URL}/blog/${p.id}`;
          return (
            `    <item>\n      <title>${escapeHtml(p.title)}</title>\n      <link>${url}</link>\n` +
            `      <guid isPermaLink="true">${url}</guid>\n      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>\n` +
            `      <category>${escapeHtml(p.category)}</category>\n      <description>${escapeHtml(p.excerpt)}</description>\n    </item>`
          );
        })
        .join("\n");
      const feed =
        `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n` +
        `    <title>Capibots</title>\n    <link>${SITE_URL}/blog</link>\n` +
        `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />\n` +
        `    <description>Notícias da equipe de robótica Capibots, de Uberlândia (MG).</description>\n    <language>pt-BR</language>\n` +
        `${items}\n  </channel>\n</rss>\n`;
      fs.writeFileSync(path.join(outDir, "feed.xml"), feed);
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    postMetaTags(),
    seoFiles(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
