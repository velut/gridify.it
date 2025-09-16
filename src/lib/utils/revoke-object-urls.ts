import type { AppImage } from '$lib/types';

export function revokeObjectUrls(images: AppImage[]) {
	if (images.length === 0) return;
	const urls = images.map(({ url }) => url);
	setTimeout(() => {
		for (const url of urls) {
			URL.revokeObjectURL(url);
		}
	}, 10_000);
}
