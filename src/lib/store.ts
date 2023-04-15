import type { Image } from '$lib/image';
import { writable } from 'svelte/store';

export type Store = {
	loading: boolean;
	inputImages: Image[];
	outputImages: Image[];
};

const createStore = () => {
	const { subscribe, set, update } = writable<Store>({
		loading: false,
		inputImages: [],
		outputImages: []
	});

	return { subscribe };
};

export const store = createStore();
