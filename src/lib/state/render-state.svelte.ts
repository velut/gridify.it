import { type Image } from '$lib/types';
import type { RenderItem } from '$lib/types';

export class RenderState {
	#renderStack = $state<RenderItem[]>([]);

	#revokeImageUrls() {
		for (const { images } of this.#renderStack) {
			for (const { url } of images) {
				URL.revokeObjectURL(url);
			}
		}
	}

	async uploadImages(images: Image[]) {
		if (!images.length) return;
		this.#revokeImageUrls();
		this.#renderStack[0] = { active: true, filter: { kind: 'original' }, images };
		await this.render();
	}

	async render() {
		let inputImages = this.originalImages();
		if (!inputImages) return;
		for (const item of this.#renderStack) {
			if (item.filter.kind === 'original' || !item.active) continue;
			// TODO: render items
		}
	}

	originalImages(): Image[] | undefined {
		return this.#renderStack.at(0)?.images;
	}

	currentImages(): Image[] | undefined {
		return this.#renderStack.at(-1)?.images;
	}
}
