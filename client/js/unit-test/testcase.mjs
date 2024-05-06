class TestCase extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open'});
        this.addStyle();
        this.testPassed = null;
        this.addTestInformation = this.addTestInformation.bind(this);

        
    }

    connectedCallback() {
        this.backgroundDiv = document.createElement('div');
        this.testNameH2 = document.createElement('h2');
        this.testNameH2.textContent = "TEST NAME";

        this.inputDataP = document.createElement('p');
        this.inputDataP.textContent = "TEST DATA";
        
        this.expectedOutputP = document.createElement('p');
        this.expectedOutputP.textContent = "TEST EXPECT OUTPUT";

        this.backgroundDiv.appendChild(this.testNameH2);
        this.backgroundDiv.appendChild(this.inputDataP);
        this.backgroundDiv.appendChild(this.expectedOutputP);
        this.addStyle();
        this.shadow.append(this.backgroundDiv);
    }

    addStyle() {
        this.shadow.innerHTML += `
            <style>
                div {
                    display: block;
                    margin: auto;
                    background-color: gray;
                    width: 50vw;
                    height: 20vh;
                    text-align: center;
                }

                .testPassed {
                    outline: solid green;
                }

                .testFailed {
                    outline: solid red;
                }
            </style>
        `
    }

    addTestInformation(testName, inputData, expectedOutput, passedQ) {
        this.testNameH2.textContent = `UNIT TEST: ${testName}`;
        this.inputDataP.textContent = `Data Given: ${inputData}`;
        this.expectedOutputP.textContent = `Expected Output: ${expectedOutput}`;

        if (passedQ === false) {
            this.backgroundDiv.classList.add('testFailed');
            return;
        }
        this.backgroundDiv.classList.add('testPassed');
        
    }
}
customElements.define('test-case', TestCase);