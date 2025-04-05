import { revokeObjectUrls } from '$lib/revoke-object-urls';
import type { Image } from '$lib/types';

export class ImagesState {
	#inputImages = $state<Image[]>([]);
	#outputImages = $state<Image[]>([]);

	get inputImages() {
		return this.#inputImages;
	}

	set inputImages(images) {
		revokeObjectUrls(this.#inputImages);
		this.#inputImages = images;
	}

	get outputImages() {
		return this.#outputImages;
	}

	set outputImages(images) {
		revokeObjectUrls(this.#outputImages);
		this.#outputImages = images;
	}

	reset() {
		this.inputImages = [];
		this.outputImages = [];
	}

	hasInputImages() {
		return this.inputImages.length > 0;
	}
}
