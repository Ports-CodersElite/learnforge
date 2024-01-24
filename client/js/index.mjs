import * as auth from "./auth.mjs";

window.addEventListener("load", eventListeners);

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

function Login() {
  const email = String(emailInput.value);
  const pw = String(passwordInput.value);
  auth.signIn(email, pw, "../dashboard.html");
}

function Signup() {
  const email = String(emailInput.value);
  const pw = String(passwordInput.value);
  auth.createUser(email, pw, selectedRole);
}

function StudentDropdownFunc() {
  selectedRole = "student";
}

function TeacherDropdownFunc() {
  selectedRole = "teacher";
}
