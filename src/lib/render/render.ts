import {
	AppImageBuffer,
	RenderWorkerInput,
	RenderWorkerOutput,
	RenderWorkerOutputData,
	type AppBitmap,
	type AppImage,
	type RenderOpts
} from '$lib/types';
import pMap, { pMapSkip } from 'p-map';

// Create worker later to prevent using DOM-only `Worker` on the server.
let worker: Worker | undefined = undefined;

export async function render(images: AppImage[], opts: RenderOpts): Promise<AppImage[]> {
	ensureWorker();
	const bitmaps = await imagesToBitmaps(images);
	const { buffers } = await renderOnWorker({ bitmaps, opts });
	return await buffersToImages(buffers);
}

function ensureWorker() {
	if (worker) return;
	worker = new Worker(new URL('./render.worker.ts', import.meta.url), { type: 'module' });
}

async function imagesToBitmaps(images: AppImage[]): Promise<AppBitmap[]> {
	return await pMap(
		images,
		async ({ id, file, url }) => {
			const filename = file.name;
			try {
				const bitmap = await window.createImageBitmap(file);
				return { id, filename, bitmap };
			} catch {
				// Workaround as `createImageBitmap` doesn't support some image types like SVG.
				try {
					const img = new Image();
					img.src = url;
					await img.decode();
					const canvas = new OffscreenCanvas(img.width, img.height);
					const ctx = canvas.getContext('2d')!;
					ctx.drawImage(img, 0, 0);
					const bitmap = canvas.transferToImageBitmap();
					return { id, filename, bitmap };
				} catch (err) {
					console.error(err);
					return pMapSkip;
				}
			}
		},
		{ concurrency: 4 }
	);
}

async function renderOnWorker(workerInput: RenderWorkerInput): Promise<RenderWorkerOutputData> {
	return await new Promise((resolve, reject) => {
		// Use channels to enable async/await communication with worker.
		// See https://advancedweb.hu/how-to-use-async-await-with-postmessage/.
		const { port1, port2 } = new MessageChannel();

		// Received message back from worker.
		port1.onmessage = ({ data }) => {
			port1.close();
			const result = RenderWorkerOutput.parse(data);
			if (result.status === 'ok') {
				resolve(result.data);
			} else {
				reject(result.error);
			}
		};

		// Send message to worker.
		const transferBitmaps = workerInput.bitmaps.map(({ bitmap }) => bitmap);
		worker!.postMessage(workerInput, [port2, ...transferBitmaps]);
	});
}

async function buffersToImages(buffers: AppImageBuffer[]): Promise<AppImage[]> {
	return await pMap(
		buffers,
		async ({ id, filename, buffer }) => {
			try {
				const name = `${filename}_${id}.png`;
				const file = new File([buffer], name, { type: 'image/png' });
				const url = URL.createObjectURL(file);
				return { id, file, url };
			} catch (err) {
				console.error(err);
				return pMapSkip;
			}
		},
		{ concurrency: 4 }
	);
}
