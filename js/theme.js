/**
 * Dark Mode Theme Toggle
 * Persists user preference to localStorage
 */

const THEME_KEY = 'theme-preference';
const DARK_MODE_CLASS = 'dark-mode';

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.htmlElement = document.documentElement;
    this.init();
  }

  init() {
    // Load saved preference or use system preference
    const savedTheme = this.getSavedTheme();
    const preferredTheme = savedTheme || this.getSystemTheme();
    
    this.setTheme(preferredTheme);
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!this.getSavedTheme()) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /**
   * Get user's saved theme preference from localStorage
   */
  getSavedTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  /**
   * Get system theme preference
   */
  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Set theme and update UI
   */
  setTheme(theme) {
    const isDark = theme === 'dark';
    
    if (isDark) {
      document.body.classList.add(DARK_MODE_CLASS);
      this.themeToggle.textContent = '☀️';
    } else {
      document.body.classList.remove(DARK_MODE_CLASS);
      this.themeToggle.textContent = '🌙';
    }

    localStorage.setItem(THEME_KEY, theme);
  }

  /**
   * Toggle between light and dark modes
   */
  toggleTheme() {
    const currentTheme = this.getSavedTheme() || this.getSystemTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}

// Initialize theme manager when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ThemeManager());
} else {
  new ThemeManager();
}
