export class UndoRedo<T> {
	#prev: T[] = [];
	#next: T[] = [];

	reset() {
		this.#prev = [];
		this.#next = [];
	}

	canUndo(): boolean {
		return this.#prev.length > 0;
	}

	canRedo(): boolean {
		return this.#next.length > 0;
	}

	push(t: T) {
		this.#prev.push(t);
		this.#next = [];
	}

	undo(): T | undefined {
		if (!this.canUndo()) return undefined;

		// Move undone action to redo stack.
		const undone = this.#prev.pop()!;
		this.#next.push(undone);

		// Return current action to restore.
		return this.#prev.at(-1);
	}

	redo(): T | undefined {
		if (!this.canRedo()) return undefined;

		// Move redone action to undo stack.
		const redone = this.#next.pop()!;
		this.#prev.push(redone);

		// Return current action to redo.
		return redone;
	}
}
