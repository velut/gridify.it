import type { AppImage } from '$lib/types';
import { BlobReader, BlobWriter, ZipWriter } from '@zip.js/zip.js';
import pMap, { pMapSkip } from 'p-map';

export async function zipImages(images: AppImage[]): Promise<Blob> {
	const zip = new ZipWriter(new BlobWriter('application/zip'));
	await pMap(
		images,
		async (image) => {
			try {
				await zip.add(image.file.name, new BlobReader(image.file));
			} catch {
				return pMapSkip;
			}
		},
		{ concurrency: 4 }
	);
	return await zip.close();
}
