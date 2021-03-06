const displayValue = document.getElementById('display-value');

addKeyEvent();

function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b)

    case '-':
      return subtract(a, b)

    case 'x':
      return multiply(a, b)

    case '/':
      return divide(a, b)
  
    default:
      break;
  }
}

function addKeyEvent() {
  const keys = document.querySelectorAll('.key');
  keys.forEach(key => key.addEventListener('click', keyEvent));
}

function keyEvent(e) {
  const key = e.target.textContent;
  
  if (getDisplay().join('') === 'Infinity' || getDisplay().join('') === '-Infinity') {
    clearDisplay();
  }

  const displayArray = getDisplay();

  switch (key) {
    case 'CLR':
      clearDisplay();
      break;

    case 'DEL':
      displayArray.pop();
      updateDisplay(displayArray);
      break;

    case '=':
      const operationsArray = createOperations(displayArray);
      const result = calculateResult(operationsArray);
      updateDisplay([result]);
      break;

    default:
      if (checkDuplicateOperator(displayArray, key)) break;
      if (OperatorFirst(displayArray, key)) break;
      displayArray.push(key);
      updateDisplay(displayArray);
      break;
  }
}

function updateDisplay(values) {
    displayValue.textContent = values.join('');
}

function getDisplay() {
  return displayValue.textContent.split('')
}

function clearDisplay() {
  displayValue.textContent = '';
}

function createOperations(values) {
  let operand = '';
  const operations = [];
  const operators = ['+', 'x', '/'];
  
  values.forEach((value, idx, arr) => {

    if (value === '-') {
      // if first minus then push to operand
      if (idx === 0) {
        operand += value;
      }
      // if minus after operator then push to operand
      else if (
        operators.includes(arr[idx-1]) ||
        arr[idx-1] === '-'
      ) {
        operand += value;
      }
      // else its an operator
      else {
        if (operand !== '') {
          operations.push(operand);
          operand = '';
        }
        operations.push(value);
      }
    }
    else if (operators.includes(value)) {
      if (operand !== '') {
        operations.push(operand);
        operand = '';
      }
      operations.push(value);
    }
    else {
      // If it's not an operator it's an operand
      operand += value;

      // If it's the last operand add it to operations
      if (idx === (arr.length - 1)) operations.push(operand);
    }
  })
  
  return operations
}

function calculateResult(operations) {
  const result = operations.reduce((total, currentValue, idx, arr) => {
    if (isNaN(currentValue)) {
      // If it's not a number it's an operator
      const operator = currentValue;

      // If the last value in operations is an operator, add it to the end of the total
      if (idx === (arr.length -1)) return (+total + operator)

      const nextValue = arr[idx + 1];
      return operate(operator, +total, +nextValue)
    }
    else {
      return total
    }
  })

  return result
}

function checkDuplicateOperator(displayArray, key) {
  const operators = ['.', '+', 'x', '/'];

  // No operator after operator (except minus
  if (
    operators.includes(displayArray.at(-1)) &&
    operators.includes(key)
  ) {
    return true
  }

  // No operator after minus (except minus
  if (displayArray.at(-1) === '-' &&
    operators.includes(key)
  ) {
    return true
  }

  // No double minus after operator
  if (
    operators.includes(displayArray.at(-2)) &&
    displayArray.at(-1) === '-' &&
    key === '-'
  ) {
    return true
  }

  // No more than two minuses in a row
  if (displayArray.at(-2) === '-' &&
    displayArray.at(-1) === '-' &&
    key === '-'
  ) {
    return true
  }

  return false
}

function OperatorFirst(displayArray, key) {
  const operators = ['.', '+', 'x', '/'];

  // Don't allow an operator as the first input (except minus)
  if (
    displayArray.length === 0 &&
    operators.includes(key)
  ) {
    return true
  }

  // Only allow one minus as the first input
  if (
    displayArray.length === 1 &&
    displayArray[0] === '-' &&
    key === '-'
  ) {
    return true
  }

  return false
}