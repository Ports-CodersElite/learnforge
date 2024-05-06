import * as db from './db_query.mjs';


const classCreatorInputs = [...document.querySelectorAll('.class-details-input')];
const createClassBtn = document.querySelector('#createQuizBtn');


function obtainInputs() {
    let classData = []
    for (const inputObject of classCreatorInputs) {
        console.log(inputObject.value);
    }
    return classData;
}

function updateClassDetails() {
    const data = obtainInputs();
    db.createClass(data[0],data[1],data[2]);
}

createClassBtn.addEventListener('click', updateClassDetails);