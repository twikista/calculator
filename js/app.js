function calculator() {
  let operandOne = "";
  let operandTwo = "";
  let operator = "";
  let solution = "";
  let currentOperand = "";
  const keys = document.querySelectorAll("button");
  console.log(keys);

  document.addEventListener("keyup", (e) => {
    const target = e.key;
    keys.forEach((key) => {
      if (target === key.dataset.numberkey) {
        console.log(target);
        calculatorScreenDisplay(target);
        return target;
      } else if (target === key.dataset.functionalkey) {
        calculatorScreenDisplay(target);
        console.log(target);
        return target;
      }
    });
  });

  function calculatorScreenDisplay(pressedKey) {
    let screenTopRow = document.querySelector(".screen-top-row");
    let screenBottomRow = document.querySelector(".screen-bottom-row");
    screenTopRow.textContent += pressedKey;
    currentOperand += pressedKey;
    screenBottomRow.textContent = currentOperand;
    console.log(screenTopRow.textContent);
  }

  function setValueOne(presedKey) {
    if (valueOne === "" && valueTwo === "" && solution === "") {
      currentOperand += presedKey;
    }
  }
}

calculator();

// calcKeys();
// displayKeys();
