import { revokeObjectUrls } from '$lib/revoke-object-urls';
import type { Image } from '$lib/types';
import accept from 'attr-accept';
import { fromEvent } from 'file-selector';

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

	async upload(event: Event) {
		this.reset();
		const images = (await fromEvent(event))
			.filter((res) => res instanceof File)
			.filter((file) => accept(file, 'image/*'))
			.map((file) => ({ file, url: URL.createObjectURL(file) }));
		this.inputImages = images;
		this.outputImages = images;
	}
}
