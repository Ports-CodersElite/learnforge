import * as dbq from '../js/db_query.mjs';


let id = document.querySelector("#idInput");
//let className = document.querySelector("#classNameInput");
let joinCode = document.querySelector("#joinCodeInput");
let submit = document.querySelector("#submit");
submit.addEventListener("click", submitUserToDatabase);

function submitUserToDatabase() {
    console.log(id.value, joinCode.value);
    let payload = [id.value, joinCode.value];
    fetch("/join-class", {
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
