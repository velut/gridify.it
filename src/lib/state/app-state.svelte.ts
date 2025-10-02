import { PreviewState } from '$lib/state/preview-state.svelte';
import { RenderState } from '$lib/state/render-state.svelte';
import { getContext, setContext } from 'svelte';

const key = Symbol('app-state');

export function setAppState(state: AppState) {
	setContext(key, state);
}

export function getAppState(): AppState {
	return getContext(key);
}

export class AppState {
	render = new RenderState();
	preview = new PreviewState(this.render);
}
