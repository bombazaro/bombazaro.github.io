import { whatsappUrl } from './links';

describe('whatsappUrl', () => {
  test('whatsappUrl_formats_brazilian_numbers', () => {
    expect(whatsappUrl('48984555696')).toBe('https://wa.me/5548984555696');
    expect(whatsappUrl('(48) 98455-5696')).toBe('https://wa.me/5548984555696');
  });

  test('whatsappUrl_keeps_existing_country_code', () => {
    expect(whatsappUrl('5548984555696')).toBe('https://wa.me/5548984555696');
  });

  test('whatsappUrl_adds_an_encoded_message_when_given', () => {
    expect(whatsappUrl('48984555696', 'Olá! Quero um site.')).toBe(
      'https://wa.me/5548984555696?text=Ol%C3%A1!%20Quero%20um%20site.',
    );
  });

  test('whatsappUrl_adds_country_code_for_ddd_55', () => {
    expect(whatsappUrl('55999998888')).toBe('https://wa.me/5555999998888');
  });
});
