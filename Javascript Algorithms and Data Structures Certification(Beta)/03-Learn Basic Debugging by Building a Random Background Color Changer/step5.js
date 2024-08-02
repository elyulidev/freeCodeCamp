/* Step 5
CamperBot has created a new variable called bgHexCodeSpanElement to store the reference to the span element with the id of bg-hex-code. However, when they try to log that variable to the console, they get null.

null is a special value in JavaScript that represents the absence of a value. This can happen when you try to access a property of an object that doesn't exist.

In this case, CamperBot is not passing in the correct selector to the document.querySelector method.

Fix the document.querySelector("bg-hex-code") line so that it correctly selects the element with the id of bg-hex-code. */
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

getRandomIndex();

const body = document.querySelector("body");
const bgHexCodeSpanElement = document.querySelector("#bg-hex-code");

console.log(bgHexCodeSpanElement);
