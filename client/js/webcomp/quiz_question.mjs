class QuizQuestion extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open'});
        this.question;
        this.options = [];
        this.qustionAnswer;
        this.setOptions = this.setOptions.bind(this);
        this.createInPage = this.createInPage.bind(this);
        this.setQuestion = this.setQuestion.bind(this);
        this.submit = this.submit.bind(this);
        this.setAnswer = this.setAnswer.bind(this);
        this.create = this.create.bind(this);
    }

    connectedCallback() {
        this.correctEvent = new CustomEvent("response", {
            detail: {
                name: "correct",
            },
        });

        this.incorrectEvent = new CustomEvent("response", {
            detail: {
                name: "incorrect",
            },
        });
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
                .hide{
                    display: none;
                }
            </style>
        `
    }

    setQuestion(_name) {
        if(this.questionHTML === undefined) {
            this.questionHTML = document.createElement('h1');
            this.questionHTML.textContent = _name;
            this.shadow.append(this.questionHTML);
            return;
        }
        this.questionHTML.textContent = _name;
    }

    //expects an array
    setOptions(_options) {
        this.options = _options;
    }

    setAnswer(_ans) {
        this.qustionAnswer = _ans;

        
        // Hidden on creation
        this.correctDiv = document.createElement('div');
        this.correctDiv.classList.add(['alert'], ['alert-success'], ['hide']);
        this.correctDiv.textContent = "Correct";

        // Hidden on creation
        this.incorrectDiv = document.createElement('div');
        this.incorrectDiv.classList.add(['alert'], ['alert-danger'], ['hide']);
        this.incorrectDiv.textContent = "Incorrect. Answer: " + this.qustionAnswer;

        this.shadow.append(this.correctDiv, this.incorrectDiv);
    }

    createInPage() {
        this.questionHTML = document.createElement('h1');
        this.questionHTML.textContent = this.question;
        this.questionHTML.classList.add('fs-1');

        this.shadow.append(this.questionHTML);

        for(let i = 0; i < this.options.length; i++){
            const btn = document.createElement('button');
            btn.textContent = this.options[i];
            btn.classList.add(['btn'], ['btn-primary'], ['m-2']);
            btn.addEventListener('click', this.submit);
            this.shadow.append(btn);
        }
    }

    submit(e) {
        console.log("User Ans: " + e.target.textContent);
        console.log("Ans: " + this.qustionAnswer);
        
        if(e.target.textContent === this.qustionAnswer) {
            this.dispatchEvent(this.correctEvent);
            // Makes sure incorrect and correct arent displaying at same time
            if(!this.incorrectDiv.classList.contains('hide')){
                this.incorrectDiv.classList.add('hide');
            }
            this.correctDiv.classList.remove('hide');
            return;
        }
        this.dispatchEvent(this.incorrectEvent);
        // Makes sure incorrect and correct arent displaying at same time
        if(!this.correctDiv.classList.contains('hide')){
            this.correctDiv.classList.add('hide');
        }
        this.incorrectDiv.classList.remove('hide');
    }

    create(_question, _options,  _answer) {
        this.setAnswer(_answer);
        this.setOptions(_options);
        this.setQuestion(_question);
        this.createInPage();
    }
}
customElements.define('quiz-question', QuizQuestion);