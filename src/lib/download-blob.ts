export function downloadBlob(blob: Blob, name: string) {
	let a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	a.download = name;
	a.rel = 'noopener';
	a.style = 'display: none';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	setTimeout(() => {
		URL.revokeObjectURL(a.href);
	}, 30_000);
}
