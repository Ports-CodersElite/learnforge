"use strict"
//TODO: read questions from json file and put them into a html form
// get only questions from server and then get answers after it is handed in

//let div = document.createElement("div");



let testJson = '{"questions": [' +
    '{ "question": "What is 1+1"},' +
    '{ "question": "What is 3*3"},' +
    '{ "question": "What is 2+2"}' +
    ']}'

// const obj = JSON.parse(testJson);

// class Question {
//     id;
//     questionText;
//     answerText;
//     constructor(id, qText) {
//         this.id = id;
//         this.questionText = qText;
//     }
// };

// let div = document.createElement("div");
// // div.setAttribute("class", "mb-3");
// let form = document.createElement("form");
// let questions = [];

// for (let i = 0; i < obj.questions.length; i++) {
//     let q = obj.questions[i];
//     //questions.push(Question("q" + i, q.question, q.answer));

//     let questionText = document.createTextNode(q.question);
//     questionText.htmlFor = "q" + i;
//     form.append(questionText);
    
//     let q1 = document.createElement("input");
//     q1.type = "text";
//     q1.id = "q" + i;
//     form.append(q1);
//     form.append(document.createElement("br"));
// }

// div.append(form);





// document.body.append(form);