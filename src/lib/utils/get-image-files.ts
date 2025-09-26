import { getFiles } from 'event-to-files';

export async function getImageFiles(event: Event): Promise<File[]> {
	return (await getFiles(event))
		.map(({ file }) => file)
		.filter(({ type }) => type.trim().toLowerCase().startsWith('image/'));
}
