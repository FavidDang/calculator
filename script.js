function add(n1, n2) { return n1 + n2; }
function subtract(n1, n2) { return n1 - n2; }
function multiply(n1, n2) { return n1 * n2; }
function divide(n1, n2) { 
    if (n2 === 0) {
        alert("Error: Division by 0!");
        return 0;
    }
    return n1 / n2;
}
function operate(n1, n2, op) { return Math.round(op(Number(n1), Number(n2)) * 10000) / 10000}

function updateDisplay() {
    display = `${n1} ${displayOp} ${n2}`;
    result.innerHTML = display;
}

function assignOperator(event) {
    switch (event.target.innerHTML) {
        case "+":
            op = add;
            displayOp = "+";
            break;
        case "-":
            op = subtract;
            displayOp = "-";
            break;
        case "x":
            op = multiply;
            displayOp = "x";
            break;
        case "÷":
            op = divide;
            displayOp = "÷";
            break;
    }
}

function parseNumber(event) {
    if (op === null) {
        n1 = `${n1}${event.target.innerHTML}`;
    } else {
        n2 = `${n2}${event.target.innerHTML}`;
    }
}

function parseOperation(event) {
    if (event.target.innerHTML === "BACK") { // backspace
        if (n2 !== "") {
            n2 = n2.replace(/.$/, "");
        } else if (op !== null) {
            op = null;
            displayOp = "";
        } else if (n1 !== "") {
            n1 = n1.replace(/.$/, "");
        }
    } else if (event.target.innerHTML === "CLEAR") { // clear
        n1 = "";
        n2 = "";
        op = null;
        displayOp = "";
    } else if (event.target.innerHTML === "=") { // equals operator
        if (n1 !== "" && n2 !== "" && op !== null) { // valid parameters
            n1 = operate(n1, n2, op);
            n2 = "";
            op = null;
            displayOp = "";
        }
    } else if (event.target.innerHTML === "") { return; } // blank button
    else { // +, - , *, /
        if (n2 !== "") { // trying to operator with full parameters
            n1 = operate(n1, n2, op);
            assignOperator(event);
            n2 = "";
        } else if (n1 !== "" && op === null) { // adding an operator when n1 is valid
            assignOperator(event);
        }
    }
}

function parseButton(event) {
    if (event.target.classList.contains("digit")) {
        parseNumber(event);
    } else {
        parseOperation(event);
    }
    updateDisplay();
}

let n1 = "";
let n2 = "";
let op = null;
let displayOp = "";
let display = "";

const result = document.querySelector("#result");
const buttons = document.querySelectorAll(".button");

buttons.forEach(function(button) {
    button.addEventListener("click", parseButton);
});