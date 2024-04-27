import express from 'express';
import * as lf from './db_interface.mjs'

const server = express();

server.use(express.json());
// server.use(express.urlencoded());
server.use(express.static('./client'));
server.post('/test', (req, res) =>{
    console.log('Recieved comms');
    console.log(req.body);
    lf.createStudent(req.body[0], req.body[1], req.body[2], req.body[3], req.body[4], req.body[5]);
    lf.displayStudentDetails();
    res.send('Welcome to the backend');
});

server.listen(8080);