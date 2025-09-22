import { renderBitmaps } from '$lib/render/render-bitmaps';
import { RenderWorkerInput, type RenderWorkerOutputData } from '$lib/types';

self.addEventListener('message', async (event) => {
	const port = event.ports[0]!;
	try {
		console.time('worker-render');
		const data = await work(RenderWorkerInput.parse(event.data));
		console.timeEnd('worker-render');
		const transferBuffers = data.buffers.map(({ buffer }) => buffer);
		port.postMessage({ status: 'ok', data }, [...transferBuffers]);
	} catch (err) {
		port.postMessage({ status: 'err', error: err });
	}
});

async function work(workerInput: RenderWorkerInput): Promise<RenderWorkerOutputData> {
	const buffers = await renderBitmaps(workerInput);
	return { buffers };
}
