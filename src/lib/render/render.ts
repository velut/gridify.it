import {
	RenderWorkerInput,
	RenderWorkerOutput,
	RenderWorkerOutputData,
	type AppImage
} from '$lib/types';

// Create worker later to prevent using DOM-only `Worker` on the server.
let worker: Worker | undefined = undefined;

export async function render(input: RenderWorkerInput): Promise<AppImage[]> {
	ensureWorker();
	const { images } = await renderOnWorker(input);
	return images;
}

function ensureWorker() {
	if (worker) return;
	worker = new Worker(new URL('./render.worker.ts', import.meta.url), { type: 'module' });
}

async function renderOnWorker(input: RenderWorkerInput): Promise<RenderWorkerOutputData> {
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
		worker!.postMessage(input, [port2]);
	});
}
