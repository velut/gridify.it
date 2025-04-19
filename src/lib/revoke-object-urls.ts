import type { Image } from '$lib/types';

export function revokeObjectUrls(images: Image[]) {
	if (images.length === 0) return;
	let urls = images.map(({ url }) => url);
	setTimeout(() => {
		for (let url of urls) {
			URL.revokeObjectURL(url);
		}
	}, 10_000);
}
