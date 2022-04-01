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
    case "+":
      return add(a, b)

    case "-":
      return subtract(a, b)

    case "x":
      return multiply(a, b)

    case "/":
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
      displayArray.push(key);
      updateDisplay(displayArray);
      break;
  }
}

function updateDisplay(values) {
    displayValue.textContent = values.join("");
}

function getDisplay() {
  return displayValue.textContent.split("")
}

function clearDisplay() {
  displayValue.textContent = "";
}

function createOperations(values) {
  let operand = "";
  const operations = [];

  values.forEach((value, idx, arr) => {
    if (value === "x" || value === "/" || value === "+" || value === "-") {
      operations.push(operand);
      operand = "";
      
      const operator = value;
      operations.push(operator);
    }
    else {
      // If it's none of the above, it's an operand
      operand += value;

      // If it's the last operand, add it to operations
      if (idx === (arr.length - 1)) operations.push(operand);
    }
  })
  console.log(operations);
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
    else return total
  })
  console.log(result);
  return result
}

function checkDuplicateOperator(displayArray, key) {
  const operators = ['.', '+', 'x', '/']

  if (
    operators.includes(displayArray.at(-1)) &&
    operators.includes(key)
  ) {
    console.log('no operator after operator (except minus)');
    return true
  }

  if (displayArray.at(-1) === '-' &&
    operators.includes(key)
  ) {
    console.log('no operator after minus (except minus)');
    return true
  }

  if (
    operators.includes(displayArray.at(-2)) &&
    displayArray.at(-1) === '-' &&
    key === '-'
  ) {
    console.log('no double minus after operator');
    return true
  }

  if (displayArray.at(-2) === '-' &&
    displayArray.at(-1) === '-' &&
    key === '-'
  ) {
    console.log('no more than two minuses in a row');
    return true
  }

  return false
}