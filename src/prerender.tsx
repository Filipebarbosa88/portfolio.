import { renderToString } from 'react-dom/server';
import App from './App';
import { getPageMeta, projects } from './content/projects';
import { profile } from './content/profile';
import { screenshots } from './content/screenshots';

export const routes = ['/', ...projects.map(project => `/projetos/${project.slug}`), '/404'];
export { profile, screenshots, projects };
export function render(path: string) {
  return { html: renderToString(<App initialPath={path} />), ...getPageMeta(path) };
}
