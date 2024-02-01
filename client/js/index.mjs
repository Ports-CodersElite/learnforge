import * as auth from "./auth.mjs";

// Runs the eventListeners() function when window loads.
window.addEventListener("load", eventListeners);

// Varbiles in objects for cleaner code ordered by type e.g. inputs, buttons ect.
let inputs = {
  emailInput: null,
  passwordInput: null,
};

let buttons = {
  loginBtn: null,
  signupBtn: null,
  studentDropdown: null,
  teacherDropdown: null,
};

let selectedRole = null;

// runs when window loads and initialises elements from the HTML page
function eventListeners() {
  inputs.emailInput = document.querySelector("#emailInput");
  inputs.passwordInput = document.querySelector("#passwordInput");

  buttons.loginBtn = document.querySelector("#loginBtn");
  buttons.signupBtn = document.querySelector("#signupBtn");
  buttons.studentDropdown = document.querySelector("#studentDropdown");
  buttons.teacherDropdown = document.querySelector("#teacherDropdown");

  buttons.loginBtn.addEventListener("click", Login);
  buttons.signupBtn.addEventListener("click", Signup);
  buttons.studentDropdown.addEventListener("click", StudentDropdownFunc);
  buttons.teacherDropdown.addEventListener("click", TeacherDropdownFunc);
}

// Sends user details to auth.mjs for the user to be authenicated. Runs when loginBtn is clicked.
function Login() {
  const email = String(emailInput.value);
  const pw = String(passwordInput.value);
  auth.signIn(email, pw, "../dashboard.html");
}

// Send user details to auth.mjs for the user to be created/sign up. Runs when signupBtn is clicked.
function Signup() {
  const email = String(emailInput.value);
  const pw = String(passwordInput.value);
  auth.createUser(email, pw, selectedRole);
}

// If the user role select in the dropdown menu is student set the global variable selectRole to student.
function StudentDropdownFunc() {
  selectedRole = "student";
}

// If the user role select in the dropdown menu is student set the global variable selectRole to teacher.
function TeacherDropdownFunc() {
  selectedRole = "teacher";
}
