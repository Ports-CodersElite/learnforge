import express from 'express';

const server = express();

server.use(express.static("./client"));

server.listen(8080);