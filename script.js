class Calculator {
    constructor(prevText, currentText) {
        this.prevText = prevText;
        this.currentText = currentText;
    }

    appendNumber() {

    }

    clear() {

    }

    delete() {

    }

    displayScreen() {
        
    }
}

const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalButton = document.querySelector("[data-equal]");
const currentTextElement = document.querySelector("[data-current-text]");
const prevTextElement = document.querySelector("[data-prev-text]");