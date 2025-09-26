import { downloadBlob } from '$lib/utils/download-blob';
import { zip } from '$lib/zip/zip';

export async function downloadFiles(files: File[], zipName: string) {
	if (!files.length) return;
	if (files.length === 1) {
		const file = files[0];
		downloadBlob(file, file.name);
	} else {
		downloadBlob(await zip(files), zipName);
	}
}
