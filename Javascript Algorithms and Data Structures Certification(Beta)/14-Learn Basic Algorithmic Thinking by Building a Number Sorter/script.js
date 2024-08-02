const sortButton = document.getElementById("sort");

const sortInputArray = (event) => {
	event.preventDefault();

	const inputValues = [
		...document.getElementsByClassName("values-dropdown"),
	].map((dropdown) => dropdown.value);

	//const sortedValues = bubbleSort(inputValues);
	//const sortedValues = selectionSort(inputValues);
	//const sortedValues = insertionSort(inputValues);
	const sortedValues = inputValues.sort((a, b) => a - b);
	updateUI(sortedValues);
};

const updateUI = (array = []) => {
	array.forEach((num, i) => {
		const outputValueNode = document.getElementById(`output-value-${i}`);
		outputValueNode.innerText = num;
	});
};

const bubbleSort = (array) => {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length - 1; j++) {
			//console.log("array>>>", array, array[j], array[j + 1]);
			if (array[j] > array[j + 1]) {
				const temp = array[j];
				array[j] = array[j + 1];
				array[j + 1] = temp;
			}
		}
		//console.log("array>>>", array);
	}
	return array;
};

bubbleSort([8, 2, 4, 1, 3]);

const selectionSort = (array) => {
	for (let i = 0; i < array.length; i++) {
		let minIndex = i;
		for (let j = i + 1; j < array.length; j++) {
			//console.log("array>>>", array, array[j], array[minIndex]);
			if (array[j] < array[minIndex]) {
				minIndex = j;
			}
		}
		const temp = array[i];
		array[i] = array[minIndex];
		array[minIndex] = temp;
		//console.log("array>>>", array);
	}
	return array;
};

selectionSort([8, 2, 4, 1, 3]);

const insertionSort = (array) => {
	for (let i = 1; i < array.length; i++) {
		const currValue = array[i];
		console.log("currValue>>>", currValue);
		let j = i - 1;
		while (j >= 0 && array[j] > currValue) {
			array[j + 1] = array[j];
			j--;
		}
		array[j + 1] = currValue;
		console.log("array>>>", array);
	}
	return array;
};

insertionSort([8, 2, 4, 1, 3]);

sortButton.addEventListener("click", sortInputArray);
