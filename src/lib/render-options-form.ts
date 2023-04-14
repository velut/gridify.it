import { hexColorRegex } from '$lib/hex-color-regex';
import { z } from 'zod';

export const renderOptionsFormSchema = z.object({
	grid: z.object({
		type: z.enum(['none', 'inner', 'outer', 'full']),
		strokeSize: z.string().refine(
			(value) => {
				const number = parseInt(value, 10);
				return !isNaN(number) && number >= 1;
			},
			{ message: 'Stroke size must be an integer number like 1, 2, 3' }
		),
		strokeColor: z.string().regex(hexColorRegex)
	}),
	cell: z.object({
		size: z.string().refine(
			(value) => {
				const number = parseInt(value, 10);
				return !isNaN(number) && number >= 1;
			},
			{ message: 'Cell size must be an integer number like 1, 2, 3' }
		),
		scale: z.string().refine(
			(value) => {
				const number = parseInt(value, 10);
				return !isNaN(number) && number >= 1;
			},
			{ message: 'Cell scale must be an integer number like 1, 2, 3' }
		),
		radius: z.string().refine(
			(value) => {
				const number = parseInt(value, 10);
				return !isNaN(number) && number >= 0;
			},
			{ message: 'Cell border radius must be an integer number like 0, 1, 2, 3' }
		)
	}),
	pixel: z.object({
		fullyOpaque: z.boolean()
	})
});

export type RenderOptionsForm = z.infer<typeof renderOptionsFormSchema>;
