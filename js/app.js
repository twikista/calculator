//functions to handle diffrent operations
//add function
function add(a, b) {
  const sum = parseFloat(a) + parseFloat(b);
  return sum;
}

//subtract function
function subtract(a, b) {
  const difference = parseFloat(a) - parseFloat(b);
  return difference;
}

//multiply function
function multiply(a, b) {
  const times = parseFloat(a) * parseFloat(b);
  return times;
}

//divide function
function divide(a, b) {
  if (b === 0) return "Math error";
  const division = parseFloat(a) / parseFloat(b);
  return division;
}

//percentage function
function percent(a, b) {
  let percentage = "";
  if (b === "") {
    b = 100;
    percentage = a / b;
    return percentage;
  }
  percentage = (a / b) * 100;
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

  //function that round answers to max of 5 decimal places
  //check number of decimal places in answer and round up to five decimal places
  answer = answer.toString();
  const decimal = answer.indexOf(".") + 1;
  const decimalNumbers = answer.substring(decimal);
  const answerLength = decimalNumbers.length;

  if (answer.includes(".") && answerLength <= 4) {
    answer = Number(answer);
    return answer.toFixed(answerLength);
  } else if (answer.includes(".") && answerLength > 4) {
    answer = Number(answer);
    console.log(answer);
    return answer.toFixed(5);
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
  keys.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("number-key")) {
      //clear calculator screen and solution variable if a number is selected
      //after initial expression has been evaluated using equals key

      if (firstOperand === "" && secondOperand === "" && solution !== "") {
        screenTopRow.textContent = "";
        solution = "";
      }

      //save pressed key
      pressedKey = target.dataset.numberkey;

      //display entered expression on top tow of calculator screen
      screenTopRow.textContent += pressedKey;

      //set and display current operand on bottom row of calculator screen
      currentOperand += pressedKey;
      screenBottomRow.textContent = currentOperand;

      //set the value of second operand if first operand is already set
      secondOperand = +currentOperand;
      toggleOperatorsState(screenTopRow, screenBottomRow);
      //keep second operand unset till value of first operand is set
      if (firstOperand === "") {
        secondOperand = "";
      }
      //concatenate presssed value with first operand after expression is backspaced
      //and first operand is not completely bcakspaced
      if (firstOperand !== "" && operator === "") {
        firstOperand += pressedKey;
        secondOperand = "";
        screenBottomRow.textContent = firstOperand;
      }
      maxScreenLength(screenTopRow, screenBottomRow);
    } else if (target.classList.contains("operator-key")) {
      // set the value of the second operand start of  calculator
      if (firstOperand === "" && secondOperand === "" && solution === "") {
        arr.push(+currentOperand);
        firstOperand = arr[0];
        //set value of  first operand to solution if an operator is selected after
        //initial expression has been evaluated using equals key
      } else if (
        firstOperand === "" &&
        secondOperand === "" &&
        solution !== ""
      ) {
        arr.length = 0;
        arr.push(solution);
        firstOperand = arr[0];
        screenTopRow.textContent = `${solution}`;
        screenBottomRow.textContent = solution;
        secondOperand = "";
        operator = "";
        //evaluates initial expresssion and sets first operand to solution if
        //an operator is selected after value of second operand has been set
      } else if (firstOperand !== "" && secondOperand !== "") {
        solution = operate(firstOperand, operator, secondOperand);
        addHistoryToList(screenTopRow.textContent, solution);
        displayHistoryItems();
        arr.length = 0;
        arr.push(solution);
        firstOperand = arr[0];

        screenTopRow.textContent = `${solution}`;
        screenBottomRow.textContent = solution;

        secondOperand = "";
        operator = "";
      }
      currentOperand = "";
      //set operator and display it to expression on top row of calculator screen
      operator = target.dataset.functionalkey;
      screenTopRow.textContent += operator;
    } else if (target.classList.contains("equals-key")) {
      solution = operate(firstOperand, operator, secondOperand);
      screenBottomRow.textContent = solution;
      addHistoryToList(screenTopRow.textContent, solution);
      displayHistoryItems();
      currentOperand = "";
      arr.length = 0;
      firstOperand = "";
      secondOperand = "";
    } else if (target.classList.contains("clear-key")) {
      resetCalculator();
      toggleOperatorsState(screenTopRow, screenBottomRow);
    } else if (target.closest("button").classList.contains("backspace-key")) {
      if (firstOperand !== "" || secondOperand != "") {
        //implements backspacing when top row and bottom row of calculator
        //screen each display a value
        let splitTopScreenContent = screenTopRow.textContent.split("");
        splitTopScreenContent.splice(splitTopScreenContent.length - 1, 1);
        splitTopScreenContent = splitTopScreenContent.join("");
        screenTopRow.textContent = splitTopScreenContent;

        let splitBottomScreenContent = screenBottomRow.textContent.split("");
        splitBottomScreenContent.splice(splitBottomScreenContent.length - 1, 1);
        splitBottomScreenContent = splitBottomScreenContent.join("");
        currentOperand = splitBottomScreenContent;
        screenBottomRow.textContent = currentOperand;
        secondOperand = currentOperand;
        if (
          splitBottomScreenContent.length === 0 &&
          !screenTopRow.textContent.includes("+")
        ) {
          firstOperand = splitTopScreenContent;
          secondOperand = "";
          operator = "";
          arr.length = 0;
        }
      } else {
        //implement backspacing when only bottom screen of calculator displays a value
        let splitBottomScreenContent = screenBottomRow.textContent.split("");
        splitBottomScreenContent.splice(splitBottomScreenContent.length - 1, 1);
        splitBottomScreenContent = splitBottomScreenContent.join("");
        currentOperand = splitBottomScreenContent;
        screenBottomRow.textContent = currentOperand;
        screenTopRow.textContent = currentOperand;
        toggleOperatorsState(screenTopRow, screenBottomRow);
      }
    }
  });

  //function that handles the clear button button
  function resetCalculator() {
    screenTopRow.textContent = "";
    screenBottomRow.textContent = "";
    currentOperand = "";
    solution = "";
    firstOperand = "";
    secondOperand = "";
    arr.length = 0;
  }

  //toggle state of operators if a value is displayed/not displayed on calculator screen
  function toggleOperatorsState(displayTop, displayBotom) {
    const btns = document.querySelectorAll("button");
    if (displayTop.textContent !== "" && displayBotom.textContent !== "") {
      btns.forEach((btn) => {
        if (
          btn.classList.contains("operator-key") ||
          btn.classList.contains("equals-key")
        ) {
          btn.removeAttribute("disabled");
        }
      });
    } else if (
      displayTop.textContent === "" &&
      displayBotom.textContent === ""
    ) {
      btns.forEach((btn) => {
        if (
          btn.classList.contains("operator-key") ||
          btn.classList.contains("equals-key")
        ) {
          btn.setAttribute("disabled", "");
        }
      });
    }
  }

  function maxScreenLength(screenTop, screenBottom) {
    if (
      screenTop.textContent.length > 20 ||
      screenBottom.textContent.length > 20
    ) {
      displayWaringModal();
      removeWarningModal(resetCalculator);

      // const splitTop = screenTop.textContent.split("");
      // console.log(splitTop);
      // splitTop.splice(splitTop.length - 1, 1);
      // screenTop.textContent = splitTop.join("");
    }
  }
}

