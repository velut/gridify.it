import type { AppImage } from '$lib/types';
import { nanoid } from '$lib/utils/nanoid';
import { getFiles } from 'event-to-files';

export async function getImages(event: Event): Promise<AppImage[]> {
	return (await getFiles(event))
		.map(({ file }) => file)
		.filter(({ type }) => type.trim().toLowerCase().startsWith('image/'))
		.map((file) => ({
			id: nanoid(),
			file,
			url: URL.createObjectURL(file)
		}));
}
