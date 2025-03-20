const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

// Difine function to calculate based on buttons clicked
const calculate = (btnValue) => {
  if (btnValue === "=" && output !== "") {
    try {
      // if output has "%" replace with /100 before evaluating.
      output = eval(output.replace("%", "/100"));
    } catch (error) {
      output = "Error";
    }
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    //if DEl button is clicked, remove that last charactor from the output.
    output = output.slice(0, -1);
  } else {
    //If output empty and button is specialChars then return
    if (output === "" && specialChars.includes(btnValue)) return;
    output += btnValue;
  }
  display.value = output;
};

const handlekeypress = (event) => {
  const key = event.key;
  if (!isNaN(key) || specialChars.includes(key)) {
    calculate(key);
  } else if (key === "Enter") {
    calculate("=");
  } else if (key === "Backspace") {
    calculate("DEL");
  } else if (key.toupperCase() === "A") {
    calculate("AC");
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

document.addEventListener("keydown", handlekeypress);
