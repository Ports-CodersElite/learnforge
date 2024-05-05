window.addEventListener('load', init);

const buttons = {
    addQuestion: null,
    addChoice: null,
}

const containers = {
    questionChoice: null,
}

let quiz = {
    name: '',
    quiz: [{
        question: '',
        options: [],
        answer: ''
    }]
}

function init() {
    console.log('create_quiz.mjs loaded');

    buttons.addQuestion = document.querySelector('#newQuestionBtn');
    buttons.addQuestion.addEventListener('click', addQuestion);

    buttons.addChoice = document.querySelector('#newChoiceBtn');
    buttons.addChoice.addEventListener('click', addChoice);

    containers.questionChoice = document.querySelector('#question-choices-container');
}

function addQuestion() {
    console.log('add question');
}

function addChoice() {
    console.log('add choice');
    const div = document.createElement('div');
    div.classList.add('p-4');

    const choiceText = document.createElement('span');
    choiceText.textContent = 'Choice X';

    const textArea = document.createElement('textarea');
    textArea.classList.add(['m-3'],['quiz-question-input'],['form-control']);
    textArea.setAttribute('type', 'text');
    textArea.placeholder = 'Your answer';

    const checkbox = document.createElement('input');
    checkbox.classList.add('form-check-input');
    checkbox.setAttribute('type', 'checkbox');

    const checkboxText = document.createElement('span');
    checkboxText.classList.add('answer-checkbox-text');
    checkboxText.textContent = 'Choice X is correct?';

    div.appendChild(choiceText);
    div.appendChild(textArea);
    div.appendChild(checkbox);
    div.appendChild(checkboxText)
    containers.questionChoice.appendChild(div);
}





