import type { AppImage } from '$lib/types';
import { downloadFiles } from '$lib/utils/download-files';

export async function downloadImages(images: AppImage[]) {
	return await downloadFiles(
		images.map(({ file }) => file),
		'gridify-it-images.zip'
	);
}
