import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { projects } from './data/content';
import { DASHES } from './test/dashes';

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
    'projetos/fluxus-contas.webp',
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
  expect(text).not.toMatch(/nascimento|ANO|BAIRRO|14\/12/i);
});
