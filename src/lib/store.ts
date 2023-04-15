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

	const setLoading = (value: boolean) => {
		update((state) => {
			state.loading = value;
			return state;
		});
	};

	const loadImages = async (files: File[]) => {
		setLoading(true);
		console.log(files);
		setLoading(false);
	};

	return { subscribe, loadImages };
};

export const store = createStore();
