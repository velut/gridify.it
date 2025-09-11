import { BlobReader, BlobWriter, ZipWriter } from '@zip.js/zip.js';
import pMap, { pMapSkip } from 'p-map';

export async function zipFiles(files: File[]): Promise<Blob> {
	const zip = new ZipWriter(new BlobWriter('application/zip'));
	await pMap(
		files,
		async (file) => {
			try {
				await zip.add(file.name, new BlobReader(file));
			} catch {
				return pMapSkip;
			}
		},
		{ concurrency: 4 }
	);
	return await zip.close();
}
