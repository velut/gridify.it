import { RenderOpts } from '$lib/types';
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

export class RenderOptsState {
	opts = $state(structuredClone(defaultOpts));

	toRenderOpts(): RenderOpts {
		return RenderOpts.parse($state.snapshot(this.opts));
	}

	reset() {
		this.opts = structuredClone(defaultOpts);
	}

	isDefault(): boolean {
		return deepEqual($state.snapshot(this.opts), defaultOpts);
	}
}
