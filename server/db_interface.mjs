import sqlite3 from 'sqlite3';

let db;
let dbOpened = false

export function openDb() {
    if (!dbOpened) {
        db = new sqlite3.Database("./server/learnforge.db", sqlite3.OPEN_READWRITE, (err) =>{
            if (err) return console.error(err.message);
            else dbOpened = true;
        });
    }
}

export function createStudent(id, fname, mname, lname, email) {
    openDb()
    let sql = `INSERT INTO student_details VALUES (?, ?, ?, ?, ?)`
    db.run(sql, [id, fname, mname, lname, email], (err) => {
        if (err) return console.error(err.message);
    })
}

export function createLecturer(id, fname, mname, lname, email) {
    openDb()
    let sql = `INSERT INTO lecturer_details VALUES (?, ?, ?, ?, ?)`
    db.run(sql, [id, fname, mname, lname, email], (err) => {
        if (err) return console.error(err.message);
    })
}

export function displayStudentDetails() {
    openDb()
    let q = `SELECT * FROM student_details`;
    db.all(q, [], (err, rows) =>{
        if (err) return console.error(err.message);
        rows.forEach((row) => {
            console.log(row);
        })
    })
}

export function displayTable(table) {
    openDb()
    let q = "SELECT * FROM " + table + ";";
    db.all(q, [], (err, rows) =>{
        if (err) return console.error(err.message);
        rows.forEach((row) => {
            console.log(row);
        })
    })
}


export async function getProfile(uid, callback) {
    openDb();
        let sql = "SELECT * FROM student_details WHERE student_id =" + "'" + uid + "'" + "UNION SELECT * FROM lecturer_details WHERE lecturer_id =" + "'" + uid + "'";
        db.get(sql, [], (err, row) => {
            if (err) return console.error(err.message);
            callback([row.user_fname, row.user_mname, row.user_lname, row.user_emailaddress]);
        });
}
