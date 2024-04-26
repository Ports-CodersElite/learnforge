import sqlite3 from 'sqlite3';

export function createStudent(id, fname, mname, lname, email) {
    const db = new sqlite3.Database("./server/test.db", sqlite3.OPEN_READWRITE, (err) =>{
        if (err) return console.error(err.message);
    });
    let sql = `INSERT INTO student_details VALUES (?, ?, ?, ?, ?)`
    db.run(sql, [id, fname, mname, lname, email], (err) => {
        if (err) return console.error(err.message);
    })
}

export function displayStudentDetails() {
    console.log("DISPLAYING STUDENT_DETAILS");
    const db = new sqlite3.Database("./server/test.db", sqlite3.OPEN_READWRITE, (err) =>{
        if (err) return console.error(err.message);
    });
    let q = `SELECT * FROM student_details`;
    db.all(q, [], (err, rows) =>{
        if (err) return console.error(err.message);
        rows.forEach((row) => {
            console.log(row);
        })
    })
}

displayStudentDetails();