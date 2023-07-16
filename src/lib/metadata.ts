export const projectName = 'gridify.it';
export const projectNameEscaped = 'gridify_it';
export const baseUrl = `https://www.gridify.it`;
export const githubUrl = `https://github.com/velut/${projectName}`;
export const githubIssuesUrl = `${githubUrl}/issues`;
export const githubCommit = _GIT_COMMIT;
export const githubCommitShort = githubCommit.slice(0, 7);
export const githubCommitUrl = `${githubUrl}/commit/${githubCommit}`;

export const pageTitle = (title: string) => {
	return `${title} | ${projectName}`;
};

export const pageUrl = (path: string) => {
	return path === '' ? baseUrl : `${baseUrl}/${path}/`;
};