function displayWaringModal() {
  const warning = document.querySelector(".warning");
  warning.classList.add("active");
}

function removeWarningModal(reset) {
  const removeWarningBtn = document.querySelector(".btn");
  const warning = document.querySelector(".warning");
  removeWarningBtn.addEventListener("click", (e) => {
    warning.classList.remove("active");
    reset();
  });
}

const openHistoryBtn = document.querySelector(".open-history-btn");
const displayHistory = document.querySelector(".display-calculator-history");
const closeHistoryBtn = document.querySelector(".close-history-btn");
console.log(closeHistoryBtn);
openHistoryBtn.addEventListener("click", (e) => {
  openHistoryBtn.classList.add("deactivate");
  closeHistoryBtn.classList.add("active");
  displayHistory.classList.add("active");
});

closeHistoryBtn.addEventListener("click", (e) => {
  openHistoryBtn.classList.remove("deactivate");
  closeHistoryBtn.classList.remove("active");
  displayHistory.classList.remove("active");
});

class History {
  constructor(expression, result) {
    this.expression = expression;
    this.result = result;
  }
}

const historyList = [];

function addHistoryToList(expression, result) {
  const history = new History(expression, result);
  historyList.push(history);
  if (historyList.length > 5) {
    historyList.shift();
  }
  return historyList;
}

function displayHistoryItems() {
  while (displayHistory.firstChild) {
    displayHistory.removeChild(displayHistory.firstChild);
  }
  historyList.forEach((history) => {
    const div = document.createElement("div");

    div.innerHTML = `
<ul>
<li>expression: ${history.expression}</li>
<li>solution: ${history.result}</li>
</ul>`;
    displayHistory.appendChild(div);
  });
}

calculator();
