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

	window.addEventListener('dragover', handleDragOver, true);
	window.addEventListener('drop', handleDrop, true);

	const destroy = () => {
		window.removeEventListener('dragover', handleDragOver, true);
		window.removeEventListener('drop', handleDrop, true);
	};

	return { destroy };
};
