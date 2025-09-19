import type { RgbColor } from '$lib/types';

export function luma709({ r, g, b }: RgbColor): number {
	// Compute luminance for a pixel with the Rec.709 standard:
	// luma709 = Math.round(0.2126 * red + 0.7152 * green + 0.0722 * blue)
	// See https://en.wikipedia.org/wiki/Luma_(video)
	// and https://www.dynamsoft.com/codepool/convert-image-to-black-white-with-javascript.html.
	return (6966 * r + 23436 * g + 2366 * b) >> 15;
}
