const cash = document.getElementById("cash");
const changeCash = document.getElementById("change-due");
const purchase = document.getElementById("purchase-btn");
const cashDrawerDisplay = document.getElementById("cash-drawer-display");

let price = 19.5;
let cid = [
	["PENNY", 1.01],
	["NICKEL", 2.05],
	["DIME", 3.1],
	["QUARTER", 4.25],
	["ONE", 90],
	["FIVE", 55],
	["TEN", 20],
	["TWENTY", 60],
	["ONE HUNDRED", 100],
];
const FOUNDS = {};
cid.forEach(([key, value]) => (FOUNDS[key] = value));
//console.log("FOUNDS", FOUNDS);
const MESSAGES = {
	1: "Status: INSUFFICIENT_FUNDS",
	2: "Status: CLOSED",
	3: "Status: OPEN",
	4: "Customer does not have enough money to purchase the item",
	5: "No change due - customer paid with exact cash",
};
const CURRENCY = {
	"ONE HUNDRED": 100,
	TWENTY: 20,
	TEN: 10,
	FIVE: 5,
	ONE: 1,
	QUARTER: 0.25,
	DIME: 0.1,
	NICKEL: 0.05,
	PENNY: 0.01,
};
/* const CURRENCY = {
	PENNY: 0.01,
	NICKEL: 0.05,
	DIME: 0.1,
	QUARTER: 0.25,
	ONE: 1,
	FIVE: 5,
	TEN: 10,
	TWENTY: 20,
	"ONE HUNDRED": 100,
}; */

const KEYS = [
	"Pennies",
	"Nickels",
	"Dimes",
	"Quarters",
	"Ones",
	"Fives",
	"Tens",
	"Twenties",
	"Hundreds",
];

const CLIENT_CHANGE = { message: MESSAGES[3] };

const getCurrency = (money) => {
	return (
		Object.keys(CURRENCY).find(
			(key) => CURRENCY[key] <= money && FOUNDS[key] !== 0
		) || "ZERO"
	);
};

const substractNumberUntilSatisfy = (money, keyValue, key) => {
	while (money >= keyValue && FOUNDS[key] >= keyValue) {
		money -= keyValue;
		if (CLIENT_CHANGE[key]) {
			CLIENT_CHANGE[key] = parseFloat(
				(CLIENT_CHANGE[key] + keyValue).toFixed(2)
			);
		} else {
			CLIENT_CHANGE[key] = keyValue;
		}
		FOUNDS[key] = parseFloat((FOUNDS[key] - keyValue).toFixed(2));
		/* console.log("money>>", money);
		console.log(`FOUNDS[${key}]>>`, FOUNDS[key]); */
	}
	return money;
};

function calculateTotalFromProperty(property) {
	const keys = Object.keys(FOUNDS);
	let startSumming = false;
	let total = 0;

	// Recorre las claves en orden inverso
	for (let i = keys.length - 1; i >= 0; i--) {
		const key = keys[i];
		if (key === property) {
			startSumming = true;
		}
		if (startSumming) {
			total += FOUNDS[key];
		}
	}

	return total;
}

const calculateChange = (money) => {
	if (money === 0) {
		return;
	} else {
		let currencyKey = getCurrency(parseFloat(money.toFixed(2)));
		//console.log("currencyKey>>", currencyKey);
		if (currencyKey === "ZERO") {
			return;
		}

		let totalFounds = calculateTotalFromProperty(currencyKey);

		if (totalFounds < money) {
			return "INSUFFICIENT_FUNDS";
		}
		let money2 = substractNumberUntilSatisfy(
			money,
			parseFloat(CURRENCY[currencyKey]),
			currencyKey
		);
		//console.log("money2>>", money2);
		return calculateChange(parseFloat(money2.toFixed(2)));
	}
};

function filterKeysWithZeroValue(obj) {
	const keysWithNonZeroValue = [];
	for (let key in obj) {
		if (obj.hasOwnProperty(key) && obj[key] !== 0) {
			keysWithNonZeroValue.push(key);
		}
	}

	const $fragment = document.createDocumentFragment();

	keysWithNonZeroValue.length > 0 &&
		keysWithNonZeroValue.forEach((key) => {
			const $p = document.createElement("p");
			if (key === "message") {
				$p.textContent = obj[key];
			} else {
				$p.textContent = `${key}: $${obj[key]}`;
			}

			$fragment.appendChild($p);
		});

	changeCash.appendChild($fragment);
}

purchase.addEventListener("click", () => {
	if (cash.value === "") {
		return;
	}

	if (Number(cash.value) < price) {
		alert(MESSAGES[4]);
		cash.value = "";
		return;
	}

	if (Number(cash.value) === price) {
		changeCash.innerHTML = "";
		changeCash.innerHTML = `<p>${MESSAGES[5]}</p>`;
		return;
	}
	const totalFounds = Object.values(FOUNDS).reduce(
		(acc, curr) => acc + curr,
		0
	);

	if (totalFounds - (Number(cash.value) - price) < 0) {
		changeCash.innerHTML = "";
		changeCash.innerHTML = `<p>${MESSAGES[1]}</p>`;

		return;
	}

	if (totalFounds - (Number(cash.value) - price) === 0) {
		changeCash.innerHTML = "";
		changeCash.innerHTML = `<p>${MESSAGES[2]} </p>`;
		filterKeysWithZeroValue(FOUNDS);
		return;
	}

	cash.value = Number(cash.value) - price;
	const change = calculateChange(Number(cash.value));

	if (change === "INSUFFICIENT_FUNDS") {
		changeCash.innerHTML = "";
		changeCash.innerHTML = `<p>${MESSAGES[1]}</p>`;
		return;
	}
	cash.value = "";

	//cid = [...Object.keys(FOUNDS).map((key) => [key, FOUNDS[key]])];

	const $fragment = document.createDocumentFragment();

	Object.keys(CLIENT_CHANGE).forEach((key) => {
		const $p = document.createElement("p");
		if (key === "message") {
			$p.textContent = CLIENT_CHANGE[key];
		} else {
			$p.textContent = `${key}: $${CLIENT_CHANGE[key]}`;
		}

		$fragment.appendChild($p);
	});

	changeCash.innerHTML = "";
	changeCash.appendChild($fragment);

	Object.keys(FOUNDS).forEach((key, i) => {
		cashDrawerDisplay.children[
			i + 1
		].textContent = `${KEYS[i]}: $${FOUNDS[key]}`;
	});
});
