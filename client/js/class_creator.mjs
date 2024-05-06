import * as db from './db_query.mjs';


const classCreatorInputs = [...document.querySelectorAll('.class-details-input')];
const createClassBtn = document.querySelector('#createQuizBtn');


function obtainInputs() {
    let classData = []
    for (const inputObject of classCreatorInputs) {
        classData.push(inputObject.value);
    }
    return classData;
}

function updateClassDetails() {
    const data = obtainInputs();
    db.createClass(data[0],data[1],data[2]);
    emptyValues();
}

function emptyValues() {
    for (const input  of classCreatorInputs) {
        input.value = ``
    }
}

createClassBtn.addEventListener('click', updateClassDetails);