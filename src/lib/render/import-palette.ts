import { RgbColor } from '$lib/types';
import hexRgb from 'hex-rgb';

export function importPalette(palette: string): RgbColor[] {
	const lines = palette
		.trim()
		.split('\n')
		.map((line) => line.trim().toLowerCase());
	const uniqueLines = [...new Set(lines)];

	let colors: RgbColor[] = [];
	for (const line of uniqueLines) {
		try {
			const [r, g, b] = hexRgb(line, { format: 'array' });
			colors.push([r, g, b]);
		} catch {
			// `hexRgb` throws when it cannot parse a color.
			// Return an "error" palette with a single magenta color (#f00baa)
			// to signal that the imported palette contains incorrect colors.
			return [[240, 11, 170]];
		}
	}
	return colors;
}
