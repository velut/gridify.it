import { ZipWorkerInput } from '$lib/types';
import { BlobReader, BlobWriter, ZipWriter } from '@zip.js/zip.js';
import pMap, { pMapSkip } from 'p-map';

self.addEventListener('message', async (event) => {
	const port = event.ports[0]!;
	try {
		const { files } = ZipWorkerInput.parse(event.data);
		const blob = await zip(files);
		port.postMessage({ status: 'ok', data: { blob } });
	} catch (err) {
		console.error(err);
		port.postMessage({ status: 'err', error: err });
	}
});

async function zip(files: File[]): Promise<Blob> {
	const zip = new ZipWriter(new BlobWriter('application/zip'));
	await pMap(
		files,
		async (file) => {
			try {
				await zip.add(file.name, new BlobReader(file));
			} catch (err) {
				console.error(err);
				return pMapSkip;
			}
		},
		{ concurrency: 4 }
	);
	return await zip.close();
}
