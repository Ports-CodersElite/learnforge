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
    })
    // .then(res => res.json())
    // .then(res => {
    //     callback(res);
    // });
}