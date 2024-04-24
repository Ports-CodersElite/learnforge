window.addEventListener('load', eventListeners);

let nav = null;
let showing = false;

function eventListeners() {
    let nav_toggle = document.querySelector("#open-nav-btn");
    nav = document.querySelector("#nav");

    nav_toggle.addEventListener("click", navBarToggle);
}

function navBarToggle(){
    if(showing === false) {
        nav.classList.add('nav-show');
        nav.classList.remove('nav-hide');
        showing = true;
        return;
    } 
    nav.classList.add('nav-hide');
    nav.classList.remove('nav-show');
    showing = false;
}
