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
	const apiKey = process.env.BUNNY_API_KEY!;
	const pullZoneId = process.env.BUNNY_PULL_ZONE_ID!;
	const storageZoneHostname = process.env.BUNNY_STORAGE_ZONE_HOSTNAME!;
	const storageZoneName = process.env.BUNNY_STORAGE_ZONE_NAME!;
	const storageZonePassword = process.env.BUNNY_STORAGE_ZONE_PASSWORD!;
	const storageZoneEndpoint = `https://${storageZoneHostname}/${storageZoneName}`;

	// Script must be run from the project's root.
	const buildDir = path.join(process.cwd(), 'build');

	await clearStorageZone(storageZoneEndpoint, storageZonePassword);
	await uploadFiles(buildDir, storageZoneEndpoint, storageZonePassword);
	await purgePullZoneCache(pullZoneId, apiKey);
}

async function clearStorageZone(endpoint: string, password: string) {
	console.log('clearStorageZone: clearing storage zone');

	// DELETE ALL FILES IN THE STORAGE ZONE.
	const storageRootDir = `${endpoint}/`;
	await fetch(storageRootDir, { method: 'DELETE', headers: { AccessKey: password } });

	// Check if the storage zone was cleared.
	await new Promise((r) => setTimeout(r, 500));
	const res = await fetch(storageRootDir, {
		method: 'GET',
		headers: { accept: 'application/json', AccessKey: password }
	});
	const data = await res.json();
	const isEmptyArray = Array.isArray(data) && data.length === 0;
	if (!isEmptyArray) {
		throw new Error('clearStorageZone: failed to clear storage zone');
	}
	console.log('clearStorageZone: cleared storage zone');
}

async function uploadFiles(buildDir: string, endpoint: string, password: string) {
	const entries = await fs.readdir(buildDir, { recursive: true, withFileTypes: true });
	const files = entries.filter((entry) => entry.isFile());
	let uploadedFilesCount = 0;
	for (const file of files) {
		const fsPath = path.join(file.parentPath, file.name);
		const relativePath = fsPath.replace(`${buildDir}/`, '');
		const storagePath = `${endpoint}/${relativePath}`;
		const data = await fs.readFile(fsPath);
		const hash = createHash('sha256').update(data).digest('hex').toUpperCase();
		const res = await fetch(storagePath, {
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
	const res = await fetch(`https://api.bunny.net/pullzone/${pullZoneId}/purgeCache`, {
		method: 'POST',
		headers: { 'content-type': 'application/json', AccessKey: apiKey }
	});
	if (res.status >= 400) {
		throw new Error('purgePullZoneCache: failed to purge pull zone cache');
	}
	console.log('purgePullZoneCache: purged pull zone cache');
}
