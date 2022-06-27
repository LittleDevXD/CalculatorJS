class Calculator {
    constructor(prevTextElement, currentTextElement) {
        this.prevTextElement = prevTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();
    }

    clear() {
        this.currentText = '';
        this.prevText = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentText === "") {
            this.operation = "";
            this.currentText = this.prevText;
            this.prevText = "";
        } else {
            this.currentText = this.currentText.slice(0, -1);
        }
    }

    appendNumber(number) {
        if (number === "." && this.currentText.includes(".")) return
        this.currentText += number.toString();
    }

    chooseOperation(operation) {
        if (this.currentText === "") return
        if (this.prevText) {
            this.compute();
        }
        this.operation = operation;
        this.prevText = this.currentText;
        this.currentText = "";
    }

    compute() {
        let computation;
        let currentTextValue = parseFloat(this.currentText);
        let prevTextValue = parseFloat(this.prevText);

        switch(this.operation) {
            case "+":
                computation = prevTextValue + currentTextValue;
                break;
            case "-":
                computation = prevTextValue - currentTextValue;
                break;
            case "*":
                computation = prevTextValue * currentTextValue;
                break;
            case "÷":
                computation = prevTextValue / currentTextValue;
                break;
            default:
                return
        }
        this.currentText = computation;
        this.operation = undefined;
        this.prevText = "";
    }

    // HARDEST PART 
    format(number) {
        let stringNumber = number.toString();
        let integerDigits = parseFloat(stringNumber.split(".")[0]);
        let decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits !== undefined) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentTextElement.innerText = this.format(this.currentText);
        if (this.operation !== undefined) {
            this.prevTextElement.innerText = this.format(this.prevText).toString() + this.operation.toString();    
        } else {
            this.prevTextElement.innerText = this.format(this.prevText);
        }
    }
}

const numbers = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalButton = document.querySelector("[data-equal]");
const currentTextElement = document.querySelector("[data-current-text]");
const prevTextElement = document.querySelector("[data-prev-text]");

const calculator = new Calculator(prevTextElement, currentTextElement);

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        calculator.appendNumber(number.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach((operation) => {
    operation.addEventListener("click", () => {
        calculator.chooseOperation(operation.innerText);
        calculator.updateDisplay();
    })
})

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})

equalButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})
