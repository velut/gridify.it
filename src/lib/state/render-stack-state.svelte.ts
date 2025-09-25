import { RenderStackItem } from '$lib/types';
import { revokeObjectUrls } from '$lib/utils/revoke-object-urls';

export class RenderStackState {
	// Rendering stacks:
	// prev = [original, render1, render2, ...]
	// next = [undoneRender1, undoneRender2, ...]
	#prev = $state<RenderStackItem[]>([]);
	#next = $state<RenderStackItem[]>([]);

	get original(): RenderStackItem | undefined {
		return this.#prev.at(0);
	}

	get current(): RenderStackItem | undefined {
		return this.#prev.at(-1);
	}

	push(item: RenderStackItem) {
		// Use snapshot to prevent sharing item opts with RenderOptsState.
		this.#prev.push($state.snapshot(item));
		this.#resetRedoStack();
	}

	canUndo(): boolean {
		// Prevent undoing the first stack item,
		// which contains the original images and the default opts.
		return this.#prev.length > 1;
	}

	undo(): RenderStackItem | undefined {
		if (!this.canUndo()) return undefined;

		// Move undone item to redo stack.
		const undone = this.#prev.pop()!;
		this.#next.push(undone);

		// Return current item to restore.
		// Use snapshot to prevent sharing item opts with RenderOptsState.
		return $state.snapshot(this.#prev.at(-1));
	}

	canRedo(): boolean {
		return this.#next.length > 0;
	}

	redo(): RenderStackItem | undefined {
		if (!this.canRedo()) return undefined;

		// Move redone item to undo stack.
		const redone = this.#next.pop()!;
		this.#prev.push(redone);

		// Return current item to redo.
		// Use snapshot to prevent sharing item opts with RenderOptsState.
		return $state.snapshot(redone);
	}

	reset() {
		this.#resetUndoStack();
		this.#resetRedoStack();
	}

	#resetUndoStack() {
		const urls = this.#prev
			.map(({ images }) => images)
			.flat()
			.map(({ url }) => url);
		revokeObjectUrls(urls);
		this.#prev = [];
	}

	#resetRedoStack() {
		const urls = this.#next
			.map(({ images }) => images)
			.flat()
			.map(({ url }) => url);
		revokeObjectUrls(urls);
		this.#next = [];
	}
}
