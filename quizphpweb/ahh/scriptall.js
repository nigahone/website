document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    toggleButton.addEventListener('click', function () {
        body.classList.toggle('dark-mode');
        let theme = 'light';

        if (body.classList.contains('dark-mode')) {
            theme = 'dark';
        }

        // Save the user preference in localStorage
        localStorage.setItem('theme', theme);
    });

    let index = 1; // Ensure this is declared outside

    document.getElementById('done-button').addEventListener('click', function () {
        // Check if there are no slides and reset index
        const slidesContainer = document.getElementById('slides-container');
        if (slidesContainer.children.length === 0) {
            index = 1;
        }

        // Get the input values from the text area and input fields
        const questionText = document.getElementById('quiz-title-input').value;
        const answerTexti = document.getElementsByClassName('answer-input-i')[0].value;
        const answerTextii = document.getElementsByClassName('answer-input-ii')[0].value;
        const answerTextiii = document.getElementsByClassName('answer-input-iii')[0].value;
        const answerTextiv = document.getElementsByClassName('answer-input-iv')[0].value;
        const factText = document.getElementsByClassName('facts-descipt')[0].value;

        // Create a new slide div
        const newSlide = document.createElement('div');
        newSlide.classList.add('create-slide');

        // Create the slide content
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
            document.getElementById('quiz-title-input').value = currentQuestion;
            document.getElementsByClassName('answer-input-i')[0].value = currentAnsweri;
            document.getElementsByClassName('answer-input-ii')[0].value = currentAnswerii;
            document.getElementsByClassName('answer-input-iii')[0].value = currentAnsweriii;
            document.getElementsByClassName('answer-input-iv')[0].value = currentAnsweriv;
            document.getElementsByClassName('facts-descipt')[0].value = currentFact;

            // Ensure the "Done" button updates the slide, not create a new one
            const doneButton = document.getElementById('done-button');
            doneButton.removeEventListener('click', updateSlide);
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

    // Add event listener for the Exit button
    document.getElementById('exit-button').addEventListener('click', function () {
        const confirmExit = confirm("Are you sure you want to exit? All unsaved changes will be lost.");
        if (confirmExit) {
            window.location.href = 'index.html'; // Redirect to the home page
        }
    });

    document.getElementById('save-button').addEventListener('click', function () {
        const slides = document.querySelectorAll('.create-slide');
        const slideData = [];

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

        $.ajax({
            url: 'php/submit_quiz.php',
            type: 'POST',
            data: { slides: JSON.stringify(slideData) }, // Send the data as JSON
            success: function (response) {
                alert('Data saved to database successfully!');
            },
            error: function () {
                alert('Error saving data to database.');
            }
        });
    });
});
