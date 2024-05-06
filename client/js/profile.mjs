import * as auth from './auth.mjs';
import * as dbq from './db_query.mjs';

window.addEventListener("load", onLoad);

let firstNameLabel = document.getElementById("fnameLabel");
let lastNameLabel = document.getElementById("lnameLabel");
let emailLabel = document.getElementById("emailLabel");
let idLabel = document.getElementById("idLabel");

let firstNameInput = document.getElementById("fnameInput");
let lastNameInput = document.getElementById("lnameInput");

let editBtn = document.getElementById("editBtn");
editBtn.addEventListener("click", editDetails);

let saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", saveChanges);

let cancelBtn = document.getElementById("cancelBtn");
cancelBtn.addEventListener("click", cancelChanges);

let userData;

function getUserDetails() {
    dbq.getProfileData(sessionStorage.getItem("uid"), (res) => {
        userData = (res);
        console.log(res);
        firstNameLabel.innerHTML = res[0];
        lastNameLabel.innerHTML = res[2];
        emailLabel.innerHTML = res[3];
        idLabel.innerHTML = sessionStorage.getItem("uid");
    });
}

function updateUserInformation() {
    console.log("UPDATE USR INFO");
    console.log(firstNameInput.value, lastNameInput.value);
    dbq.updateUserProfile(sessionStorage.getItem("uid"), 'user_fname', firstNameLabel.textContent);
    dbq.updateUserProfile(sessionStorage.getItem("uid"), 'user_lname', lastNameLabel.textContent);
    getUserDetails();
}

function onLoad() {
    getUserDetails();
}

function editDetails() {
    document.getElementById("fnameLabel").classList.add("d-none");
    document.getElementById("fnameInput").classList.remove("d-none");

    document.getElementById("lnameLabel").classList.add("d-none");
    document.getElementById("lnameInput").classList.remove("d-none");

    document.getElementById("editBtn").classList.add("d-none");
    document.getElementById("saveBtn").classList.remove("d-none");
    document.getElementById("cancelBtn").classList.remove("d-none");
}

function saveChanges() {
    let firstName = document.getElementById("fnameInput").value;
    let lastName = document.getElementById("lnameInput").value;

    document.getElementById("fnameLabel").innerHTML = firstName;
    document.getElementById("lnameLabel").innerHTML = lastName;

    console.log("SAVE CHANGES");
    updateUserInformation();
    cancelChanges();
}

function cancelChanges() {
    document.getElementById("fnameLabel").classList.remove("d-none");
    document.getElementById("fnameInput").classList.add("d-none");

    document.getElementById("lnameLabel").classList.remove("d-none");
    document.getElementById("lnameInput").classList.add("d-none");
    
    document.getElementById("editBtn").classList.remove("d-none");
    document.getElementById("saveBtn").classList.add("d-none");
    document.getElementById("cancelBtn").classList.add("d-none");
}

function toggleTheme() {
    var body = document.body;
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");
}

/* This functions just deals with uplaodng the profile picture fomr the users pc, ignore it when adding in functionality */
function handleImageUpload(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var image = document.createElement("img");
        image.src = e.target.result;
        image.style.width = "100%";
        image.style.height = "100%";
        image.style.objectFit = "cover";
        document.querySelector(".profilePicture").innerHTML = "";
        document.querySelector(".profilePicture").appendChild(image);

    };
    reader.readAsDataURL(file);
}