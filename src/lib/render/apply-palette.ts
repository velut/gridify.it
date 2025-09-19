import type { PaletteOpts, RgbColor } from '$lib/types';
import { luma709 } from '$lib/render/luma-709';
import { findClosestPaletteColor } from '$lib/render/find-closest-palette-color';
import { cmykPalette, pico8, rgbPalette, wplaceFree, wplaceFull } from '$lib/render/palettes';

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

	// Apply wanted palette.
	switch (palette.type) {
		case 'opaque':
			applyOpaquePalette(pixels);
			break;
		case 'invert':
			applyInvertPalette(pixels);
			break;
		case 'binary':
			applyBinaryPalette(pixels, palette);
			break;
		case 'grayscale':
			applyGrayscalePalette(pixels);
			break;
		case 'rgb':
			applyRgbPalette(pixels);
			break;
		case 'cmyk':
			applyCmykPalette(pixels);
			break;
		case 'pico-8':
			applyPico8Palette(pixels);
			break;
		case 'wplace-free':
			applyWplaceFreePalette(pixels);
			break;
		case 'wplace-full':
			applyWplaceFullPalette(pixels);
			break;
	}

	// Replace original image data with updated data.
	tmpCtx.putImageData(imageData, 0, 0);

	// Copy back temporary canvas with new palette to original canvas.
	canvas.getContext('2d')!.drawImage(tmpCanvas, 0, 0);
	return canvas;
}

function applyOpaquePalette(pixels: ImageDataArray) {
	// Set each pixel to full alpha.
	// See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas.
	for (let i = 0; i < pixels.length; i += 4) {
		pixels[i + 3] = 255;
	}
}

function applyInvertPalette(pixels: ImageDataArray) {
	for (let i = 0; i < pixels.length; i += 4) {
		pixels[i] = 255 - pixels[i];
		pixels[i + 1] = 255 - pixels[i + 1];
		pixels[i + 2] = 255 - pixels[i + 2];
		pixels[i + 3] = 255;
	}
}

function applyBinaryPalette(pixels: ImageDataArray, palette: PaletteOpts) {
	const threshold = palette.binary.threshold;
	for (let i = 0; i < pixels.length; i += 4) {
		const r = pixels[i];
		const g = pixels[i + 1];
		const b = pixels[i + 2];
		const value = luma709({ r, g, b }) < threshold ? 0 : 255;
		pixels[i] = value;
		pixels[i + 1] = value;
		pixels[i + 2] = value;
		pixels[i + 3] = 255;
	}
}

function applyGrayscalePalette(pixels: ImageDataArray) {
	for (let i = 0; i < pixels.length; i += 4) {
		const r = pixels[i];
		const g = pixels[i + 1];
		const b = pixels[i + 2];
		const value = luma709({ r, g, b });
		pixels[i] = value;
		pixels[i + 1] = value;
		pixels[i + 2] = value;
		pixels[i + 3] = 255;
	}
}

function applyRgbPalette(pixels: ImageDataArray) {
	const cache = new Map<number, RgbColor>();
	for (let i = 0; i < pixels.length; i += 4) {
		const r = pixels[i];
		const g = pixels[i + 1];
		const b = pixels[i + 2];
		const color = findClosestPaletteColor({ r, g, b }, rgbPalette, cache);
		pixels[i] = color.r;
		pixels[i + 1] = color.g;
		pixels[i + 2] = color.b;
		pixels[i + 3] = 255;
	}
}

function applyCmykPalette(pixels: ImageDataArray) {
	const cache = new Map<number, RgbColor>();
	for (let i = 0; i < pixels.length; i += 4) {
		const r = pixels[i];
		const g = pixels[i + 1];
		const b = pixels[i + 2];
		const color = findClosestPaletteColor({ r, g, b }, cmykPalette, cache);
		pixels[i] = color.r;
		pixels[i + 1] = color.g;
		pixels[i + 2] = color.b;
		pixels[i + 3] = 255;
	}
}

function applyPico8Palette(pixels: ImageDataArray) {
	const cache = new Map<number, RgbColor>();
	for (let i = 0; i < pixels.length; i += 4) {
		const r = pixels[i];
		const g = pixels[i + 1];
		const b = pixels[i + 2];
		const color = findClosestPaletteColor({ r, g, b }, pico8, cache);
		pixels[i] = color.r;
		pixels[i + 1] = color.g;
		pixels[i + 2] = color.b;
		pixels[i + 3] = 255;
	}
}

function applyWplaceFreePalette(pixels: ImageDataArray) {
	const cache = new Map<number, RgbColor>();
	for (let i = 0; i < pixels.length; i += 4) {
		const r = pixels[i];
		const g = pixels[i + 1];
		const b = pixels[i + 2];
		const color = findClosestPaletteColor({ r, g, b }, wplaceFree, cache);
		pixels[i] = color.r;
		pixels[i + 1] = color.g;
		pixels[i + 2] = color.b;
		pixels[i + 3] = 255;
	}
}

function applyWplaceFullPalette(pixels: ImageDataArray) {
	const cache = new Map<number, RgbColor>();
	for (let i = 0; i < pixels.length; i += 4) {
		const r = pixels[i];
		const g = pixels[i + 1];
		const b = pixels[i + 2];
		const color = findClosestPaletteColor({ r, g, b }, wplaceFull, cache);
		pixels[i] = color.r;
		pixels[i + 1] = color.g;
		pixels[i + 2] = color.b;
		pixels[i + 3] = 255;
	}
}
