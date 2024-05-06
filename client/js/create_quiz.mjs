import * as db from './db_query.mjs';

window.addEventListener('load', init);

let quiz_creator;

function init() {
    quiz_creator = document.querySelector('#quizCreator');
    quiz_creator.addEventListener('quiz-created', uploadQuizToDb);
}

function uploadQuizToDb(e) {
    const uid = sessionStorage.getItem('uid')

    if (uid === null) {
        console.log('error user not loggd in');
        return;
    }
    db.uploadQuiz(uid, quiz_creator.output.quizName, JSON.stringify(quiz_creator.output.questions));
}

