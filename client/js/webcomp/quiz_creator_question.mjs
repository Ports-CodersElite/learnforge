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

        this.questionNameH3 = document.createElement('h2');
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
                    background: #e0e0e0;
                    padding: 2em;
                    margin: 3em;
                    border-radius: 1em;
                    font-size: large;
                
                    min-height: 15vh;
                }

                input {
                    align-self: center;
                    font-size: larger;
                    border-radius: 1em;
                    border: none;
                    padding: 1em;
                }

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