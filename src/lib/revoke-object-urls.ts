export const revokeObjectUrls = (urls: string[]) => {
	setTimeout(() => {
		for (const url of urls) {
			URL.revokeObjectURL(url);
		}
	}, 250);
};
