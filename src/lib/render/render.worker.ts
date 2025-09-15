self.addEventListener('message', async (event) => {
	const port = event.ports[0]!;
	try {
		const result = await render();
		port.postMessage({ result });
	} catch (error) {
		port.postMessage({ error });
	}
});

async function render() {
	return 'foo';
}
