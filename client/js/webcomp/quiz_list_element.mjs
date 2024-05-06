class QuizList extends HTMLElement {
    constructor() {
        super();
        this.quizData = {};
        this.startQuiz = this.startQuiz.bind(this);
        this.setName = this.setName.bind(this);

        this.shadow = this.attachShadow({mode : 'open'});

        this.customEvent = new CustomEvent('quiz-selected');

        this.backgroundDiv = document.createElement('div');

        this.quizDetailDiv = document.createElement('div');
        this.quizDetailDiv.classList.add('quiz-details');

        this.quizName = document.createElement('span');
        this.quizName.textContent = 'Quiz Name';
        this.quizName.classList.add('main-text');

        this.startQuizBtn = document.createElement('button');
        this.startQuizBtn.addEventListener('click', this.startQuiz);
        this.startQuizBtn.textContent = 'Start Quiz';
        this.startQuizBtn.classList.add(['btn'] , ['btn-primary'] , ['p-2']);
    }

    connectedCallback() {
        this.quizDetailDiv.appendChild(this.quizName);
        this.quizDetailDiv.appendChild(this.startQuizBtn);
        this.backgroundDiv.appendChild(this.quizDetailDiv);

        this.addStyle();
        this.shadow.append(this.backgroundDiv);
    }

    addStyle() {
        this.shadow.innerHTML += `
        <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        </head>

        <body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
            crossorigin="anonymous"></script>
        </body>

        <style>
            .quiz-details{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
        </style>

        `
    }

    //Sets quizes name
    setName(quizName) {
        this.quizName.textContent = quizName;
    }

    startQuiz() {
        this.dispatchEvent(this.customEvent);
        sessionStorage.setItem('selectedQuiz', JSON.stringify(this.quizData));
        window.location.href = 'quiz.html';
    }
}
customElements.define('quiz-list', QuizList)