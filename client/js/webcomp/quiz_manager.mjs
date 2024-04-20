class QuizManager extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open'});
        this.manager = this.manager.bind(this);
        this.questionCreator = this.questionCreator.bind(this);
        this.questionChecker = this.questionChecker.bind(this);
        this.quizFeedback = this.quizFeedback.bind(this);
        this.incorrectQuestions = [];
        this.quiz = [
        {
            question: "Which one is NOT a HTML tag?",
            options: ["Body","Head","Toes","Footer","Div"],
            answer: "Toes",
        },
        {
            question: "What is CSS used for?",
            options: ["fun","styling a html doc","backend"],
            answer: "styling a html doc",
        },
        {
            question: "What is react used for?",
            options: ["front-end","back-end","middle"],
            answer: "front-end",
        },
        {
            question: "What is the base of hexidecimal?",
            options: ["24","10","12","16","14"],
            answer: "16",
        },
        {
            question: "What is the base of binary?",
            options: ["2","10","12","16","14"],
            answer: "2",
        },
        ];
        this.score = 0;
        this.questionIndex = 0;
    }

    connectedCallback() {
        this.addStyle();
        this.scoreHTML = document.createElement('h1');
        this.scoreHTML.textContent = "Score: " + this.score + " / " + this.quiz.length;
        this.shadow.append(this.scoreHTML);
        this.manager();
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
            #progressBarContainer{
                display: block;
                margin: auto;
                width: 50%;
            }

            .cardStyle {
                display: block;
                margin: auto;
                max-width: 24rem;
            }
        </style>
        `
    }

    // Checks if question is correct
    // Increments score if needed
    // Removes/Deletes question element
    // Calls Question to create and display next question
    manager() {
        if (this.quiz.length > this.questionIndex) {
            this.questionCreator();
            this.questionIndex++;
            return;
        }
        this.quizFeedback();
    }

    // Creates question
    // Add and appends to shadow DOM
    // Only creates question if there are more objects left in the this.quiz array
    questionCreator() {
        this.question = document.createElement('quiz-question');
        this.question.create(this.quiz[this.questionIndex].question, this.quiz[this.questionIndex].options, this.quiz[this.questionIndex].answer);
        this.question.addEventListener('response', this.questionChecker);
        this.shadow.append(this.question);
    }

    // Checks question
    // Adds score if needed
    // Diposes of question
    questionChecker(e) {
        if (e.detail.name === 'correct') {
            this.score += 1;
            this.scoreHTML.textContent = "Score: " + this.score + " / " + this.quiz.length;
            this.question.remove();
            this.manager();
            return;
        }

        if (this.quiz.length > this.questionIndex) {
            this.incorrectQuestions.push(this.quiz[this.questionIndex]); 
        }

        this.question.remove();
        this.manager();
    }

    quizFeedback() {
        this.scoreHTML.remove();
        this.feedbackTitle = document.createElement('h1');
        this.feedbackTitle.textContent = 'Feedback';

        this.feedbackScore = document.createElement('h3');
        this.feedbackScore.textContent = `${this.score} / ${this.quiz.length}`;

        this.feedbackPercent = document.createElement('h3');
        this.feedbackPercent.textContent = `${this.score / this.quiz.length * 100}%`;

        this.feedbackIncorrectQs = document.createElement('h2');
        this.feedbackIncorrectQs.classList.add('mt-5')
        this.feedbackIncorrectQs.textContent = 'Incorrect Questions:';

        this.shadow.append(this.feedbackTitle, this.feedbackScore, this.feedbackPercent, this.feedbackIncorrectQs);


        for(let i = 0; i < this.incorrectQuestions.length; i++){
            const card = document.createElement('div');
            card.classList.add(['card'], ['text-white'], ['bg-secondary'], ['mb-3'], ['cardStyle']);

            const cardHeader = document.createElement('div');
            cardHeader.classList.add(['card-header']);
            cardHeader.textContent = 'Question';
            
            const cardBody = document.createElement('div');
            cardBody.classList.add(['card-body']);

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add(['card-title']);
            cardTitle.textContent = this.incorrectQuestions[i].question;

            const cardText = document.createElement('p');
            cardText.classList.add(['card-text']);
            cardText.textContent = "Answer: " + this.incorrectQuestions[i].answer;

            card.append(cardHeader);
            cardHeader.append(cardBody);
            cardBody.append(cardTitle, cardText);

            this.shadow.append(card);
        }
    }
}

customElements.define('quiz-manager', QuizManager);