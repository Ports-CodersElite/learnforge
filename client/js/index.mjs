import * as auth from './auth.mjs';

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
  lecturerDropdown: null,
};


// runs when window loads and initialises elements from the HTML page
function eventListeners() {
  inputs.emailInput = document.querySelector("#emailInput");
  inputs.passwordInput = document.querySelector("#passwordInput");

  buttons.loginBtn = document.querySelector("#loginBtn");

  buttons.loginBtn.addEventListener("click", Login);
}

// Sends user details to auth.mjs for the user to be authenicated. Runs when loginBtn is clicked.
function Login() {
  const email = String(emailInput.value);
  const pw = String(passwordInput.value);
  auth.signIn(email, pw, "../dashboard.html");
}


