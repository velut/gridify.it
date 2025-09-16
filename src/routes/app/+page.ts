import type { PageLoad } from './$types';

// Disable `ssr` for `Worker` and `ImageBitmap` to be used at modules top-level.
export const ssr = false;

export const load: PageLoad = () => ({
	title: 'Grid editor',
	description:
		'Add a customizable grid to your images, photos, reference pictures, or pixel art designs. Use various grid types and line colors, resize images, and round the corners of grid cells.'
});
