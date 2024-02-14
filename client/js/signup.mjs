import * as auth from "./auth.mjs";

window.addEventListener("load", eventListeners)

let buttons = {
    signupBtn: null,
    studentDropdown: null,
    teacherDropdown: null
}

let selectedRole = null;

function eventListeners() {
    buttons.signupBtn = document.querySelector("#signupBtn");
    buttons.studentDropdown = document.querySelector("#studentDropdown");
    buttons.teacherDropdown = document.querySelector("#teacherDropdown");

    buttons.signupBtn.addEventListener("click", Signup);
    buttons.studentDropdown.addEventListener("click", StudentDropdownFunc);
    buttons.teacherDropdown.addEventListener("click", TeacherDropdownFunc);
}

// Send user details to auth.mjs for the user to be created/sign up. Runs when signupBtn is clicked.
function Signup() {
    const email = String(emailInput.value);
    const pw = String(passwordInput.value);
    auth.createUser(email, pw, selectedRole, "../index.html");
}

// If the user role select in the dropdown menu is student set the global variable selectRole to student.
function StudentDropdownFunc() {
    selectedRole = "student";
  }
  
  // If the user role select in the dropdown menu is student set the global variable selectRole to teacher.
  function TeacherDropdownFunc() {
    selectedRole = "teacher";
  }