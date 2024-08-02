/* Step 7
CamperBot is trying to create a new variable called btn to store the reference to the button element with the id of click-btn

However, when they try to log the button element to the console, they see that the button element is null.

Open up the index.html to see the correct id name for that button element.

Then fix the error for the document.querySelector("#click-btn"); line.*/

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

const btn = document.querySelector("#btn");
console.log(btn);
