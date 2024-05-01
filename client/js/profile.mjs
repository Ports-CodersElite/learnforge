import * as auth from './auth.mjs';
import * as dbq from './db_query.mjs';

window.addEventListener("load", onLoad);

let firstNameLabel = document.getElementById("firstNameLabel");
let middleNameLabel = document.getElementById("middleNameLabel");
let lastNameLabel = document.getElementById("lastNameLabel");
let emailLabel = document.getElementById("emailLabel");
let idLabel = document.getElementById("idLabel");

let userData;

function updateUserDetails() {
    dbq.getProfileData(sessionStorage.getItem("uid"), (res) => {
        userData = (res);
        console.log(res[0]);
        firstNameLabel.innerHTML = res[0];
        middleNameLabel.innerHTML = res[1];
        lastNameLabel.innerHTML = res[2];
        emailLabel.innerHTML = res[3];
        idLabel.innerHTML = sessionStorage.getItem("uid");
    });
}


function onLoad() {
    updateUserDetails();
}
