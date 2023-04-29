import { fileToImage } from '$lib/file-to-image';
import { renderImages } from '$lib/render-images';
import type { RenderOptions } from '$lib/render-options';
import { revokeObjectUrls } from '$lib/revoke-object-urls';
import { urlOf } from '$lib/url-of';
import { asyncDerived, get, writable } from '@square/svelte-store';

export const files = writable<File[]>([]);

const _inputImagesUrls = writable<string[]>([]);
const _inputImages = asyncDerived(
	files,
	async ($files) => {
		const images = $files.map(fileToImage);
		revokeObjectUrls(get(_inputImagesUrls));
		_inputImagesUrls.set(images.map(urlOf));
		return images;
	},
	{ trackState: true }
);

export const inputImages = _inputImages.store;
export const inputImagesState = _inputImages.state!;

// Use `null` instead of `undefined` so that the `_outputImages` store can resolve on initialization.
export const renderOptions = writable<RenderOptions | null>(null);

const _outputImagesUrls = writable<string[]>([]);
const _outputImages = asyncDerived(
	[inputImages, renderOptions],
	async ([$inputImages, $renderOptions]) => {
		const images = await renderImages($inputImages, $renderOptions ?? undefined);
		revokeObjectUrls(get(_outputImagesUrls));
		_outputImagesUrls.set(images.map(urlOf));
		return images;
	},
	{ trackState: true }
);

export const outputImages = _outputImages.store;
export const outputImagesState = _outputImages.state!;
