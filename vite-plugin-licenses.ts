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
		licenseText:
			'MIT License\n\nCopyright (c) Tailwind Labs, Inc.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.',
		url: 'https://github.com/tailwindlabs/tailwindcss-typography'
	},
	{
		name: 'daisyui',
		version: packageJson.devDependencies['daisyui'].replace('^', ''),
		license: 'MIT',
		licenseText:
			'MIT License\n\nCopyright (c) 2020 Pouya Saadeghi\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.',
		url: 'https://daisyui.com'
	},
	{
		name: 'modern-normalize',
		version: packageJson.devDependencies['modern-normalize'].replace('^', ''),
		license: 'MIT',
		licenseText:
			'MIT License\n\nCopyright (c) Nicolas Gallagher\nCopyright (c) Jonathan Neal\nCopyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.',
		url: 'https://github.com/sindresorhus/modern-normalize'
	},
	{
		name: 'tailwindcss',
		version: packageJson.devDependencies['tailwindcss'].replace('^', ''),
		license: 'MIT',
		licenseText:
			'MIT License\n\nCopyright (c) Tailwind Labs, Inc.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.',
		url: 'https://tailwindcss.com'
	},
	{
		name: 'twemoji',
		version: '14.0.2',
		license: 'MIT, CC-BY-4.0',
		licenseText:
			'Copyright 2020 Twitter, Inc and other contributors\nCode licensed under the MIT License: http://opensource.org/licenses/MIT\nGraphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/',
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
