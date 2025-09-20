import type { RgbColor } from '$lib/types';

export function rgbColorId([r, g, b]: RgbColor): number {
	// Unique ID for RGB colors.
	// RRR 000 000 +
	//     GGG 000 +
	//         BBB =
	// RRR GGG BBB
	return r * 1_000_000 + g * 1_000 + b;
}
