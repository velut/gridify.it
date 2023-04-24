export const setCanvasFullAlpha = (canvas: HTMLCanvasElement) => {
	const context = canvas.getContext('2d')!;

	// NOTE: Browsers don't return the exact original pixel colors.
	// See https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-getimagedata.
	const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	const pixels = imageData.data;

	// Set each pixel to full alpha.
	// See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas.
	for (let i = 0; i < pixels.length; i += 4) {
		pixels[i + 3] = 255;
	}

	// Replace original data with updated data.
	context.putImageData(imageData, 0, 0);

	return canvas;
};
