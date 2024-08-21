
// Dark Mode toggle
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    toggleButton.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        let theme = 'light';
        
        if (body.classList.contains('dark-mode')) {
            theme = 'dark';
        }

        // Save the user preference in localStorage
        localStorage.setItem('theme', theme);
    });
});






// The button on left corner of screen to scroll to the top of the screen 
document.querySelector('.go-up a').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    window.scrollTo({
        top: 0, // Scroll to the top of the page
        behavior: 'smooth' // Smooth scrolling
    });
});









