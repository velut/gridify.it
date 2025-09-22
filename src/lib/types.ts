import { clampRgb } from '$lib/utils/clamp';
import * as z from 'zod';

// Use `AppImage` name to prevent conflict with the `Image` constructor of `HTMLImageElement`.
export const AppImage = z.object({
	id: z.string(),
	file: z.file(),
	url: z.string()
});
export type AppImage = z.infer<typeof AppImage>;

export const AppBitmap = z.object({
	id: z.string(),
	filename: z.string(),

	// Use z.lazy() to prevent using DOM-only `ImageBitmap`
	// on the server when the types module is imported.
	bitmap: z.lazy(() => z.instanceof(ImageBitmap))
});
export type AppBitmap = z.infer<typeof AppBitmap>;

export const AppImageBuffer = z.object({
	id: z.string(),
	filename: z.string(),
	buffer: z.instanceof(ArrayBuffer)
});
export type AppImageBuffer = z.infer<typeof AppImageBuffer>;

export const PaletteOpts = z.object({
	type: z
		.literal([
			'original',
			'opaque',
			'invert',
			'grayscale',
			'binary',
			'rgb',
			'cmyk',
			'pico-8',
			'wplace-free',
			'wplace-full',
			'custom'
		])
		.catch('original'),
	binary: z.object({
		threshold: z.coerce
			.number<string>()
			.int()
			.transform((val) => clampRgb(val))
	}),
	custom: z.object({
		palette: z.string()
	}),
	dither: z.object({
		type: z.literal(['none', 'floyd', 'atkinson']).catch('none')
	})
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
	bitmaps: z.array(AppBitmap),
	opts: RenderOpts
});
export type RenderWorkerInput = z.infer<typeof RenderWorkerInput>;

export const RenderWorkerOutputData = z.object({
	buffers: z.array(AppImageBuffer)
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

export const RgbColor = z.tuple([
	z.int().transform((val) => clampRgb(val)),
	z.int().transform((val) => clampRgb(val)),
	z.int().transform((val) => clampRgb(val))
]);
export type RgbColor = z.infer<typeof RgbColor>;

export const RgbaColor = z.tuple([
	z.int().transform((val) => clampRgb(val)),
	z.int().transform((val) => clampRgb(val)),
	z.int().transform((val) => clampRgb(val)),
	z.int().transform((val) => clampRgb(val))
]);
export type RgbaColor = z.infer<typeof RgbaColor>;

export type PaletteFn = (c: RgbaColor) => RgbaColor;

export const DitherError = z.tuple([z.number(), z.number(), z.number()]);
export type DitherError = z.infer<typeof DitherError>;

export const DitherFilter = z.array(z.tuple([z.number(), z.number(), z.number()]));
export type DitherFilter = z.infer<typeof DitherFilter>;
