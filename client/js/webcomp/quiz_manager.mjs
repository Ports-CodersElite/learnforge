class QuizManager extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open'});
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
    }

    connectedCallback() {
        this.scoreHTML = document.createElement('h1');
        this.scoreHTML.textContent = "Score: " + this.score;

        this.question = document.createElement('quiz-question');
        this.question.create(this.quiz[0].question, this.quiz[0].options, this.quiz[0].answer);

        this.shadow.append(this.scoreHTML,this.question);
    }
}

customElements.define('quiz-manager', QuizManager);