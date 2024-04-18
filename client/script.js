
let nav_toggle = document.querySelector("#nav-btn");
let nav_ = document.querySelector("#nav");


nav_toggle.addEventListener("click", navBarToggle)

/*function navBarToggle(){
    console.log("test")
    nav_.classList.add("nav-transition");
    console.log(nav_.classList)
}*/

function navBarToggle(){
    if(nav_.classList.contains('nav-transition')){
        nav_.classList.remove('nav-transition')
    } else {
        nav_.classList.add('nav-transition')
    }
}