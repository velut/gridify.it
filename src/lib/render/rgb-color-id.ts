import type { RgbColor } from '$lib/types';

export function rgbColorId([r, g, b]: RgbColor): number {
	// Get unique ID for RGB colors by packing 8 bit components into a single integer.
	return (r << 16) | (g << 8) | b;
}
