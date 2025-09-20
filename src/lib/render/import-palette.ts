import type { RgbColor } from '$lib/types';
import hexRgb from 'hex-rgb';

export function importPalette(palette: string): RgbColor[] {
	return palette
		.trim()
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line.length === 6)
		.map((hex) => {
			const { red, green, blue } = hexRgb(hex);
			return [red, green, blue];
		});
}
