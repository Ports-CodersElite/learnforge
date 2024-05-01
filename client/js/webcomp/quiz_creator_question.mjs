class QuizCreatorQuestion extends HTMLElement {
    constructor() {
        super();
        this.question = '';
        this.options = [];
        this.answer = '';

        this.answerAlreadyFound = false;

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

        console.log(this.options);

        for(let option of this.options) {
            if (this.answerAlreadyFound === true) {
                alert('You can only select one correct answer. (First answer to be checked has been set to correct.');
                return;
            }

            if (option.isCorrectCheckbox.checked === true) {
                this.answerAlreadyFound = true;
                this.answer = option.optionInput.value;
            }
        }

    }
}
customElements.define('quiz-creator-question', QuizCreatorQuestion);