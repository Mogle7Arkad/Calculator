class Calculator {
    constructor(previousOperarandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clearButton()
    }

    clearButton(){
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.'))return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '')return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(previous) || isNaN(current))return
        switch(this.operation){
            case '+':
                computation = previous + current
                break
            case '-':
                computation = previous - current
                break
            case '*':
                computation = previous * current
                break
            case '÷':
                computation = previous / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        if(this.operation != null){
            this.previousOperandTextElement.innerText =`${this.previousOperand} ${this.operation}`
        }
    }
}

const output = document.querySelector('.Output-Screen')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-Operand]')

const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', () =>{
    calculator.compute()
    calculator.updateDisplay()
})
clearButton.addEventListener('click', () =>{
    calculator.clearButton()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', () =>{
    calculator.delete()
    calculator.updateDisplay()
})