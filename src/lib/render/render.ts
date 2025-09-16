import {
	RenderOpts,
	RenderWorkerInput,
	RenderWorkerOutput,
	RenderWorkerOutputData,
	type AppImage,
	type RenderOptsInput
} from '$lib/types';
import pMap, { pMapSkip } from 'p-map';

// Need to disable `ssr` in `+page.ts` as `Worker` is not available on the server.
const worker = new Worker(new URL('./render.worker.ts', import.meta.url), {
	type: 'module'
});

export async function render(images: AppImage[], optsInput: RenderOptsInput): Promise<AppImage[]> {
	const { bitmaps } = await renderOnWorker({
		bitmaps: await createImageBitmaps(images),
		opts: RenderOpts.parse(optsInput)
	});
	// return await createOutputImages(bitmaps);
	console.time('coi');
	const a = await createOutputImages(bitmaps);
	console.timeEnd('coi');
	return a;
}

async function createImageBitmaps(images: AppImage[]): Promise<ImageBitmap[]> {
	return await pMap(
		images,
		async (image) => {
			try {
				return await window.createImageBitmap(image.file);
			} catch (err) {
				console.error(err);
				return pMapSkip;
			}
		},
		{ concurrency: 4 }
	);
}

async function renderOnWorker(workerInput: RenderWorkerInput): Promise<RenderWorkerOutputData> {
	return await new Promise((resolve, reject) => {
		// Use channels to enable async/await communication with worker.
		// See https://advancedweb.hu/how-to-use-async-await-with-postmessage/.
		const channel = new MessageChannel();

		// Received message back from worker.
		channel.port1.onmessage = ({ data }) => {
			channel.port1.close();
			const result = RenderWorkerOutput.parse(data);
			if (result.status === 'ok') {
				resolve(result.data);
			} else {
				reject(result.error);
			}
		};

		// Send message to worker and transfer port for response and bitmaps for rendering.
		worker.postMessage(workerInput, [channel.port2, ...workerInput.bitmaps]);
	});
}

async function createOutputImages(bitmaps: ImageBitmap[]): Promise<AppImage[]> {
	return await pMap(
		bitmaps,
		async (bitmap) => {
			try {
				const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
				const ctx = canvas.getContext('bitmaprenderer')!;
				ctx.transferFromImageBitmap(bitmap);
				const blob = await canvas.convertToBlob({ type: 'image/png', quality: 1 });
				const file = new File([blob], 'foo.png', {
					type: 'image/png'
					// lastModified: image.file.lastModified
				});
				const url = URL.createObjectURL(file);
				return { file, url };
			} catch (err) {
				console.error(err);
				return pMapSkip;
			}
		},
		{ concurrency: 4 }
	);
}
