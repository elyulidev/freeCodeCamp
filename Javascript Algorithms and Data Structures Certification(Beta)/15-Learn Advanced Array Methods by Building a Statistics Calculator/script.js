/**
 * The function `getMean` calculates the mean (average) of an array of numbers.
 * @param array - An array of numbers for which you want to calculate the mean.
 */
const getMean = (array) =>
	array.reduce((acc, el) => acc + el, 0) / array.length;

/**
 * The `getMedian` function calculates the median value of an array of numbers.
 * @param array - An array of numbers for which you want to calculate the median.
 * @returns The `getMedian` function is returning the median value of the input array. If the length of
 * the array is even, it calculates the mean of the two middle values. If the length of the array is
 * odd, it returns the middle value.
 */
const getMedian = (array) => {
	const sorted = array.slice().sort((a, b) => a - b);
	if (sorted.length % 2 === 0) {
		return getMean([sorted[sorted.length / 2 - 1], sorted[sorted.length / 2]]);
	} else {
		return sorted[Math.floor(sorted.length / 2)];
	}
};

/**
 * The `getMode` function calculates the mode (most frequently occurring value) of an array of numbers.
 * @param array - The `getMode` function calculates the mode(s) of an array of numbers. The mode is the
 * number that appears most frequently in the array. If there are multiple modes (numbers with the same
 * highest frequency), it returns all of them.
 * @returns The `getMode` function returns the mode(s) of the input array, which is the value(s) that
 * appear most frequently. If there is a tie for the highest frequency, it returns all modes separated
 * by a comma. If all values in the array occur with the same frequency, it returns `null`.
 */
const getMode = (array) => {
	const counts = {};

	array.forEach((el) => {
		if (counts[el]) {
			counts[el] += 1;
		} else {
			counts[el] = 1;
		}
	});

	if (new Set(Object.values(counts)).size === 1) {
		return null;
	}
	const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
	const mode = Object.keys(counts).filter(
		(el) => counts[el] === counts[highest]
	);
	return mode.join(", ");
};

const getRange = (array) => {
	return Math.max(...array) - Math.min(...array);
};

const getVariance = (array) => {
	const mean = getMean(array);
	const variance =
		array.reduce((acc, el) => {
			const difference = el - mean;
			const squared = difference ** 2;
			return acc + squared;
		}, 0) / array.length;
	return variance;
};

const getStandardDeviation = (array) => {
	const mean = getMean(array);
	const variance = getVariance(array);
	const standardDeviation = Math.sqrt(variance);
	return standardDeviation;
};

const calculate = () => {
	const value = document.querySelector("#numbers").value;
	const array = value.split(/,\s*/g);
	const numbers = array.map((el) => Number(el)).filter((el) => !isNaN(el));

	const mean = getMean(numbers);
	const median = getMedian(numbers);
	const mode = getMode(numbers);
	const range = getRange(numbers);
	const variance = getVariance(numbers);
	const standardDeviation = getStandardDeviation(numbers);

	document.querySelector("#mean").textContent = mean;
	document.querySelector("#median").textContent = median;
	document.querySelector("#mode").textContent = mode;
	document.querySelector("#range").textContent = range;
	document.querySelector("#variance").textContent = variance;
	document.querySelector("#standardDeviation").textContent = standardDeviation;
};
