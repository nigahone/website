document.addEventListener("DOMContentLoaded", function() {
    const slider = document.querySelector('.slider-s');
    const slides = document.querySelectorAll('.slide-s');
    const dots = document.querySelectorAll('.dot-s');
    const prevButton = document.querySelector('.prev-button-s');
    const nextButton = document.querySelector('.next-button-s');
    let currentIndex = 1;
    const totalSlides = slides.length;

    // Clone the first and last slide
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);

    // Add classes to cloned slides for easier tracking
    firstClone.classList.add('first-clone-s');
    lastClone.classList.add('last-clone-s');

    // Append the clones to the slider
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    // Set the initial position of the slider
    slider.style.transform = `translateX(-100%)`;

    let slideInterval = setInterval(showNextSlide, 10000); // Auto-slide interval

    function updateDots() {
        const normalizedIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active-s', index === normalizedIndex);
        });
    }

    function showSlide(index) {
        slider.style.transition = 'transform 1s ease-in-out';
        slider.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;

        // Ensure the dots are updated
        updateDots();
    }

    function showNextSlide() {
        currentIndex++;
        showSlide(currentIndex);

        if (currentIndex === totalSlides + 1) {
            setTimeout(() => {
                slider.style.transition = 'none';
                slider.style.transform = `translateX(-100%)`;
                currentIndex = 1;
            }, 500); // Transition duration matches the CSS transition time
        }
    }

    function showPrevSlide() {
        currentIndex--;
        showSlide(currentIndex);

        if (currentIndex === 0) {
            setTimeout(() => {
                slider.style.transition = 'none';
                slider.style.transform = `translateX(-${totalSlides * 100}%)`;
                currentIndex = totalSlides;
            }, 500);
        }
    }

    // Add event listeners for the navigation buttons
    prevButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        showPrevSlide();
        slideInterval = setInterval(showNextSlide, 2000); // Restart auto-slide
    });

    nextButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        showNextSlide();
        slideInterval = setInterval(showNextSlide, 2000); // Restart auto-slide
    });

    // Add event listeners for the dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index + 1); // Adjust index to account for the clone
            slideInterval = setInterval(showNextSlide, 2000); // Restart auto-slide
        });
    });

    // Initialize the slider
    showSlide(currentIndex);
});
