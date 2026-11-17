// Matches the long dash characters the site must never contain (written as char codes on purpose).
export const DASHES = new RegExp(`[${String.fromCharCode(0x2013, 0x2014)}]`);
// Matches arrow characters (U+2190 to U+21FF), which the site must not show.
export const ARROWS = new RegExp(`[${String.fromCharCode(0x2190)}-${String.fromCharCode(0x21ff)}]`);
