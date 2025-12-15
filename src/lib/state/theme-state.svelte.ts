import type { Theme } from '$lib/types';
import { createContext } from 'svelte';

export const [getThemeState, setThemeState] = createContext<ThemeState>();

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
