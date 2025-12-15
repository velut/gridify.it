import { PreviewState } from '$lib/state/preview-state.svelte';
import { RenderState } from '$lib/state/render-state.svelte';
import { createContext } from 'svelte';

export const [getAppState, setAppState] = createContext<AppState>();

export class AppState {
	render = new RenderState();
	preview = new PreviewState(this.render);
}
