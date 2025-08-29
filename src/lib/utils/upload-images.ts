import accept from 'attr-accept';
import { fromEvent } from 'file-selector';
import { type Image } from '$lib/types';

export async function uploadImages(event: Event): Promise<Image[]> {
	return (await fromEvent(event))
		.filter((res) => res instanceof File)
		.filter((file) => accept(file, 'image/*'))
		.map((file) => ({ file, url: URL.createObjectURL(file) }));
}
