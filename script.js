let allTasks = [];

// Load tasks from localStorage on page load
window.onload = function () {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    allTasks = JSON.parse(savedTasks);
    renderTasks();
  }
};

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskdate");
  const text = taskInput.value.trim();
  const date = taskDate.value;

  if (text === "") return;

  const task = {
    text,
    date,
    completed: false
  };

  allTasks.push(task);

  // Save and refresh
  saveTasks();
  renderTasks();

  // Reset input
  taskInput.value = "";
  taskDate.value = "";
}

function toggleTask(index) {
  allTasks[index].completed = !allTasks[index].completed;
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

function renderTasks() {
  const allTasksList = document.getElementById("allTasks");
  const completedList = document.getElementById("completedTasks");
  const pendingList = document.getElementById("pendingTasks");

  allTasksList.innerHTML = "";
  completedList.innerHTML = "";
  pendingList.innerHTML = "";

  allTasks.forEach((task, index) => {
    const taskLabel = `${task.text}${task.date ? ` (${task.date})` : ""}`;

    // All Tasks with checkbox
    const allLi = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(index));

    const label = document.createElement("span");
    label.textContent = taskLabel;

    allLi.appendChild(checkbox);
    allLi.appendChild(label);
    allTasksList.appendChild(allLi);

    // Completed or Pending list
    const statusLi = document.createElement("li");
    statusLi.textContent = taskLabel;

    if (task.completed) {
      completedList.appendChild(statusLi);
    } else {
      pendingList.appendChild(statusLi);
    }
  });
}


