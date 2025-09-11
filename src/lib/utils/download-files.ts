import { downloadBlob } from '$lib/utils/download-blob';
import { zipFiles } from '$lib/utils/zip-files';

export async function downloadFiles(files: File[], zipName: string) {
	if (!files.length) return;
	if (files.length === 1) {
		const file = files[0];
		downloadBlob(file, file.name);
	} else {
		downloadBlob(await zipFiles(files), zipName);
	}
}
