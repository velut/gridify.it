import { fileToImage } from '$lib/file-to-image';
import { asyncDerived, writable } from '@square/svelte-store';

export const files = writable<File[]>([]);

export const { store: inputImages, state: inputImagesState } = asyncDerived(
	files,
	async ($files) => $files.map(fileToImage),
	{ trackState: true }
);
