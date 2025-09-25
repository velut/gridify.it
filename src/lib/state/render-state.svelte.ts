import { render } from '$lib/render/render';
import { RenderOptsState } from '$lib/state/render-opts-state.svelte';
import { RenderStackState } from '$lib/state/render-stack-state.svelte';
import type { AppImage } from '$lib/types';
import { BProgress } from '@bprogress/core';

export class RenderState {
	opts = new RenderOptsState();
	#stack = new RenderStackState();
	#isBusy = $state(false);

	canLoadImages(): boolean {
		return !this.#isBusy;
	}

	loadImages(images: AppImage[]) {
		if (!this.canLoadImages()) return;
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

	canResetImages() {
		return !this.#isBusy && this.hasImages();
	}

	resetImages() {
		if (!this.canResetImages()) return;
		this.#stack.reset();
	}

	canUndo(): boolean {
		return !this.#isBusy && this.#stack.canUndo();
	}

	undo() {
		if (!this.canUndo()) return;
		const item = this.#stack.undo();
		if (!item) return;
		this.opts.opts = item.opts;
	}

	canRedo(): boolean {
		return !this.#isBusy && this.#stack.canRedo();
	}

	redo() {
		if (!this.canRedo()) return;
		const item = this.#stack.redo();
		if (!item) return;
		this.opts.opts = item.opts;
	}

	canRender(): boolean {
		return !this.#isBusy && this.hasImages();
	}

	async render() {
		if (!this.canRender()) return;
		const originalImages = $state.snapshot(this.#stack.original?.images);
		if (!originalImages) return;
		const opts = $state.snapshot(this.opts.opts);
		this.#isBusy = true;
		BProgress.start();
		const images = await render(originalImages, opts);
		this.#stack.push({ opts, images });
		BProgress.done();
		this.#isBusy = false;
	}
}
