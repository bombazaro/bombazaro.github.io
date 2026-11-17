// Terms that must never appear on the public site or in the CV.
// They are stored encoded so this repository itself never spells them out.
const encoded = ['bmFzY2ltZW50bw==', 'MjAwNQ==', 'SW1hcnVpbQ==', 'MTQvMTI='];

export const PRIVATE = new RegExp(encoded.map((value) => atob(value)).join('|'), 'i');
