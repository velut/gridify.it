export const newCanvas = async (imageUrl: string) => {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d')!;

	// Load image.
	const img = document.createElement('img');
	img.src = imageUrl;
	await img.decode();

	// Draw image on canvas.
	canvas.width = img.width;
	canvas.height = img.height;
	context.imageSmoothingEnabled = false;
	context.drawImage(img, 0, 0);

	return canvas;
};
