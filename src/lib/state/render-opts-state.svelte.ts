import type { RenderOptsRaw } from '$lib/types';
import { deepEqual } from 'fast-equals';

export class RenderOptsState {
	static default(): RenderOptsRaw {
		return structuredClone({
			scale: {
				type: 'original',
				x: '1',
				y: '1'
			},
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
					type: 'square',
					width: '1',
					height: '1',
					scale: '1',
					cornerRadius: '0'
				}
			}
		});
	}

	// Current opts used in the form.
	opts = $state<RenderOptsRaw>(RenderOptsState.default());

	isDefault(): boolean {
		return deepEqual($state.snapshot(this.opts), RenderOptsState.default());
	}

	reset() {
		this.opts = RenderOptsState.default();
	}

	setPixelArtPreset() {
		this.reset();
		this.opts.grid.type = 'full';
		this.opts.grid.cell.scale = '8';
	}

	setPhotoPreset() {
		this.reset();
		this.opts.grid.type = 'full';
		this.opts.grid.lines.size = '2';
		this.opts.grid.cell.width = '100';
	}
}
