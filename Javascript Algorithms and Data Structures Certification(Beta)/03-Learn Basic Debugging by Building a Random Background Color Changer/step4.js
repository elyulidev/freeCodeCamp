/* Step 4
CamperBot is finished with building out the getRandomIndex function and it is working as expected.

But now they are running into this issue when trying to create a reference to the body element in the DOM:

Uncaught TypeError: document.queryselector is not a function
A TypeError means that the code is trying to perform an operation on a value that is not of the expected type.

Fix the TypeError by updating the document.queryselector method to the correct method name that selects an element from the DOM. */
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
