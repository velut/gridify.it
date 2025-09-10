import { cloneImages } from '$lib/utils/clone-images';
import { downloadBlob } from '$lib/utils/download-blob';
import { renderImages } from '$lib/render-images';
import { revokeObjectUrls } from '$lib/utils/revoke-object-urls';
import { RenderOpts, type Image } from '$lib/types';
import { zipImages } from '$lib/utils/zip-images';
import accept from 'attr-accept';
import { fromEvent } from 'file-selector';

export class ImagesState {
	#inputImages = $state<Image[]>([]);
	#outputImages = $state<Image[]>([]);
	renderState = $state<'original' | 'rendered'>('original');

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
		this.renderState = 'original';
	}

	hasInputImages(): boolean {
		return this.inputImages.length > 0;
	}

	hasOutputImages(): boolean {
		return this.outputImages.length > 0;
	}

	async upload(event: Event) {
		this.reset();
		const images = (await fromEvent(event))
			.filter((res) => res instanceof File)
			.filter((file) => accept(file, 'image/*'))
			.map((file) => ({ file, url: URL.createObjectURL(file) }));
		this.inputImages = images;
		this.outputImages = cloneImages(images);
		this.renderState = 'original';
	}

	async download() {
		if (!this.hasOutputImages()) return;
		if (this.outputImages.length === 1) {
			const image = this.outputImages[0];
			downloadBlob(image.file, image.file.name);
		} else {
			downloadBlob(await zipImages(this.outputImages), 'gridify-it-images.zip');
		}
	}

	async render(opts: RenderOpts) {
		if (!this.hasInputImages()) return;
		this.outputImages = await renderImages(this.inputImages, opts);
		this.renderState = 'rendered';
	}

	undoRender() {
		if (!this.hasInputImages()) return;
		this.outputImages = cloneImages(this.inputImages);
		this.renderState = 'original';
	}

	hasRenderedImages(): boolean {
		return this.renderState === 'rendered';
	}
}
