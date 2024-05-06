import * as dbq from '../js/db_query.mjs';



let id = document.querySelector("#idInput");
let getClasses = document.querySelector("#getClassesButton");
getClasses.addEventListener("click", getClassesFunc);


function submitUserToDatabase() {
    console.log(id.value, joinCode.value);
    let payload = [id.value, joinCode.value, "Desc"];
    fetch("/assign-quiz", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then((res) => res.json())
    .then((resData) =>{
        console.log(resData);
    })
}

function getClassesFunc() {
    let payload = [id.value];
    console.log(JSON.stringify(payload));
    fetch("/get-classes-student", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then((res) => res.json())
    .then((resData) =>{
        console.log(resData);
    })
}
