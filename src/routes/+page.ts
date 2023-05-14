import { loadRenderOptionsSuperForm } from '$lib/load-render-options-super-form';
import type { PageLoad } from './$types';

export const load = (async () => {
	const renderOptionsSuperForm = await loadRenderOptionsSuperForm();
	return { renderOptionsSuperForm };
}) satisfies PageLoad;
