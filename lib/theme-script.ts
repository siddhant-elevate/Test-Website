// Inline, blocking script injected into <head> to set the theme class
// before React hydrates — this avoids a flash of the wrong theme.
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('elevate-theme');
    var theme = stored;
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;
