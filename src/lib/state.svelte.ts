import { toInt } from '$lib/to-int';
import type { GridShape, GridType, Opacity } from '$lib/types';

export class RenderOptions {
	grid = new Grid();
	opacity = $state<Opacity>('preserve');

	reset() {
		this.grid.reset();
		this.opacity = 'preserve';
	}
}

class Grid {
	type = $state<GridType>('full');
	color = $state('#000000');
	lines = new GridLines();
	cell = new GridCell();

	reset() {
		this.type = 'full';
		this.color = '#000000';
		this.lines.reset();
		this.cell.reset();
	}
}

class GridLines {
	size = $state('1');
	sizeInt = $derived(toInt(this.size, 1));

	reset() {
		this.size = '1';
	}
}

class GridCell {
	shape = $state<GridShape>('square');
	width = $state('1');
	widthInt = $derived(toInt(this.width, 1));
	height = $state('1');
	heightInt = $derived(this.shape === 'rectangle' ? toInt(this.height, 1) : this.widthInt);
	scale = $state('1');
	scaleInt = $derived(toInt(this.scale, 1));
	cornerRadius = $state('0');
	cornerRadiusInt = $derived(toInt(this.cornerRadius, 0));

	reset() {
		this.shape = 'square';
		this.width = '1';
		this.height = '1';
		this.scale = '1';
		this.cornerRadius = '0';
	}
}
