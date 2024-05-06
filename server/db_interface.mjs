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
            repeat(timeout);
        }
    });
}

export function createClass(lecturerId, className, joinCode, callback) {
    openDb((res) => {
        if(res) {
            let checkJoinCodeExists = `SELECT 1 FROM class_details WHERE join_code = '` + joinCode + `';`; 
            db.get(checkJoinCodeExists, [], (err, row) => {
                if(err) {
                    return console.log(err.message);
                }
                else {
                    if(row == undefined) {
                        let addToDb = `INSERT INTO class_details (join_code, lecturer_id, class_name) VALUES (?, ?, ?);`;
                        db.run(addToDb, [joinCode, lecturerId, className], (err) => {
                            if(err) return console.log(err.message);
                        });
                    }
                    else {
                        console.log("That join code is unavailable");
                        callback("UNAVAILABLE");
                    }
                }
            });
        }
    });
}

export function addStudentToClass(studentId, joinCode, callback) {
    if(studentId != null && joinCode != null) {
        openDb((res) => {
            if(res) {
                let sql = 'INSERT INTO class_student VALUES (?, ?);';
                db.run(sql, [joinCode, studentId], (err) =>{
                    if(err) {
                        console.log(err.message);
                        callback("ERROR");
                    }
                    else {
                        callback("SUCCESS");
                    }
                });
            }
        });
    }
    else {
        console.log("Student or class ID null");
    }
}

export function getClassesFromLecturer(lecturerId, callback) {
    openDb((res) => {
        if(res) {
            let sql = `SELECT * FROM class_details WHERE lecturer_id = '` + lecturerId + `';`;
            db.all(sql, [], (err, rows) => {
                if(err) {
                    return console.log(err.message);
                }
                let data = [];
                rows.forEach((row) => {
                    data.push(row);
                })
                callback(data);
            });
        }
    });
}

//createStudent("sid8", "stdfname", "", "stdlname", "semail8");
// createLecturer("lid1", "lectf", "", "lectl", "lemail1");
// createStudent("sid2", "stdf", "", "stdl", "semail2");
// createClass("lid1", "Maths", "joinmaths");
// createClass("lid1", "English", "joinenglish");
// createClass("lid1", "MATHS 2", "JOIN MATHS");

//addStudentToClass("sid2", "joinmaths");

//displayTable("class_student");

//getClassesFromLecturer("lid1", (res)=>{console.log(res)});
