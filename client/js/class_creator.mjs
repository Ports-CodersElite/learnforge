// Imports the database query functions
import * as db from './db_query.mjs';

export let lectureId = null;
const classFormInputs = [...document.querySelectorAll('.class-details-input')];
const createClassBtn = document.querySelector('#createQuizBtn');

// Retrieves the input data from the form 
function obtainInputs() {
    let inputData = []
    for (const inputBox of classFormInputs) {
        inputData.push(inputBox.value);
    }
    return inputData;
}

// Updates values of the form to be empty for reinput 
function emptyInputValues() {
    for (const inputBox  of classFormInputs) {
        inputBox.value = ``
    }
}

// Update the class details table in the database array structure [Lecturer_id, Class_name, Join_code]
function updateClassDetails() {
    const inputData = obtainInputs();
    db.createClass(inputData[0],inputData[1],inputData[2]);
    emptyInputValues();
    removeInputBoxes();
    createMessage();
    lectureId = inputData[0];
}

export function returnID () {
    console.log(lectureId);
    return lectureId;
}

// Remove UI elements from the page
function removeInputBoxes() {
    const inputContainers  = [...document.querySelectorAll('.sub-container'),document.querySelector('.button-container'),document.querySelector('#createQuizBtn')];
    for (const container of inputContainers) {
        container.classList.toggle('hide');
    }
}

// Create verification message
function createMessage(message) {
    const container = document.querySelector('.main-container-list');
    const divContainer = document.createElement('div');
    divContainer.setAttribute('class','sub-container');
    container.append(divContainer);

    const messageElement = document.createElement('h4');
    messageElement.setAttribute('class','h4-css');
    messageElement.textContent = 'Class created';
    divContainer.append(messageElement);

    const link = document.createElement('a');
    link.setAttribute('href','class_list.html');
    link.textContent = 'view Classes';
    divContainer.append(link)
}



createClassBtn.addEventListener('click', updateClassDetails);