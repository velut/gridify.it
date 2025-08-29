import * as z from 'zod';

export const Image = z.object({ file: z.file(), url: z.string() });
export type Image = z.infer<typeof Image>;

export const OriginalFilter = z.object({
	kind: z.literal('original')
});

export const GridFilter = z.object({
	kind: z.literal('grid'),
	opts: z.object({
		type: z.literal(['full', 'lines', 'border', 'none']).catch('full'),
		color: z
			.string()
			.regex(/^#(?:[0-9a-f]{3}){1,2}$/i)
			.catch('#000000'),
		lines: z.object({ size: z.coerce.number().int().positive().catch(1) }),
		cell: z.object({
			shape: z.literal(['square', 'rectangle']).catch('square'),
			width: z.coerce.number().int().positive().catch(1),
			height: z.coerce.number().int().positive().catch(1),
			scale: z.coerce.number().int().positive().catch(1),
			cornerRadius: z.coerce.number().int().nonnegative().catch(0)
		}),
		opacity: z.literal(['preserve', 'opaque'])
	})
});
export type GridFilter = z.infer<typeof GridFilter>;

export const Filter = z.union([OriginalFilter, GridFilter]);
export type Filter = z.infer<typeof Filter>;

export const RenderItem = z.object({
	active: z.boolean(),
	filter: Filter,
	images: z.array(Image)
});
export type RenderItem = z.infer<typeof RenderItem>;

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

export const PreviewMode = z.literal(['pixel-art', 'high-res']);
export type PreviewMode = z.infer<typeof PreviewMode>;

export type ImagesRenderState = 'original' | 'rendered';
