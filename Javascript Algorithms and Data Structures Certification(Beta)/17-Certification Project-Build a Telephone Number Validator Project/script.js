const $checkBtn = document.getElementById("check-btn");
const $clearBtn = document.getElementById("clear-btn");
const $input = document.getElementById("user-input");
const $result = document.getElementById("results-div");

const regex = /^(?:1[-\s]?)?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;
const validatePhoneNumberUS = (str) => regex.test(str);

$checkBtn.addEventListener("click", () => {
	if (!$input.value) {
		alert("Please provide a phone number");
		return;
	}

	if (regex.test($input.value.trim())) {
		$result.innerHTML += `
    <p class="results-text" style="color: rgb(77, 56, 0);">Valid US number: ${$input.value}</p>
    `;
	} else {
		$result.innerHTML += `
    <p class="results-text" style="color: rgb(77, 56, 0);">Invalid US number: ${$input.value}</p>
    `;

		$input.value = "";
		return;
	}
});

$clearBtn.addEventListener("click", () => {
	$result.innerHTML = "";
	return;
});
