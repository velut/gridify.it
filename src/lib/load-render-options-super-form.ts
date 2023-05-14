import { renderOptionsSchema, type RenderOptionsSchema } from '$lib/render-options';
import type { Validation } from 'sveltekit-superforms';
import { superValidate } from 'sveltekit-superforms/client';

export type RenderOptionsSuperForm = Validation<RenderOptionsSchema>;

export const loadRenderOptionsSuperForm = async (): Promise<RenderOptionsSuperForm> => {
	const form = await superValidate(renderOptionsSchema);
	return form;
};
