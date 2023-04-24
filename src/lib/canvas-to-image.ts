import { canvasToBlob } from '$lib/canvas-to-blob';
import { fileToImage } from '$lib/file-to-image';
import type { Image } from '$lib/image';
import { parse } from 'pathe';

export const canvasToImage = async (canvas: HTMLCanvasElement, inputImage: Image) => {
	const blob = await canvasToBlob(canvas);
	const fileName = parse(inputImage.file.name).name;
	const file = new File([blob], `${fileName}.png`, {
		type: 'image/png',
		lastModified: inputImage.file.lastModified
	});
	return fileToImage(file);
};
