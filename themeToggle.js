// apply theme before rendering
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById('theme-toggle');

    // set icon based on theme
    themeToggle.textContent = savedTheme === 'dark' ? '🌜' : '🌞';

    function toggleTheme() {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '🌜';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌞';
        }
    }

    themeToggle.addEventListener('click', toggleTheme);
});