import { fileToImage } from '$lib/file-to-image';
import type { RenderOptions } from '$lib/render-options';
import { asyncDerived, writable, type LoadState, type Readable } from '@square/svelte-store';

export const files = writable<File[]>([]);

const _inputImages = asyncDerived(files, async ($files) => $files.map(fileToImage), {
	trackState: true
});

export const inputImages = _inputImages.store;
export const inputImagesState = _inputImages.state as Readable<LoadState>;

// Use `null` instead of `undefined` so that the `_outputImages` store can resolve on initialization.
export const renderOptions = writable<RenderOptions | null>(null);

const _outputImages = asyncDerived(
	[inputImages, renderOptions],
	async ([$inputImages, $renderOptions]) => {
		if (!$renderOptions) {
			return $inputImages;
		}
		return [];
	},
	{ trackState: true }
);

export const outputImages = _outputImages.store;
export const outputImagesState = _outputImages.state as Readable<LoadState>;
