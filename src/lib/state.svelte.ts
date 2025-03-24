import { toInt } from '$lib/to-int';

export class RenderOptions {
	grid = new Grid();
	opacity = $state<'preserve' | 'opaque'>('preserve');
}

class Grid {
	type = $state<'full' | 'lines' | 'border' | 'none'>('full');
	color = $state('#000000');
	lines = new GridLines();
	cell = new GridCell();
}

class GridLines {
	size = $state('1');
	sizeInt = $derived(toInt(this.size, 1));
}

class GridCell {
	shape = $state<'square' | 'rectangle'>('square');
	width = $state('1');
	widthInt = $derived(toInt(this.width, 1));
	height = $state('1');
	heightInt = $derived(toInt(this.height, 1));
	scale = $state('1');
	scaleInt = $derived(toInt(this.scale, 1));
	cornerRadius = $state('0');
	cornerRadiusInt = $derived(toInt(this.cornerRadius, 0));
}
