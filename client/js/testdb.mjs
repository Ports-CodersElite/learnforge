

let id = document.querySelector("#id");
let fname = document.querySelector("#fname");
let mname = document.querySelector("#mname");
let lname = document.querySelector("#lname");
let email = document.querySelector("#email");
let submit = document.querySelector("#submit");
submit.addEventListener("click", submitUser);


function submitUser() {
    let payload = [id.value, fname.value, mname.value, lname.value, email.value, role.value];
    fetch('/new-user', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    console.log("SENDING " + JSON.stringify(payload));
}