import * as auth from './auth.mjs';

// Runs the eventListeners() function when window loads.
window.addEventListener("load", eventListeners);


function eventListeners() {
    // console.log(auth.userLoggedInQ());
    // window.location.href = '../index.html';
    // Need to fix session persistece


    let QuizQuestion = document.querySelector('#test');
    QuizQuestion.setAnswer('H2O');
    QuizQuestion.setQuestion('What is the chemical formula for water?');
    QuizQuestion.setOptions(['CO₂', 'H2O', 'CH3COOH', 'C3H6O']);
    QuizQuestion.createInPage();
}