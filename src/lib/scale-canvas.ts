export const scaleCanvas = (canvas: HTMLCanvasElement, scale: number) => {
	const scaledCanvas = document.createElement('canvas');
	const scaledContext = scaledCanvas.getContext('2d')!;

	// Apply scale to new canvas.
	scaledCanvas.width = scale * canvas.width;
	scaledCanvas.height = scale * canvas.height;

	// Use pixelated (not smoothed) scaling mode and apply scaling factor.
	scaledContext.imageSmoothingEnabled = false;
	scaledContext.scale(scale, scale);

	// Draw image on scaled canvas.
	scaledContext.drawImage(canvas, 0, 0);

	return scaledCanvas;
};
