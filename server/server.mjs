import express from 'express';
import * as lf from './db_interface.mjs'

const server = express();

server.use(express.json());
// server.use(express.urlencoded());
server.use(express.static('./client'));

// requires payload containing: ID, Fname, Mname, Lname, Email, Role
server.post('/new-user', (req, res) =>{
    console.log('Recieved comms');
    console.log(req.body);
    console.log("ROLE: " + req.body[5]);
    if (req.body[5] == "student") {
        console.log("STUDENT RECIEVED");
        lf.createStudent(req.body[0], req.body[1], req.body[2], req.body[3], req.body[4]);
    } 
    else if (req.body[5] == "lecturer") {
        console.log("LECTURER RECIEVED");
        lf.createLecturer(req.body[0], req.body[1], req.body[2], req.body[3], req.body[4]);
    }
    res.send('User added to db');
});

server.listen(8080);