import 'dotenv/config';
import { hash } from 'hasha';
import klaw from 'klaw';
import fs from 'node:fs';
import path from 'pathe';

// Run this script from the root of the project.

type PullZonesList = { Items: { Id: string; Name: string }[] };

const deploy = async () => {
	const apiKey = process.env.BUNNY_API_KEY!;
	const storageZoneHostname = process.env.BUNNY_STORAGE_ZONE_HOSTNAME!;
	const storageZoneName = process.env.BUNNY_STORAGE_ZONE_NAME!;
	const storageZonePassword = process.env.BUNNY_STORAGE_ZONE_PASSWORD!;
	const pullZoneName = process.env.BUNNY_PULL_ZONE_NAME!;
	const buildDir = path.join(process.cwd(), 'build');

	console.log('Deploying to Bunny.net...');

	const clearStorageZone = async () => {
		const endpoint = `https://${storageZoneHostname}/${storageZoneName}/`;

		// Clear the storage zone.
		// THIS DELETES ALL THE FILES IN THE STORAGE ZONE!
		await fetch(endpoint, {
			method: 'DELETE',
			headers: { AccessKey: storageZonePassword }
		});

		// Wait a little.
		await new Promise((r) => setTimeout(r, 500));

		// Check if the storage zone was cleared.
		const res = await fetch(endpoint, {
			method: 'GET',
			headers: { accept: 'application/json', AccessKey: storageZonePassword }
		});
		const data = await res.json();
		const isEmptyArray = Array.isArray(data) && data.length === 0;
		if (!isEmptyArray) {
			throw new Error('clearStorageZone: failed to clear storage zone');
		}
		console.log('clearStorageZone: cleared storage zone');
	};

	await clearStorageZone();

	const uploadFilesToStorageZone = async () => {
		let numFiles = 0;
		for await (const file of klaw(buildDir)) {
			if (file.stats.isDirectory()) {
				continue;
			}
			const filePath = path.normalize(file.path);
			const targetPath = filePath.replace(`${buildDir}/`, '');
			const fileData = fs.readFileSync(file.path);
			const fileHash = (await hash(fileData, { algorithm: 'sha256' })).toUpperCase();
			const res = await fetch(`https://${storageZoneHostname}/${storageZoneName}/${targetPath}`, {
				method: 'PUT',
				headers: {
					Checksum: fileHash,
					'content-type': 'application/octet-stream',
					AccessKey: storageZonePassword
				},
				body: fileData
			});
			if (res.status >= 400) {
				throw new Error(`uploadFilesToStorageZone: failed to upload file: ${targetPath}`);
			}
			console.log(`uploadFilesToStorageZone: uploaded file: ${targetPath}`);
			numFiles += 1;
		}
		console.log(`uploadFilesToStorageZone: uploaded ${numFiles} files`);
	};

	await uploadFilesToStorageZone();

	const getPullZoneId = async () => {
		const res = await fetch(
			`https://api.bunny.net/pullzone?page=1&perPage=1000&search=${pullZoneName}&includeCertificate=false`,
			{
				method: 'GET',
				headers: { accept: 'application/json', AccessKey: apiKey }
			}
		);
		if (res.status >= 400) {
			throw new Error('getPullZoneId: failed to get id for pull zone');
		}
		const pullZones = (await res.json()) as PullZonesList;
		const pullZoneId = pullZones.Items.find((item) => item.Name === pullZoneName)?.Id;
		if (!pullZoneId) {
			throw new Error('getPullZoneId: cannot find pull zone in list');
		}
		console.log('getPullZoneId: found pull zone id');
		return pullZoneId;
	};

	const pullZoneId = await getPullZoneId();

	const purgePullZoneCache = async () => {
		const res = await fetch(`https://api.bunny.net/pullzone/${pullZoneId}/purgeCache`, {
			method: 'POST',
			headers: { 'content-type': 'application/json', AccessKey: apiKey }
		});
		if (res.status >= 400) {
			throw new Error('purgePullZoneCache: failed to purge pull zone cache');
		}
		console.log('purgePullZoneCache: purged pull zone cache');
	};

	await purgePullZoneCache();
};

deploy()
	.then(() => {
		console.log('Done deploying.');
		process.exit(0);
	})
	.catch((e) => {
		console.error('Error deploying:');
		console.error(e);
		process.exit(1);
	});
