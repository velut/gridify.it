import { z } from 'zod';

export const renderOptionsSchema = z.object({
	grid: z.object({
		type: z.enum(['none', 'inner', 'outer', 'full']),
		strokeSize: z.number(),
		strokeColor: z.string()
	}),
	cell: z.object({
		size: z.number(),
		scale: z.number(),
		radius: z.number()
	}),
	pixel: z.object({
		fullyOpaque: z.boolean()
	})
});

export type RenderOptions = z.infer<typeof renderOptionsSchema>;
