class QuizCreator extends HTMLElement {
    constructor() {
        super();
        this.name = '';
        this.questions = [];
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
        
        this.shadow.append(this.addQuestionBtn, this.createQuizBtn);
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
            console.log(`Question: ${this.questions[i].question} | Answer: ${this.questions[i].answer} | Options: ${this.questions[i].options}`);
        }
    }
}
customElements.define('quiz-creator', QuizCreator);