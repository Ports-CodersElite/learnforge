import * as db from './db_query.mjs';

window.addEventListener('load', init);

let dummyQuiz1 = {
    quizName: 'Computer Science',
    questions: [
        {
            question: "Which one is NOT a HTML tag?",
            options: ["Body","Head","Toes","Footer","Div"],
            answer: ["Toes"],
        },
        {
            question: "What is CSS used for?",
            options: ["fun","styling a html doc","backend"],
            answer: ["styling a html doc"],
        },
        {
            question: "What is react used for?",
            options: ["front-end","back-end","middle"],
            answer: ["front-end"],
        },
        {
            question: "What is the base of hexidecimal?",
            options: ["24","10","12","16","14"],
            answer: ["16"],
        },
        {
            question: "What is the base of binary?",
            options: ["2","10","12","16","14"],
            answer: ["2", "16"],
        },
        ],
}

let dummyQuiz2 = {
    quizName: 'Math',
    questions: [
        {
            question: "5 x 5",
            options: ["10","15","20","25","30"],
            answer: ["25"],
        },
        {
            question: "45 + 5",
            options: ["10","60","50"],
            answer: ["50"],
        },
        {
            question: "6 / 3",
            options: ["10","5","2"],
            answer: ["2"],
        },
        ],
}

let dummyQuiz3 = {
    quizName: 'Science',
    questions: [
        {
            question: "What is the chemical formula for water",
            options: ["co2","h2o"],
            answer: ["h2o"],
        },
        {
            question: "What does DNA stand for?",
            options: ["Deoxyribonucleic acid","water"],
            answer: ["Deoxyribonucleic acid"],
        },
        {
            question: "What is the most abundant gas in the Earth's atmosphere?",
            options: ["nitrogen","Oxygen","water"],
            answer: ["nitrogen"],
        },
        {
            question: "Roughly how long does it take for the sun's light to reach Earth",
            options: ["8 min","8 hours","8 days","8 years"],
            answer: ["8 min"],
        },
        {
            question: "How many teeth does an adult human have?",
            options: ["32","10","12","16","14"],
            answer: ["32"],
        },
        {
            question: "What is the fastest land animal in the world?",
            options: ["cheetah","tiger","monkey"],
            answer: ["cheetah"],
        },
        ],
}



let quizes = [dummyQuiz1, dummyQuiz2, dummyQuiz3];

function init() {
    console.log('quiz_list.mjs running');
    let quizzes = [];
    db.getQuizzes(sessionStorage.getItem('uid'), (res) => {

        for(let i = 0; i < res.length; i ++) {
            console.log(res[i]);
            console.log(JSON.parse(res[i]));
            quizzes.push({
                quizName: JSON.parse(res[i]).quiz_title,
                questions: JSON.parse(res[i]).questions
            });
        }

        let quizListManager = document.querySelector('#quizListManager');
        quizListManager.setQuizes(quizzes);
    });


    
}

