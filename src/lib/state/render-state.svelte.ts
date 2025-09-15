import { type AppImage, type RenderOptsInput } from '$lib/types';
import { revokeImageUrls } from '$lib/utils/revoke-image-urls';
import { deepEqual } from 'fast-equals';

const defaultRenderOpts: RenderOptsInput = {
	palette: {
		type: 'original'
	},
	grid: {
		type: 'full',
		color: '#000000',
		lines: {
			size: '1'
		},
		cell: {
			shape: 'square',
			width: '1',
			height: '1',
			scale: '1',
			cornerRadius: '0'
		}
	}
};

export class RenderState {
	#inputImages = $state<AppImage[]>([]);
	#outputImages = $state<AppImage[]>([]);

	// Undo and redo stacks.
	#prevOpts = $state<RenderOptsInput[]>([]);
	#nextOpts = $state<RenderOptsInput[]>([]);

	// Current render opts bound in the form.
	opts = $state<RenderOptsInput>(structuredClone(defaultRenderOpts));

	get currentImages(): AppImage[] {
		if (this.#outputImages.length) return this.#outputImages;
		return this.#inputImages;
	}

	loadImages(images: AppImage[]) {
		if (!images.length) return;
		this.resetImages();
		this.#inputImages = images;
	}

	resetImages() {
		revokeImageUrls(this.#inputImages);
		revokeImageUrls(this.#outputImages);
		this.#inputImages = [];
		this.#outputImages = [];
		this.resetUndoRedo();
	}

	hasImages(): boolean {
		return this.currentImages.length > 0;
	}

	resetOpts() {
		this.opts = structuredClone(defaultRenderOpts);
	}

	canResetOpts(): boolean {
		return !deepEqual(this.opts, defaultRenderOpts);
	}

	resetUndoRedo() {
		this.#prevOpts = [];
		this.#nextOpts = [];
	}

	canUndo(): boolean {
		return this.#prevOpts.length > 0;
	}

	canRedo(): boolean {
		return this.#nextOpts.length > 0;
	}

	undo() {
		const opts = this.#prevOpts.pop();
		if (!opts) return;
		this.#nextOpts.push(opts);
	}

	redo() {
		const opts = this.#nextOpts.pop();
		if (!opts) return;
		this.#prevOpts.push(opts);
	}

	pushUndo() {
		this.#prevOpts.push(this.opts);
		this.#nextOpts = [];
	}

	async render() {
		this.pushUndo();
	}
}
