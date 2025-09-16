import type { AppImage } from '$lib/types';

export function cloneImages(images: AppImage[]): AppImage[] {
	// Clone the images to prevent revoking the original object URLs.
	return images.map((image) => {
		const file = new File([image.file], image.file.name, {
			type: image.file.type,
			lastModified: image.file.lastModified
		});
		return { id: image.id, file, url: URL.createObjectURL(file) };
	});
}
