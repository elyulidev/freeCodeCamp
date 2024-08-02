/* Step 6
CamperBot has now created a function called changeBackgroundColor that changes the background color of the page to a random color from the darkColorsArr array. The function also displays the hex code for that new color.

When they try to test out this function, they notice that the background color is not changing and the text shows the following:

Hex Code: undefined
undefined is showing up here because the color variable is not being set correctly.

Fix the error in the darkColorsArr[getRandomIndex] line so that the color variable is set to a random color from the darkColorsArr array. */
const darkColorsArr = [
	"#2C3E50",
	"#34495E",
	"#2C2C2C",
	"#616A6B",
	"#4A235A",
	"#2F4F4F",
	"#0E4B5A",
	"#36454F",
	"#2C3E50",
	"#800020",
];

function getRandomIndex() {
	console.log(Math.floor(darkColorsArr.length * Math.random()));
}

const body = document.querySelector("body");
const bgHexCodeSpanElement = document.querySelector("#bg-hex-code");

function changeBackgroundColor() {
	const color = darkColorsArr[getRandomIndex()];

	bgHexCodeSpanElement.innerText = color;
	body.style.backgroundColor = color;
}
changeBackgroundColor();
