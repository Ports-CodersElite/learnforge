

let id = document.querySelector("#id");
let fname = document.querySelector("#fname");
let mname = document.querySelector("#mname");
let lname = document.querySelector("#lname");
let email = document.querySelector("#email");
let submit = document.querySelector("#submit");
submit.addEventListener("click", submitStudent);


function submitStudent() {
    let payload = [id.value, fname.value, mname.value, lname.value, email.value];
    fetch('/test', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    console.log(JSON.stringify(payload));
}