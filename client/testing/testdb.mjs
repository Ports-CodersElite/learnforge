import * as dbq from '../js/db_query.mjs';


let uid = document.querySelector("#uidInput");
let title = document.querySelector("#titleInput");
let body = document.querySelector("#bodyInput");
let submit = document.querySelector("#submit");
submit.addEventListener("click", submitUserToDatabase);

function submitUserToDatabase() {
    console.log(uid.value, title.value, body.value);
    dbq.uploadQuiz(uid.value, title.value, body.value);
}
