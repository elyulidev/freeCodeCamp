/* Step 3
Now that the ReferenceError is resolved, the console is displaying the correct results for a random number between 0 and 9. But CamperBot was not expecting to see decimal numbers like these:

0.015882899879771095
2.114596286197641
6.040964780197666
Update the console statement to print a whole number between 0 and 9.

Remember that you worked with a method in the Role Playing Game that rounds a number down to the nearest whole number. */

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
