--TODO: 
-- Create views for complex queries 
-- Check attribute data types 
-- Ensure all constraints are added
-- Ensure database contains everything thats needed


-------------------------------
-- Table creations 
-------------------------------

CREATE TABLE subject(
    subject_id INTEGER PRIMARY KEY, 
    subject_name TEXT NOT NULL
);

CREATE TABLE user_details(
    user_id TEXT PRIMARY KEY,
    role TEXT CHECK(role IN ("teacher","student")) NOT NULL,
    user_fname TEXT NOT NULL,
    user_lname TEXT NOT NULL,
    user_emailaddress TEXT NOT NULL
);

CREATE TABLE class_details(
    class_id INTEGER PRIMARY KEY,
    subject_id INTEGER NOT NULL,
    teacher_id TEXT NOT NULL,
    class_name TEXT NOT NULL,
    FOREIGN KEY(subject_id) REFERENCES subject(subject_id)
);

CREATE TABLE class_students(
    user_id TEXT NOT,
    class_id INTEGER, 
    PRIMARY KEY(user_id, class_id),
    FOREIGN KEY(user_id) REFERENCES user_details(user_id),
    FOREIGN KEY(class_id) REFERENCES class_details(class_id) 
);

CREATE TABLE quiz_details(
    quiz_id INTEGER PRIMARY KEY, 
    subject_id INTEGER, 
    quiz_title TEXT NOT NULL,
    quiz_data BLOB NOT NULL, 
    FOREIGN KEY(subject_id) REFERENCES subject(subject_id)
);

CREATE TABLE assignments(
    assignment_id INTEGER PRIMARY KEY,
    class_id INTEGER,
    quiz_id INTEGER,
    description TEXT,
    passmark INTEGER NOT NULL, 
    issue_date DATETIME NOT NULL,
    deadline DATETIME NOT NULL 
);

---------------------------------------------
-- Subject data inserts 
---------------------------------------------
INSERT INTO subject(subject_id, subject_name)
VALUES 
(NULL,"maths"),
(NULL,"english"),
(NULL,"computer science"),
(NULL,"sports science"),
(NULL,"science")
(NULL,"digital marketing");
