import { getFiles } from '$lib/get-files';
import { files } from '$lib/stores';

const accept = 'image/*';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleFileDrop = (_: HTMLElement) => {
	const handleDragOver = (event: Event) => {
		event.preventDefault();
	};

	const handleDrop = async (event: Event) => {
		event.preventDefault();
		files.set(await getFiles(event, accept));
	};

	document.addEventListener('dragover', handleDragOver, true);
	document.addEventListener('drop', handleDrop, true);

	const destroy = () => {
		document.removeEventListener('dragover', handleDragOver, true);
		document.removeEventListener('drop', handleDrop, true);
	};

	return { destroy };
};
