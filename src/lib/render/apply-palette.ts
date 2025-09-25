import { findClosestPaletteColor } from '$lib/render/find-closest-palette-color';
import { importPalette } from '$lib/render/import-palette';
import { luma709 } from '$lib/render/luma-709';
import { cmykPalette, pico8, rgbPalette, wplaceFree, wplaceFull } from '$lib/render/palettes';
import type { DitherError, DitherFilter, PaletteFn, PaletteOpts, RgbaColor } from '$lib/types';
import { clampRgb } from '$lib/utils/clamp';

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

	// Utility functions to get and set pixels, inlined to capture `imageData` and `pixels`.
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

	// Get the pixel transformation function for this palette type.
	const paletteFn = getPaletteFn(palette);

	// Get dither filter with offsets and bias.
	const ditherFilter = getDitherFilter(palette);

	// Diffuse the given error to the neighbors of pixel [x,y].
	const diffuseError = ([rE, gE, bE]: DitherError, x: number, y: number) => {
		if (!ditherFilter) return;
		for (const [offX, offY, bias] of ditherFilter) {
			// Get neighbor pixel.
			const x1 = x + offX;
			const y1 = y + offY;
			const [r1, g1, b1, a1] = getPixel(x1, y1);

			// Ignore fully transparent pixels.
			if (a1 === 0) continue;

			// Diffuse error.
			const r2 = clampRgb(r1 + rE * bias);
			const g2 = clampRgb(g1 + gE * bias);
			const b2 = clampRgb(b1 + bE * bias);
			setPixel(x1, y1, [r2, g2, b2, a1]);
		}
	};

	for (let y = 0; y < imageData.height; y++) {
		for (let x = 0; x < imageData.width; x++) {
			// Compute new pixel color.
			const [r1, g1, b1, a1] = getPixel(x, y);
			const [r2, g2, b2, a2] = paletteFn([r1, g1, b1, a1]);

			// Ignore fully transparent pixels.
			// This checks for `a2` and not `a1` to account for the `opaque` palette.
			if (a2 === 0) continue;

			// Pixel didn't change.
			if (r1 === r2 && g1 === g2 && b1 === b2 && a1 === a2) continue;

			// Replace pixel.
			setPixel(x, y, [r2, g2, b2, a2]);

			// Apply dithering if required.
			if (ditherFilter) diffuseError([r1 - r2, g1 - g2, b1 - b2], x, y);
		}
	}

	// Replace original image data with updated data.
	tmpCtx.putImageData(imageData, 0, 0);

	// Copy back temporary canvas with new palette to original canvas.
	canvas.getContext('2d')!.drawImage(tmpCanvas, 0, 0);
	return canvas;
}

function getDitherFilter(palette: PaletteOpts): DitherFilter | undefined {
	// Don't apply dither to these palettes.
	if (['original', 'opaque', 'invert', 'grayscale'].includes(palette.type)) return undefined;

	// Return a dither filter as a list of `[xOffset, yOffset, bias]` tuples.
	switch (palette.dither.type) {
		case 'none':
			return undefined;
		case 'atkinson':
			return [
				[1, 0, 1 / 8],
				[2, 0, 1 / 8],
				[-1, 1, 1 / 8],
				[0, 1, 1 / 8],
				[1, 1, 1 / 8],
				[0, 2, 1 / 8]
			];
		case 'floyd':
			return [
				[1, 0, 7 / 16],
				[-1, 1, 3 / 16],
				[0, 1, 5 / 16],
				[1, 1, 1 / 16]
			];
	}
}

function getPaletteFn(palette: PaletteOpts): PaletteFn {
	const cache = new Map<number, number>();
	switch (palette.type) {
		case 'original':
			return (c) => c;
		case 'opaque':
			return ([r, g, b]) => [r, g, b, 255];
		case 'invert':
			return ([r, g, b, a]) => {
				if (a === 0) return [r, g, b, a];
				return [255 - r, 255 - g, 255 - b, a];
			};
		case 'binary': {
			const threshold = palette.binary.threshold;
			return ([r, g, b, a]) => {
				if (a === 0) return [r, g, b, a];
				const value = luma709([r, g, b]) < threshold ? 0 : 255;
				return [value, value, value, a];
			};
		}
		case 'grayscale':
			return ([r, g, b, a]) => {
				if (a === 0) return [r, g, b, a];
				const value = luma709([r, g, b]);
				return [value, value, value, a];
			};
		case 'rgb':
			return ([r, g, b, a]) => {
				if (a === 0) return [r, g, b, a];
				const color = findClosestPaletteColor([r, g, b], rgbPalette, cache);
				return [...color, a];
			};
		case 'cmyk':
			return ([r, g, b, a]) => {
				if (a === 0) return [r, g, b, a];
				const color = findClosestPaletteColor([r, g, b], cmykPalette, cache);
				return [...color, a];
			};
		case 'pico-8':
			return ([r, g, b, a]) => {
				if (a === 0) return [r, g, b, a];
				const color = findClosestPaletteColor([r, g, b], pico8, cache);
				return [...color, a];
			};
		case 'wplace-free':
			return ([r, g, b, a]) => {
				if (a === 0) return [r, g, b, a];
				const color = findClosestPaletteColor([r, g, b], wplaceFree, cache);
				return [...color, a];
			};
		case 'wplace-full':
			return ([r, g, b, a]) => {
				if (a === 0) return [r, g, b, a];
				const color = findClosestPaletteColor([r, g, b], wplaceFull, cache);
				return [...color, a];
			};
		case 'custom': {
			const customPalette = importPalette(palette.custom.palette);
			return ([r, g, b, a]) => {
				if (a === 0) return [r, g, b, a];
				const color = findClosestPaletteColor([r, g, b], customPalette, cache);
				return [...color, a];
			};
		}
	}
}
