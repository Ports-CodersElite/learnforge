class QuizCreator extends HTMLElement {
    constructor() {
        super();
        this.name = '';
        this.questions = []; // Stores HTML Elements
        this.addQuestion = this.addQuestion.bind(this);
        this.createQuiz = this.createQuiz.bind(this);
    }
    
    connectedCallback() {
        this.shadow = this.attachShadow({mode : 'open'});

        this.addQuestionBtn = document.createElement('button');
        this.addQuestionBtn.addEventListener('click', this.addQuestion);
        this.addQuestionBtn.textContent = 'Add Question';

        this.createQuizBtn = document.createElement('button');
        this.createQuizBtn.addEventListener('click', this.createQuiz);
        this.createQuizBtn.textContent = 'Create Quiz';

        this.quizName = document.createElement('input');
        this.quizName.placeholder = 'Quiz Name';
        
        this.shadow.append(this.addQuestionBtn, this.createQuizBtn, this.quizName);
    }

    addStyle() {
        this.shadow.innerHTML += `

        `
    }

    addQuestion() {
        const question = document.createElement('quiz-creator-question');
        this.questions.push(question);
        this.shadow.appendChild(question);
    }

    createQuiz() {
        for(let i = 0; i < this.questions.length; i++) {
            this.questions[i].confirmQuestion();
            console.log(`Question: ${this.questions[i].question} | Answer: ${this.questions[i].answer}`);

            // Create question object and add question + question answer
            let question = {
                question: this.questions[i].question,
                options: [],
                answer: this.questions[i].answer
            }

            const options = [];
            // Adds all the options to the question object
            for (let f = 0; f < this.questions[i].options.length; f++) {
                console.log(`Options: ${this.questions[i].options[f].option}`);
                options.push(this.questions[i].options[f].option);
            }

            // Pushes quesiton object to array in quiz
            this.name = this.quizName.value;
            question.options = options;
            console.log(question);
        }
    }
}
customElements.define('quiz-creator', QuizCreator);