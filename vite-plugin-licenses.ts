import fs from 'node:fs/promises';
import rollupPluginLicense from 'rollup-plugin-license';
import packageJson from './package.json' with { type: 'json' };

type License = {
	name: string;
	version: string;
	license: string;
	licenseText: string;
	url: string;
};

export async function licenses() {
	// "Falsy plugins will be ignored, which can be used to easily activate or deactivate plugins."
	// See https://vitejs.dev/guide/api-plugin.html#plugins-config.
	if (process.env.NODE_ENV !== 'production') {
		return false;
	}

	const manualDeps: License[] = [
		{
			name: '@tailwindcss/typography',
			version: packageJson.devDependencies['@tailwindcss/typography'].replace('^', ''),
			license: 'MIT',
			licenseText: await fs.readFile('./node_modules/@tailwindcss/typography/LICENSE', {
				encoding: 'utf-8'
			}),
			url: 'https://github.com/tailwindlabs/tailwindcss-typography'
		},
		{
			name: 'daisyui',
			version: packageJson.devDependencies['daisyui'].replace('^', ''),
			license: 'MIT',
			licenseText: await fs.readFile('./node_modules/daisyui/LICENSE', { encoding: 'utf-8' }),
			url: 'https://daisyui.com'
		},
		{
			name: 'tailwindcss',
			version: packageJson.devDependencies['tailwindcss'].replace('^', ''),
			license: 'MIT',
			licenseText: await fs.readFile('./node_modules/tailwindcss/LICENSE', { encoding: 'utf-8' }),
			url: 'https://tailwindcss.com'
		},
		{
			name: 'Noto Emoji',
			version: '16.0',
			license: 'Apache-2.0',
			licenseText: await fs.readFile('./third-party-licenses/noto-emoji/license.txt', {
				encoding: 'utf-8'
			}),
			url: 'https://github.com/googlefonts/noto-emoji'
		}
	];

	// See https://github.com/vitejs/vite/discussions/7722 and
	// https://github.com/mjeanroy/rollup-plugin-license and
	// https://github.com/mjeanroy/rollup-plugin-license/issues/1362.
	return rollupPluginLicense({
		thirdParty: {
			includePrivate: false,
			allow: {
				test: 'MIT OR ISC OR 0BSD OR Apache-2.0',
				failOnUnlicensed: true,
				failOnViolation: true
			},
			output: {
				file: 'static/third-party-licenses.txt',
				template: (dependencies) => {
					const foundLicenses = dependencies.map(
						(dep): License => ({
							name: dep.name ?? '',
							version: dep.version ?? '',
							license: dep.license ?? '',
							licenseText: dep.licenseText ?? '',
							url: dep.homepage || (dep.name ? `https://www.npmjs.com/package/${dep.name}` : '')
						})
					);
					return [
						'',
						...[...manualDeps, ...foundLicenses]
							.sort((a, b) => a.name.localeCompare(b.name))
							.map((dep) =>
								[
									`${dep.name} - v${dep.version} - ${dep.license}`,
									dep.url,
									'',
									dep.licenseText.trim()
								].join('\n')
							),
						''
					].join(`\n\n${'='.repeat(50)}\n\n`);
				}
			}
		}
	});
}
