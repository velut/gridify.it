import type { Image } from '$lib/types';

export function cloneImages(images: Image[]): Image[] {
	// Clone the images to prevent revoking the original object URLs.
	return images.map((image) => {
		let file = new File([image.file], image.file.name, {
			type: image.file.type,
			lastModified: image.file.lastModified
		});
		return { file, url: URL.createObjectURL(file) };
	});
}
