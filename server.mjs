// lets me use require instead of import which is needed for pg-promise for some reason
import { createRequire } from "module";
const require = createRequire(import.meta.url);


import express from 'express';
const pgp = require('pg-promise')();


const cn = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '',
    database: 'test'
}

const db = pgp(cn);


const server = express();


//server.use(express.static("client"));
server.get('/', (req, res) => {
    let txt = "";
    db.any('INSERT INTO test_table (id, info) VALUES($1, $2)', [5, 'ARRRG']);
    res.send(txt);
  })



server.listen(8080);
