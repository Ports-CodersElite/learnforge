import express from 'express';
import * as lf from './db_interface.mjs'

const server = express();

let logging = {
    level1: true,
    level2: true
}

server.use(express.json());
// server.use(express.urlencoded());
server.use(express.static('./client'));

// requires payload containing: ID, Fname, Mname, Lname, Email, Role
server.post('/new-user', (req, res) =>{
    log("///", 1);
    log('Creating new user', 1);
    log(req.body, 1);
    log("ROLE: " + req.body[5], 1);
    if (req.body[5] == "student") {
        lf.createStudent(req.body[0], req.body[1], req.body[2], req.body[3], req.body[4]);
        log("///\n", 1);
        res.send('Student added to db');
    } 
    else if (req.body[5] == "lecturer") {
        lf.createLecturer(req.body[0], req.body[1], req.body[2], req.body[3], req.body[4]);
        log("///\n", 1);
        res.send('Lecturer added to db');
    }
    else {
        log("Invalid user role\n///\n", 1);
        res.send('Invalid user role provided');
    }
});

server.post('/get-profile', (req, res) => {
    log("///", 1);
    log("GOT PROFILE REQ FOR USER ID: " + req.body, 1);
    if(req.body != "") {
        lf.getProfile(req.body, (profileData) => {
            if(profileData[0] == "ERROR") {
                log("Error retrieving profile data", 1);
                log("///\n", 1);
                res.send(JSON.stringify("{ERROR}"));
            }
            else {
                log("Sending Data", 1);
                log("///\n", 1);
                res.send(JSON.stringify(profileData));
            }
        });
    }
    else {
        log("EMPTY USER ID", 1)
        log("///\n", 1);
        res.send(JSON.stringify("{ERROR}"));
    }
});

server.post("/update-user", (req, res) => {
    log("///\nUPDATE USER REQUEST", 1);
    console.log(req.body);
    if(req != null) {
        log("SENDING TO DB", 1);
        lf.updateUserProfile(req.body[0], req.body[1], req.body[2], () => {});
        res.send("Successfully updated");
    }
    else {
        log("FAILED\n///\n", 1);
        res.send("Failed to update user info");
    }
});

function log (mssg, logLevel) {
    if ((logLevel == 1 && logging.level1) || (logLevel == 2 && logging.level2)) {
        console.log(mssg);
    }
}

server.listen(8080);