import type { Image } from '$lib/image';

export const fileToImage = (file: File): Image => {
	const url = URL.createObjectURL(file);
	return { file, url };
};
