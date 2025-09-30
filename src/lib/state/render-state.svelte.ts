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
	#active = $state(false);

	constructor() {
		this.#queue.on('active', () => {
			this.#active = true;
			BProgress.start();
		});
		this.#queue.on('idle', () => {
			this.#active = false;
			BProgress.done();
		});
	}

	get active() {
		return this.#active;
	}

	canLoadImages(): boolean {
		return !this.#active;
	}

	async loadImages(files: File[]) {
		await this.#queue.add(async () => {
			if (!files.length) return;
			this.#stack.reset();
			const opts = RenderOptsState.default();
			const images = await render({ files, opts: RenderOpts.parse(opts) });
			this.#stack.push({ opts, images });
		});
	}

	hasImages(): boolean {
		return this.images.length > 0;
	}

	get images(): AppImage[] {
		return this.#stack.current?.images ?? [];
	}

	canResetImages(): boolean {
		return !this.#active && this.hasImages();
	}

	async resetImages() {
		await this.#queue.add(() => {
			if (!this.hasImages()) return;
			this.#stack.reset();
		});
	}

	canUndo(): boolean {
		return !this.#active && this.#stack.canUndo();
	}

	async undo() {
		await this.#queue.add(() => {
			if (!this.#stack.canUndo()) return;
			const item = this.#stack.undo();
			if (!item) return;
			this.opts.opts = item.opts;
		});
	}

	canRedo(): boolean {
		return !this.#active && this.#stack.canRedo();
	}

	async redo() {
		await this.#queue.add(() => {
			if (!this.#stack.canRedo()) return;
			const item = this.#stack.redo();
			if (!item) return;
			this.opts.opts = item.opts;
		});
	}

	canRender(): boolean {
		return !this.#active && this.hasImages();
	}

	async render() {
		const opts = $state.snapshot(this.opts.opts);
		await this.#queue.add(async () => {
			if (!this.hasImages()) return;
			const images = await render({ opts: RenderOpts.parse(opts) });
			this.#stack.push({ opts, images });
		});
	}
}
