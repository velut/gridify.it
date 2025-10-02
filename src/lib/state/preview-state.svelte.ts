import type { RenderState } from '$lib/state/render-state.svelte';
import type { AppImage, PreviewMode } from '$lib/types';

export class PreviewState {
	mode = $state<PreviewMode>('pixel-art');
	#render: RenderState;
	#imageId = $state('');

	constructor(render: RenderState) {
		this.#render = render;
	}

	hasImages(): boolean {
		return this.#render.hasImages();
	}

	get images(): AppImage[] {
		return this.#render.images;
	}

	set imageId(id) {
		this.#imageId = id;
	}

	get imageId() {
		// If the image exists, the current `#imageId` is valid.
		const image = this.images.find(({ id }) => id === this.#imageId);
		if (image) return this.#imageId;

		// If `#imageId` is not valid, return the id of the first image.
		// This happens for example when a new set of images is uploaded
		// replacing a set of previously loaded images.
		return this.images.at(0)?.id || '';
	}

	get image(): AppImage {
		return this.images.find(({ id }) => id === this.imageId)!;
	}
}
