//functions for diffrent operations
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

//function calculator() {
let operandOne = "";
let operandTwo = "";
let operator = "";
let solution = "";
let currentOperand = "";
const arr = [];
const keys = document.querySelectorAll("button");
console.log(keys);

document.addEventListener("keyup", (e) => {
  const target = e.key;
  keys.forEach((key) => {
    if (target === key.dataset.numberkey) {
      console.log(target);
      calculatorScreenDisplay(target);
      setOperandTwoVAlue(currentOperand);
      return target;
    } else if (target === key.dataset.functionalkey) {
      setOperandOneValue(target, currentOperand);

      console.log(target);
      operator = target;

      currentOperand = "";

      calculatorScreenDisplay(target, operator);
      return target;
    } else if (target === key.dataset.equalskey) {
    }
  });
});

function calculatorScreenDisplay(pressedKey, operate) {
  let screenTopRow = document.querySelector(".screen-top-row");
  let screenBottomRow = document.querySelector(".screen-bottom-row");
  screenTopRow.textContent += pressedKey;
  currentOperand += pressedKey;
  screenBottomRow.textContent = currentOperand;
  if (pressedKey === operate) {
    screenBottomRow.textContent = "";
    currentOperand = "";
  }
  console.log(screenTopRow.textContent);
}

function setOperandTwoVAlue(presedValues) {
  operandTwo = +presedValues;
  if (operandOne === "") {
    operandTwo = "";
  } else if (operandOne !== "" && operator === "") {
    operandTwo = "";
  }
}

function setOperandOneValue(pressedKey, presedValues) {
  if (operandOne !== "" && operator === "") {
    operandOne += pressedKey;
  } else if (operandOne === "" && operandTwo === "" && solution === "") {
    arr.push(+presedValues);
    operandOne = arr[0];
    console.log(arr);
    console.log(operandOne);
    console.log(presedValues);
  }
}

//calculator();
