
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
    //without projectName projectTitle input
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
            <h2 class="question-Sn">${questionText}</h2>
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
        const currentQuestion = newSlide.querySelector('.question-Sn').innerText;
        const currentAnsweri = newSlide.querySelector('.ans-i').innerText;
        const currentAnswerii = newSlide.querySelector('.ans-ii').innerText;
        const currentAnsweriii = newSlide.querySelector('.ans-iii').innerText;
        const currentAnsweriv = newSlide.querySelector('.ans-iv').innerText;
        const currentFact = newSlide.querySelector('.desh3').innerText;

        // Populate the input fields with the current content
        document.agetElementById('quiz-title-input').value = currentQuestion;
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
            newSlide.querySelector('.question-Sn').innerText = updatedQuestion;
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

function deleteSlideFromLocalStorage(slideIndex) {
    const savedSlides = JSON.parse(localStorage.getItem('savedSlides')) || [];
    savedSlides.splice(slideIndex, 1); // Remove the slide at the given index
    localStorage.setItem('savedSlides', JSON.stringify(savedSlides));
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-slide-local')) {
        const slide = event.target.closest('.create-slide');
        const slideIndex = Array.from(document.querySelectorAll('.create-slide')).indexOf(slide);

        deleteSlideFromLocalStorage(slideIndex);

        // Optionally update the UI as well
        slide.remove();
        updateIndexes();
    }
});
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-slide-ui')) {
        const slide = event.target.closest('.create-slide');

        // Remove the slide from the UI
        slide.remove();

        // Optionally update indexes if needed
        updateIndexes();
    }
});

// Add event listener for the Exit button
document.getElementById('exit-button').addEventListener('click', function () {
    // Confirm if the user wants to exit
    const confirmExit = confirm("Are you sure you want to exit? All unsaved changes will be lost.");

    if (confirmExit) {
        // Redirect to another page or perform the exit action
        window.location.href = 'index.html'; // Redirect to the home page or any other page
    }
});


document.getElementById('save-button').addEventListener('click', function () {
    const slides = document.querySelectorAll('.create-slide');
    const slideData = [];

    // Collect data from each slide
    slides.forEach(slide => {
        slideData.push({
            projectName: document.querySelector('.projectName').value,
            question: slide.querySelector('.question-Sn').innerText,
            answeri: slide.querySelector('.ans-i').innerText,
            answerii: slide.querySelector('.ans-ii').innerText,
            answeriii: slide.querySelector('.ans-iii').innerText,
            answeriv: slide.querySelector('.ans-iv').innerText,
            fact: slide.querySelector('.desh3').innerText
        });
    });

    // AJAX request to PHP script
    $.ajax({
        url: 'php/submit_quiz.php',
        type: 'POST',
        data: { slides: JSON.stringify(slideData) }, // Send the data as JSON
        success: function(response) {
            alert('Data saved to database successfully!');
        },
        error: function() {
            alert('Error saving data to database.');
        }
    });
});























// Script.js



