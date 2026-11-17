import { PRIVATE } from './private';

test('private_filter_catches_each_forbidden_term', () => {
  const samples = [['nasc', 'imento'], ['20', '05'], ['Ima', 'ruim'], ['14', '/', '12']].map((parts) => `texto ${parts.join('')} fim`);
  samples.forEach((sample) => expect(sample).toMatch(PRIVATE));
});

test('private_filter_lets_normal_text_through', () => {
  expect('Palhoça/SC, 2026, São José').not.toMatch(PRIVATE);
});
