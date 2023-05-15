export const handleRenderImagesHotkey = (button: HTMLButtonElement) => {
	const handleKeyDown = async (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'Enter' && !button.disabled) {
			event.preventDefault();
			button.click();
		}
	};

	window.addEventListener('keydown', handleKeyDown, true);

	const destroy = () => {
		window.removeEventListener('keydown', handleKeyDown, true);
	};

	return { destroy };
};
