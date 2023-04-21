import { fileToImage } from '$lib/file-to-image';
import { asyncDerived, writable, type LoadState, type Readable } from '@square/svelte-store';

export const files = writable<File[]>([]);

const _inputImages = asyncDerived(files, async ($files) => $files.map(fileToImage), {
	trackState: true
});

export const inputImages = _inputImages.store;
export const inputImagesState = _inputImages.state as Readable<LoadState>;
