/* Step 8
CamperBot has finished building out their random background color changer. However, when they click the button, the background color does not change.

It looks like they are trying to use the onclick property but they are using it incorrectly. The onclick property should be assigned a function reference.

Fix the error in the btn.onclick = changeBackgroundColor(); line.

Remember that you worked with the onclick property in the Role playing game project. Look back at the final solution to see how onclick was properly used.

Once you fix that final bug, the random background color changer will be complete!*/

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
btn.onclick = changeBackgroundColor;
