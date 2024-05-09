import * as db from './db_query.mjs';

window.addEventListener("load", onLoad);

let joinCodeInput = document.querySelector("#joinCodeInput");
let submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", joinClass);

function onLoad() {
    
}

function joinClass() {
    console.log(sessionStorage.getItem("uid"), ", INVALUE: ",joinCodeInput.value);
    db.joinClass(sessionStorage.getItem("uid"), joinCodeInput.value);
}