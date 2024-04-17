CREATE DATABASE learnforge;

CREATE TABLE questions (
    quizID SERIAL NOT NULL FOREIGN KEY REFERENCES Quizzes(quizID)
    questionID SERIAL NOT NULL PRIMARY KEY,
    questionText VARCHAR(100),
);

CREATE TABLE answers (
    answerID SERIAL NOT NULL PRIMARY KEY,
    quizID NOT NULL FOREIGN KEY REFERENCES Quizzes(quizID),
    answerText VARCHAR(100),
);

CREATE TABLE quizzes (
    quizID SERIAL NOT NULL PRIMARY KEY,
    quizName VARCHAR(20),
);

INSERT INTO Quizzes ("QUIZ1");