import * as auth from './auth.mjs'

window.addEventListener('load', eventListeners);

let signOutbtn = null;

function eventListeners() {
    signOutbtn = document.querySelector('.signOut');
    signOutbtn.addEventListener('click', signOut);
    displayUserData();
}

// Signs out and redirects the user
function signOut() {
    auth.signOutFn('../index.html');
}

// Updates P tags on dashboard.html with user data from auth.mjs
function displayUserData() {
    const emailP = document.querySelector('#emailP');
    emailP.textContent = sessionStorage.getItem('email');
}
