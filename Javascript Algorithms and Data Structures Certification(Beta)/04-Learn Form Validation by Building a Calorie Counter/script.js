const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const output = document.getElementById("output");
const clearButton = document.getElementById("clear");
let isError = false;

const cleanInputString = (str) => {
	const regex = /[+-\s]/g;
	return str.replace(regex, "");
};

const isInvalidInput = (str) => {
	const regex = /\d+e\d+/i;
	return str.match(regex);
};

function addEntry() {
	const targetInputContainer = document.querySelector(
		`#${entryDropdown.value} .input-container`
	);
	const entryNumber =
		targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

	const HTMLString = `<label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber}</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" name="name" placeholder="Name" required>
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input type="number" id="${entryDropdown.value}-${entryNumber}-calories" name="calories" placeholder="Calories" min="0" required>
  `;

	targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

const getCaloriesFromInputs = (list) => {
	let calories = 0;

	for (const item of list) {
		const currVal = cleanInputString(item.value);
		const invalidInputMatch = isInvalidInput(currVal);

		if (invalidInputMatch) {
			alert(`Invalid Input: ${invalidInputMatch[0]}`);
			isError = true;
			return null;
		}

		calories += Number(currVal);
	}
	return calories;
};

function calculateCalories(e) {
	e.preventDefault();
	isError = false;

	const breakfastNumberInputs = document.querySelectorAll(
		"#breakfast input[type=number]"
	);
	const lunchNumberInputs = document.querySelectorAll(
		"#lunch input[type=number]"
	);
	const dinnerNumberInputs = document.querySelectorAll(
		"#dinner input[type=number]"
	);
	const snacksNumberInputs = document.querySelectorAll(
		"#snacks input[type=number]"
	);
	const exerciseNumberInputs = document.querySelectorAll(
		"#exercise input[type=number]"
	);

	const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
	const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
	const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
	const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
	const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
	const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

	if (isError) {
		return;
	}

	const consumedCalories =
		breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
	const remainingCalories =
		budgetCalories - consumedCalories + exerciseCalories;
	const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";

	output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
		remainingCalories
	)} Calorie ${surplusOrDeficit}</span>
	<hr>
	<p>${budgetCalories} Calories Budgeted</p>
	<p>${consumedCalories} Calories Consumed</p>
	<p>${exerciseCalories} Calories Burned</p>
  `;

	output.classList.remove("hide");
}

function clearForm() {
	const inputContainers = Array.from(
		document.querySelectorAll(".input-container")
	);
	console.log(inputContainers);

	for (const container of inputContainers) {
		container.innerHTML = "";
	}

	budgetNumberInput.value = "";
	output.innerText = "";
	output.classList.add("hide");
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);
