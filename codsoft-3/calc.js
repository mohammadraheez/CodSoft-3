const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetDisplay = false;
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        const value = button.textContent;
        if (!action) {
            appendNumber(value);
        } else if (action === 'clear') {
            clearDisplay();
        } else if (action === 'delete') {
            deleteLastDigit();
        } else if (action === 'operator') {
            setOperator(value);
        } else if (action === 'equals') {
            evaluate();
        }
    });
});
function appendNumber(number) {
    if (shouldResetDisplay) {
        resetDisplay();
    }
    if (display.textContent === '0' && number !== '.' && number !== '00') {
        display.textContent = number;
    } else {
        display.textContent += number;
    }
}
function setOperator(op) {
    if (operator && currentInput) {
        evaluate();
    }
    operator = op;
    previousInput = display.textContent;
    shouldResetDisplay = true;
}
function evaluate() {
    if (!operator || !previousInput) return;
    currentInput = display.textContent;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    let result = 0;
    if (isNaN(prev) || isNaN(curr)) return;
    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }
    display.textContent = result;
    operator = '';
    shouldResetDisplay = true;
}
function resetDisplay() {
    display.textContent = '';
    shouldResetDisplay = false;
}
function deleteLastDigit() {
    display.textContent = display.textContent.slice(0, -1) || '0';
}
function clearDisplay() {
    display.textContent = '0';
    currentInput = '';
    operator = '';
    previousInput = '';
}