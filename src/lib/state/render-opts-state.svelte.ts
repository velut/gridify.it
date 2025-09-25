import type { RenderOptsInput } from '$lib/types';
import { deepEqual } from 'fast-equals';

export class RenderOptsState {
	static default(): RenderOptsInput {
		return structuredClone({
			palette: {
				type: 'original',
				binary: { threshold: '128' },
				custom: { palette: '' },
				dither: { type: 'none' }
			},
			grid: {
				type: 'none',
				color: '#000000',
				lines: { size: '1' },
				cell: {
					shape: 'square',
					width: '1',
					height: '1',
					scale: '1',
					cornerRadius: '0'
				}
			}
		});
	}

	// Current opts used in the form.
	opts = $state<RenderOptsInput>(RenderOptsState.default());

	isDefault(): boolean {
		return deepEqual($state.snapshot(this.opts), RenderOptsState.default());
	}

	reset() {
		this.opts = RenderOptsState.default();
	}
}
