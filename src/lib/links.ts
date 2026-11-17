export function whatsappUrl(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  const withCountry = digits.length >= 12 && digits.startsWith('55') ? digits : `55${digits}`;
  return `https://wa.me/${withCountry}`;
}
