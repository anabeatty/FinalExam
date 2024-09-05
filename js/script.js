/*
# This project is based on a public project but has been modified 
# according to the requirements of the IST 107 Course.
# Instructor: Washington Valencia
# Institution: CCTB College
*/

document.addEventListener("DOMContentLoaded", () => {
  const colors = [
    "#F0E68C",
    "#FFDAB9",
    "#FFE4B5",
    "#D8BFD8",
    "#B0E0E6",
    "#AFEEEE",
    "#E0FFFF",
    "#98FB98",
    "#FFDEAD",
    "#F5DEB3",
  ];
  let index = 0;

  const changeBackgroundColor = () => {
    document.body.style.backgroundColor = colors[index];
    index = (index + 1) % colors.length;
  };

  setInterval(changeBackgroundColor, 2000);
});

let addButton = document.getElementById("enter");
let askUserButton = document.getElementById("askUser");
let input = document.getElementById("userInput");
let ul = document.querySelector("ul");
let tasks = [];

// Helper Functions
function inputLength() {
  return input.value.length;
}

function createTaskElement(task) {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(task));
  ul.appendChild(li);

  // Add strikethrough functionality
  li.addEventListener("click", () => li.classList.toggle("done"));

  // Add delete button
  let dBtn = document.createElement("button");
  dBtn.appendChild(document.createTextNode("Delete"));
  li.appendChild(dBtn);

  dBtn.addEventListener("click", () => {
    ul.removeChild(li);
    tasks = tasks.filter((t) => t !== task);
  });
}

// Function to handle adding a task
function addTask(task) {
  if (tasks.includes(task)) {
    alert("Task already exists.");
  } else {
    tasks.push(task);
    createTaskElement(task);
  }
}

// Event Handlers
function addTaskAfterClick() {
  if (inputLength() > 0) {
    addTask(input.value);
    input.value = ""; // Clear the input field
  }
}

function addTaskAfterKeypress(event) {
  if (inputLength() > 0 && event.key === "Enter") {
    addTask(input.value);
    input.value = "";
  }
}

// Function to continuously prompt the user for tasks
function askUserForTasks() {
  let task = prompt("Enter a new task (or type 'exit' to stop):");

  while (task && task.toLowerCase() !== "exit") {
    if (task.length > 0) {
      addTask(task);
    }
    task = prompt("Enter a new task (or type 'exit' to stop):");
  }
}

// Add event listeners
addButton.addEventListener("click", addTaskAfterClick);
input.addEventListener("keypress", addTaskAfterKeypress);
askUserButton.addEventListener("click", askUserForTasks);
