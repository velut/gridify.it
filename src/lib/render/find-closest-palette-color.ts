import type { RgbColor } from '$lib/types';
import { rgbColorId } from '$lib/render/rgb-color-id';

export function findClosestPaletteColor(
	color: RgbColor,
	palette: RgbColor[],
	cache: Map<number, RgbColor>
): RgbColor {
	// No palette colors, return original color.
	if (!palette.length) return color;

	// With only one color, it must be the closest one.
	if (palette.length === 1) return palette[0];

	// Get closest color from cache.
	const id = rgbColorId(color);
	if (cache.has(id)) return cache.get(id)!;

	// Compute distances and find closest palette color.
	let closestColor = palette[0];
	let minDistance = Infinity;
	for (const paletteColor of palette) {
		const distance = colorsDistance(color, paletteColor);
		if (distance < minDistance) {
			minDistance = distance;
			closestColor = paletteColor;
		}
	}
	cache.set(id, closestColor);
	return closestColor;
}

function colorsDistance([r1, g1, b1]: RgbColor, [r2, g2, b2]: RgbColor): number {
	// See https://www.compuphase.com/cmetric.htm
	// and https://en.wikipedia.org/wiki/Color_difference.
	const redMean = (r1 + r2) / 2;
	const dR = r1 - r2;
	const dG = g1 - g2;
	const dB = b1 - b2;
	return Math.sqrt(
		(((512 + redMean) * Math.pow(dR, 2)) >> 8) +
			4 * Math.pow(dG, 2) +
			(((767 - redMean) * Math.pow(dB, 2)) >> 8)
	);
}
