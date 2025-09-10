import * as z from 'zod';

export const Image = z.object({ file: z.file(), url: z.string() });
export type Image = z.infer<typeof Image>;

export const PaletteOpts = z.object({
	type: z.literal(['original', 'opaque', 'binary', 'grayscale']).catch('original')
});
export type PaletteOpts = z.infer<typeof PaletteOpts>;

export const GridOpts = z.object({
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
	})
});
export type GridOpts = z.infer<typeof GridOpts>;

export const RenderOpts = z.object({
	palette: PaletteOpts,
	grid: GridOpts
});
export type RenderOpts = z.infer<typeof RenderOpts>;

export const PreviewMode = z.literal(['pixel-art', 'high-res']);
export type PreviewMode = z.infer<typeof PreviewMode>;
