import { asyncDerived, writable } from '@square/svelte-store';

export const files = writable<File[]>([]);

export const { store: inputImages, state: inputImagesState } = asyncDerived(
	files,
	async ($files) => {
		return $files.map((file) => file.name);
	},
	{ trackState: true }
);
