// Dark mode script for DaisyUI; based on https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection
// See `src/app.html`.
`
if (
  localStorage.theme === 'dark' ||
  (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.setAttribute('data-theme', 'dark');
  document.documentElement.classList.add('c_darkmode');
} else {
  document.documentElement.setAttribute('data-theme', 'light');
  document.documentElement.classList.remove('c_darkmode');
}
`;

export {};
