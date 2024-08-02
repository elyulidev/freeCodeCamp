/* Step 2
Now, CamperBot is trying to create a function that will return a random index from the darkColorsArr. But they have run into the following error message:

Uncaught ReferenceError: math is not defined
A ReferenceError is thrown when a non-existent variable is referenced. In this case, it looks like CamperBot is trying to use math but JavaScript doesn't have a math object.

Fix CamperBot's error in the math.random() line and open up the console again. */

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
	console.log(darkColorsArr.length * Math.random());
}

getRandomIndex();
