class QuizCreator extends HTMLElement {
    constructor() {
        super();
        this.name = '';
        this.questionsOutput = []; // Stores only required string data NOT HTML Elements
        this.questions = []; // Stores HTML Elements
        this.addQuestion = this.addQuestion.bind(this);
        this.createQuiz = this.createQuiz.bind(this);
        this.outputQuiz = this.outputQuiz.bind(this);
        this.output;
    }
    
    connectedCallback() {
        this.shadow = this.attachShadow({mode : 'open'});

        this.customEvent = new CustomEvent('quiz-created');

        this.addQuestionBtn = document.createElement('button');
        this.addQuestionBtn.addEventListener('click', this.addQuestion);
        this.addQuestionBtn.textContent = 'Add Question';

        this.createQuizBtn = document.createElement('button');
        this.createQuizBtn.addEventListener('click', this.createQuiz);
        this.createQuizBtn.textContent = 'Create Quiz';

        this.quizName = document.createElement('input');
        this.quizName.placeholder = 'Quiz Name';
        
        this.addStyle();
        this.shadow.append(this.addQuestionBtn, this.createQuizBtn, this.quizName);
    }

    addStyle() {
        this.shadow.innerHTML += `
        <style>
        
            button {
                border: none;
                
                background-color: #0d6efd;
                color: white;
                padding: 1em;
                margin: 1em;
                font-size: large;
                border-radius: 1em;
            }

            button:hover{
                background-color: #0D66E9 ;
            }

            input {
                align-self: center;
                font-size: larger;
                border-radius: 1em;
                border: none;
                margin: 1em;
                padding: 1em;
            }


        </style>
    `
    }

    // Appends HTML Element quesiton to this.questions
    addQuestion() {
        const question = document.createElement('quiz-creator-question');
        this.questions.push(question);
        this.shadow.appendChild(question);
    }

    // When clicking create quiz button
    // Formats data for database in new array called this.questionsOutput
    createQuiz() {
        this.questionsOutput = [];
        for(let i = 0; i < this.questions.length; i++) {
            this.questions[i].confirmQuestion();

            // Create question object and add question + question answer
            let question = {
                question: this.questions[i].question,
                options: [],
                answer: this.questions[i].answer
            }

            const options = [];
            // Adds all the options to the question object
            for (let f = 0; f < this.questions[i].options.length; f++) {
                options.push(this.questions[i].options[f].optionText);
            }

            // Pushes quesiton object to array in quiz
            this.name = this.quizName.value;
            question.options = options;
            this.questionsOutput.push(question);
        }
        this.output = this.outputQuiz();
        this.dispatchEvent(this.customEvent);
    }

    // Gives quiz in correct format to be loaded into quiz_manager
    outputQuiz() {
        let quizObj = {
            quizName: this.name,
            questions: this.questionsOutput
        }
        return quizObj;
    }
}
customElements.define('quiz-creator', QuizCreator);