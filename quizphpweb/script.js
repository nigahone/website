
// Dark Mode toggle for all pages
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

// Taking user input and mapping to these js script to make a separate container for page createslide.html
let index = 1; // Ensure this is declared outside

document.getElementById('done-button').addEventListener('click', function () {
    // Check if there are no slides and reset index
    const slidesContainer = document.getElementById('slides-container');
    if (slidesContainer.children.length === 0) {
        index = 1;
    }

    // Get the input values from the text area and input fields
    const project_Title = document.getElementsByClassName('ProjectTitle')[0].value;
    const questionText = document.getElementById('quiz-title-input').value;
    const answerTexti = document.getElementsByClassName('answer-input-i')[0].value;
    const answerTextii = document.getElementsByClassName('answer-input-ii')[0].value;
    const answerTextiii = document.getElementsByClassName('answer-input-iii')[0].value;
    const answerTextiv = document.getElementsByClassName('answer-input-iv')[0].value;
    const factText = document.getElementsByClassName('facts-descipt')[0].value;

    // Create a new slide div
    const newSlide = document.createElement('div');
    newSlide.classList.add('create-slide');

    // Create the slide content using the existing format
    newSlide.innerHTML = `
        <div class="draggable-box">
            This is draggable box
            <button class="dragable-options">
                <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
        </div>
        <div class="options-menu" style="display: none;">
            <button class="edit-slide">Edit</button>
            <button class="delete-slide">Delete</button>
        </div>
        <div class="question">
            <h2 class="slide-SN">${index++}</h2>
            <h2 class="quesiton-Sn">${questionText}</h2>
        </div>
        <div class="answers">
            i. <h2 class="ans-i">${answerTexti}</h2>
            ii. <h2 class="ans-ii">${answerTextii}</h2>
            <br>
            iii. <h2 class="ans-iii">${answerTextiii}</h2>
            iv. <h2 class="ans-iv">${answerTextiv}</h2>
            <br>
        </div>
        <div class="facts-des">
            <h3>Did you knew?</h3>
            <h4 class="desh3">${factText}</h4>
        </div>
    `;

    // Append the new slide to the container
    slidesContainer.appendChild(newSlide);

    // Add event listener to the options button
    const optionsButton = newSlide.querySelector('.dragable-options');
    const optionsMenu = newSlide.querySelector('.options-menu');

    optionsButton.addEventListener('click', function () {
        // Toggle visibility of the options menu
        optionsMenu.style.display = optionsMenu.style.display === 'none' ? 'block' : 'none';
    });

    // Add functionality to the edit button
    const editButton = optionsMenu.querySelector('.edit-slide');
    editButton.addEventListener('click', function () {
        // Capture the current content
        const currentQuestion = newSlide.querySelector('.quesiton-Sn').innerText;
        const currentAnsweri = newSlide.querySelector('.ans-i').innerText;
        const currentAnswerii = newSlide.querySelector('.ans-ii').innerText;
        const currentAnsweriii = newSlide.querySelector('.ans-iii').innerText;
        const currentAnsweriv = newSlide.querySelector('.ans-iv').innerText;
        const currentFact = newSlide.querySelector('.desh3').innerText;

        // Populate the input fields with the current content
        document.getElementById('quiz-title-input').value = currentQuestion;
        document.getElementsByClassName('answer-input-i')[0].value = currentAnsweri;
        document.getElementsByClassName('answer-input-ii')[0].value = currentAnswerii;
        document.getElementsByClassName('answer-input-iii')[0].value = currentAnsweriii;
        document.getElementsByClassName('answer-input-iv')[0].value = currentAnsweriv;
        document.getElementsByClassName('facts-descipt')[0].value = currentFact;

        // Ensure the "Done" button updates the slide, not create a new one
        const doneButton = document.getElementById('done-button');
        doneButton.removeEventListener('click', updateSlide); // Remove any previous updateSlide listener
        doneButton.addEventListener('click', function updateSlide() {
            // Get the updated input values
            const updatedQuestion = document.getElementById('quiz-title-input').value;
            const updatedAnsweri = document.getElementsByClassName('answer-input-i')[0].value;
            const updatedAnswerii = document.getElementsByClassName('answer-input-ii')[0].value;
            const updatedAnsweriii = document.getElementsByClassName('answer-input-iii')[0].value;
            const updatedAnsweriv = document.getElementsByClassName('answer-input-iv')[0].value;
            const updatedFact = document.getElementsByClassName('facts-descipt')[0].value;

            // Update the slide content with the new values
            newSlide.querySelector('.quesiton-Sn').innerText = updatedQuestion;
            newSlide.querySelector('.ans-i').innerText = updatedAnsweri;
            newSlide.querySelector('.ans-ii').innerText = updatedAnswerii;
            newSlide.querySelector('.ans-iii').innerText = updatedAnsweriii;
            newSlide.querySelector('.ans-iv').innerText = updatedAnsweriv;
            newSlide.querySelector('.desh3').innerText = updatedFact;

            // Remove the event listener to prevent multiple updates
            doneButton.removeEventListener('click', updateSlide);

            // Clear the input fields after updating
            clearInputFields();
        });
    });

    // Add functionality to the delete button
    const deleteButton = optionsMenu.querySelector('.delete-slide');
    deleteButton.addEventListener('click', function () {
        // Remove the slide
        newSlide.remove();

        // Recalculate the slide indexes
        updateIndexes();
    });

    // Clear the input fields after appending
    clearInputFields();
});

