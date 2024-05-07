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
        res.send({Success: "Student added to db"});
    } 
    else if (req.body[5] == "lecturer") {
        lf.createLecturer(req.body[0], req.body[1], req.body[2], req.body[3], req.body[4]);
        log("///\n", 1);
        res.send({Success: "Lecturer added to db"});
    }
    else {
        log("Invalid user role\n///\n", 1);
        res.send({Error: "Invalid user role provided"});
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
                res.send({Error: "Error retrieving profile data"});
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
        res.send({Error: "Failed to retrieve profile: Empty request data"});
    }
});

server.post("/update-user", (req, res) => {
    log("///\nUPDATE USER REQUEST", 1);
    console.log(req.body);
    if(req != null) {
        log("SENDING TO DB", 1);
        lf.updateUserProfile(req.body[0], req.body[1], req.body[2], () => {});
        res.send({Success: "Successfully updated"});
    }
    else {
        log("FAILED\n///\n", 1);
        res.send({Error: "Failed to update user info: request empty"});
    }
});

server.post("/upload-quiz", (req, res) => {
    if(req != null) {
        lf.createQuiz(req.body[0], req.body[1], req.body[2]);
    }
    else {
        log(req.body, 1);
        log("Failed to create quiz: request empty", 1);
        res.send({Error: "Failed to create quiz: request empty"});
    }
});

server.post("/create-class", (req, res) => {
    // format: lecturerId, className, joinCode
    if(req != null) {
        console.log(req.body);
        lf.createClass(req.body[0], req.body[1], req.body[2], (err) =>{
            if (err == "UNAVAILABLE") {
                res.send({Error: "that join code is unavailable"});
            }
        });
    }
    else {
        log("Error creating class: request empty");
    }
});

server.post("/join-class", (req, res) => {
    // format: studentId, joinCode
    if(req != null) {
        lf.addStudentToClass(req.body[0], req.body[1], (ret) => {
            if(ret == "ERROR") {
                res.send({Error: "Error adding student to class"});
                console.log("Error adding student to class");
            }
            else {
                console.log("Successfully joined class");
                res.send({Success: "Successfully joined class"});
            }
        });
    }
    else {
        log("Error joining class: request empty", 1);
        res.send({Error: "Error joining class: request empty"});
    }
});

server.post("/get-classes-lecturer", (req, res) => {
    // format: lecturerId
    if(req != null) {
        lf.getClassesFromLecturer(req.body, (classes) => {
            res.send(JSON.stringify(classes));
        })
    }
    else {
        res.send({Error: "No data was sent with request"});
    }
});

server.post("/get-classes-student", (req, res) => {
    if(req != null) {
        lf.getClassesFromStudent(req.body, (classes) => {
            res.send(JSON.stringify(classes));
        })
    }
    else {
        res.send({Error: "No data was sent with request"});
    }
})

server.post("/assign-quiz", (req, res) => {
    // format: quizId, classId, description
    if(req != null) {
        lf.addQuizToClass(req.body[0], req.body[1], req.body[2], (ret) => {
            if(ret != "SUCCESS") {
                res.send({Error: ret});
            }
            else {
                let message = "Successfully assigned quiz " + JSON.stringify(req.body);
                res.send({Success: message});
            }
        });
    }
    else {
        res.send({Error: "No data was sent with request"});
    }
})

server.post("/get-quizzes-from-class", (req, res) => {
    if(req != null) {
        lf.getQuizzesFromClass(req.body, (classes) => {
            res.send(JSON.stringify(classes));
        })
    }
    else {
        res.send({Error: "No data was sent with request"});
    }
})

server.post("/get-quizzes-from-lecturer", (req, res) => {
    if(req != null) {
        lf.getQuizzesFromLecturer(req.body, (classes) => {
            res.send(JSON.stringify(classes));
        })
    }
    else {
        res.send({Error: "No data was sent with request"});
    }
})

function log (mssg, logLevel) {
    if ((logLevel == 1 && logging.level1) || (logLevel == 2 && logging.level2)) {
        console.log(mssg);
    }
}

server.listen(8080);
