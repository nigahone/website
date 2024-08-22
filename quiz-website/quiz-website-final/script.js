// //script.js
// document.addEventListener('DOMContentLoaded', function () {
//     const slidesContainer = document.getElementById('slides-container');

//     // Attach events to the existing slides (those rendered by PHP)
//     const existingSlides = slidesContainer.querySelectorAll('.draggable-box');
//     existingSlides.forEach(slide => {
//         const parentSlide = slide.closest('.create-slide');
//         attachSlideEvents(parentSlide);
//     });

//     // The rest of your existing script.js code...

//     function attachSlideEvents(slide) {
//         // Attach events to the elements in each slide
//         const optionsButton = slide.querySelector('.dragable-options');
//         const optionsMenu = slide.querySelector('.options-menu');

//         optionsButton.addEventListener('click', function () {
//             optionsMenu.style.display = optionsMenu.style.display === 'none' ? 'block' : 'none';
//         });

//         const deleteButton = optionsMenu.querySelector('.delete-slide');
//         deleteButton.addEventListener('click', function () {
//             slide.remove();
//             updateIndexes();
//         });

//         const editButton = optionsMenu.querySelector('.edit-slide');
//         editButton.addEventListener('click', function () {
//             // Capture the current content
//             const currentQuestion = slide.querySelector('.question-Sn').innerText;
//             const currentAnsweri = slide.querySelector('.ans-i').innerText;
//             const currentAnswerii = slide.querySelector('.ans-ii').innerText;
//             const currentAnsweriii = slide.querySelector('.ans-iii').innerText;
//             const currentAnsweriv = slide.querySelector('.ans-iv').innerText;
//             const currentFact = slide.querySelector('.desh3').innerText;

//             // Populate the input fields with the current content
//             document.getElementById('quiz-title-input').value = currentQuestion;
//             document.getElementsByClassName('answer-input-i')[0].value = currentAnsweri;
//             document.getElementsByClassName('answer-input-ii')[0].value = currentAnswerii;
//             document.getElementsByClassName('answer-input-iii')[0].value = currentAnsweriii;
//             document.getElementsByClassName('answer-input-iv')[0].value = currentAnsweriv;
//             document.getElementsByClassName('facts-descipt')[0].value = currentFact;

//             // Set the slide to be edited
//             editMode = true;
//             currentSlide = slide;

//             // Scroll to the top to view the form
//             window.scrollTo(0, 0);
//         });
//     }
    
// });

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
    let editMode = false;
    let currentSlide = null;

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

        if (editMode && currentSlide) {
            // Update the existing slide with the new values
            currentSlide.querySelector('.question-Sn').innerText = questionText;
            currentSlide.querySelector('.ans-i').innerText = answerTexti;
            currentSlide.querySelector('.ans-ii').innerText = answerTextii;
            currentSlide.querySelector('.ans-iii').innerText = answerTextiii;
            currentSlide.querySelector('.ans-iv').innerText = answerTextiv;
            currentSlide.querySelector('.desh3').innerText = factText;

            // Reset edit mode and clear input fields
            editMode = false;
            currentSlide = null;
        } else {
            // Create a new slide
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
            attachSlideEvents(newSlide);
        }

        clearInputFields();
    });

    function attachSlideEvents(slide) {
        const optionsButton = slide.querySelector('.dragable-options');
        const optionsMenu = slide.querySelector('.options-menu');

        optionsButton.addEventListener('click', function () {
            optionsMenu.style.display = optionsMenu.style.display === 'none' ? 'block' : 'none';
        });

        const deleteButton = optionsMenu.querySelector('.delete-slide');
        deleteButton.addEventListener('click', function () {
            slide.remove();
            updateIndexes();
        });

        const editButton = optionsMenu.querySelector('.edit-slide');
        editButton.addEventListener('click', function () {
            // Capture the current content
            const currentQuestion = slide.querySelector('.question-Sn').innerText;
            const currentAnsweri = slide.querySelector('.ans-i').innerText;
            const currentAnswerii = slide.querySelector('.ans-ii').innerText;
            const currentAnsweriii = slide.querySelector('.ans-iii').innerText;
            const currentAnsweriv = slide.querySelector('.ans-iv').innerText;
            const currentFact = slide.querySelector('.desh3').innerText;

            // Populate the input fields with the current content
            document.getElementById('quiz-title-input').value = currentQuestion;
            document.getElementsByClassName('answer-input-i')[0].value = currentAnsweri;
            document.getElementsByClassName('answer-input-ii')[0].value = currentAnswerii;
            document.getElementsByClassName('answer-input-iii')[0].value = currentAnsweriii;
            document.getElementsByClassName('answer-input-iv')[0].value = currentAnsweriv;
            document.getElementsByClassName('facts-descipt')[0].value = currentFact;

            // Set the slide to be edited
            editMode = true;
            currentSlide = slide;

            // Scroll to the top to view the form
            window.scrollTo(0, 0);
        });
    }

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

    // Call this function initially to attach events to any pre-existing slides
    document.querySelectorAll('.create-slide').forEach(attachSlideEvents);
});



// options menu for the options to do done preview undo etc
const optionsButton2 = document.querySelector('main .slide2 #quiz-form #optionsButton2');
const iconsmenu2 = document.querySelector('main .slide2 #quiz-form .options-menu2');

// Toggle the menu with a click
optionsButton2.addEventListener('click', function (e) {
    e.stopPropagation(); // Prevent event from bubbling up
    iconsmenu2.classList.toggle('show');
});

// Close the menu if clicked outside
document.addEventListener('click', function (e) {
    if (!iconsmenu2.contains(e.target) && !optionsButton2.contains(e.target)) {
        iconsmenu2.classList.remove('show');
    }
});

// for options menu in createslide.html







