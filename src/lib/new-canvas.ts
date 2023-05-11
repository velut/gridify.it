import type { Image } from '$lib/image';

export const newCanvas = async (image: Image) => {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d')!;

	// Load image. TODO: Use createImageBitmap().
	const img = document.createElement('img');
	img.src = image.url;
	await img.decode();

	// Draw image on canvas.
	canvas.width = img.width;
	canvas.height = img.height;
	context.imageSmoothingEnabled = false;
	context.drawImage(img, 0, 0);

	return canvas;
};
