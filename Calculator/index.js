var currentValue = 0;
var currentOperation = '';


function AddInput(number) {
    var inputValue = document.getElementById('inputField');
    if (inputValue.value.length <=7) {
        inputValue.value += number;
    }
}

function SelectOperation(operation) {
    console.log(operation);
    currentValue = parseFloat(document.getElementById('inputField').value)
    currentOperation = operation;
    console.log('currentValue: ', currentValue, '| currentOperation: ',currentOperation);
    document.getElementById('inputField').value = '';
}

function Calculate() {
    var num1 = currentValue;
    var num2 = parseFloat(document.getElementById('inputField').value);
    var result;

    console.log('currentOperation: ', currentOperation);

    switch(currentOperation) {
        case 'add':
            result = num1+num2;
            result.toString().length > 7 ? result = 'OUT OF RANGE' : result
            break
        case 'substract':
            result = num1 - num2
            break
        case 'multiply':
            result = num1 * num2;
            result.toString().length > 7 ? result = 'OUT OF RANGE' : result
            break
        case 'divide':
            num2 != 0 ? result = num1 / num2 : result = 'NOT POSSIBLE';
            break
        default:
            break
    }
    if(result){
        document.getElementById('inputField').value = result;
    }

}

function ClearInputField() {
    console.log('clear input field...');
    document.getElementById('inputField').value = '';
}

function ClearEverything() {
    console.log('clear everything...');
    document.getElementById('inputField').value = '';
    currentValue = 0;
    currentOperation = '';
}


