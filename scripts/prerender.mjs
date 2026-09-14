import { build } from 'vite';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
await build({ root, publicDir: false, build: { ssr: 'src/prerender.tsx', outDir: '.prerender', emptyOutDir: true } });
const { routes, render, profile } = await import('../.prerender/prerender.js');
const template = await readFile(path.join(root, 'dist/index.html'), 'utf8');
const escape = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
for (const route of routes) {
  const page = render(route);
  let html = template.replace('<!--app-html-->', () => page.html)
    .replace(/<title>.*?<\/title>/, () => `<title>${escape(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, () => `<meta name="description" content="${escape(page.description)}" />`);
  if (profile.siteUrl && route !== '/404') html = html.replace('</head>', `<link rel="canonical" href="${escape(profile.siteUrl + route)}" /></head>`);
  const file = route === '/' ? path.join(root, 'dist/index.html') : route === '/404' ? path.join(root, 'dist/404.html') : path.join(root, 'dist', route.slice(1), 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
  console.log(`Página gerada: ${route}`);
}
await rm(path.join(root, '.prerender'), { recursive: true, force: true });
