const name = 'pic2grid';

export const pageTitle = (title: string) => {
	return `${title} | ${name}`;
};

export const pageUrl = (path: string) => {
	const baseUrl = `https://${name}.vercel.app`;
	return path === '' ? baseUrl : `${baseUrl}/${path}`;
};
