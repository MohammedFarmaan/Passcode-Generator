// DOM Elements

const resultElement = document.getElementById("result");
const lengthElement = document.getElementById("length");
const uppercaseElement = document.getElementById("uppercase");
const lowercaseElement = document.getElementById("lowercase");
const numbersElement = document.getElementById("numbers");
const symbolsElement = document.getElementById("symbols");
const generateElement = document.getElementById("generate");
const clipboardElement = document.getElementById("clipboard");

const randomFunc = {
  upper: GetRandomUpper,
  lower: GetRandomLower,
  number: GetRandomNumber,
  symbol: GetRandomSymbol,
};

// Generate Event Listener

generateElement.addEventListener("click", () => {
  const length = +lengthElement.value;
  const hasUpper = uppercaseElement.checked;
  const hasLower = lowercaseElement.checked;
  const hasNumber = numbersElement.checked;
  const hasSymbol = symbolsElement.checked;

  resultElement.innerText = generatePasscode(
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    length
  );
});

// Copy password to clipboard

clipboardElement.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const passcode = resultElement.innerText;

  if (!passcode) {
    return;
  }

  textarea.value = passcode;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("passcode copied to clipboard");
});

// Generate Passcode Function

function generatePasscode(upper, lower, number, symbol, length) {
  let generatedPasscode = "";
  // Total Number of Selected Check Boxes
  const typesCount = upper + lower + number + symbol;

  // console.log("typescount:", typesCount);

  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  // console.log("typesarr:", typesArr);

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      // console.log("funcname:", funcName);

      generatedPasscode += randomFunc[funcName]();
    });
  }
  const finalPasscode = generatedPasscode.slice(0, length);
  return finalPasscode;
}

// Generator functions

function GetRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function GetRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function GetRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function GetRandomSymbol() {
  const symbols = "!@#$%^&*(){}[],.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
