"use strict";

const buttonGrid = document.querySelector(".button-grid");
const equalButton = document.getElementById("equal");
const renderScreen = document.querySelector(".screen>h1");
const resetButton = document.getElementById("reset");
const deleteButton = document.getElementById("del");
const toggleElement = document.querySelector(".toggle-number");
const root = document.querySelector(":root");
const headerSection = document.querySelector(".header-section");
const toggle1 = document.querySelector(".toggle-1");
const toggle2 = document.querySelector(".toggle-2");
const toggle3 = document.querySelector(".toggle-3");

const buttonIds = ["minus", "decimal", "divide", "multiply", "plus"];

let typedCalculation = [];
let string1 = "";
let operator = "";
let string2 = "";
let buffferOperator = "";

const renderValue = function (value) {
  renderScreen.textContent = value;
};

const resetValues = function () {
  string1 = string2 = operator = buffferOperator = "";
  typedCalculation = [];
};

const identifyButtons = function (e) {
  let buttonPressed = e.target.id;
  if (
    !buttonPressed ||
    buttonPressed === "equal" ||
    buttonPressed === "reset" ||
    buttonPressed === "del"
  )
    return;
  if (buttonIds.includes(buttonPressed)) {
    if (buttonPressed === "minus") buttonPressed = "-";
    if (buttonPressed === "decimal") buttonPressed = ".";
    if (buttonPressed === "divide") buttonPressed = "/";
    if (buttonPressed === "multiply") buttonPressed = "*";
    if (buttonPressed === "plus") buttonPressed = "+";
    typedCalculation.push(buttonPressed);
    renderValue(typedCalculation.join(""));
    return;
  }

  typedCalculation.push(buttonPressed);
  renderValue(typedCalculation.join(""));
};

const calculateInput = function () {
  resetValues();
  const inputList = renderScreen.textContent.split("");

  inputList.forEach((input, index, list) => {
    if (isFinite(input) && operator.length === 0) {
      string1 += input;
    }
    if (isFinite(input) && operator.length === 1) {
      string2 += input;
      if (index === list.length - 1) {
        if (operator === "+") {
          string1 = +string1 + +string2;
        }

        if (operator === "-") {
          string1 = +string1 - +string2;
        }

        if (operator === "*") {
          string1 = +string1 * +string2;
        }

        if (operator === "/") {
          string1 = +string1 / +string2;
        }

        renderValue(string1);
      }
    }
    if (!isFinite(input)) {
      operator += input;
      if (operator.length === 2) {
        buffferOperator = input;
      }
      if (
        (operator.length === 2 && string2.length === 0) ||
        string1.length === 0
      ) {
        renderValue("Synthx Error");
      }

      if (operator.length === 2 && string2.length > 0) {
        if (operator[0] === "+") {
          string1 = +string1 + +string2;
        }

        if (operator[0] === "-") {
          string1 = +string1 - +string2;
        }

        if (operator[0] === "*") {
          string1 = +string1 * +string2;
        }

        if (operator[0] === "/") {
          string1 = +string1 / +string2;
        }
        operator = buffferOperator;
        buffferOperator = "";
        string2 = "";
      }
    }
  });
};

const resetCalc = function () {
  renderScreen.textContent = "0000";
  resetValues();
};

const deleteInput = function () {
  typedCalculation.pop();
  typedCalculation.length === 0
    ? renderValue("0000")
    : renderValue(typedCalculation.join(""));
};

const setCssVariable = function (variable, color) {
  root.style.setProperty(variable, color);
};

