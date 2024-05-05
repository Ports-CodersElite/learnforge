class QuizCreatorQuestion extends HTMLElement {
    constructor() {
        super();
        this.question = '';
        this.options = [];
        this.answer = [];

        this.addOption = this.addOption.bind(this);
        this.confirmQuestion = this.confirmQuestion.bind(this);
    }   

    connectedCallback() {
        this.shadow = this.attachShadow({mode : 'open'});

        this.questionBackgroundDiv = document.createElement('div');
        this.questionBackgroundDiv.classList.add(['sub-container']);
        this.questionBackgroundDiv.id = 'backgroundDiv';

        this.questionNameH3 = document.createElement('h3');
        this.questionNameH3.textContent = 'Question';

        this.questionNameInput = document.createElement('input');
        this.questionNameInput.placeholder = 'Question Here';

        this.addOptionBtn = document.createElement('button');
        this.addOptionBtn.addEventListener('click', this.addOption);
        this.addOptionBtn.textContent = 'Add Option';

        this.questionBackgroundDiv.appendChild(this.questionNameH3);
        this.questionBackgroundDiv.appendChild(this.questionNameInput);
        this.questionBackgroundDiv.appendChild(this.addOptionBtn);
        this.addStyle();
        this.shadow.append(this.questionBackgroundDiv);
    }

    addStyle() {
        this.shadow.innerHTML += `
            <style>
                #backgroundDiv {
                    background-color: darkgray;
                }

                input {

                }

                button {
                    float: right;
                    margin-right: 1em;
                }
            </style>
        `
    }

    addOption() {
        const option = document.createElement('quiz-creator-option');
        this.options.push(option);
        this.questionBackgroundDiv.append(option);
    }

    confirmQuestion() {
        this.question = this.questionNameInput.value;

        for(let option of this.options) {
            option.setOption();
            if (option.isCorrectCheckbox.checked === true) {
                this.answer.push(option.optionText);
            }
        }

    }
}
customElements.define('quiz-creator-question', QuizCreatorQuestion);