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
    case "addition":
      return add(a, b)

    case "subtraction":
      return subtract(a, b)

    case "multiplication":
      return multiply(a, b)

    case "division":
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
  const key = e.target;
  const displayValueArray = displayValue.textContent.split("");

  switch (key.textContent) {
    case 'CLR':
      updateDisplay([]);
      break;

    case 'DEL':
      displayValueArray.pop();
      updateDisplay(displayValueArray);
      break;

    case '=':
      
      break;

    case '.':
      // do nothing for now
      break;
  
    default:
      displayValueArray.push(key.textContent);
      updateDisplay(displayValueArray);
      break;
  }

  // On Equal call a function that looks at the current display and
  // slice it to 3 parts(number, operator, number) or 2 parts(number, operator)
  // and then call the correct math function.
  // Put all of that in an overall reduce() that loops through the objects
}

function updateDisplay(values) {
  if (values.length >= 1) {
    displayValue.textContent = values.join("");
  }
  else {
    displayValue.textContent = "";
  }
}

function getDisplay() {
  // return an array of the displayValue
}