import type { RgbColor } from '$lib/types';
import { rgbColorId } from '$lib/render/rgb-color-id';

export function findClosestPaletteColor(
	color: RgbColor,
	palette: RgbColor[],
	cache: Map<number, RgbColor>
): RgbColor {
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

function colorsDistance(color1: RgbColor, color2: RgbColor): number {
	// See https://www.compuphase.com/cmetric.htm
	// and https://en.wikipedia.org/wiki/Color_difference.
	const redMean = (color1.r + color2.r) / 2;
	const dR = color1.r - color2.r;
	const dG = color1.g - color2.g;
	const dB = color1.b - color2.b;
	return Math.sqrt(
		(((512 + redMean) * Math.pow(dR, 2)) >> 8) +
			4 * Math.pow(dG, 2) +
			(((767 - redMean) * Math.pow(dB, 2)) >> 8)
	);
}
