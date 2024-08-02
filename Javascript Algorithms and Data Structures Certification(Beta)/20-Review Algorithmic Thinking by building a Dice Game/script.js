let listOfAllDice = document.querySelectorAll(".die");
let scoreInputs = document.querySelectorAll("#score-options input");
let scoreSpans = document.querySelectorAll("#score-options span");
let currentRound = document.getElementById("current-round");
let currentRoundRolls = document.getElementById("current-round-rolls");
let totalScore = document.getElementById("total-score");
let scoreHistory = document.getElementById("score-history");
let rollDiceBtn = document.getElementById("roll-dice-btn");
let keepScoreBtn = document.getElementById("keep-score-btn");
let rulesBtn = document.getElementById("rules-btn");
let rulesContainer = document.querySelector(".rules-container");

let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let total = 0;
let round = 1;
let rolls = 0;

const rollDice = () => {
	diceValuesArr = [];

	for (let i = 0; i < 5; i++) {
		const randomDice = Math.floor(Math.random() * 6) + 1;
		diceValuesArr.push(randomDice);
	}

	listOfAllDice.forEach((dice, index) => {
		dice.textContent = diceValuesArr[index];
	});
};

const updateStats = () => {
	currentRoundRolls.textContent = rolls;
	currentRound.textContent = round;
};

const updateRadioOption = (index, score) => {
	scoreInputs[index].disabled = false;
	scoreInputs[index].value = score;
	scoreSpans[index].textContent = `, score = ${score}`;
};

const updateScore = (selectedValue, achieved) => {
	score += parseInt(selectedValue);
	totalScore.textContent = score;

	scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};

const getHighestDuplicates = (arr) => {
	const counts = {};

	for (const num of arr) {
		if (counts[num]) {
			counts[num]++;
		} else {
			counts[num] = 1;
		}
	}

	let highestCount = 0;

	for (const num of arr) {
		const count = counts[num];
		if (count >= 3 && count > highestCount) {
			highestCount = count;
		}
		if (count >= 4 && count > highestCount) {
			highestCount = count;
		}
	}

	const sumOfAllDice = arr.reduce((a, b) => a + b, 0);

	if (highestCount >= 4) {
		updateRadioOption(1, sumOfAllDice);
	}

	if (highestCount >= 3) {
		updateRadioOption(0, sumOfAllDice);
	}

	updateRadioOption(5, 0);
};

const detectFullHouse = (arr) => {
	const counts = {};

	for (const num of arr) {
		counts[num] = counts[num] ? counts[num] + 1 : 1;
	}

	const hasThreeOfAKind = Object.values(counts).includes(3);
	const hasPair = Object.values(counts).includes(2);

	if (hasThreeOfAKind && hasPair) {
		updateRadioOption(2, 25);
	}

	updateRadioOption(5, 0);
};

const resetRadioOptions = () => {
	scoreInputs.forEach((input) => {
		input.disabled = true;
		input.checked = false;
	});

	scoreSpans.forEach((span) => {
		span.textContent = "";
	});
};

const resetGame = () => {
	diceValuesArr = [0, 0, 0, 0, 0];
	score = 0;
	round = 1;
	rolls = 0;

	listOfAllDice.forEach((dice, index) => {
		dice.textContent = diceValuesArr[index];
	});

	totalScore.textContent = score;
	scoreHistory.innerHTML = "";

	currentRoundRolls.textContent = rolls;
	currentRound.textContent = round;

	resetRadioOptions();
};

/* const checkForStraights = (arr) => {
	const modifiedArrSet = Array.from(new Set(arr.sort((a, b) => a - b))).join(
		""
	);
	const result = {
		smallStraight: ["1234", "2345", "3456"],
		largeStraight: ["12345", "23456"],
	};

	const largeStraight = result.largeStraight.some((num) =>
		modifiedArrSet.includes(num)
	);

	if (largeStraight) {
		updateRadioOption(4, 40);
	}

	const smallStraight = result.smallStraight.some((num) =>
		modifiedArrSet.includes(num)
	);

	if (smallStraight) {
		updateRadioOption(3, 30);
	}

	updateRadioOption(5, 0);
}; */
const checkForStraights = (arr) => {
	const sortedNumbersArr = arr.sort((a, b) => a - b);
	const uniqueNumbersArr = [...new Set(sortedNumbersArr)];
	const uniqueNumbersArrStr = uniqueNumbersArr.join("");

	const smallStraightsArr = ["1234", "2345", "3456"];
	const largeStraightsArr = ["12345", "23456"];

	smallStraightsArr.forEach((straight) => {
		if (uniqueNumbersArrStr.includes(straight)) {
			updateRadioOption(3, 30);
		}
	});

	if (largeStraightsArr.includes(uniqueNumbersArrStr)) {
		updateRadioOption(4, 40);
	}

	updateRadioOption(5, 0);
};
//checkForStraights([3, 2, 5, 1, 4]);

rollDiceBtn.addEventListener("click", () => {
	if (rolls === 3) {
		alert("You have made three rolls this round. Please select a score.");
	} else {
		rolls++;
		resetRadioOptions();
		rollDice();
		updateStats();
		getHighestDuplicates(diceValuesArr);
		detectFullHouse(diceValuesArr);
		checkForStraights(diceValuesArr);
	}
});

rulesBtn.addEventListener("click", () => {
	isModalShowing = !isModalShowing;
	if (isModalShowing) {
		rulesContainer.style.display = "block";
		rulesBtn.innerText = "Hide Rules";
	} else {
		rulesContainer.style.display = "none";
		rulesBtn.innerText = "Show Rules";
	}
});

keepScoreBtn.addEventListener("click", () => {
	let selectedValue;
	let achieved;

	for (const radioButton of scoreInputs) {
		if (radioButton.checked) {
			selectedValue = radioButton.value;
			achieved = radioButton.id;
			break;
		}
	}

	if (selectedValue) {
		rolls = 0;
		round++;
		updateStats();
		resetRadioOptions();
		updateScore(selectedValue, achieved);
		if (round > 6) {
			setTimeout(() => {
				alert(`Game Over! Your total score is ${score}`);
			}, 500);
		}
	} else {
		alert("Please select an option or roll the dice");
	}
});
