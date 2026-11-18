import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { projects } from './data/content';
import { DASHES } from './test/dashes';
import { PRIVATE } from './test/private';

const html = readFileSync('index.html', 'utf8');
const meta = (attr: string, name: string) => new RegExp(`<meta[^>]+${attr}="${name}"[^>]+content="([^"]+)"`).exec(html)?.[1];

test('index_has_title_description_and_og_tags', () => {
  expect(html).toContain('<html lang="pt-BR">');
  expect(html).toMatch(/<title>[^<]*Bernardo[^<]*Full Stack<\/title>/);
  expect(meta('name', 'description')).toMatch(/Full Stack/);
  expect(meta('property', 'og:title')).toBeTruthy();
  expect(meta('property', 'og:description')).toBeTruthy();
  expect(meta('property', 'og:url')).toBe('https://bombazaro.github.io/');
  expect(meta('property', 'og:image')).toBe('https://bombazaro.github.io/og-image.png');
  expect(meta('property', 'og:locale')).toBe('pt_BR');
  expect(meta('name', 'theme-color')).toBe('#07060f');
  expect(html).toMatch(/<link[^>]+rel="icon"[^>]+href="\/favicon\.svg"/);
});

test('no_dashes_in_index_html', () => {
  expect(html).not.toMatch(DASHES);
});

test('public_assets_exist', () => {
  [
    'curriculo-bernardo-bombazaro.pdf',
    'favicon.svg',
    'og-image.png',
    'meu-desenho-sem-fundo.webp',
    'projetos/padaria.webp',
    'projetos/fluxus-inicio.webp',
    'projetos/fluxus.webp',
    'projetos/livrum.webp',
  ].forEach((file) => expect(existsSync(`public/${file}`), file).toBe(true));
});

test('every_project_image_in_content_exists_in_public', () => {
  projects.forEach((p) => {
    expect(p.image, p.id).toBeDefined();
    expect(existsSync(`public${p.image!.src}`), p.image!.src).toBe(true);
  });
});

test('cv_pdf_has_no_birth_date_or_neighborhood', (ctx) => {
  let text = '';
  try {
    text = execFileSync('pdftotext', ['public/curriculo-bernardo-bombazaro.pdf', '-'], { encoding: 'utf8' });
  } catch {
    ctx.skip();
  }
  expect(text).toContain('Bernardo Silva Bombazaro');
  expect(text).not.toMatch(PRIVATE);
});

const SITE = 'https://bombazaro.github.io/';

test('robots_txt_allows_everything_and_points_to_the_sitemap', () => {
  expect(existsSync('public/robots.txt')).toBe(true);
  const robots = readFileSync('public/robots.txt', 'utf8');
  expect(robots).toMatch(/^User-agent: \*$/m);
  expect(robots).not.toMatch(/^Disallow:\s*\//m);
  expect(robots).toContain(`Sitemap: ${SITE}sitemap.xml`);
});

test('sitemap_xml_lists_the_home_page_with_a_valid_lastmod', () => {
  expect(existsSync('public/sitemap.xml')).toBe(true);
  const sitemap = readFileSync('public/sitemap.xml', 'utf8');
  expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  expect(sitemap).toContain(`<loc>${SITE}</loc>`);
  expect(sitemap).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
  expect(sitemap.match(/<url>/g)).toHaveLength(1);
});

test('sitemap_and_robots_have_no_dashes_or_private_data', () => {
  ['public/robots.txt', 'public/sitemap.xml'].forEach((file) => {
    const text = readFileSync(file, 'utf8');
    expect(text).not.toMatch(DASHES);
    expect(text).not.toMatch(PRIVATE);
  });
});

test('index_declares_it_may_be_indexed', () => {
  expect(html).not.toMatch(/name="robots"[^>]+noindex/i);
});

test('google_search_console_verification_file_is_published_unchanged', () => {
  const file = 'public/google6557abcc9f7d453a.html';
  expect(existsSync(file)).toBe(true);
  expect(readFileSync(file, 'utf8').trim()).toBe('google-site-verification: google6557abcc9f7d453a.html');
});

test('font_stacks_are_short_and_do_not_start_with_fonts_the_site_never_loads', () => {
  const css = readFileSync('src/styles/global.css', 'utf8');
  const stacks = Array.from(css.matchAll(/font-family:\s*([^;]+);/g)).map((m) => m[1].trim());
  expect(stacks.length).toBeGreaterThan(0);
  stacks.forEach((stack) => {
    expect(stack).not.toMatch(/^Inter\b/);
    expect(stack.split(',').length).toBeLessThanOrEqual(3);
  });
});

function reducedMotionCss(): string {
  const css = readFileSync('src/styles/global.css', 'utf8');
  const marker = '@media (prefers-reduced-motion: reduce)';
  let out = '';
  let from = 0;
  for (let at = css.indexOf(marker, from); at !== -1; at = css.indexOf(marker, from)) {
    let depth = 0;
    let end = css.indexOf('{', at);
    for (let i = end; i < css.length; i++) {
      if (css[i] === '{') depth++;
      if (css[i] === '}' && --depth === 0) {
        end = i;
        break;
      }
    }
    out += css.slice(at, end + 1) + '\n';
    from = end + 1;
  }
  return out;
}

test('reduced_motion_turns_off_card_zoom_skip_link_and_header_transitions', () => {
  const reduced = reducedMotionCss();
  expect(reduced).toMatch(/\.pcard:hover \.shot img\s*\{\s*transform:\s*none/);
  expect(reduced).toMatch(/\.skip-link[^{]*\{[^}]*transition:\s*none/);
  expect(reduced).toMatch(/header[^{]*\{[^}]*transition:\s*none/);
});

test('index_has_a_noscript_message_with_contact_links_and_no_visible_phone', () => {
  const match = /<noscript>([\s\S]*?)<\/noscript>/.exec(html);
  expect(match).not.toBeNull();
  const inner = match![1];
  expect(inner).toMatch(/JavaScript/);
  expect(inner).toContain('https://wa.me/5548984555696');
  expect(inner).toContain('https://instagram.com/bombazaro.sites');
  expect(inner.replace(/<[^>]+>/g, '')).not.toMatch(/\d{4,}/);
  expect(inner).not.toMatch(DASHES);
});

test('deploy_workflow_never_cancels_a_running_pages_deploy', () => {
  const workflow = readFileSync('.github/workflows/deploy.yml', 'utf8');
  expect(workflow).toMatch(/cancel-in-progress:\s*false/);
});
