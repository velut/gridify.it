import { GridFilter } from '$lib/types';
import { deepEqual } from 'fast-equals';

const defaultOpts = {
	type: 'full',
	color: '#000000',
	lines: { size: '1' },
	cell: { shape: 'square', width: '1', height: '1', scale: '1', cornerRadius: '0' },
	opacity: 'preserve'
};

export class GridFilterState {
	opts = $state(structuredClone(defaultOpts));

	toGridFilter(): GridFilter {
		return GridFilter.parse({ kind: 'grid', opts: $state.snapshot(this.opts) });
	}

	reset() {
		this.opts = structuredClone(defaultOpts);
	}

	isDefault(): boolean {
		return deepEqual(this.opts, defaultOpts);
	}

	isGridTypeNone(): boolean {
		return this.opts.type === 'none';
	}
}
