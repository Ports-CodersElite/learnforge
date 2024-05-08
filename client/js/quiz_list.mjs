import * as db from './db_query.mjs';

window.addEventListener('load', init);

function init() {
    let quizzes = [];
    db.getQuizzes(sessionStorage.getItem('uid'), (res) => {

        for(let i = 0; i < res.length; i ++) {
            quizzes.push({
                quizName: JSON.parse(res[i]).quiz_title,
                questions: JSON.parse(res[i]).questions
            });
        }

        let quizListManager = document.querySelector('#quizListManager');
        quizListManager.setQuizes(quizzes);
    });


    
}

