import type { SizeOpts } from '$lib/types';

export function applySize(canvas: OffscreenCanvas, size: SizeOpts): OffscreenCanvas {
	// Nothing to do.
	if (size.type === 'original') return canvas;
	if (
		(size.type === 'scale-linked' || size.type === 'scale-independent') &&
		size.scale.x === 1 &&
		size.scale.y === 1
	) {
		return canvas;
	}
	if (size.type === 'dimensions-width' && size.dimensions.width === canvas.width) {
		return canvas;
	}
	if (size.type === 'dimensions-height' && size.dimensions.height === canvas.height) {
		return canvas;
	}
	if (
		size.type === 'dimensions-both' &&
		size.dimensions.width === canvas.width &&
		size.dimensions.height === canvas.height
	) {
		return canvas;
	}

	const sizeType = size.type;
	const getCanvasDimensionsAndScale = (): [number, number, number, number] => {
		switch (sizeType) {
			case 'scale-linked':
			case 'scale-independent': {
				// Scale the original dimensions to the closest integer dimensions
				// making sure to create a canvas of at least 1x1 pixels.
				const width = Math.max(1, Math.round(Math.abs(size.scale.x) * canvas.width));
				const height = Math.max(1, Math.round(Math.abs(size.scale.y) * canvas.height));

				// Find the real scale values for the new dimensions.
				// For example: if scale is 0.33 and the original width is 64 pixels,
				// then (0.33 * 64) = 21.12, thus the scaled width will be rounded to 21 pixels
				// and the real scaleX value will be (21 / 64) = 0.328125.
				// Keep the sign in case the scale is negative to flip the canvas.
				const scaleX = (width / canvas.width) * Math.sign(size.scale.x);
				const scaleY = (height / canvas.height) * Math.sign(size.scale.y);
				return [width, height, scaleX, scaleY];
			}
			case 'dimensions-width': {
				const width = Math.max(1, Math.round(size.dimensions.width));
				const height = Math.max(1, Math.round(width * (canvas.height / canvas.width)));
				const scaleX = width / canvas.width;
				const scaleY = height / canvas.height;
				return [width, height, scaleX, scaleY];
			}
			case 'dimensions-height': {
				const height = Math.max(1, Math.round(size.dimensions.height));
				const width = Math.max(1, Math.round(height * (canvas.width / canvas.height)));
				const scaleX = width / canvas.width;
				const scaleY = height / canvas.height;
				return [width, height, scaleX, scaleY];
			}
			case 'dimensions-both': {
				const width = Math.max(1, Math.round(size.dimensions.width));
				const height = Math.max(1, Math.round(size.dimensions.height));
				const scaleX = width / canvas.width;
				const scaleY = height / canvas.height;
				return [width, height, scaleX, scaleY];
			}
		}
	};

	// Create scaled canvas.
	const [width, height, scaleX, scaleY] = getCanvasDimensionsAndScale();
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
