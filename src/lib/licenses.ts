import generatedLicenses from '../licenses.json';

export type License = {
	name: string;
	version: string;
	license: string;
	licenseText: string;
	url: string;
};

export const licenses: License[] = generatedLicenses;
