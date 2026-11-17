import { contactLabels, heroChips, links, marqueeItems, projects, site, techGroups, timeline } from './content';
import { ARROWS, DASHES } from '../test/dashes';

const everything = { site, links, contactLabels, projects, timeline, techGroups, marqueeItems, heroChips };

test('projects_are_in_order_padaria_fluxus_livrum', () => {
  expect(projects.map((p) => p.id)).toEqual(['padaria', 'fluxus', 'livrum']);
});

test('padaria_is_featured', () => {
  expect(projects[0].featured).toBe(true);
  expect(projects[1].featured).toBeFalsy();
});

test('fluxus_has_web_apk_and_code_actions', () => {
  const fluxus = projects.find((p) => p.id === 'fluxus')!;
  expect(fluxus.actions.map((a) => a.href)).toEqual([
    'https://fluxus-financas.netlify.app',
    'https://github.com/bombazaro/fluxus/releases/latest',
    'https://github.com/bombazaro/fluxus',
  ]);
});

test('padaria_and_livrum_actions_match_spec', () => {
  const hrefs = (id: string) => projects.find((p) => p.id === id)!.actions.map((a) => a.href);
  expect(hrefs('padaria')).toEqual([
    'https://padariabombazaros.netlify.app',
    'https://github.com/bombazaro/padaria-bombazaros',
  ]);
  expect(hrefs('livrum')).toEqual(['https://livrum-ifsc1.vercel.app', 'https://github.com/anthyer/livrum']);
});

test('livrum_note_mentions_python_and_83_commits', () => {
  const livrum = projects.find((p) => p.id === 'livrum')!;
  expect(livrum.badge).toBe('em equipe');
  expect(livrum.note).toMatch(/React e Java/);
  expect(livrum.note).toMatch(/Python/);
  expect(livrum.note).toMatch(/83 commits/);
});

test('contact_links_match_spec', () => {
  expect(links.whatsapp).toBe('https://wa.me/5548984555696');
  expect(links.instagram).toBe('https://instagram.com/bombazaro.sites');
  expect(links.email).toBe('mailto:bombazarobernardo@gmail.com');
  expect(links.linkedin).toBe('https://www.linkedin.com/in/bernardo-silva-bombazaro-855b65276');
  expect(links.github).toBe('https://github.com/bombazaro');
  expect(links.cv).toBe('/curriculo-bernardo-bombazaro.pdf');
});

test('no_em_or_en_dashes_anywhere', () => {
  expect(JSON.stringify(everything)).not.toMatch(DASHES);
});

test('no_private_data', () => {
  expect(JSON.stringify(everything)).not.toMatch(/ANO|BAIRRO|nascimento/i);
});

test('role_is_full_stack_not_front_end', () => {
  expect(site.role).toContain('Full Stack');
  expect(JSON.stringify(everything)).not.toMatch(/front-end/i);
});

test('timeline_has_three_entries_in_order_and_skips_apae', () => {
  expect(timeline.map((t) => t.title)).toEqual([
    'Instrutor de Informática',
    'Jovem Aprendiz em Eletrônica e Comunicação de Dados',
    'Técnico em Análise e Desenvolvimento de Sistemas',
  ]);
  expect(JSON.stringify(timeline)).not.toMatch(/APAE/);
});

test('tech_groups_are_the_four_expected', () => {
  expect(techGroups.map((g) => g.title)).toEqual(['Programação', 'Banco de dados', 'Ferramentas', 'Pessoal']);
});

test('no_arrow_characters_in_any_label_or_text', () => {
  expect(JSON.stringify(everything)).not.toMatch(ARROWS);
});

test('contact_labels_are_plain_names_without_number_or_handle', () => {
  expect(contactLabels).toEqual({ whatsapp: 'WhatsApp', instagram: 'Instagram' });
});

test('hosting_is_listed_fluxus_netlify_livrum_vercel_and_supabase', () => {
  const stack = (id: string) => projects.find((p) => p.id === id)!.stack;
  expect(stack('fluxus')).toContain('Netlify');
  expect(stack('livrum')).toEqual(expect.arrayContaining(['Vercel', 'Supabase']));
});
