import type { ScaleOpts } from '$lib/types';

export function applyScale(canvas: OffscreenCanvas, scale: ScaleOpts): OffscreenCanvas {
	// Nothing to do.
	if (scale.x === 1 && scale.y === 1) return canvas;

	// Scale the original image dimensions to find the closest scaled integer dimensions
	// making sure to create a canvas of at least 1x1 pixels.
	const width = Math.max(1, Math.round(Math.abs(scale.x) * canvas.width));
	const height = Math.max(1, Math.round(Math.abs(scale.y) * canvas.height));

	// Find the real scale values for the new dimensions.
	// For example: if scale is 0.33 and the original width is 64 pixels,
	// then (0.33 * 64) = 21.12, thus the scaled width will be rounded to 21 pixels
	// and the real scaleX value will be (21 / 64) = 0.328125.
	const scaleX = (width / canvas.width) * Math.sign(scale.x);
	const scaleY = (height / canvas.height) * Math.sign(scale.y);

	// Create scaled canvas.
	const scaledCanvas = new OffscreenCanvas(width, height);
	const ctx = scaledCanvas.getContext('2d')!;
	ctx.imageSmoothingEnabled = false;
	ctx.scale(scaleX, scaleY);

	// Move the canvas origin accounting for negative scales.
	// The origin needs to be placed on one of the corners of the canvas
	// for the image to painted inside the canvas later by `drawImage()`.
	// Since the canvas coordinates are now scaled, the translations will be too,
	// thus the need to normalize by (1/scale) to nullify the scaling effect.
	if (scaleX < 0) ctx.translate((1 / scaleX) * width, 0);
	if (scaleY < 0) ctx.translate(0, (1 / scaleY) * height);

	ctx.drawImage(canvas, 0, 0);
	return scaledCanvas;
}
