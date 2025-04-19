import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

try {
	console.log('deploying to bunny.net...');
	await deploy();
	console.log('done deploying');
	process.exit(0);
} catch (e) {
	console.error('error deploying:');
	console.error(e);
	process.exit(1);
}

async function deploy() {
	let apiKey = process.env.BUNNY_API_KEY!;
	let pullZoneId = process.env.BUNNY_PULL_ZONE_ID!;
	let storageZoneHostname = process.env.BUNNY_STORAGE_ZONE_HOSTNAME!;
	let storageZoneName = process.env.BUNNY_STORAGE_ZONE_NAME!;
	let storageZonePassword = process.env.BUNNY_STORAGE_ZONE_PASSWORD!;
	let storageZoneEndpoint = `https://${storageZoneHostname}/${storageZoneName}`;

	// Script must be run from the project's root.
	let buildDir = path.join(process.cwd(), 'build');

	await clearStorageZone(storageZoneEndpoint, storageZonePassword);
	await uploadFiles(buildDir, storageZoneEndpoint, storageZonePassword);
	await purgePullZoneCache(pullZoneId, apiKey);
}

async function clearStorageZone(endpoint: string, password: string) {
	console.log('clearStorageZone: clearing storage zone');

	// DELETE ALL FILES IN THE STORAGE ZONE.
	let storageRootDir = `${endpoint}/`;
	await fetch(storageRootDir, { method: 'DELETE', headers: { AccessKey: password } });

	// Check if the storage zone was cleared.
	await new Promise((r) => setTimeout(r, 500));
	let res = await fetch(storageRootDir, {
		method: 'GET',
		headers: { accept: 'application/json', AccessKey: password }
	});
	let data = await res.json();
	let isEmptyArray = Array.isArray(data) && data.length === 0;
	if (!isEmptyArray) {
		throw new Error('clearStorageZone: failed to clear storage zone');
	}
	console.log('clearStorageZone: cleared storage zone');
}

async function uploadFiles(buildDir: string, endpoint: string, password: string) {
	let entries = await fs.readdir(buildDir, { recursive: true, withFileTypes: true });
	let files = entries.filter((entry) => entry.isFile());
	let uploadedFilesCount = 0;
	for (let file of files) {
		let fsPath = path.join(file.parentPath, file.name);
		let relativePath = fsPath.replace(`${buildDir}/`, '');
		let storagePath = `${endpoint}/${relativePath}`;
		let data = await fs.readFile(fsPath);
		let hash = createHash('sha256').update(data).digest('hex').toUpperCase();
		let res = await fetch(storagePath, {
			method: 'PUT',
			headers: { Checksum: hash, 'content-type': 'application/octet-stream', AccessKey: password },
			body: data
		});
		if (res.status >= 400) {
			throw new Error(`uploadFiles: failed to upload file: ${relativePath}`);
		}
		console.log(`uploadFiles: uploaded: ${relativePath}`);
		uploadedFilesCount += 1;
	}
	console.log(`uploadFiles: uploaded ${uploadedFilesCount} files`);
}

async function purgePullZoneCache(pullZoneId: string, apiKey: string) {
	let res = await fetch(`https://api.bunny.net/pullzone/${pullZoneId}/purgeCache`, {
		method: 'POST',
		headers: { 'content-type': 'application/json', AccessKey: apiKey }
	});
	if (res.status >= 400) {
		throw new Error('purgePullZoneCache: failed to purge pull zone cache');
	}
	console.log('purgePullZoneCache: purged pull zone cache');
}
