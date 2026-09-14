import { useEffect, useRef, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy, Github, Linkedin, Mail, Menu, MessageCircle, X, ZoomIn, ZoomOut } from 'lucide-react';
import { profile } from './content/profile';
import { getPageMeta, getProject, projects, type Project } from './content/projects';
import { screenshots, type Screenshot } from './content/screenshots';

function Link({ href = '/', children, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} href={href} onClick={event => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target || !href.startsWith('/')) return;
    event.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new Event('portfolio:navigate'));
  }}>{children}</a>;
}

function ExternalLink({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} href={href} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (abre em uma nova aba)</span></a>;
}

function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLElement>(null);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); }
    }
    function onPointer(event: PointerEvent) {
      if (!menuPanel.current?.contains(event.target as Node) && !menuButton.current?.contains(event.target as Node)) setOpen(false);
    }
    if (open) {
      document.addEventListener('keydown', onKey);
      document.addEventListener('pointerdown', onPointer);
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);
  const close = () => setOpen(false);
  return <header className="site-header">
    <div className="container header-inner">
      <Link className="wordmark" href="/" aria-label="Filipe Barbosa, página inicial" onClick={close}>filipe barbosa<span aria-hidden="true">.</span></Link>
      <span className="header-role">DESENVOLVEDOR WEB</span>
      <button ref={menuButton} className="icon-button menu-toggle" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
      <nav ref={menuPanel} id="main-navigation" aria-label="Navegação principal" className={`navigation ${open ? 'is-open' : ''}`}>
        <Link href="/#projetos" onClick={close}>Projetos<span>01</span></Link>
        <Link href="/#sobre" onClick={close}>Sobre<span>02</span></Link>
        <Link href="/#contato" onClick={close} className="nav-contact">Contato<ArrowUpRight size={17} /></Link>
      </nav>
    </div>
  </header>;
}

function Label({ number, children }: { number: string; children: ReactNode }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>;
}

function Screen({ shot, eager = false, onError }: { shot: Screenshot; eager?: boolean; onError?: () => void }) {
  const croppedHeight = shot.height - shot.cropTop - shot.cropBottom;
  return <div className="screen-crop" style={{ aspectRatio: `${shot.width} / ${croppedHeight}` }}><img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={onError} style={{ top: `${-shot.cropTop / croppedHeight * 100}%` }} /></div>;
}

function ProjectVisual({ project, large = false }: { project: Project; large?: boolean }) {
  const cover = screenshots[project.slug]?.[0];
  if (!cover) return null;
  return <div className={`project-visual ${project.slug} ${large ? 'large' : ''}`}><div className="screen-frame"><div className="screen-topbar"><span>{project.title}</span><span>{cover.caption}</span></div><Screen shot={cover} eager={large} /></div></div>;
}

