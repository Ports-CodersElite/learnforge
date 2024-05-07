import * as auth from './auth.mjs';

export function submitUser(id, fname, mname, lname, email, role) {
    let payload = [id, fname, mname, lname, email, role];
    fetch('/new-user', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    console.log("SENDING " + JSON.stringify(payload));
}

export function getProfileData(uidInput, callback) {
    let payload = [uidInput];
    fetch('/get-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
        callback(res);
    })
}

export function updateUserProfile(uid, column, newValue) {
    let payload = [uid, column, newValue];
    fetch('/update-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

export function uploadQuiz(uid, quizTitle, quizData) {
    let payload = [uid, quizTitle, quizData];
    console.log(payload);
    fetch('/upload-quiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
}

export function createClass(lecturer_id, className, joinCode) {
    let payload = [lecturer_id, className, joinCode];
    fetch('/create-class', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
}

export function getClass(lecturer_id, callback) {
    let payload = [lecturer_id];
    fetch("/get-classes", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then((res) => res.json())
    .then((resData) =>{
        callback(resData);
    })
}

export function getQuizzes(lecturerId, callback) {
    let payload = [lecturerId];
    fetch("/get-quizzes-from-lecturer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then((res) => res.json())
    .then((resData) =>{
        callback(resData);
    })
}

export function joinClass(studentId, joinCode) {
    let payload = [studentId, joinCode];
    console.log(payload);
    fetch("/join-class", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then((res) => res.json())
    .then((resData) =>{
        console.log(resData);
    })
}

