/* =============================================
   OpenPage — Dark Mode Toggle Module
   Persists preference in localStorage,
   respects system preference on first visit.
   ============================================= */

const STORAGE_KEY = 'openpage-theme';
const ATTR = 'data-theme';
const DARK = 'dark';
const LIGHT = 'light';

/**
 * Get the preferred theme, checking localStorage first,
 * then falling back to system preference.
 */
function getPreferredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === DARK || stored === LIGHT) {
    return stored;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
}

/**
 * Apply theme to the document root
 */
function applyTheme(theme) {
  document.documentElement.setAttribute(ATTR, theme);

  // Update theme-color meta tag for browser chrome
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.content = theme === DARK ? '#0f172a' : '#1a2a6c';
  }

  // Update toggle button icon
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    const isDark = theme === DARK;
    toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    toggle.innerHTML = isDark
      ? `<img src="/icons/sun.svg" alt="" width="20" height="20" aria-hidden="true" />`
      : `<img src="/icons/moon.svg" alt="" width="20" height="20" aria-hidden="true" />`;
  }

}

/**
 * Toggle between dark and light
 */
function toggleTheme() {
  const current = document.documentElement.getAttribute(ATTR) || LIGHT;
  const next = current === DARK ? LIGHT : DARK;
  localStorage.setItem(STORAGE_KEY, next);
  applyTheme(next);
}

/**
 * Initialize theme on page load
 */
export function initTheme() {
  const theme = getPreferredTheme();
  applyTheme(theme);

  // Set up toggle button listener
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', toggleTheme);
  }

  // Listen for system preference changes (only if user hasn't set a manual preference)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? DARK : LIGHT);
    }
  });
}