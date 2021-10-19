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

//function that accepts two numbers and calls a function on
//them based on the choosen operator
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

  return Number(answer);
}

//calculator function that handles all calculator functions

function calculator() {
  //define calculator app variables
  let firstOperand = "";
  let secondOperand = "";
  let operator = "";
  let solution = "";
  let currentOperand = "";
  const arr = [];
  let pressedKey = "";
  const screenTopRow = document.querySelector(".screen-top-row");
  const screenBottomRow = document.querySelector(".screen-bottom-row");
  const keys = document.querySelector(".number-keys");

  //event listener that handles calculator functionality
}
