//functions to handle diffrent operations
//add function
function add(a, b) {
  const sum = parseFloat(a) + parseFloat(b);
  console.log(sum);
  return sum;
}

//subtract function
function subtract(a, b) {
  const difference = parseFloat(a) - parseFloat(b);
  console.log(difference);
  return difference;
}

//multiply function
function multiply(a, b) {
  const times = parseFloat(a) * parseFloat(b);
  console.log(times);
  return times;
}

//divide function
function divide(a, b) {
  if (b === 0) return "Math error";
  const division = parseFloat(a) / parseFloat(b);
  console.log(division);
  return division;
}

//percentage function
function percent(a, b) {
  let percentage = "";
  if (b === "") {
    b = 100;
  }
  percentage = a / b;
  console.log(b);
  return percentage;
}

//exponent function
function exponent(a, b) {
  const exponential = Math.pow(a, b);
  return exponential;
}

//operate funtion
function operate(valueOne, operation, ValueTwo) {
  let answer = null;
  switch (operation) {
    case "+":
      answer = add(valueOne, ValueTwo);
      break;
    case "-":
      answer = subtract(valueOne, ValueTwo);
      break;
    case "x":
      answer = multiply(valueOne, ValueTwo);
      break;
    case "/":
      answer = divide(valueOne, ValueTwo);
      break;
    case "%":
      answer = percent(valueOne, ValueTwo);
      break;
    case "^":
      answer = exponent(valueOne, ValueTwo);
      break;
  }

  console.log(answer);
  return Number(answer);
}

//function calculator() {
let operandOne = "";
let operandTwo = "";
let operator = "";
let solution = "";
let currentOperand = "";
const arr = [];
let pressedKey = "";
let equalitySign = "";
let screenTopRow = document.querySelector(".screen-top-row");
let screenBottomRow = document.querySelector(".screen-bottom-row");
const keys = document.querySelectorAll("button");
console.log(keys);

document.addEventListener("keyup", (e) => {
  const target = e.key;
  keys.forEach((key) => {
    if (
      key.classList.contains("number-key") &&
      target === key.dataset.numberkey
    ) {
      const numberKeys = key.dataset.numberkey;
      pressedKey = target;
      currentOperand += pressedKey;
      console.log(numberKeys);
      console.log(target);
      calculatorScreenDisplay(numberKeys);
      setOperandTwoVAlue(currentOperand);
      setSolutuion();
    } else if (
      key.classList.contains("operator-key") &&
      target === key.dataset.functionalkey
    ) {
      const functionalKeys = key.dataset.functionalkey;
      setOperandOneValue(currentOperand);

      console.log(target);
      operator = target;
      console.log(operator);
      currentOperand = "";
      calculatorScreenDisplay(functionalKeys);
    } else if (
      key.classList.contains("equals-key") &&
      target === key.dataset.equalskey
    ) {
      const equalsKey = key.dataset.equalskey;
      equalitySign = target;
      console.log(pressedKey);
      setSolutuion();
      console.log(solution);
      calculatorScreenDisplay(equalsKey);
      currentOperand = "";
      arr.length = 0;
      operandOne = "";
      operandTwo = "";
    } else if (
      key.classList.contains("clear-key") &&
      target === key.dataset.clearkey
    ) {
      const clear = target;
      const clearKey = key.dataset.clearkey;

      currentOperand = "";
      operandOne = "";
      operandTwo = "";
      solution = "";
      arr.length = 0;
      calculatorScreenDisplay(clearKey, clear);
    } else if (key.classList.contains("backspace-key")) {
    }
  });
});

function calculatorScreenDisplay(keyType, clear) {
  if (pressedKey === keyType) {
    if (operandOne === "" && operandTwo === "" && solution !== "") {
      screenTopRow.textContent = "";
    }
    screenTopRow.textContent += pressedKey;
    console.log(screenTopRow.textContent);
    screenBottomRow.textContent = currentOperand;
    if (operandOne !== "" && operator === "") {
      screenBottomRow.textContent = operandOne;
    }
  } else if (operator === keyType) {
    console.log(pressedKey);
    if (operandOne === "" && operandTwo === "" && solution !== "") {
      screenTopRow.textContent = `${solution}`;
      screenBottomRow.textContent = solution;
    } else if (operandOne !== "" && operandTwo !== "") {
      screenTopRow.textContent = `${solution}`;
      screenBottomRow.textContent = solution;
      console.log(screenTopRow.textContent);
    }
    screenTopRow.textContent += operator;
    // screenBottomRow.textContent = "";
    // currentOperand = "";
  } else if (equalitySign === keyType) {
    screenBottomRow.textContent = solution;
    // screenTopRow.textContent = `${operandOne} ${operate} ${operandTwo}`;
  } else if (clear === keyType) {
    screenTopRow.textContent = "";
    screenBottomRow.textContent = "";
  }
}

function setOperandTwoVAlue(presedValues) {
  operandTwo = +presedValues;
  console.log(operandTwo);
  if (operandOne === "") {
    operandTwo = "";
  }
  if (operandOne !== "" && operator === "") {
    operandOne += pressedKey;
    operandTwo = "";
  }
}

function setOperandOneValue(presedValues) {
  if (operandOne === "" && operandTwo === "" && solution === "") {
    arr.push(+presedValues);
    operandOne = arr[0];
    console.log(arr);
    console.log(operandOne);
    console.log(presedValues);
  } else if (operandOne === "" && operandTwo === "" && solution !== "") {
    arr.length = 0;
    arr.push(solution);
    operandOne = arr[0];
    console.log(operandOne);
    operandTwo = "";
    operator = "";
  } else if (operandOne !== "" && operandTwo !== "") {
    setSolutuion();
    // solution = operate(operandOne, operator, operandTwo);
    arr.length = 0;
    arr.push(solution);
    operandOne = arr[0];
    // calculatorScreenDisplay();
    operandTwo = "";
    operator = "";
  }
}

function setSolutuion() {
  solution = operate(operandOne, operator, operandTwo);

  if (operandOne === "" && operandTwo === "" && solution !== "") {
    solution = "";
  }
  // else if (operandOne !== "" && operandTwo !== "") {
  //   solution = operate(operandOne, operator, operandTwo);
  // }
}

setSolutuion();

//calculator();