// delete garera add garda index update vayena also edit button ko functionality harayo

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    toggleButton.addEventListener('click', function () {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    let index = 1;

    document.getElementById('done-button').addEventListener('click', function () {
        const slidesContainer = document.getElementById('slides-container');
        if (slidesContainer.children.length === 0) {
            index = 1;
        }

        const questionText = document.getElementById('quiz-title-input').value;
        const answerTexti = document.getElementsByClassName('answer-input-i')[0].value;
        const answerTextii = document.getElementsByClassName('answer-input-ii')[0].value;
        const answerTextiii = document.getElementsByClassName('answer-input-iii')[0].value;
        const answerTextiv = document.getElementsByClassName('answer-input-iv')[0].value;
        const factText = document.getElementsByClassName('facts-descipt')[0].value;

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
                    <h2 class="slide-SN">${index++}</h2>
                    <h2 class="question-Sn">${questionText}</h2>
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
                    <h3>Did you know?</h3>
                    <h4 class="desh3">${factText}</h4>
                </div>
            `;

        slidesContainer.appendChild(newSlide);
        clearInputFields();

        const optionsButton = newSlide.querySelector('.dragable-options');
        const optionsMenu = newSlide.querySelector('.options-menu');

        optionsButton.addEventListener('click', function () {
            optionsMenu.style.display = optionsMenu.style.display === 'none' ? 'block' : 'none';
        });

        const deleteButton = optionsMenu.querySelector('.delete-slide');
        deleteButton.addEventListener('click', function () {
            newSlide.remove();
            updateIndexes();
        });

        // Add functionality to the edit button
        const editButton = optionsMenu.querySelector('.edit-slide');
        editButton.addEventListener('click', function () {
            // Capture the current content
            const currentQuestion = newSlide.querySelector('.question-Sn').innerText;
            const currentAnsweri = newSlide.querySelector('.ans-i').innerText;
            const currentAnswerii = newSlide.querySelector('.ans-ii').innerText;
            const currentAnsweriii = newSlide.querySelector('.ans-iii').innerText;
            const currentAnsweriv = newSlide.querySelector('.ans-iv').innerText;
            const currentFact = newSlide.querySelector('.desh3').innerText;

            // Populate the input fields with the current content
            document.ageElementById('quiz-title-input').value = currentQuestion;
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
                newSlide.querySelector('.question-Sn').innerText = updatedQuestion;
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

        // Clear the input fields after appending
        // clearInputFields();
    });
});

document.getElementById('save-button').addEventListener('click', function () {
    const projectName = document.querySelector('.projectName').value;
    const slides = document.querySelectorAll('.create-slide');
    const slideData = [];

    slides.forEach(slide => {
        slideData.push({
            projectName,
            question: slide.querySelector('.question-Sn').innerText,
            answeri: slide.querySelector('.ans-i').innerText,
            answerii: slide.querySelector('.ans-ii').innerText,
            answeriii: slide.querySelector('.ans-iii').innerText,
            answeriv: slide.querySelector('.ans-iv').innerText,
            fact: slide.querySelector('.desh3').innerText
        });
    });

    $.ajax({
        url: 'php/submit_quiz.php',
        type: 'POST',
        data: { slides: JSON.stringify(slideData) },
        success: function (response) {
            alert('Data saved to database successfully!');
        },
        error: function () {
            alert('Error saving data to database.');
        }
    });
});

function updateIndexes() {
    const slides = document.querySelectorAll('.create-slide');
    let currentIndex = 1;

    slides.forEach(slide => {
        const slideNumberElement = slide.querySelector('.slide-SN');
        slideNumberElement.innerText = currentIndex++;
    });

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

function deleteSlideFromLocalStorage(slideIndex) {
    const savedSlides = JSON.parse(localStorage.getItem('savedSlides')) || [];
    savedSlides.splice(slideIndex, 1); // Remove the slide at the given index
    localStorage.setItem('savedSlides', JSON.stringify(savedSlides));
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-slide-local')) {
        const slide = event.target.closest('.create-slide');
        const slideIndex = Array.from(document.querySelectorAll('.create-slide')).indexOf(slide);

        deleteSlideFromLocalStorage(slideIndex);

        // Optionally update the UI as well
        slide.remove();
        updateIndexes();
    }
});


document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-slide-ui')) {
        const slide = event.target.closest('.create-slide');

        // Remove the slide from the UI
        slide.remove();

        // Optionally update indexes if needed
        updateIndexes();
    }
});

// Add event listener for the Exit button
document.getElementById('exit-button').addEventListener('click', function () {
    // Confirm if the user wants to exit
    const confirmExit = confirm("Are you sure you want to exit? All unsaved changes will be lost.");

    if (confirmExit) {
        // Redirect to another page or perform the exit action
        window.location.href = 'index.html'; // Redirect to the home page or any other page
    }
});
































// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    let index = 1; // Counter to keep track of the slide number
    let editMode = false; // Flag to check if we are in edit mode
    let currentSlide = null; // Stores the slide currently being edited

    // Event listener for the "Done" button to add or edit a slide
    document.getElementById('done-button').addEventListener('click', function () {
        const slidesContainer = document.getElementById('slides-container'); // Container for all slides
        const questionText = document.getElementById('quiz-title-input').value; // Get the question text
        const answerTexti = document.getElementsByClassName('answer-input-i')[0].value; // Get answer i
        const answerTextii = document.getElementsByClassName('answer-input-ii')[0].value; // Get answer ii
        const answerTextiii = document.getElementsByClassName('answer-input-iii')[0].value; // Get answer iii
        const answerTextiv = document.getElementsByClassName('answer-input-iv')[0].value; // Get answer iv
        const factText = document.getElementsByClassName('facts-descipt')[0].value; // Get fact description

        // Check if we are in edit mode
        if (editMode && currentSlide) {
            // Update the existing slide with new values
            currentSlide.querySelector('.question-Sn').innerText = questionText;
            currentSlide.querySelector('.ans-i').innerText = answerTexti;
            currentSlide.querySelector('.ans-ii').innerText = answerTextii;
            currentSlide.querySelector('.ans-iii').innerText = answerTextiii;
            currentSlide.querySelector('.ans-iv').innerText = answerTextiv;
            currentSlide.querySelector('.desh3').innerText = factText;

            // Reset edit mode and current slide reference
            editMode = false;
            currentSlide = null;
        } else {
            // Create a new slide element
            const newSlide = document.createElement('div');
            newSlide.classList.add('create-slide'); // Add class for styling
            newSlide.innerHTML = `
                <div class="draggable-box">This is draggable box</div>
                <div class="options-menu">
                    <button class="edit-slide">Edit</button>
                    <button class="delete-slide">Delete</button>
                </div>
                <div class="question">
                    <h2 class="slide-SN">${index++}</h2>
                    <h2 class="question-Sn">${questionText}</h2>
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
                    <h3>Did you know?</h3>
                    <h4 class="desh3">${factText}</h4>
                </div>
            `;

            slidesContainer.appendChild(newSlide); // Append the new slide to the container
            attachSlideEvents(newSlide); // Attach edit and delete events to the new slide
        }

        clearInputFields(); // Clear input fields after adding or editing a slide
    });

    // Function to attach events to a slide for editing and deleting
    function attachSlideEvents(slide) {
        // Event listener for the "Edit" button
        const editButton = slide.querySelector('.edit-slide');
        editButton.addEventListener('click', function () {
            const currentQuestion = slide.querySelector('.question-Sn').innerText; // Get current question text
            const currentAnsweri = slide.querySelector('.ans-i').innerText; // Get current answer i text
            const currentAnswerii = slide.querySelector('.ans-ii').innerText; // Get current answer ii text
            const currentAnsweriii = slide.querySelector('.ans-iii').innerText; // Get current answer iii text
            const currentAnsweriv = slide.querySelector('.ans-iv').innerText; // Get current answer iv text
            const currentFact = slide.querySelector('.desh3').innerText; // Get current fact text

            // Populate the input fields with the current slide values
            document.getElementById('quiz-title-input').value = currentQuestion;
            document.getElementsByClassName('answer-input-i')[0].value = currentAnsweri;
            document.getElementsByClassName('answer-input-ii')[0].value = currentAnswerii;
            document.getElementsByClassName('answer-input-iii')[0].value = currentAnsweriii;
            document.getElementsByClassName('answer-input-iv')[0].value = currentAnsweriv;
            document.getElementsByClassName('facts-descipt')[0].value = currentFact;

            // Set the edit mode to true and set the current slide to the slide being edited
            editMode = true;
            currentSlide = slide;
            window.scrollTo(0, 0); // Scroll to the top of the page for editing
        });

        // Event listener for the "Delete" button
        const deleteButton = slide.querySelector('.delete-slide');
        deleteButton.addEventListener('click', function () {
            slide.remove(); // Remove the slide from the DOM
            updateSlideNumbers(); // Update the numbering of the slides
        });
    }

    // Function to update the slide numbers after deleting a slide
    function updateSlideNumbers() {
        const slides = document.querySelectorAll('.slide-SN'); // Select all slide numbers
        slides.forEach((slideNumber, idx) => {
            slideNumber.innerText = idx + 1; // Update each slide number
        });
        index = slides.length + 1; // Update the index for new slides
    }

    // Function to clear all input fields
    function clearInputFields() {
        document.getElementById('quiz-title-input').value = ''; // Clear question input
        document.getElementsByClassName('answer-input-i')[0].value = ''; // Clear answer i input
        document.getElementsByClassName('answer-input-ii')[0].value = ''; // Clear answer ii input
        document.getElementsByClassName('answer-input-iii')[0].value = ''; // Clear answer iii input
        document.getElementsByClassName('answer-input-iv')[0].value = ''; // Clear answer iv input
        document.getElementsByClassName('facts-descipt')[0].value = ''; // Clear fact description input
    }

    // Event listener for the "Save" button to send data to the server
    document.getElementById('save-button').addEventListener('click', function () {
        const slides = document.querySelectorAll('.create-slide'); // Select all created slides
        const slideData = [];

        slides.forEach(slide => {
            // Collect the data from each slide into an object
            slideData.push({
                projectName: document.querySelector('.projectName').value, // Project name
                question: slide.querySelector('.question-Sn').innerText, // Question text
                answeri: slide.querySelector('.ans-i').innerText, // Answer i text
                answerii: slide.querySelector('.ans-ii').innerText, // Answer ii text
                answeriii: slide.querySelector('.ans-iii').innerText, // Answer iii text
                answeriv: slide.querySelector('.ans-iv').innerText, // Answer iv text
                fact: slide.querySelector('.desh3').innerText // Fact description text
            });
        });

        // Send the slide data to the server using the fetch API
        fetch('php/submit_quiz.php', {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json' // Specify the content type as JSON
            },
            body: JSON.stringify({ slides: slideData }) // Convert the slide data to JSON and send it
        })
        .then(response => response.text()) // Convert the response to text
        .then(data => {
            alert('Data saved to database successfully!'); // Alert the user of success
        })
        .catch((error) => {
            alert('Error saving data to database: ' + error); // Alert the user of any errors
        });
    });

    // Attach events to any existing slides (if applicable)
    document.querySelectorAll('.create-slide').forEach(attachSlideEvents);
});
