// Matches the long dash characters the site must never contain (written as char codes on purpose).
export const DASHES = new RegExp(`[${String.fromCharCode(0x2013, 0x2014)}]`);
