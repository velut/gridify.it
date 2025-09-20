import type { PaletteFn, PaletteOpts, RgbaColor, RgbColor } from '$lib/types';
import { luma709 } from '$lib/render/luma-709';
import { findClosestPaletteColor } from '$lib/render/find-closest-palette-color';
import { cmykPalette, pico8, rgbPalette, wplaceFree, wplaceFull } from '$lib/render/palettes';
import { clampRgb } from '$lib/utils/clamp';
import type { number } from 'zod';

export function applyPalette(canvas: OffscreenCanvas, palette: PaletteOpts): OffscreenCanvas {
	// Nothing to do.
	if (palette.type === 'original') return canvas;

	// Copy canvas to a temporary canvas to prevent slower software rendering caused by `getImageData`.
	const tmpCanvas = new OffscreenCanvas(canvas.width, canvas.height);
	const tmpCtx = tmpCanvas.getContext('2d')!;
	tmpCtx.drawImage(canvas, 0, 0);

	// NOTE: Browsers don't return the exact original pixel colors.
	// See https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-getimagedata.
	const imageData = tmpCtx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height, {
		colorSpace: 'srgb'
	});
	const pixels = imageData.data;

	const pixelIndex = (x: number, y: number): number => {
		// See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas#the_imagedata_object.
		return y * (imageData.width * 4) + x * 4;
	};

	const getPixel = (x: number, y: number): RgbaColor => {
		const i = pixelIndex(x, y);
		const r = pixels[i];
		const g = pixels[i + 1];
		const b = pixels[i + 2];
		const a = pixels[i + 3];
		return [r, g, b, a];
	};

	const setPixel = (x: number, y: number, [r, g, b, a]: RgbaColor) => {
		const i = pixelIndex(x, y);
		pixels[i] = r;
		pixels[i + 1] = g;
		pixels[i + 2] = b;
		pixels[i + 3] = a;
	};

	const diffuseError = (
		[errR, errG, errB]: [number, number, number],
		x: number,
		y: number,
		bias: number
	) => {
		const [r1, g1, b1] = getPixel(x, y);
		const r2 = clampRgb(r1 + Math.round(errR * bias));
		const g2 = clampRgb(g1 + Math.round(errG * bias));
		const b2 = clampRgb(b1 + Math.round(errB * bias));
		setPixel(x, y, [r2, g2, b2, 255]);
	};

	// Get the pixel transformation function for this palette type.
	const paletteFn = getPaletteFn(palette);

	for (let y = 0; y < imageData.height; y++) {
		for (let x = 0; x < imageData.width; x++) {
			// Change palette pixel by pixel.
			const [r1, g1, b1, a1] = getPixel(x, y);
			const [r2, g2, b2, a2] = paletteFn([r1, g1, b1, a1]);
			setPixel(x, y, [r2, g2, b2, a2]);

			// Apply dithering.
			const err: [number, number, number] = [r1 - r2, g1 - g2, b1 - b2];

			// diffuseError(err, x + 1, y, 7 / 16);
			// diffuseError(err, x - 1, y + 1, 3 / 16);
			// diffuseError(err, x, y + 1, 5 / 16);
			// diffuseError(err, x + 1, y + 1, 1 / 16);

			diffuseError(err, x + 1, y, 1 / 8);
			diffuseError(err, x + 2, y, 1 / 8);
			diffuseError(err, x - 1, y + 1, 1 / 8);
			diffuseError(err, x, y + 1, 1 / 8);
			diffuseError(err, x + 1, y + 1, 1 / 8);
			diffuseError(err, x, y + 2, 1 / 8);
		}
	}

	// Replace original image data with updated data.
	tmpCtx.putImageData(imageData, 0, 0);

	// Copy back temporary canvas with new palette to original canvas.
	canvas.getContext('2d')!.drawImage(tmpCanvas, 0, 0);
	return canvas;
}

function getPaletteFn(palette: PaletteOpts): PaletteFn {
	const cache = new Map<number, RgbColor>();
	switch (palette.type) {
		case 'original':
			return (c) => c;
		case 'opaque':
			return ([r, g, b]) => [r, g, b, 255];
		case 'invert':
			return ([r, g, b]) => [255 - r, 255 - g, 255 - b, 255];
		case 'binary': {
			const threshold = palette.binary.threshold;
			return ([r, g, b]) => {
				const value = luma709([r, g, b]) < threshold ? 0 : 255;
				return [value, value, value, 255];
			};
		}
		case 'grayscale':
			return ([r, g, b]) => {
				const value = luma709([r, g, b]);
				return [value, value, value, 255];
			};
		case 'rgb':
			return ([r, g, b]) => {
				const color = findClosestPaletteColor([r, g, b], rgbPalette, cache);
				return [...color, 255];
			};
		case 'cmyk':
			return ([r, g, b]) => {
				const color = findClosestPaletteColor([r, g, b], cmykPalette, cache);
				return [...color, 255];
			};
		case 'pico-8':
			return ([r, g, b]) => {
				const color = findClosestPaletteColor([r, g, b], pico8, cache);
				return [...color, 255];
			};
		case 'wplace-free':
			return ([r, g, b]) => {
				const color = findClosestPaletteColor([r, g, b], wplaceFree, cache);
				return [...color, 255];
			};
		case 'wplace-full':
			return ([r, g, b]) => {
				const color = findClosestPaletteColor([r, g, b], wplaceFull, cache);
				return [...color, 255];
			};
	}
}
