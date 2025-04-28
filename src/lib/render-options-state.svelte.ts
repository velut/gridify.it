import { toInt } from '$lib/to-int';
import type { GridCellShape, GridType, PixelOpacity, RenderOptions } from '$lib/types';

export class RenderOptionsState {
	grid = new GridState();
	opacity = $state<PixelOpacity>('preserve');

	toRenderOptions(): RenderOptions {
		return {
			grid: {
				type: this.grid.type,
				color: this.grid.color,
				lines: {
					size: toInt(this.grid.lines.size, 1)
				},
				cell: {
					shape: this.grid.cell.shape,
					width: toInt(this.grid.cell.width, 1),
					height:
						this.grid.cell.shape === 'rectangle'
							? toInt(this.grid.cell.height, 1)
							: toInt(this.grid.cell.width, 1),
					scale: toInt(this.grid.cell.scale, 1),
					cornerRadius: toInt(this.grid.cell.cornerRadius, 0)
				}
			},
			opacity: this.opacity
		};
	}

	reset() {
		this.grid.reset();
		this.opacity = 'preserve';
	}

	isDefault() {
		return this.grid.isDefault() && this.opacity === 'preserve';
	}

	isGridTypeNone(): boolean {
		return this.grid.type === 'none';
	}
}

export class GridState {
	type = $state<GridType>('full');
	color = $state('#000000');
	lines = new GridLinesState();
	cell = new GridCellState();

	reset() {
		this.type = 'full';
		this.color = '#000000';
		this.lines.reset();
		this.cell.reset();
	}

	isDefault() {
		return (
			this.type === 'full' &&
			this.color === '#000000' &&
			this.lines.isDefault() &&
			this.cell.isDefault()
		);
	}
}

export class GridLinesState {
	size = $state('1');

	reset() {
		this.size = '1';
	}

	isDefault() {
		return this.size === '1';
	}
}

export class GridCellState {
	shape = $state<GridCellShape>('square');
	width = $state('1');
	height = $state('1');
	scale = $state('1');
	cornerRadius = $state('0');

	reset() {
		this.shape = 'square';
		this.width = '1';
		this.height = '1';
		this.scale = '1';
		this.cornerRadius = '0';
	}

	isDefault() {
		return (
			this.shape === 'square' &&
			this.width === '1' &&
			this.height === '1' &&
			this.scale === '1' &&
			this.cornerRadius === '0'
		);
	}
}
