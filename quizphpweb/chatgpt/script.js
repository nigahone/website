// script.js
function toggleMenu() {
    const menu = document.getElementById('optionsMenu');
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// Close the menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.menu-button')) {
        const menu = document.getElementById('optionsMenu');
        if (menu.style.display === "block") {
            menu.style.display = "none";
        }
    }
}
