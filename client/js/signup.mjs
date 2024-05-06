import * as auth from './auth.mjs';

window.addEventListener("load", eventListeners)

let buttons = {
    signupBtn: null,
    studentDropdown: null,
    teacherDropdown: null
}

let inputs = {
    email: null,
    fname: null,
    lname: null,
    passwordInput: null,
}

let selectedRole = null;

function eventListeners() {
    buttons.signupBtn = document.querySelector("#signupBtn");
    buttons.studentDropdown = document.querySelector("#studentDropdown");
    buttons.lecturerDropdown = document.querySelector("#teacherDropdown");
    inputs.fname = document.querySelector('#fnameInput');
    inputs.lname = document.querySelector('#lnameInput');
    inputs.email = document.querySelector('#emailInput');
    inputs.passwordInput = document.querySelector('#passwordInput');


    buttons.signupBtn.addEventListener("click", Signup);
    buttons.studentDropdown.addEventListener("click", StudentDropdownFunc);
    buttons.lecturerDropdown.addEventListener("click", lecturerDropdownFunc);
}

// Send user details to auth.mjs for the user to be created/sign up. Runs when signupBtn is clicked.
function Signup() {
    if(selectedRole === null){
        alert("Please Select a role");
        return;
    }
    const email = String(inputs.email.value);
    const fname = String(inputs.fname.value);
    const lname = String(inputs.lname.value);
    const pw = String(inputs.passwordInput.value);
    auth.createUser(fname, null, lname, email, pw, selectedRole, "../index.html");
}

// If the user role select in the dropdown menu is student set the global variable selectRole to student.
export function StudentDropdownFunc() {
    selectedRole = "student";
    return selectedRole;
  }
  
  // If the user role select in the dropdown menu is student set the global variable selectRole to lecturer.
export function lecturerDropdownFunc() {
    selectedRole = "lecturer";
    return selectedRole;
}

