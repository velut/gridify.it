import { getContext, setContext } from 'svelte';

export type Theme = 'light' | 'dark';

const key = Symbol('theme-state');

export function setThemeStateContext(state: ThemeState) {
	setContext(key, state);
}

export function getThemeStateContext(): ThemeState {
	return getContext(key);
}

export class ThemeState {
	#theme = $state<Theme>('light');

	get theme(): Theme {
		return this.#theme;
	}

	constructor() {
		$effect(() => {
			if (document.documentElement.classList.contains('dark')) {
				this.#theme = 'dark';
			} else {
				this.#theme = 'light';
			}
		});
	}

	toggle() {
		if (document.documentElement.classList.contains('dark')) {
			this.#theme = 'light';
			localStorage.theme = 'light';
			document.documentElement.classList.remove('dark');
		} else {
			this.#theme = 'dark';
			localStorage.theme = 'dark';
			document.documentElement.classList.add('dark');
		}
	}
}
