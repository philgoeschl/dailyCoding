var currentValue = 0;
var currentOperation = '';
var isOperationSelected = false;

var num1 = 0;
var num2 = 0;


function AddInput(number) {
    if (isOperationSelected) {
        ClearInputField();
        isOperationSelected = false;
    }
    var inputValue = document.getElementById('inputField');
    if (inputValue.value.length <= 7) {
        inputValue.value += number;
    }
}

function SelectOperation(operation, symbol) {
    // if num1 and operation are set, store value to num2 and then calculate the result, store to num1 and show it!
    if (currentOperation != '') {
        currentOperation = operation;
        Calculate();
        document.getElementById('inputField').value = num1 + symbol;
    } else {
        num1 = parseFloat(document.getElementById('inputField').value)
        currentOperation = operation;
        document.getElementById('inputField').value = num1 + symbol;
        isOperationSelected = true;
    }



}

function Calculate() {

    num2 = parseFloat(document.getElementById('inputField').value);

    console.log('calculate: ', num1, num2);

    switch (currentOperation) {
        case 'add':
            num1 = num1 + num2;
            num1.toString().length > 7 ? num1 = 'OUT OF RANGE' : num1
            break
        case 'substract':
            num1 = num1 - num2
            break
        case 'multiply':
            num1 = num1 * num2;
            num1.toString().length > 7 ? num1 = 'OUT OF RANGE' : num1
            break
        case 'divide':
            num2 != 0 ? num1 = num1 / num2 : num1 = 'NOT POSSIBLE';
            break
        default:
            break
    }
    if (num1) {
        document.getElementById('inputField').value = num1;
    }
    num2 = 0;
    currentOperation = '';

    console.log('num1: ', num1);
    console.log('num2: ', num2);

}

function ClearInputField() {
    document.getElementById('inputField').value = '';
}

function ClearEverything() {
    console.log('clear everything...');
    document.getElementById('inputField').value = '';
    currentValue = 0;
    currentOperation = '';
}


