import { asset, joinBase } from './asset';

test('joinBase_keeps_root_paths_when_the_base_is_the_root', () => {
  expect(joinBase('/', '/projetos/a.webp')).toBe('/projetos/a.webp');
});

test('joinBase_prefixes_a_sub_path_base_with_exactly_one_slash', () => {
  expect(joinBase('/portfolio/', '/a.webp')).toBe('/portfolio/a.webp');
  expect(joinBase('/portfolio', 'a.webp')).toBe('/portfolio/a.webp');
});

test('asset_uses_the_vite_base_url', () => {
  expect(asset('/favicon.svg')).toBe(joinBase(import.meta.env.BASE_URL, '/favicon.svg'));
});
