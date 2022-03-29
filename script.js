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
      let tmpString = "";
      const tmpArray = [];

      displayValueArray.forEach((value, idx, arr) => {
        if (!isNaN(value)) {
          tmpString += value;
          if (idx === (arr.length - 1)) tmpArray.push(tmpString);
        }
        else if (value === "x" || value === "/" || value === "+" || value === "-") {
          tmpArray.push(tmpString);
          tmpString = "";
          tmpArray.push(value);
        }
      });
      console.log(tmpArray);
      
      const result = tmpArray.reduce((previousValue, currentValue, idx, arr) => {
        if (isNaN(currentValue)) {
          const nextValue = arr[idx + 1];
          return operate(currentValue, +previousValue, +nextValue)
        }
        else {
          return previousValue
        }
      })
      console.log(result);
      updateDisplay([result]);
      break;

    case '.':
      // do nothing for now
      break;
  
    default:
      displayValueArray.push(key.textContent);
      updateDisplay(displayValueArray);
      break;
  }
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