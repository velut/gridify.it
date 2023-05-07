import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { licenses } from './vite-plugin-licenses';

export default defineConfig({
	plugins: [sveltekit(), licenses()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
