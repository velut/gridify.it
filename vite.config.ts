import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { execSync } from 'node:child_process';
import { visualizer } from 'rollup-plugin-visualizer';
import Icons from 'unplugin-icons/vite';
import { defineConfig, perEnvironmentPlugin } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { licenses } from './vite-plugin-licenses';

export default defineConfig({
	plugins: [
		devtoolsJson(),
		tailwindcss(),
		sveltekit(),
		Icons({ compiler: 'svelte' }),
		perEnvironmentPlugin('vite-plugin-licenses', (environment) => {
			if (environment.name !== 'client') return false;
			return licenses() as any;
		}),
		visualizer({ emitFile: true, filename: 'stats.html' })
	],
	define: {
		__GIT_COMMIT: JSON.stringify(execSync('git rev-parse HEAD').toString().trim())
	}
});
