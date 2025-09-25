import { render } from '$lib/render/render';
import { RenderOptsState } from '$lib/state/render-opts-state.svelte';
import { RenderStackState } from '$lib/state/render-stack-state.svelte';
import type { AppImage } from '$lib/types';

export class RenderState {
	opts = new RenderOptsState();
	#stack = new RenderStackState();

	loadImages(images: AppImage[]) {
		if (!images.length) return;
		this.#stack.reset();
		const opts = RenderOptsState.default();
		this.#stack.push({ opts, images });
	}

	hasImages(): boolean {
		return this.images.length > 0;
	}

	get images(): AppImage[] {
		return this.#stack.current?.images ?? [];
	}

	resetImages() {
		this.#stack.reset();
	}

	canUndo(): boolean {
		return this.#stack.canUndo();
	}

	undo() {
		if (!this.canUndo()) return;
		const item = this.#stack.undo();
		if (!item) return;
		this.opts.opts = item.opts;
	}

	canRedo(): boolean {
		return this.#stack.canRedo();
	}

	redo() {
		if (!this.canRedo()) return;
		const item = this.#stack.redo();
		if (!item) return;
		this.opts.opts = item.opts;
	}

	async render() {
		const originalImages = $state.snapshot(this.#stack.original?.images);
		if (!originalImages) return;
		const opts = $state.snapshot(this.opts.opts);
		const images = await render(originalImages, opts);
		this.#stack.push({ opts, images });
	}
}
