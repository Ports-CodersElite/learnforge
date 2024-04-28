import * as dbq from '../js/db_query.mjs';

let id = document.querySelector("#id");
let fname = document.querySelector("#fname");
let mname = document.querySelector("#mname");
let lname = document.querySelector("#lname");
let email = document.querySelector("#email");
let submit = document.querySelector("#submit");
let uidInput = document.querySelector("#uid");
let getProfileButton = document.querySelector("#getProfile");
submit.addEventListener("click", submitUserToDatabase);
getProfileButton.addEventListener("click", profileListener);

function submitUserToDatabase() {
    dbq.submitUser(id.value, fname.value, mname.value, lname.value, email.value, role.value);
}

function profileListener() {
    dbq.getProfileData(uidInput.value, (res) => {
        console.log(res);
    });
}