import { downloadBlob } from '$lib/download-blob';
import { revokeObjectUrls } from '$lib/revoke-object-urls';
import type { Image } from '$lib/types';
import { zipImages } from '$lib/zip-images';
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

	hasOutputImages() {
		return this.outputImages.length > 0;
	}

	async upload(event: Event) {
		this.reset();
		let images = (await fromEvent(event))
			.filter((res) => res instanceof File)
			.filter((file) => accept(file, 'image/*'))
			.map((file) => ({ file, url: URL.createObjectURL(file) }));
		this.inputImages = images;
		this.outputImages = images;
	}

	async download() {
		if (!this.hasOutputImages()) return;
		if (this.outputImages.length === 1) {
			let image = this.outputImages[0];
			downloadBlob(image.file, image.file.name);
		} else {
			downloadBlob(await zipImages(this.outputImages), 'gridify-it-images.zip');
		}
	}
}
