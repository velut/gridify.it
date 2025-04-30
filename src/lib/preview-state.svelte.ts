import type { PreviewMode } from '$lib/types';

export class PreviewState {
	mode = $state<PreviewMode>('pixel-art');
}
