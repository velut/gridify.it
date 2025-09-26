import { render } from '$lib/render/render';
import { RenderOptsState } from '$lib/state/render-opts-state.svelte';
import { RenderStackState } from '$lib/state/render-stack-state.svelte';
import { RenderOpts, type AppImage } from '$lib/types';
import { BProgress } from '@bprogress/core';
import PQueue from 'p-queue';

export class RenderState {
	opts = new RenderOptsState();
	#stack = new RenderStackState();
	#queue = new PQueue({ concurrency: 1 });

	async loadImages(files: File[]) {
		if (!files.length) return;
		await this.#queue.add(async () => {
			this.#stack.reset();
			const opts = RenderOptsState.default();
			const renderPromise = render({ files, opts: RenderOpts.parse(opts) });
			BProgress.promise(renderPromise);
			const images = await renderPromise;
			this.#stack.push({ images, opts });
		});
	}

	hasImages(): boolean {
		return this.images.length > 0;
	}

	get images(): AppImage[] {
		return this.#stack.current?.images ?? [];
	}

	canResetImages() {
		return this.hasImages();
	}

	async resetImages() {
		if (!this.canResetImages()) return;
		await this.#queue.add(() => {
			this.#stack.reset();
		});
	}

	canUndo(): boolean {
		return this.#stack.canUndo();
	}

	async undo() {
		if (!this.canUndo()) return;
		await this.#queue.add(() => {
			const item = this.#stack.undo();
			if (!item) return;
			this.opts.opts = item.opts;
		});
	}

	canRedo(): boolean {
		return this.#stack.canRedo();
	}

	async redo() {
		if (!this.canRedo()) return;
		await this.#queue.add(() => {
			const item = this.#stack.redo();
			if (!item) return;
			this.opts.opts = item.opts;
		});
	}

	canRender(): boolean {
		return this.hasImages();
	}

	async render() {
		if (!this.canRender()) return;
		const opts = $state.snapshot(this.opts.opts);
		await this.#queue.add(async () => {
			const renderPromise = render({ opts: RenderOpts.parse(opts) });
			BProgress.promise(renderPromise);
			const images = await renderPromise;
			this.#stack.push({ images, opts });
		});
	}
}
