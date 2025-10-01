import { clampRgb } from '$lib/utils/clamp';
import * as z from 'zod';

// Global theme.
export const Theme = z.literal(['light', 'dark']);
export type Theme = z.infer<typeof Theme>;

// Gallery preview mode.
export const PreviewMode = z.literal(['pixel-art', 'hi-res']);
export type PreviewMode = z.infer<typeof PreviewMode>;

// Use `AppImage` to prevent naming conflict with the `Image` constructor of `HTMLImageElement`.
export const AppImage = z.object({
	id: z.string(),
	file: z.file(),
	url: z.string(),
	width: z.int().min(1),
	height: z.int().min(1),
	originalFile: z.file()
});
export type AppImage = z.infer<typeof AppImage>;

export const ScaleOpts = z
	.object({
		type: z.literal(['original', 'same', 'different']).catch('original'),
		x: z.coerce.number<string>().catch(1),
		y: z.coerce.number<string>().catch(1)
	})
	.transform(({ type, x, y }) => ({
		type,
		x,
		y: type === 'same' ? x : y
	}));
export type ScaleOpts = z.infer<typeof ScaleOpts>;

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
			.catch(128)
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
	type: z.literal(['none', 'full', 'lines', 'border', 'invisible']).catch('none'),
	color: z
		.string()
		.regex(/^#(?:[0-9a-f]{3}){1,2}$/i)
		.catch('#000000'),
	lines: z.object({
		size: z.coerce.number<string>().int().min(1).catch(1)
	}),
	cell: z
		.object({
			type: z.literal(['square', 'rectangle']).catch('square'),
			width: z.coerce.number<string>().int().min(1).catch(1),
			height: z.coerce.number<string>().int().min(1).catch(1),
			scale: z.coerce.number<string>().int().min(1).catch(1),
			cornerRadius: z.coerce.number<string>().int().min(0).catch(0)
		})
		.transform(({ type, width, height, ...rest }) => ({
			type,
			width,
			height: type === 'square' ? width : height,
			...rest
		}))
});
export type GridOpts = z.infer<typeof GridOpts>;

export const RenderOpts = z.object({
	scale: ScaleOpts,
	palette: PaletteOpts,
	grid: GridOpts
});
export type RenderOpts = z.infer<typeof RenderOpts>;
export type RenderOptsRaw = z.input<typeof RenderOpts>;

export const RenderStackItem = z.object({
	opts: RenderOpts,
	images: z.array(AppImage)
});
export type RenderStackItem = z.input<typeof RenderStackItem>;

// Render worker types.
export const RenderWorkerInput = z.object({
	opts: RenderOpts,
	files: z.optional(z.array(z.file()))
});
export type RenderWorkerInput = z.infer<typeof RenderWorkerInput>;

export const RenderWorkerOutputData = z.object({
	images: z.array(AppImage)
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

export const RenderWorkerCache = z.array(
	z.object({
		file: z.instanceof(File),
		canvas: z.lazy(() => z.instanceof(OffscreenCanvas))
	})
);
export type RenderWorkerCache = z.infer<typeof RenderWorkerCache>;

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

export const Dimensions = z.tuple([z.number(), z.number()]);
export type Dimensions = z.infer<typeof Dimensions>;

// Zip worker types.
export const ZipWorkerInput = z.object({
	files: z.array(z.file())
});
export type ZipWorkerInput = z.infer<typeof ZipWorkerInput>;

export const ZipWorkerOutputData = z.object({
	blob: z.instanceof(Blob)
});
export type ZipWorkerOutputData = z.infer<typeof ZipWorkerOutputData>;

export const ZipWorkerOutput = z.discriminatedUnion('status', [
	z.object({
		status: z.literal('ok'),
		data: ZipWorkerOutputData
	}),
	z.object({
		status: z.literal('err'),
		error: z.unknown()
	})
]);
export type ZipWorkerOutput = z.infer<typeof ZipWorkerOutput>;
