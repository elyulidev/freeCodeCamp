const $input = document.getElementById("text-input");
const $checkButton = document.getElementById("check-btn");
const $result = document.getElementById("result");

const isPalindrome = (str) => {
	const modifyStr = str
		.trim()
		.toLowerCase()
		.replace(/[ ,_.\-:()\\]/g, "");

	return modifyStr === modifyStr.split("").reverse().join("");
};

$checkButton.addEventListener("click", () => {
	if ($input.value === "") {
		alert("Please input a value");
	}

	let res = "";

	if (isPalindrome($input.value)) {
		res = ` is a palindrome`;
	} else {
		res = ` is not a palindrome`;
	}

	const template = `
  <strong>${$input.value}</strong> ${res}
  `;

	$input.value = "";
	$result.classList.remove("hidden");
	$result.innerHTML = template;
});
