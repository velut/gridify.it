import type { RgbColor } from '$lib/types';
import hexRgb from 'hex-rgb';

export function importPalette(palette: string): RgbColor[] {
	return palette
		.trim()
		.split('\n')
		.map((line) => {
			const [r, g, b] = hexRgb(line.trim(), { format: 'array' });
			return [r, g, b];
		});
}
