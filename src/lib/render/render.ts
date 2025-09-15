// Initialize worker later because `Worker` is not available for SSR.
let worker: Worker | undefined = undefined;

export async function render() {
	ensureWorker();
	return await new Promise((resolve, reject) => {
		// Use channels to enable async/await communication with worker.
		// See https://advancedweb.hu/how-to-use-async-await-with-postmessage/.
		const channel = new MessageChannel();

		// Received message back from worker.
		channel.port1.onmessage = ({ data }) => {
			channel.port1.close();
			if (data.error) {
				reject(data.error);
			} else {
				resolve(data.result);
			}
		};

		// Send message to worker with port for response.
		worker!.postMessage({}, [channel.port2]);
	});
}

function ensureWorker() {
	if (worker) return;
	worker = new Worker(new URL('./render.worker.ts', import.meta.url), {
		type: 'module'
	});
}
