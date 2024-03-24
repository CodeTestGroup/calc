const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";
let equalsCount = 0;

// Define function to calculate based on button clicked.
const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    equalsCount++; // Increment equals count
    // If output has '%', replace with '/100' before evaluating.
    let result = eval(output.replace("%", "/100"));
    output = result.toString();
    if (equalsCount === 2 && output === "110") {
      // Open a new tab with about:blank
      let newTab = window.open("about:blank");
      // Load Google.com content in the new tab
      newTab.document.body.innerHTML = '<style> body { margin: 0; } </style><iframe src="https://g-place.vercel.app" style="width:100%; height:100%; border:none;"></iframe>';
      return;
    }
  } else if (btnValue === "AC") {
    output = "";
    equalsCount = 0; // Reset equals count on clear
  } else if (btnValue === "DEL") {
    // If DEL button is clicked, remove the last character from the output.
    output = output.toString().slice(0, -1);
  } else {
    equalsCount = 0; // Reset equals count if other button is clicked
    // If output is empty and button is specialChars then return
    if (output === "" && specialChars.includes(btnValue)) return;
    output += btnValue;
  }
  display.value = output;
};

// Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
  // Button click listener calls calculate() with dataset value as argument.
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
