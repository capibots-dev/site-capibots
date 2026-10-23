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
      const posts = JSON.parse(fs.readFileSync(path.resolve(__dirname, "src/data/blog.json"), "utf-8")) as {
        id: string; title: string; excerpt: string; date: string; image: string;
      }[];
      const today = new Date().toISOString().slice(0, 10);

      for (const post of posts.filter((p) => p.date <= today)) {
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

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    postMetaTags(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
