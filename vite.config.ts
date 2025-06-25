import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { execSync } from 'node:child_process';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
	plugins: [
		devtoolsJson(),
		tailwindcss(),
		sveltekit(),
		Icons({ compiler: 'svelte' }),
		isProduction && ((await import('./vite-plugin-licenses')).licenses() as any)
	],
	define: {
		__GIT_COMMIT: JSON.stringify(execSync('git rev-parse HEAD').toString().trim())
	}
});
