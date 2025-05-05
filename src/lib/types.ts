export type Image = {
	file: File;
	url: string;
};

export type RenderOptions = {
	grid: {
		type: GridType;
		color: string;
		lines: {
			size: number;
		};
		cell: {
			shape: GridCellShape;
			width: number;
			height: number;
			scale: number;
			cornerRadius: number;
		};
	};
	opacity: PixelOpacity;
};

export type RenderOptionsGrid = RenderOptions['grid'];

export type GridType = 'full' | 'lines' | 'border' | 'none';

export type GridCellShape = 'square' | 'rectangle';

export type PixelOpacity = 'preserve' | 'opaque';

export type PreviewMode = 'pixel-art' | 'high-res';

export type ImagesRenderState = 'original' | 'rendered';
