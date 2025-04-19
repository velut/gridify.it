export async function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
	return new Promise((resolve, reject) => {
		canvas.toBlob(
			(blob) => {
				if (blob) {
					resolve(blob);
				} else {
					reject('canvasToBlob: cannot write canvas to blob');
				}
			},
			'image/png',
			1.0
		);
	});
}