const toggleTheme = function (e) {
  const elementClicked = e.target;
  if (!elementClicked.classList.contains("togglebox")) return;

  if (elementClicked.classList.contains("toggle-number-1")) {
    toggle1.classList.remove("hidden");
    toggle2.classList.add("hidden");
    toggle2.classList.add("hidden");

    headerSection.style.color = "rgb(236, 236, 236)";
    renderScreen.style.color = "rgb(236, 236, 236)";
    setCssVariable("--bg-main-desaturated-blue", "hsl(222, 26%, 31%)");
    setCssVariable("--bg-toggle-key-desaturated-blue", "hsl(223, 31%, 20%)");
    setCssVariable("--bg-screen-desaturated-blue", "hsl(224, 36%, 15%)");
    setCssVariable("--bg-desaturated-light-blue", "hsl(225, 21%, 49%)");
    setCssVariable("--bg-desaturated-dark-blue", "hsl(224, 28%, 35%)");
    setCssVariable("--bg-red-key-toggle", "hsl(6, 63%, 50%)");
    setCssVariable("--shadow-dark-red-key", "hsl(6, 70%, 34%)");
    setCssVariable("--bg-light-orange-key", "hsl(30, 25%, 89%)");
    setCssVariable("--shadow-greyish-orange-key", "hsl(28, 16%, 65%)");
    setCssVariable("--color-main", "rgb(236, 236, 236)");
    setCssVariable("--color-dark-greyish-blue", "hsl(221, 14%, 31%)");
  }
  if (elementClicked.classList.contains("toggle-number-2")) {
    toggle2.classList.remove("hidden");
    toggle1.classList.add("hidden");
    toggle3.classList.add("hidden");

    headerSection.style.color = "black";
    renderScreen.style.color = "black";
    setCssVariable("--bg-main-desaturated-blue", "hsl(0, 0%, 90%)");
    setCssVariable("--bg-toggle-key-desaturated-blue", "hsl(0, 5%, 81%)");
    setCssVariable("--bg-screen-desaturated-blue", "hsl(0, 0%, 93%)");
    setCssVariable("--bg-desaturated-light-blue", "hsl(185, 42%, 37%)");
    setCssVariable("--bg-desaturated-dark-blue", "hsl(185, 58%, 25%)");
    setCssVariable("--bg-red-key-toggle", "hsl(25, 98%, 40%)");
    setCssVariable("--shadow-dark-red-key", "hsl(25, 99%, 27%)");
    setCssVariable("--bg-light-orange-key", "hsl(45, 7%, 89%)");
    setCssVariable("--shadow-greyish-orange-key", "hsl(35, 11%, 61%)");
    setCssVariable("--color-main", "hsl(60, 10%, 19%)");
    setCssVariable("--color-dark-greyish-blue", "hsl(0, 0, 100%)");
    deleteButton.style.color =
      resetButton.style.color =
      equalButton.style.color =
        "whitesmoke";
  }
  if (elementClicked.classList.contains("toggle-number-3")) {
    toggle3.classList.remove("hidden");
    toggle1.classList.add("hidden");
    toggle2.classList.add("hidden");

    setCssVariable("--bg-main-desaturated-blue", "hsl(268, 75%, 9%)");
    setCssVariable("--bg-toggle-key-desaturated-blue", "hsl(268, 71%, 12%)");
    setCssVariable("--bg-screen-desaturated-blue", "hsl(268, 71%, 12%)");
    setCssVariable("--bg-desaturated-light-blue", "hsl(281, 89%, 26%)");
    setCssVariable("--bg-desaturated-dark-blue", "hsl(285, 91%, 52%)");
    setCssVariable("--bg-red-key-toggle", "hsl(176, 100%, 44%)");
    setCssVariable("--shadow-dark-red-key", "hsl(177, 92%, 70%)");
    setCssVariable("--bg-light-orange-key", "hsl(268, 47%, 21%)");
    setCssVariable("--shadow-greyish-orange-key", "hsl(290, 70%, 36%)");
    setCssVariable("--color-main", "rgb(240, 235, 235)");
    setCssVariable("--color-dark-greyish-blue", "hsl(52, 100%, 62%)");
    headerSection.style.color = "hsl(52, 100%, 62%)";
    renderScreen.style.color = "hsl(52, 100%, 62%)";
  }
};

buttonGrid.addEventListener("click", identifyButtons);
equalButton.addEventListener("click", calculateInput);
resetButton.addEventListener("click", resetCalc);
deleteButton.addEventListener("click", deleteInput);
toggleElement.addEventListener("click", toggleTheme);
