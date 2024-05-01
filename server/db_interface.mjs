import sqlite3 from 'sqlite3';

let db;
let dbOpened = false

export function openDb(callback) {
    if (!dbOpened) {
        db = new sqlite3.Database("./server/learnforge.db", sqlite3.OPEN_READWRITE, (err) =>{
            if (err) {
                return console.error(err.message);
                callback(false);
            }
            else {
                dbOpened = true;
                callback(true);
            }
        });
    }
    else {
        callback(true);
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
    openDb((res) =>{
        if(res) {
            let sql = `INSERT INTO lecturer_details VALUES (?, ?, ?, ?, ?)`
            db.run(sql, [id, fname, mname, lname, email], (err) => {
                if (err) return console.error(err.message);
            })
        }
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


export function getProfile(uid, callback) {
    openDb((res) => {
        let sql = "SELECT * FROM student_details WHERE student_id =" + "'" + uid + "'" + "UNION SELECT * FROM lecturer_details WHERE lecturer_id =" + "'" + uid + "'";
        db.get(sql, [], (err, row) => {
            if (err) return console.error(err.message);
            if (row == undefined) {
                callback(['ERROR']);
            }
            else {
                callback([row.user_fname, row.user_mname, row.user_lname, row.user_emailaddress]);
            }
        });    
    });
}

export function updateUserProfile(uid, column, newValue,  callback) {
    let sql1 = `UPDATE student_details SET ` + column + ` = ` + newValue + ` WHERE 'student_id' = ` + uid + `;`;
    let sql2 = `UPDATE lecturer_details SET ` + column + ` = ` + newValue + ` WHERE 'lecturer_id' = ` + uid + `;`;
    openDb((res) => {
        db.run(sql1, (err) => {
            if (err) {
                console.log(err.message);
            }
        })
        db.run(sql2, (err) => {
            if (err) {
                console.log(err.message);
            }
        })
    });


}

updateUserProfile("std1", "user_mname", "mname", (callback) => {});
displayTable("student_details");