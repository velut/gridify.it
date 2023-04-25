import { hexColorRegex } from '$lib/hex-color-regex';
import { z } from 'zod';

export const renderOptionsSchema = z.object({
	grid: z.object({
		type: z.enum(['none', 'inner', 'outer', 'full']),
		stroke: z.object({
			size: z.coerce
				.number({ invalid_type_error: 'Stroke size must be a number.' })
				.int({ message: 'Stroke size must be an integer number.' })
				.min(1, { message: 'Stroke size must be greater than or equal to 1.' }),
			color: z.string().regex(hexColorRegex)
		})
	}),
	cell: z.object({
		size: z.coerce
			.number({ invalid_type_error: 'Cell size must be a number.' })
			.int({ message: 'Cell size must be an integer number.' })
			.min(1, { message: 'Cell size must be greater than or equal to 1.' }),
		scale: z.coerce
			.number({ invalid_type_error: 'Cell scale must be a number.' })
			.int({ message: 'Cell scale must be an integer number.' })
			.min(1, { message: 'Cell scale must be greater than or equal to 1.' }),
		radius: z.coerce
			.number({ invalid_type_error: 'Cell radius must be a number.' })
			.int({ message: 'Cell radius must be an integer number.' })
			.min(0, { message: 'Cell radius must be greater than or equal to 1.' })
	}),
	pixel: z.object({
		fullyOpaque: z.boolean()
	})
});

export type RenderOptions = z.infer<typeof renderOptionsSchema>;
