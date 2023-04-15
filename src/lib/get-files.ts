import accept from 'attr-accept';
import { fromEvent } from 'file-selector';

export const getFiles = async (event: unknown, type: string) => {
	const results = await fromEvent(event);
	return results.flatMap((result) => {
		if (result instanceof File && accept(result, type)) {
			return result;
		}
		return [];
	});
};
