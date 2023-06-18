import { sveltekit } from '@sveltejs/kit/vite';
import { execSync } from 'child_process';
import { defineConfig } from 'vitest/config';
import { licenses } from './vite-plugin-licenses';

export default defineConfig({
	plugins: [sveltekit(), licenses()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	define: {
		_GIT_COMMIT: JSON.stringify(execSync('git rev-parse HEAD').toString().trim())
	}
});
