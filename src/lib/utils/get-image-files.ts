import { getFiles } from 'event-to-files';

export async function getImageFiles(event: Event): Promise<File[]> {
	return (await getFiles(event))
		.map(({ file }) => file)
		.filter((file) => {
			const type = file.type.trim().toLowerCase();

			// SVG images are unsupported by the `createImageBitmap` API.
			if (type === 'image/svg+xml') return false;

			// Accept other image types.
			return type.startsWith('image/');
		});
}
