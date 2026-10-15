/**
 * Theme Switcher Script
 * Controls Dark and Light Mode with LocalStorage persistence
 */

(function () {
  const THEME_KEY = 'portfolio_theme';
  const root = document.documentElement;

  // Initialize theme from saved preference or default to dark
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    setTheme(savedTheme);
  }

  // Set theme attributes and update icon
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcon(theme);
  }

  // Update button icon (Moon for dark, Sun for light)
  function updateThemeIcon(theme) {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'light') {
          icon.className = 'fa-solid fa-moon';
          btn.setAttribute('title', 'สลับเป็นโหมดมืด (Dark Mode)');
        } else {
          icon.className = 'fa-solid fa-sun';
          btn.setAttribute('title', 'สลับเป็นโหมดสว่าง (Light Mode)');
        }
      }
    });
  }

  // Toggle between dark and light
  function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  // Event listener setup
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', toggleTheme);
    });
  });

  // Expose to window if needed
  window.toggleTheme = toggleTheme;
})();

