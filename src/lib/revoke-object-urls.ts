import type { Image } from '$lib/types';

export function revokeObjectUrls(images: Image[]) {
	const urls = images.map(({ url }) => url);

	setTimeout(() => {
		for (const url of urls) {
			URL.revokeObjectURL(url);
		}
	}, 10 * 1000);
}
