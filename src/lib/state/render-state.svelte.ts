import { type AppImage, RenderOpts } from '$lib/types';
import { revokeImageUrls } from '$lib/utils/revoke-image-urls';
import { deepEqual } from 'fast-equals';

const defaultOpts = {
	palette: {
		type: 'original'
	},
	grid: {
		type: 'full',
		color: '#000000',
		lines: { size: '1' },
		cell: { shape: 'square', width: '1', height: '1', scale: '1', cornerRadius: '0' }
	}
};

export class RenderState {
	#inputImages = $state<AppImage[]>([]);
	#outputImages = $state<AppImage[]>([]);

	opts = $state(structuredClone(defaultOpts));
	undo = $state<RenderOpts[]>();
	redo = $state<RenderOpts[]>();

	get currentImages(): AppImage[] {
		if (this.#outputImages.length) return this.#outputImages;
		return this.#inputImages;
	}

	load(images: AppImage[]) {
		if (!images.length) return;
		revokeImageUrls(this.#inputImages);
		revokeImageUrls(this.#outputImages);
		this.#inputImages = images;
		this.#outputImages = [];
	}

	// resetOpts() {
	// 	this.opts = structuredClone(defaultOpts);
	// }

	// toRenderOpts(): RenderOpts {
	// 	return RenderOpts.parse($state.snapshot(this.opts));
	// }

	// isDefaultOpts(): boolean {
	// 	return deepEqual($state.snapshot(this.opts), defaultOpts);
	// }
}
