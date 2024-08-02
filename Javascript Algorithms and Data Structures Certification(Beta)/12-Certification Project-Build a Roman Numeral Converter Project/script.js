const $input = document.getElementById("number");
const $convertBtn = document.getElementById("convert-btn");
const $output = document.getElementById("output");

const objectRoman = {
	1: "I",
	4: "IV",
	5: "V",
	9: "IX",
	10: "X",
	40: "XL",
	50: "L",
	90: "XC",
	100: "C",
	400: "CD",
	500: "D",
	900: "CM",
	1000: "M",
};

const getKey = (number) => {
	return Object.keys(objectRoman)
		.reverse()
		.find((key) => parseInt(key) <= number);
};

const convertToNumberRoman = (number) => {
	if (number === 0) {
		return "";
	} else {
		let key = getKey(number);
		return (
			objectRoman[key].repeat(number / parseInt(key)) +
			convertToNumberRoman(number % parseInt(key))
		);
	}
};

const validateInput = (input) => {
	let res = false;

	if (input === "") {
		$output.textContent = `Please enter a valid number.`;
		$output.classList.add("alert");
	} else if (Number(input) < 1) {
		$output.textContent = `Please enter a number greater than or equal to 1.`;
		$output.classList.add("alert");
	} else if (Number(input) > 3999) {
		$output.textContent = `Please enter a number less than or equal to 3999.`;
		$output.classList.add("alert");
	} else {
		$output.classList.remove("alert");
		res = true;
	}

	return res;
};

const handleClickConvertBtn = () => {
	$output.classList.remove("hidden");

	if (!validateInput($input.value)) {
		return;
	}

	if (objectRoman[number]) {
		return objectRoman[number];
	}

	const result = convertToNumberRoman(parseInt($input.value));
	$output.classList.remove("alert");
	$output.textContent = result;
};

$convertBtn.addEventListener("click", handleClickConvertBtn);
