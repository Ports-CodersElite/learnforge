class QuizManager extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open'});
        this.manager = this.manager.bind(this);
        this.questionCreator = this.questionCreator.bind(this);
        this.quiz = [
        {
            question: "75 + 75",
            options: ["140","145","150","175","220"],
            answer: "175",
        },
        {
            question: "What colour is blue?",
            options: ["blue","green","red","yellow","triangle"],
            answer: "blue",
        },];
        this.score = 0;
        this.questionIndex = 0;
    }

    connectedCallback() {
        this.scoreHTML = document.createElement('h1');
        this.scoreHTML.textContent = "Score: " + this.score + " / " + this.quiz.length;
        this.shadow.append(this.scoreHTML);
        this.questionCreator();
    }

    // Checks if question is correct
    // Increments score if needed
    // Removes/Deletes question element
    // Calls Question to create and display next question
    manager(e) {
        if (e.detail.name == 'correct') {
            this.score += 1;
            this.scoreHTML.textContent = "Score: " + this.score + " / " + this.quiz.length;
            this.question.remove();
            this.questionCreator();
            return;
        }
        this.question.remove();
        this.questionCreator();
    }

    // Creates question
    // Add and appends to shadow DOM
    // Only creates question if there are more objects left in the this.quiz array
    questionCreator() {
        if (this.quiz.length > this.questionIndex) {
            this.question = document.createElement('quiz-question');
            this.question.create(this.quiz[this.questionIndex].question, this.quiz[this.questionIndex].options, this.quiz[this.questionIndex].answer);
            this.question.addEventListener('response', this.manager);
            this.shadow.append(this.question);
            this.questionIndex++;
            return;
        }
        alert('quiz over');
    }
}

customElements.define('quiz-manager', QuizManager);