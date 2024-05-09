class QuizListManager extends HTMLElement {
    constructor() {
        super();
        this.quizes;
        this.createListElems = this.createListElems.bind(this);
        this.setQuizes = this.setQuizes.bind(this);
    }

    connectedCallback() {
        this.shadow = this.attachShadow({mode : 'open'});
        this.addStyle();
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
            .quizList {
                margin: 5em;
            }
        </style>

        `
    }

    setQuizes(quizes) {
        this.quizes = quizes;
        this.createListElems();
    }

    // create list elements + added data into them
    createListElems() {
        for(const elem of this.quizes) {
            const temp = document.createElement('quiz-list');
            temp.classList.add('quizList');
            temp.setName(elem.quizName);
            temp.quizData = elem.questions;
            this.shadow.append(temp);
        }
    }
}
customElements.define('quiz-list-manager', QuizListManager)