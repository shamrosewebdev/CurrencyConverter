let baseUrl =
  "https://api.currencyapi.com/v3/latest?apikey=cur_live_a8nfmhNoaw2KVvRz74Fkj4LECrB8kDTuapPV7Df8";
let selects = document.querySelectorAll(".options select");
let button = document.querySelector(".btn");
let shuffleBtn = document.querySelector(".shuffle");

// Populating the options
for (let select of selects) {
  for (let countryCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = countryCode;
    newOption.value = countryCode;
    select.append(newOption);
    if (select.name === "from" && newOption.innerText === "PKR") {
      newOption.selected = "selected";
    } else if (select.name === "to" && newOption.innerText === "USD") {
      newOption.selected = "selected";
    }
  }
  // change flag
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target, countryList);
    if (evt.target.id === "from") {
      document.querySelector(
        "label"
      ).innerText = `Please enter the amount in ${evt.target.value}`;
    } else if (evt.target.id === "to") {
      document.querySelector(
        ".output p"
      ).innerText = `Here is your amount in ${evt.target.value}`;
    }
  });
}
const updateFlag = (element, countryList) => {
  let selectedCode = element.value;
  element.parentElement.querySelector(
    "img"
  ).src = `https://flagsapi.com/${countryList[selectedCode]}/flat/64.png`;
};

// Swap function
shuffleBtn.addEventListener("click", () => {
  let fromSelect = document.getElementById("from");
  let toSelect = document.getElementById("to");

  // Swap values
  let temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;

  // Update flags after swapping
  updateFlag(fromSelect, countryList);
  updateFlag(toSelect, countryList);

  // Update label texts
  document.querySelector(
    "label"
  ).innerText = `Please enter the amount in ${fromSelect.value}`;
  document.querySelector(
    ".output p"
  ).innerText = `Here is your amount in ${toSelect.value}`;
});

// Final Logic
button.addEventListener("click", async (evt) => {
  evt.preventDefault();
  //Input amount
  let inputAmt = document.querySelector("form input");
  if (inputAmt.value <= 0 || inputAmt.value === "") {
    inputAmt.innerText = 1;
    inputAmt.value = 1;
  }

  //Currency selection
  let fromVal = document.getElementById("from").value;
  let toVal = document.getElementById("to").value;

  //API Data Request
  let url = baseUrl + `&base_currency=${fromVal}&currencies=${toVal}`;
  response = await fetch(url);
  data = await response.json();
  let exRate = data["data"][`${toVal}`]["value"];

  // Calculation
  finalAmount = exRate * inputAmt.value;

  //Show output
  document.querySelector("form .output input").value = finalAmount;
  document.querySelector(
    ".message"
  ).innerText = `1 ${fromVal} equals to ${exRate} ${toVal}`;
});
