export const projectName = 'gridify.it';
export const baseUrl = `https://www.gridify.it`;
export const githubUrl = `https://github.com/velut/${projectName}`;
export const githubIssuesUrl = `${githubUrl}/issues`;

export const pageTitle = (title: string) => {
	return `${title} | ${projectName}`;
};

export const pageUrl = (path: string) => {
	return path === '' ? baseUrl : `${baseUrl}/${path}`;
};
