import type { Image } from '$lib/types';

export function cloneImages(images: Image[]): Image[] {
	// Clone the images to prevent revoking the original object URLs.
	return images.map((image) => ({
		file: new File([image.file], image.file.name, { type: image.file.type }),
		url: URL.createObjectURL(image.file)
	}));
}
