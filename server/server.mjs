import express from 'express';
import * as lf from './db_interface.mjs'

const server = express();

server.use(express.json());
// server.use(express.urlencoded());
server.use(express.static('./client'));

// requires payload containing: ID, Fname, Mname, Lname, Email, Role
server.post('/new-user', (req, res) =>{
    console.log('Creating new user');
    console.log(req.body);
    console.log("ROLE: " + req.body[5]);
    if (req.body[5] == "student") {
        lf.createStudent(req.body[0], req.body[1], req.body[2], req.body[3], req.body[4]);
    } 
    else if (req.body[5] == "lecturer") {
        lf.createLecturer(req.body[0], req.body[1], req.body[2], req.body[3], req.body[4]);
    }
    res.send('User added to db');
});

server.post('/get-profile', (req, res) => {
    console.log("GOT PROFILE REQ FOR USER ID: " + req.body);
    lf.getProfile(req.body, (profileData) => {
        console.log(profileData);
        res.send(JSON.stringify(profileData));
    })
})

server.listen(8080);