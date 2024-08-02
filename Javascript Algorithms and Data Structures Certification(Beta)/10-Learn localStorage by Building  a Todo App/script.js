/* This JavaScript code snippet is creating a task management application. Here is a breakdown of what
each part of the code is doing: */
/* These lines of code are selecting various elements from the HTML document using their respective
IDs. Here is a breakdown of what each line is doing: */
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

/**
 * The `addOrUpdateTask` function adds a new task to the `taskData` array if it doesn't already exist,
 * or updates an existing task if it does.
 */
const addOrUpdateTask = () => {
	const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
	const taskObj = {
		id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
		title: titleInput.value,
		date: dateInput.value,
		description: descriptionInput.value,
	};

	if (dataArrIndex === -1) {
		taskData.unshift(taskObj);
	} else {
		taskData[dataArrIndex] = taskObj;
	}

	localStorage.setItem("data", JSON.stringify(taskData));

	updateTaskContainer();
	reset();
};

/**
 * The `updateTaskContainer` function updates the tasks container by displaying task information and
 * adding buttons for editing and deleting tasks.
 */
const updateTaskContainer = () => {
	tasksContainer.innerHTML = "";
	taskData.forEach(({ id, title, date, description }) => {
		tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button type="button" class="btn" onclick="editTask(this)">Edit</button>
          <button type="button" class="btn" onclick="deleteTask(this)">Delete</button>
        </div>
      `;
	});
};

const deleteTask = (buttonEl) => {
	const dataArrIndex = taskData.findIndex(
		(item) => item.id === buttonEl.parentElement.id
	);
	buttonEl.parentElement.remove();
	taskData.splice(dataArrIndex, 1);
	localStorage.setItem("data", JSON.stringify(taskData));
};

const editTask = (buttonEl) => {
	const dataArrIndex = taskData.findIndex(
		(item) => item.id === buttonEl.parentElement.id
	);

	currentTask = taskData[dataArrIndex];
	titleInput.value = currentTask.title;
	dateInput.value = currentTask.date;
	descriptionInput.value = currentTask.description;

	addOrUpdateTaskBtn.innerText = "Update Task";
	taskForm.classList.toggle("hidden");
};

const reset = () => {
	addOrUpdateTaskBtn.innerText = "Add Task";
	titleInput.value = "";
	dateInput.value = "";
	descriptionInput.value = "";
	taskForm.classList.toggle("hidden");
	currentTask = {};
};

if (taskData.length) {
	updateTaskContainer();
}

/* The code snippet you provided is handling the functionality related to opening and closing the task
form in the task management application. Here is a breakdown of what each part of the code is doing: */
openTaskFormBtn.addEventListener("click", () => {
	taskForm.classList.toggle("hidden");
});

closeTaskFormBtn.addEventListener("click", () => {
	const formInputsContainValues =
		titleInput.value || dateInput.value || descriptionInput.value;

	const formInputValuesUpdated =
		titleInput.value !== currentTask.title ||
		dateInput.value !== currentTask.date ||
		descriptionInput.value !== currentTask.description;

	if (formInputsContainValues && formInputValuesUpdated) {
		confirmCloseDialog.showModal();
	} else {
		reset();
	}
});

cancelBtn.addEventListener("click", () => {
	confirmCloseDialog.close();
});

discardBtn.addEventListener("click", () => {
	confirmCloseDialog.close();
	reset();
});

taskForm.addEventListener("submit", (e) => {
	e.preventDefault();

	addOrUpdateTask();
});
