const sqlite3 = require('sqlite3').verbose();
const fs = require('node:fs');


sql = `
CREATE TABLE student_details(
    student_id TEXT PRIMARY KEY,
    user_fname TEXT NOT NULL,
    user_mname TEXT,
    user_lname TEXT NOT NULL,
    user_emailaddress TEXT
);

CREATE TABLE lecturer_details(
    lecturer_id TEXT PRIMARY KEY,
    user_fname TEXT NOT NULL,
    user_mname TEXT,
    user_lname TEXT NOT NULL,
    user_emailaddress TEXT
);

CREATE TABLE class_details(
    join_code TEXT PRIMARY KEY NOT NULL,
    lecturer_id TEXT NOT NULL,
    class_name TEXT NOT NULL,
    FOREIGN KEY(lecturer_id) REFERENCES lecturer_details(lecturer_id)
);

CREATE TABLE class_student(
    join_code INTEGER NOT NULL,
    student_id TEXT NOT NULL,
    PRIMARY KEY (join_code, student_id),
    FOREIGN KEY (join_code) REFERENCES class_details(join_code),
    FOREIGN KEY (student_id) REFERENCES student_details(student_id)
);

CREATE TABLE quiz_details(
    quiz_id INTEGER PRIMARY KEY,
    creator_id TEXT NOT NULL,
    quiz_title TEXT NOT NULL,
    quiz_data TEXT NOT NULL,
    FOREIGN KEY(creator_id) REFERENCES lecturer_details(lecturer_id)
);

CREATE TABLE assignment_details(
    assignment_id INTEGER PRIMARY KEY,
    class_id INTEGER NOT NULL,
    quiz_id INTEGER NOT NULL,
    issue_date DATETIME NOT NULL,
    description INTEGER NOT NULL,
    FOREIGN KEY(class_id) REFERENCES class_details(join_code),
    FOREIGN KEY(quiz_id) REFERENCES quiz_details(quiz_id)
);

CREATE TABLE quiz_history(
    history_id INTEGER PRIMARY KEY,
    student_id TEXT NOT NULL,
    quiz_id INTEGER NOT NULL,
    score_obtained INTEGER NOT NULL,
    incorrect_questions TEXT NOT NULL,
    max_score INTEGER NOT NULL,
    quiz_status TEXT NOT NULL,
    FOREIGN KEY(student_id) REFERENCES student_details(student_id),
    FOREIGN KEY(quiz_id) REFERENCES quiz_details(quiz_id)
);
`


// Only needs to be called one time to create database file
function init() {
    console.log("INITIALIZING DB");
    // fs.writeFile("./server/learnforge.db", "", (err) => {
    //     if (err) console.log(err.message);
    // });
    const db = new sqlite3.Database("./server/learnforge.db", sqlite3.OPEN_READWRITE, (err) =>{
        if (err) return console.error(err.message);
    });
    db.exec(sql, (err) => {
        if (err) return console.log(err.message);
    });
}

init();