function updateIndexes() {
    // Get all the slide elements
    const slides = document.querySelectorAll('.create-slide');
    let currentIndex = 1;

    // Update the index for each slide
    slides.forEach((slide) => {
        const slideNumberElement = slide.querySelector('.slide-SN');
        slideNumberElement.innerText = currentIndex++;
    });

    // Update the global index to reflect the next available number
    index = currentIndex;
}

function clearInputFields() {
    document.getElementById('quiz-title-input').value = '';
    document.getElementsByClassName('answer-input-i')[0].value = '';
    document.getElementsByClassName('answer-input-ii')[0].value = '';
    document.getElementsByClassName('answer-input-iii')[0].value = '';
    document.getElementsByClassName('answer-input-iv')[0].value = '';
    document.getElementsByClassName('facts-descipt')[0].value = '';
}

//save functionality
document.getElementById('save-button').addEventListener('click', function () {
    // Get all the slides
    const slides = document.querySelectorAll('.create-slide');
    const savedSlides = [];

    slides.forEach((slide) => {
        const slideData = {
            question: slide.querySelector('.quesiton-Sn').innerText,
            answeri: slide.querySelector('.ans-i').innerText,
            answerii: slide.querySelector('.ans-ii').innerText,
            answeriii: slide.querySelector('.ans-iii').innerText,
            answeriv: slide.querySelector('.ans-iv').innerText,
            fact: slide.querySelector('.desh3').innerText
        };

        // Push the slide data to the savedSlides array
        savedSlides.push(slideData);
    });

    // Save the slides to localStorage
    localStorage.setItem('savedSlides', JSON.stringify(savedSlides));

    alert('Slides saved successfully!');
});
// Saved load functionality
window.addEventListener('load', function () {
    const savedSlides = JSON.parse(localStorage.getItem('savedSlides'));

    if (savedSlides) {
        savedSlides.forEach((slideData, index) => {
            const newSlide = document.createElement('div');
            newSlide.classList.add('create-slide');
            newSlide.innerHTML = `
                <div class="draggable-box">
                    This is draggable box
                    <button class="dragable-options">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                </div>
                <div class="options-menu" style="display: none;">
                    <button class="edit-slide">Edit</button>
                    <button class="delete-slide">Delete</button>
                </div>
                <div class="question">
                    <h2 class="slide-SN">${index + 1}</h2>
                    <h2 class="quesiton-Sn">${slideData.question}</h2>
                </div>
                <div class="answers">
                    i. <h2 class="ans-i">${slideData.answeri}</h2>
                    ii. <h2 class="ans-ii">${slideData.answerii}</h2>
                    <br>
                    iii. <h2 class="ans-iii">${slideData.answeriii}</h2>
                    iv. <h2 class="ans-iv">${slideData.answeriv}</h2>
                    <br>
                </div>
                <div class="facts-des">
                    <h3>Did you knew?</h3>
                    <h4 class="desh3">${slideData.fact}</h4>
                </div>
            `;
            document.getElementById('slides-container').appendChild(newSlide);
        });

        // Recalculate the index
        updateIndexes();
    }
});



document.addEventListener('DOMContentLoaded', function () {
    const draggable = document.querySelector('.draggable-box');
    const container = document.querySelector('.create-slide');

    let isDragging = false;
    let startX, startY, initialX, initialY;

    draggable.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = draggable.offsetLeft;
        initialY = draggable.offsetTop;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newX = initialX + dx;
        let newY = initialY + dy;

        // Prevent the draggable box from going outside the container
        const rect = container.getBoundingClientRect();
        const boxRect = draggable.getBoundingClientRect();

        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX + boxRect.width > rect.width) newX = rect.width - boxRect.width;
        if (newY + boxRect.height > rect.height) newY = rect.height - boxRect.height;

        draggable.style.left = `${newX}px`;
        draggable.style.top = `${newY}px`;
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
});

document.getElementById('save-button').addEventListener('click', function () {
    // Get all the slides
    const slides = document.querySelectorAll('.create-slide');
    const savedSlides = [];

    slides.forEach((slide) => {
        const slideData = {
            question: slide.querySelector('.quesiton-Sn').innerText,
            answeri: slide.querySelector('.ans-i').innerText,
            answerii: slide.querySelector('.ans-ii').innerText,
            answeriii: slide.querySelector('.ans-iii').innerText,
            answeriv: slide.querySelector('.ans-iv').innerText,
            fact: slide.querySelector('.desh3').innerText
        };

        // Push the slide data to the savedSlides array
        savedSlides.push(slideData);
    });

    // Send the slides data to the server using a POST request
    fetch('save_slides.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(savedSlides),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Slides saved successfully!');
        } else {
            alert('Failed to save slides.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
