export function revokeObjectUrls(urls: string[]) {
	if (!urls.length) return;
	setTimeout(() => {
		for (const url of urls) {
			URL.revokeObjectURL(url);
		}
	}, 30_000);
}
