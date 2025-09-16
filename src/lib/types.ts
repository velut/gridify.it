import * as z from 'zod';

// Use `AppImage` name to prevent conflict with the `Image` constructor of `HTMLImageElement`.
export const AppImage = z.object({
	id: z.nanoid(),
	file: z.file(),
	url: z.string()
});
export type AppImage = z.infer<typeof AppImage>;

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
	lines: z.object({
		size: z.coerce.number<string>().int().positive().catch(1)
	}),
	cell: z.object({
		shape: z.literal(['square', 'rectangle']).catch('square'),
		width: z.coerce.number<string>().int().positive().catch(1),
		height: z.coerce.number<string>().int().positive().catch(1),
		scale: z.coerce.number<string>().int().positive().catch(1),
		cornerRadius: z.coerce.number<string>().int().nonnegative().catch(0)
	})
});
export type GridOpts = z.infer<typeof GridOpts>;
export type GridOptsInput = z.input<typeof GridOpts>;

export const RenderOpts = z.object({
	palette: PaletteOpts,
	grid: GridOpts
});
export type RenderOpts = z.infer<typeof RenderOpts>;
export type RenderOptsInput = z.input<typeof RenderOpts>;

export const PreviewMode = z.literal(['pixel-art', 'high-res']);
export type PreviewMode = z.infer<typeof PreviewMode>;

// Render worker types.
export const RenderWorkerInput = z.object({
	// Need to disable `ssr` in `+page.ts` as `ImageBitmap` is not available on the server.
	bitmaps: z.array(z.instanceof(ImageBitmap)),
	opts: RenderOpts
});
export type RenderWorkerInput = z.infer<typeof RenderWorkerInput>;

export const RenderWorkerOutputData = z.object({
	// Need to disable `ssr` in `+page.ts` as `ImageBitmap` is not available on the server.
	bitmaps: z.array(z.instanceof(ImageBitmap))
});
export type RenderWorkerOutputData = z.infer<typeof RenderWorkerOutputData>;

export const RenderWorkerOutput = z.discriminatedUnion('status', [
	z.object({
		status: z.literal('ok'),
		data: RenderWorkerOutputData
	}),
	z.object({
		status: z.literal('err'),
		error: z.unknown()
	})
]);
export type RenderWorkerOutput = z.infer<typeof RenderWorkerOutput>;
