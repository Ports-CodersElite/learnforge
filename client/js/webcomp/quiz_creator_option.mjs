class QuizCreatorOption extends HTMLElement {
    constructor() {
        super();
    }   

    connectedCallback() {
        this.shadow = this.attachShadow({mode : 'open'});
        
        this.backgroundDiv = document.createElement('div');
        this.backgroundDiv.id = 'backgroundDiv';

        this.optionP = document.createElement('p');
        this.optionP.textContent = 'Option:';

        this.optionInput = document.createElement('input');
        this.optionInput.placeholder = 'Option here';

        this.isCorrectP = document.createElement('p');
        this.isCorrectP.id = 'isCorrectP';
        this.isCorrectP.textContent = 'is correct?';

        this.isCorrectCheckbox = document.createElement('input');
        this.isCorrectCheckbox.classList.add('form-check-input');
        this.isCorrectCheckbox.setAttribute('type', 'checkbox');

        this.backgroundDiv.appendChild(this.optionP);
        this.backgroundDiv.appendChild(this.optionInput);
        this.backgroundDiv.appendChild(this.isCorrectP);
        this.backgroundDiv.appendChild(this.isCorrectCheckbox);

        this.addStyle();
        this.shadow.append(this.backgroundDiv);
    }   

    addStyle() {
        this.shadow.innerHTML += `
        <style>
            #backgroundDiv {
                background-color: gray;
            }
        </style>
        `
    }
}
customElements.define('quiz-creator-option', QuizCreatorOption);