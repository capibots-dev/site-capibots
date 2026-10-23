// Valida src/data/blog.json e as referências em projects.json antes do build.
// Erros interrompem o build; avisos só aparecem na tela.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf-8'));
const existeEmPublic = (p) => fs.existsSync(path.join(root, 'public', decodeURI(p.split(/[?#]/)[0])));

const posts = readJson('src/data/blog.json');
const projects = readJson('src/data/projects.json');
const seasons = new Set(projects.map((p) => p.season));

const erros = [];
const avisos = [];
const erro = (id, msg) => erros.push(`[${id}] ${msg}`);
const aviso = (id, msg) => avisos.push(`[${id}] ${msg}`);

const ids = new Set();
for (const post of posts) {
  const id = post.id ?? '(sem id)';

  if (!post.id) erro(id, 'sem id');
  else if (ids.has(post.id)) erro(id, 'id repetido');
  else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(post.id)) erro(id, 'id deve ter só minúsculas, números e hífens');
  ids.add(post.id);

  for (const campo of ['title', 'date', 'category', 'image', 'excerpt', 'content']) {
    if (!post[campo]) erro(id, `campo "${campo}" vazio ou ausente`);
  }

  if (post.date) {
    const data = new Date(`${post.date}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date) || Number.isNaN(data.getTime()) || data.toISOString().slice(0, 10) !== post.date) {
      erro(id, `data inválida: "${post.date}" (use AAAA-MM-DD)`);
    }
  }

  if (post.season !== undefined && !seasons.has(post.season)) {
    erro(id, `season ${post.season} não existe em projects.json`);
  }

  if (typeof post.image === 'string' && post.image.startsWith('/') && !existeEmPublic(post.image)) {
    erro(id, `imagem de capa não encontrada: ${post.image}`);
  }

  for (const item of post.images ?? []) {
    const src = typeof item === 'string' ? item : item?.src;
    if (!src) erro(id, 'item de "images" sem src');
    else if (!existeEmPublic(src)) erro(id, `foto da galeria não encontrada: ${src}`);
  }

  if (post.excerpt && post.excerpt.length > 300) aviso(id, `excerpt com ${post.excerpt.length} caracteres (ideal até 300 para a pré-visualização)`);

  const linhas = (post.content ?? '').split('\n');
  linhas.forEach((linha, i) => {
    const n = i + 1;
    // Prefixos que o BlogPost.tsx não reconhece aparecem como texto puro
    if (/^(#{1}|#{4,}) /.test(linha)) aviso(id, `linha ${n}: título "${linha.slice(0, 20)}" não é suportado (use ## ou ###)`);
    if (/^(> |\d+\. |\* )/.test(linha)) aviso(id, `linha ${n}: "${linha.slice(0, 20)}" aparece como texto puro (suportados: ## , ### , - , ✅ )`);
    if ((linha.match(/\*\*/g) ?? []).length % 2 !== 0) aviso(id, `linha ${n}: "**" sem par`);

    for (const [, , alvo] of linha.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
      if (alvo.startsWith('/blog/')) {
        if (!posts.some((p) => p.id === alvo.slice('/blog/'.length).replace(/[/?#].*$/, ''))) erro(id, `link para post inexistente: ${alvo}`);
      } else if (alvo.startsWith('/') && !existeEmPublic(alvo) && !/^\/(sobre|projetos|blog|contato|cardapio-futsal)/.test(alvo)) {
        erro(id, `link para arquivo inexistente: ${alvo}`);
      }
    }
  });
}

// Posts citados nos projetos precisam existir
for (const projeto of projects) {
  for (const etapa of projeto.research?.stages ?? []) {
    for (const postId of etapa.posts ?? []) {
      if (!ids.has(postId)) erro(projeto.id, `etapa "${etapa.title}" cita post inexistente: ${postId}`);
    }
  }
}

for (const a of avisos) console.warn(`aviso  ${a}`);
for (const e of erros) console.error(`erro   ${e}`);
console.log(`blog.json: ${posts.length} posts, ${erros.length} erro(s), ${avisos.length} aviso(s)`);
process.exit(erros.length ? 1 : 0);
