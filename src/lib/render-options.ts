import { hexColorRegex } from '$lib/hex-color-regex';
import { z } from 'zod';

export const renderOptionsSchema = z.object({
	grid: z.object({
		type: z.enum(['none', 'inner', 'outer', 'full']).default('none'),
		stroke: z.object({
			size: z.coerce
				.number({ invalid_type_error: 'Stroke size must be a number.' })
				.int({ message: 'Stroke size must be an integer number.' })
				.min(1, { message: 'Stroke size must be greater than or equal to 1.' })
				.default(1),
			color: z.string().regex(hexColorRegex).default('#000000')
		})
	}),
	cell: z.object({
		squareAspectRatio: z.boolean().default(true),
		width: z.coerce
			.number({ invalid_type_error: 'Cell width must be a number.' })
			.int({ message: 'Cell width must be an integer number.' })
			.min(1, { message: 'Cell width must be greater than or equal to 1.' })
			.default(1),
		height: z.coerce
			.number({ invalid_type_error: 'Cell height must be a number.' })
			.int({ message: 'Cell height must be an integer number.' })
			.min(1, { message: 'Cell height must be greater than or equal to 1.' })
			.default(1),
		scale: z.coerce
			.number({ invalid_type_error: 'Cell scale must be a number.' })
			.int({ message: 'Cell scale must be an integer number.' })
			.min(1, { message: 'Cell scale must be greater than or equal to 1.' })
			.default(1),
		radius: z.coerce
			.number({ invalid_type_error: 'Cell radius must be a number.' })
			.int({ message: 'Cell radius must be an integer number.' })
			.min(0, { message: 'Cell radius must be greater than or equal to 1.' })
			.default(0)
	}),
	pixel: z.object({
		fullyOpaque: z.boolean().default(false)
	})
});

export type RenderOptionsSchema = typeof renderOptionsSchema;
export type RenderOptions = z.infer<typeof renderOptionsSchema>;
