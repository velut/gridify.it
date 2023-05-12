export const projectName = 'pic2grid';
export const baseUrl = `https://${projectName}.vercel.app`;
export const githubUrl = `https://github.com/velut/${projectName}`;
export const githubIssuesUrl = `https://github.com/velut/${projectName}/issues`;

export const pageTitle = (title: string) => {
	return `${title} | ${projectName}`;
};

export const pageUrl = (path: string) => {
	return path === '' ? baseUrl : `${baseUrl}/${path}`;
};
