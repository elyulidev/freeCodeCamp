/* Step 3
The teacher is really happy with the program you have created so far. But now they want to have an easy way to check if a student has a passing grade. A passing grade is anything that is not an "F".

Complete the function hasPassingGrade that takes a student score as a parameter. Your function should return true if the student has a passing grade and false if they do not.

Tips

Use the getGrade function to get the student's grade. Then check if the grade is passing or not. */

function getGrade(score) {
	if (score === 100) {
		return "A++";
	} else if (score >= 90 && score <= 99) {
		return "A";
	} else if (score >= 80 && score <= 89) {
		return "B";
	} else if (score >= 70 && score <= 79) {
		return "C";
	} else if (score >= 60 && score <= 69) {
		return "D";
	} else {
		return "F";
	}
}

function hasPassingGrade(score) {
	return getGrade(score) === "F";
}

console.log(hasPassingGrade(100));
console.log(hasPassingGrade(53));
console.log(hasPassingGrade(87));
