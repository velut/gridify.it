import { hexColorRegex } from '$lib/hex-color-regex';
import { z } from 'zod';

export const renderOptionsSchema = z.object({
	grid: z.object({
		type: z.enum(['none', 'inner', 'outer', 'full']),
		strokeSize: z.number().int().min(1),
		strokeColor: z.string().regex(hexColorRegex)
	}),
	cell: z.object({
		size: z.number().int().min(1),
		scale: z.number().int().min(1),
		radius: z.number().int().min(0)
	}),
	pixel: z.object({
		fullyOpaque: z.boolean()
	})
});

export type RenderOptions = z.infer<typeof renderOptionsSchema>;
