import { hexColorRegex } from '$lib/hex-color-regex';
import { z } from 'zod';

const toInt = (value: string) => parseInt(value, 10);

const isZeroOrMore = (value: string) => {
	const number = toInt(value);
	return !isNaN(number) && number >= 0;
};

const isOneOrMore = (value: string) => {
	const number = toInt(value);
	return !isNaN(number) && number >= 1;
};

const gridTypeSchema = z.enum(['none', 'inner', 'outer', 'full']);

const gridStrokeSizeSchema = z
	.string()
	.refine(isOneOrMore, { message: 'Grid stroke size must be an integer number like 1, 2, 3.' });

const gridStrokeColorSchema = z.string().regex(hexColorRegex);

const gridSchema = z.object({
	type: gridTypeSchema,
	strokeSize: gridStrokeSizeSchema,
	strokeColor: gridStrokeColorSchema
});

const gridValuesSchema = z.object({
	type: gridTypeSchema,
	strokeSize: gridStrokeSizeSchema.transform(toInt),
	strokeColor: gridStrokeColorSchema
});

const cellSizeSchema = z
	.string()
	.refine(isOneOrMore, { message: 'Cell size must be an integer number like 1, 2, 3.' });

const cellScaleSchema = z.string().refine(isOneOrMore, {
	message: 'Cell scale multiplier must be an integer number like 1, 2, 3.'
});

const cellRadiusSchema = z.string().refine(isZeroOrMore, {
	message: 'Cell border radius must be an integer number like 0, 1, 2, 3.'
});

const cellSchema = z.object({
	size: cellSizeSchema,
	scale: cellScaleSchema,
	radius: cellRadiusSchema
});

const cellValuesSchema = z.object({
	size: cellSizeSchema.transform(toInt),
	scale: cellScaleSchema.transform(toInt),
	radius: cellRadiusSchema.transform(toInt)
});

const pixelFullyOpaqueSchema = z.boolean();

const pixelSchema = z.object({
	fullyOpaque: pixelFullyOpaqueSchema
});

export const renderOptionsFormSchema = z.object({
	grid: gridSchema,
	cell: cellSchema,
	pixel: pixelSchema
});

export const renderOptionsFormValuesSchema = z.object({
	grid: gridValuesSchema,
	cell: cellValuesSchema,
	pixel: pixelSchema
});

export type RenderOptionsForm = z.infer<typeof renderOptionsFormSchema>;
export type RenderOptionsFormValues = z.infer<typeof renderOptionsFormValuesSchema>;
