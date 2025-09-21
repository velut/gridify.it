import { RgbColor } from '$lib/types';
import hexRgb from 'hex-rgb';

export function importPalette(palette: string): RgbColor[] {
	return palette
		.trim()
		.split('\n')
		.map((line) => {
			try {
				const [r, g, b] = hexRgb(line.trim(), { format: 'array' });
				return [r, g, b];
			} catch {
				// Return a magenta color, #f00baa, when the line is not a correct color
				// so errors can be spotted easily.
				return [240, 11, 170];
			}
		});
}
