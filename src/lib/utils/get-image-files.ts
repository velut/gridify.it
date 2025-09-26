import { getFiles } from 'event-to-files';

export async function getImageFiles(event: Event): Promise<File[]> {
	return (await getFiles(event))
		.map(({ file }) => file)
		.filter((file) => {
			const type = file.type.trim().toLowerCase();
			const isImage = type.startsWith('image/');
			const isSvg = type === 'image/svg+xml';
			return isImage && !isSvg;
		});
}
