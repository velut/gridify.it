import { ImagesState } from '$lib/state/images-state.svelte';
import { PreviewState } from '$lib/state/preview-state.svelte';
import { RenderOptsState } from '$lib/state/render-opts-state.svelte';
import { getContext, setContext } from 'svelte';

const key = Symbol('app-state');

export function setAppState(state: AppState) {
	setContext(key, state);
}

export function getAppState(): AppState {
	return getContext(key);
}

export class AppState {
	images = new ImagesState();
	renderOpts = new RenderOptsState();
	preview = new PreviewState();
}
