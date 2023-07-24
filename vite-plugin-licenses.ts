import fs from 'node:fs';
import rollupPluginLicense from 'rollup-plugin-license';
import type { PluginOption } from 'vite';
import packageJson from './package.json';

type License = {
	name: string;
	version: string;
	license: string;
	licenseText: string;
	url: string;
};

const registryUrl = 'https://www.npmjs.com/package';

const manualLicenses: License[] = [
	{
		name: '@tailwindcss/typography',
		version: packageJson.devDependencies['@tailwindcss/typography'].replace('^', ''),
		license: 'MIT',
		licenseText: fs.readFileSync('./node_modules/@tailwindcss/typography/LICENSE').toString(),
		url: 'https://github.com/tailwindlabs/tailwindcss-typography'
	},
	{
		name: 'daisyui',
		version: packageJson.devDependencies['daisyui'].replace('^', ''),
		license: 'MIT',
		licenseText: fs.readFileSync('./node_modules/daisyui/LICENSE').toString(),
		url: 'https://daisyui.com'
	},
	{
		name: 'modern-normalize',
		version: packageJson.devDependencies['modern-normalize'].replace('^', ''),
		license: 'MIT',
		licenseText: fs.readFileSync('./node_modules/modern-normalize/license').toString(),
		url: 'https://github.com/sindresorhus/modern-normalize'
	},
	{
		name: 'tailwindcss',
		version: packageJson.devDependencies['tailwindcss'].replace('^', ''),
		license: 'MIT',
		licenseText: fs.readFileSync('./node_modules/tailwindcss/LICENSE').toString(),
		url: 'https://tailwindcss.com'
	},
	{
		name: 'twemoji',
		version: '14.0.2',
		license: 'MIT, CC-BY-4.0',
		licenseText: fs.readFileSync('./third-party-licenses/twemoji/license.txt').toString(),
		url: 'https://twemoji.twitter.com/'
	}
];

export const licenses = () => {
	// "Falsy plugins will be ignored, which can be used to easily activate or deactivate plugins."
	// See https://vitejs.dev/guide/api-plugin.html#plugins-config.
	if (process.env.GENERATE_LICENSES !== 'true') {
		return false;
	}

	// See https://github.com/vitejs/vite/discussions/7722 and
	// https://github.com/mjeanroy/rollup-plugin-license and
	// https://github.com/mjeanroy/rollup-plugin-license/issues/1362.
	return {
		...rollupPluginLicense({
			thirdParty: {
				includePrivate: false,
				allow: {
					test: 'MIT OR ISC OR 0BSD',
					failOnUnlicensed: true,
					failOnViolation: true
				},
				output: {
					file: 'src/licenses.json',
					template: (dependencies) => {
						const foundLicenses = dependencies.map(
							(dep): License => ({
								name: dep.name ?? '',
								version: dep.version ?? '',
								license: dep.license ?? '',
								licenseText: dep.licenseText ?? '',
								url: dep.homepage || (dep.name ? `${registryUrl}/${dep.name}` : '')
							})
						);
						const allLicenses: License[] = [...manualLicenses, ...foundLicenses].sort((a, b) =>
							a.name.localeCompare(b.name)
						);
						return JSON.stringify(allLicenses, null, 2);
					}
				}
			}
		})
	} satisfies PluginOption;
};
