window.addEventListener('load', eventListeners);

let nav = null;

function eventListeners() {
    let nav_toggle = document.querySelector("#open-nav-btn");
    nav_toggle.addEventListener("click", navBarToggle)
    nav_ = document.querySelector("#nav");
}

function navBarToggle(){
    console.log("test")
    nav_.classList.add("nav-transition");
    console.log(nav_.classList)
}

// function navBarToggle(){
//     if(nav_.classList.contains('nav-transition')){
//         nav_.classList.remove('nav-transition')
//     } else {
//         nav_.classList.add('nav-transition')
//     }
// }     