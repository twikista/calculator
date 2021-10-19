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
  keys.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("number-key")) {
      //clear calculator screen and solution if a number key is pressed
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
      //keep second operand unset till value of firstv operand is set
      if (firstOperand === "") {
        secondOperand = "";
      }
      //use this for backspacing
      if (firstOperand !== "" && operator === "") {
        firstOperand += pressedKey;
        secondOperand = "";
        screenBottomRow.textContent = firstOperand;
      }
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
}

calculator();
