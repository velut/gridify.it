import { ImagesState } from '$lib/images-state.svelte';
import { PreviewState } from '$lib/preview-state.svelte';
import { RenderOptionsState } from '$lib/render-options-state.svelte';
import { getContext, setContext } from 'svelte';

let key = Symbol('app-state');

export function setAppStateContext(state: AppState) {
	setContext(key, state);
}

export function getAppStateContext(): AppState {
	return getContext(key);
}

export class AppState {
	images = new ImagesState();
	renderOptions = new RenderOptionsState();
	preview = new PreviewState();
}
