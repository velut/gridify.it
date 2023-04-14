export type RenderOptions = {
	grid: {
		type: 'none' | 'outer' | 'inner' | 'full';
		strokeSize: number;
		strokeColor: string;
	};
	block: {
		size: number;
		scale: number;
		radius: number;
	};
	pixels: {
		fullyOpaque: boolean;
	};
};
