import sqlite3 from 'sqlite3';

let db;
let dbOpened = false

export function openDb(callback) {
    if (!dbOpened) {
        db = new sqlite3.Database("./server/learnforge.db", sqlite3.OPEN_READWRITE, (err) =>{
            if (err) {
                callback(false);
                console.error(err.message);
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
    openDb((res) => {
        if(res) {
            let sql = `INSERT INTO student_details VALUES (?, ?, ?, ?, ?)`
        db.run(sql, [id, fname, mname, lname, email], (err) => {
            if (err) return console.error(err.message);
        })
        }
    });
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
    openDb((res) => {
        if(res) {
            let q = `SELECT * FROM student_details`;
            db.all(q, [], (err, rows) =>{
                if (err) return console.error(err.message);
                rows.forEach((row) => {
                    console.log(row);
                })
            });
        }
    })
}

export function displayTable(table) {
    openDb((res) => {
        if(res) {
            let q = "SELECT * FROM " + table + ";";
            db.all(q, [], (err, rows) =>{
                if (err) return console.error(err.message);
                rows.forEach((row) => {
                    console.log(row);
                })
            })
        }
    })
}


export function getProfile(uid, callback) {
    openDb((res) => {
        if(res) {
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
        }
    });
}

export function updateUserProfile(uid, column, newValue,  callback) {
    let sql1 = `UPDATE student_details SET ` + column + ` = '` + newValue + `' WHERE student_id = '` + uid + `';`;
    let sql2 = `UPDATE lecturer_details SET ` + column + ` = '` + newValue + `' WHERE lecturer_id = '` + uid + `';`;
    console.log(uid, column, newValue);
    openDb((res) => {
        if(res) {
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
        }
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

export function createQuiz(uid, quizTitle, quizData) {
    openDb((res) => {
        if(res) {
            let timeout = 5;
            let validId = false
            let tmpId;
            var repeat = function(triesLeft) {
                if(triesLeft > 0 && validId == false) {
                    tmpId = getRandomInt(9223372036854775807); // max sql integer value
                    let checkSql = `SELECT * FROM quiz_details WHERE quiz_id = ` + tmpId + `;`;
                    db.get(checkSql, [], (err, row) => {
                        if(err) {
                            return console.log(err.message);
                        }
                        if(row == undefined) {
                            validId = true;
                            let insertSql = `INSERT INTO quiz_details VALUES (?, ?, ?, ?)`
                            db.get(insertSql, [tmpId, uid, quizTitle, quizData], (err, row) => {
                                if(err) {
                                    return console.log(err.message);
                                }
                            })
                        }
                        else {
                            repeat(triesLeft - 1)
                        }
                    })
                }
                else {
                    if(validId) {
                        console.log("Got unique ID: ", tmpId);
                    }
                    else {
                        console.log("Couldn't get unique ID");
                    }
                }
            }
        }
        repeat(5);
        });
}

//createStudent(1, "a", "b", "c", "email");
//createQuiz("b", "c", "d");
//displayTable('lecturer_details');
