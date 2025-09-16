import { customAlphabet } from 'nanoid';

// See https://github.com/CyberAP/nanoid-dictionary#nolookalikessafe.
const alphabet = '6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz';
export const nanoid = customAlphabet(alphabet, 16);
