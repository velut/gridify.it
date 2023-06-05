import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Run this script from the root of the project.
const filePath = join(process.cwd(), 'src/licenses.json');

const ensureLicensesJson = () => {
	if (!existsSync(filePath)) {
		writeFileSync(filePath, '[]\n', 'utf8');
	}
};

ensureLicensesJson();
