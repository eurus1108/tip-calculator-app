const billInput = document.querySelector("[data-input-bill]");
const peopleInput = document.querySelector("[data-people-count]");
const tipPerPerson = document.querySelector("[data-tip-amount]");
const totalPerPerson = document.querySelector("[data-bill-amount]");
const tipOptions = document.querySelectorAll("[data-tip]");
const tipCustomOption = document.querySelector("[data-tip-custom]");
const resetBtn = document.querySelector("[data-reset]");
const errorMsg = document.querySelector("span.error");

resetBtn.addEventListener("click", () => {
  tipPerPerson.innerText = "$" + (0.0).toFixed(2);
  totalPerPerson.innerText = "$" + (0.0).toFixed(2);
  billInput.value = "";
  peopleInput.value = "";
  tipCustomOption.value = "";
  tipOptions.forEach((option) => {
    option.checked = false;
    option.disabled = false;
  });
  resetBtn.disabled = true;
  peopleInput.classList.remove("error");
  errorMsg.setAttribute("aria-hidden", "true");
  bill = 0.0;
  numberOfPeople = 0;
  tip = 0;
});

let bill = 0.0;
let numberOfPeople = 0;
let tip = 0;

billInput.addEventListener("input", () => {
  resetBtn.disabled = false;

  if (billInput.value !== "") {
    bill = parseFloat(billInput.value);
  }

  calculateTip();
});

tipOptions.forEach((option) => {
  option.addEventListener("click", () => {
    resetBtn.disabled = false;
    tip = parseFloat(option.value);
    calculateTip();
  });
});

tipCustomOption.addEventListener("input", () => {
  resetBtn.disabled = false;

  if (tipCustomOption.value !== "") {
    tip = parseFloat(tipCustomOption.value) / 100;
  }

  if (tip > 0) {
    tipOptions.forEach((option) => {
      option.checked = false;
      option.disabled = true;
    });
  } else {
    tipOptions.forEach((option) => {
      option.disabled = false;
    });
  }

  calculateTip();
});

peopleInput.addEventListener("input", () => {
  resetBtn.disabled = false;

  if (peopleInput.value !== "") {
    numberOfPeople = parseInt(peopleInput.value);
  }

  if (numberOfPeople === 0 || peopleInput.value === "") {
    peopleInput.classList.add("error");
    errorMsg.setAttribute("aria-hidden", "false");
  } else {
    peopleInput.classList.remove("error");
    errorMsg.setAttribute("aria-hidden", "true");
  }

  calculateTip();
});

const calculateTip = () => {
  if (numberOfPeople >= 1) {
    let tipAmount = (bill * tip) / numberOfPeople;
    let total = bill / numberOfPeople + tipAmount;
    tipPerPerson.innerText = "$" + tipAmount.toFixed(2);
    totalPerPerson.innerText = "$" + total.toFixed(2);
  }
};
