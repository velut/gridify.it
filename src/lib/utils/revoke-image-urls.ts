import type { AppImage } from '$lib/types';

export function revokeImageUrls(images: AppImage[]) {
	if (!images.length) return;
	const urls = images.map(({ url }) => url);
	setTimeout(() => {
		for (const url of urls) {
			URL.revokeObjectURL(url);
		}
	}, 10_000);
}