function HomePage() {
  return <main id="conteudo">
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-eyebrow">FILIPE BARBOSA <span>/</span> DESENVOLVEDOR WEB</p>
          <h1 id="hero-title" tabIndex={-1}>Sites e sistemas.<br /><em>Do código ao<br />uso real.</em></h1>
          <p className="hero-description">Desenvolvo aplicações para organizar rotinas, conectar pessoas e apresentar negócios. Conheça os projetos que construí para uma cantina, uma escola de música e um consultor de consórcios.</p>
          <div className="hero-actions"><Link href="/#projetos" className="button button-dark">Ver projetos <ArrowDown size={18} /></Link><Link href="/#contato" className="button button-outline">Entrar em contato</Link></div>
        </div>
        <aside className="project-overview" aria-label="Projetos em destaque">
          <div className="overview-heading"><span className="small-label">PROJETOS EM FOCO</span><p>Aplicações que desenvolvi.</p></div>
          <div className="overview-list">{projects.map(project => <Link className="overview-item" key={project.slug} href={`/projetos/${project.slug}`}><span className="overview-number">{project.number}</span><span className="overview-detail"><strong>{project.title}</strong><span>{project.stack.length ? project.stack.slice(0, 3).join(' · ') : project.category}</span></span><ArrowUpRight size={18} /></Link>)}</div>
          <div className="identity-links"><ExternalLink href={profile.github}><Github size={18} />GitHub</ExternalLink><ExternalLink href={profile.linkedin}><Linkedin size={18} />LinkedIn</ExternalLink></div>
        </aside>
      </div>
      <div className="hero-stack" aria-label="Tecnologias utilizadas"><span>TECNOLOGIAS</span><ul>{['React', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Firebase'].map(tech => <li key={tech}>{tech}</li>)}</ul></div>
    </section>
    <section className="projects-section container section-space" id="projetos" aria-labelledby="projects-title">
      <div className="section-heading"><div><Label number="01">Portfólio</Label><h2 id="projects-title">Três projetos.<br /><em>Necessidades reais.</em></h2></div><p>Em cada projeto, apresento o contexto, minha participação, as decisões de desenvolvimento e as telas da aplicação.</p></div>
      <div className="project-list">{projects.map(project => <article className="project-card" key={project.slug}>
        <Link href={`/projetos/${project.slug}`} className="project-image-link" aria-label={`Ver projeto ${project.title}`}><ProjectVisual project={project} /></Link>
        <div className="project-information"><div className="project-meta"><span>PROJETO {project.number}</span><span>{project.category}</span></div><h3><Link href={`/projetos/${project.slug}`}>{project.title}</Link></h3><p>{project.short}</p>{project.stack.length > 0 && <ul className="tech-tags" aria-label="Tecnologias">{project.stack.slice(0, 4).map(item => <li key={item}>{item}</li>)}</ul>}<Link href={`/projetos/${project.slug}`} className="case-link">Conhecer o projeto <span><ArrowUpRight size={21} /></span></Link></div>
      </article>)}</div>
    </section>
    <section className="about-section" id="sobre" aria-labelledby="about-title"><div className="container about-grid"><div className="about-heading"><Label number="02">Minha trajetória</Label><h2 id="about-title">Da sala de aula<br /><em>ao desenvolvimento.</em></h2><p className="about-location">Educação e tecnologia<br /><span>Experiência com pessoas, interfaces e dados.</span></p></div><div className="about-copy"><p className="lead">Sou Filipe, desenvolvedor web e professor de música. Comecei a criar aplicações a partir de pedidos de pessoas próximas e de necessidades que conheço no dia a dia.</p><p>Na cantina, desenvolvi uma ferramenta para registrar vendas e acompanhar o estoque. Na escola de música, organizei aulas, presenças e materiais em um portal com áreas para administração, professores e alunos.</p><p>Esses projetos me deram experiência prática com interfaces, autenticação e integração de dados. Procuro uma oportunidade como desenvolvedor web júnior para aplicar essa experiência em novos produtos e participar do trabalho de uma equipe de desenvolvimento.</p><div className="expertise"><span className="small-label">O QUE DESENVOLVI</span><p>Interfaces responsivas <span>/</span> Autenticação de usuários<br />Cadastros e consultas <span>/</span> Integração com Firestore</p></div></div></div></section>
    <Contact />
  </main>;
}

function ScreenshotGallery({ images, title }: { images: Screenshot[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [failed, setFailed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const image = active === null ? null : images[active];
  const isOpen = active !== null;
  useEffect(() => {
    if (!isOpen) return;
    const element = dialog.current;
    const previous = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = previous; opener.current?.focus(); };
  }, [isOpen]);
  useEffect(() => { setZoomed(false); setFailed(false); }, [active]);
  const move = (delta: number) => setActive(current => current === null ? null : (current + delta + images.length) % images.length);
  if (!images.length) return null;
  return <section className="gallery-section case-section" id="telas" aria-labelledby="gallery-title"><Label number="03">O projeto em telas</Label><h2 id="gallery-title">Telas e funcionalidades.</h2><div className="screenshot-grid">{images.map((item, index) => <figure key={item.src}><button type="button" className="screenshot-button" aria-label={`Ampliar: ${item.caption}`} onClick={event => { opener.current = event.currentTarget; setActive(index); }}><Screen shot={item} /><span className="expand-icon"><ZoomIn size={21} /></span></button><figcaption><span>{String(index + 1).padStart(2, '0')}</span>{item.caption}</figcaption></figure>)}</div>
      <dialog ref={dialog} className="lightbox" aria-label={`Telas de ${title}`} aria-describedby="lightbox-caption" onCancel={event => { event.preventDefault(); setActive(null); }} onClick={event => { if (event.target === event.currentTarget) setActive(null); }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } }}>
        {image && <div className="lightbox-inner"><div className="lightbox-toolbar"><span>{title} <span className="lightbox-count">{(active ?? 0) + 1} / {images.length}</span></span><div><button className="icon-button" type="button" aria-label={zoomed ? 'Ajustar imagem à tela' : 'Ampliar imagem'} aria-pressed={zoomed} onClick={() => setZoomed(!zoomed)}>{zoomed ? <ZoomOut /> : <ZoomIn />}</button><button className="icon-button" type="button" aria-label="Fechar imagem" onClick={() => setActive(null)} autoFocus><X /></button></div></div><div className={`lightbox-image ${zoomed ? 'is-zoomed' : ''}`} tabIndex={0} aria-label="Imagem ampliada; use as barras de rolagem quando necessário">{failed ? <p role="status">Não foi possível carregar esta imagem. <a href={image.src} target="_blank" rel="noopener noreferrer">Abrir o arquivo</a></p> : <div className="lightbox-screen"><Screen shot={image} eager onError={() => setFailed(true)} /></div>}</div><div className="lightbox-footer"><button className="icon-button" type="button" aria-label="Imagem anterior" disabled={images.length < 2} onClick={() => move(-1)}><ChevronLeft /></button><p id="lightbox-caption" aria-live="polite">{image.caption}</p><button className="icon-button" type="button" aria-label="Próxima imagem" disabled={images.length < 2} onClick={() => move(1)}><ChevronRight /></button></div></div>}
      </dialog>
    </section>;
}

function CasePage({ project }: { project: Project }) {
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const images = screenshots[project.slug] ?? [];
  return <main id="conteudo">
    <article>
      <header className="case-header container"><Link href="/#projetos" className="back-link"><ArrowLeft size={17} />Todos os projetos</Link><div className="case-eyebrow"><span>CASE {project.number} / 03</span><span>{project.category}</span></div><h1 tabIndex={-1}>{project.title}</h1><div className="case-intro"><h2>{project.headline}</h2><p>{project.intro}</p></div><dl className="case-facts"><div><dt>Minha participação</dt><dd>{project.role}</dd></div><div><dt>Para quem</dt><dd>{project.audience}</dd></div><div><dt>Entrega</dt><dd>Projeto concluído</dd></div></dl>{(project.site || project.repository) && <div className="case-external-links">{project.site && <ExternalLink className="button button-dark" href={project.site}>Visitar projeto<ArrowUpRight size={18} /></ExternalLink>}{project.repository && <ExternalLink className="button button-outline" href={project.repository}><Github size={18} />Ver código</ExternalLink>}</div>}</header>
      <div className="container case-cover"><ProjectVisual project={project} large /></div>
      <div className="container case-layout"><aside className="case-sidebar"><span className="small-label">NESTE CASE</span><nav aria-label="Seções do case"><a href="#contexto">O contexto</a><a href="#solucao">A solução</a>{images.length > 0 && <a href="#telas">Telas do projeto</a>}<a href="#decisoes">Decisões técnicas</a><a href="#entrega">A entrega</a></nav>{project.stack.length > 0 && <div className="case-stack"><span className="small-label">TECNOLOGIAS</span><ul>{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul></div>}</aside><div className="case-content">
        <section className="case-section" id="contexto"><Label number="01">O contexto</Label><h2>O que precisava ser resolvido.</h2>{project.challenge.map(text => <p key={text}>{text}</p>)}</section>
        <section className="case-section" id="solucao"><Label number="02">A solução</Label><h2>Como desenvolvi a solução.</h2><p>{project.approach}</p><div className="feature-list">{project.features.map((feature, index) => <div className="feature-item" key={feature.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{feature.title}</h3><p>{feature.description}</p></div></div>)}</div></section>
        <ScreenshotGallery images={images} title={project.title} />
        <section className="case-section" id="decisoes"><Label number={images.length ? '04' : '03'}>Decisões de desenvolvimento</Label><h2>Decisões de desenvolvimento.</h2><div className="decision-list">{project.decisions.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></section>
        <section className="case-section delivery-section" id="entrega"><Label number={images.length ? '05' : '04'}>A entrega</Label><h2>O que foi entregue.</h2><ul className="outcomes">{project.outcomes.map(outcome => <li key={outcome}><Check size={20} /><span>{outcome}</span></li>)}</ul><div className="learning"><h3>Aprendizados do projeto</h3><p>{project.learning}</p></div></section>
      </div></div>
    </article>
    <section className="next-case container" aria-label="Próximo projeto"><Link href={`/projetos/${next.slug}`}><div><span className="small-label">PRÓXIMO CASE / {next.number}</span><h2>{next.title}</h2></div><span className="next-arrow"><ArrowUpRight size={42} strokeWidth={1.4} /></span></Link></section>
    <Contact compact />
  </main>;
}

function Contact({ compact = false }: { compact?: boolean }) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  useEffect(() => {
    if (copyState === 'idle') return;
    const timer = window.setTimeout(() => setCopyState('idle'), 4000);
    return () => window.clearTimeout(timer);
  }, [copyState]);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopyState('copied'); }
    catch { setCopyState('error'); }
  }
  return <section className={`contact-section ${compact ? 'compact' : ''}`} id="contato" aria-labelledby="contact-title"><div className="container"><Label number="03">Contato</Label><div className="contact-heading"><h2 id="contact-title">Tem um projeto em mente?<br /><em>Vamos conversar.</em></h2><div className="contact-aside"><p>Disponível para projetos de sites e sistemas<br />e oportunidades como desenvolvedor web júnior.</p><span>Itapira, SP · Trabalho remoto</span></div></div><div className="contact-links">{profile.email && <div className="email-link"><a href={`mailto:${profile.email}`}><Mail size={19} /><span>{profile.email}</span><ArrowUpRight size={19} /></a><button type="button" className="icon-button" aria-label="Copiar endereço de e-mail" onClick={copyEmail}>{copyState === 'copied' ? <Check size={18} /> : <Copy size={18} />}</button></div>}<div className="social-links">{profile.github && <ExternalLink href={profile.github}><Github size={19} />GitHub<ArrowUpRight size={17} /></ExternalLink>}{profile.linkedin && <ExternalLink href={profile.linkedin}><Linkedin size={19} />LinkedIn<ArrowUpRight size={17} /></ExternalLink>}{profile.whatsapp && <ExternalLink href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`}><MessageCircle size={19} />Conversar no WhatsApp<ArrowUpRight size={17} /></ExternalLink>}</div></div><p className="copy-feedback" role="status" aria-live="polite">{copyState === 'copied' ? 'E-mail copiado.' : copyState === 'error' ? 'Selecione o endereço de e-mail para copiá-lo manualmente.' : ''}</p></div></section>;
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><Link href="/" className="wordmark">filipe barbosa<span>.</span></Link><span>Filipe Barbosa · Desenvolvimento web</span><Link className="footer-top" href="/#inicio">Voltar ao início <ArrowUpRight size={16} /></Link></div></footer>;
}

function NotFound() {
  return <main id="conteudo" className="not-found container"><span className="small-label">ERRO 404</span><h1 tabIndex={-1}>Página não encontrada.</h1><p>Você pode voltar ao início e conhecer meus projetos.</p><Link href="/" className="button button-dark">Voltar ao portfólio <ArrowRight size={18} /></Link></main>;
}

export default function App({ initialPath = '/' }: { initialPath?: string }) {
  const [path, setPath] = useState(initialPath.replace(/\/$/, '') || '/');
  const [routeAnnouncement, setRouteAnnouncement] = useState('');
  const pathRef = useRef(path);
  useEffect(() => {
    function navigate() {
      const next = window.location.pathname.replace(/\/$/, '') || '/';
      if (pathRef.current !== next) setRouteAnnouncement(getPageMeta(next).title);
      pathRef.current = next;
      setPath(next);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        let anchor = window.location.hash.slice(1);
        try { anchor = decodeURIComponent(anchor); } catch { /* Keep malformed hashes harmless. */ }
        const target = anchor ? document.getElementById(anchor) : null;
        if (target) target.scrollIntoView({ behavior: 'auto' });
        else { window.scrollTo({ top: 0, behavior: 'instant' }); document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true }); }
      }));
    }
    window.addEventListener('portfolio:navigate', navigate);
    window.addEventListener('popstate', navigate);
    return () => { window.removeEventListener('portfolio:navigate', navigate); window.removeEventListener('popstate', navigate); };
  }, []);
  useEffect(() => {
    const meta = getPageMeta(path);
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    if (profile.siteUrl) document.querySelector('link[rel="canonical"]')?.setAttribute('href', profile.siteUrl + path);
  }, [path]);
  const project = getProject(path);
  return <div id="inicio"><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header path={path} /><div className="sr-only" aria-live="polite">{routeAnnouncement}</div>{path === '/' ? <HomePage /> : project ? <CasePage key={project.slug} project={project} /> : <NotFound />}<Footer /></div>;
}
