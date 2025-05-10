// --- DOM Elements ---
const taskInput = document.getElementById("task-input");
const categorySelect = document.getElementById("category-select");
const dueDateInput = document.getElementById("due-date-input");
const taskList = document.getElementById("task-list");
const filterSelect = document.getElementById("task-filter");
const addTaskButton = document.getElementById("add-task-btn");
const logoutButton = document.getElementById("logout-btn");

// --- Load Tasks on Start ---
document.addEventListener("DOMContentLoaded", loadTasks);

// --- Add Task ---
addTaskButton.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const category = categorySelect.value;
  const dueDate = dueDateInput.value;

  if (!taskText) {
    alert("Please enter a task.");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    category: category,
    dueDate: dueDate,
    done: false
  };

  const tasks = getTasksFromStorage();
  tasks.push(task);
  saveTasksToStorage(tasks);

  renderTasks(tasks);
  taskInput.value = "";
  dueDateInput.value = "";
}

// --- Render Tasks ---
function renderTasks(tasks) {
  const filter = filterSelect.value;
  taskList.innerHTML = "";

  tasks.forEach(task => {
    if (filter !== "all" && task.category !== filter) return;

    const li = document.createElement("li");
    li.className = task.done ? "done" : "";

    li.innerHTML = `
      <span>${task.text}</span>
      <small>📅 ${task.dueDate || "No date"} | 🌱 ${task.category}</small>
      <div>
        <button onclick="toggleDone(${task.id})">✔️</button>
        <button onclick="deleteTask(${task.id})">🗑️</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// --- Toggle Done ---
function toggleDone(id) {
  const tasks = getTasksFromStorage();
  const task = tasks.find(t => t.id === id);
  if (task) task.done = !task.done;
  saveTasksToStorage(tasks);
  renderTasks(tasks);
}

// --- Delete Task ---
function deleteTask(id) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter(t => t.id !== id);
  saveTasksToStorage(tasks);
  renderTasks(tasks);
}

// --- Get & Save Tasks ---
function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// --- Filter Change ---
filterSelect.addEventListener("change", () => {
  const tasks = getTasksFromStorage();
  renderTasks(tasks);
});

// --- Logout ---
logoutButton.addEventListener("click", () => {
  // Implement logout functionality here
  alert("Logged out!");
  window.location.href = "login.html"; // Example of redirecting to login page
});

// --- Load on Start ---
function loadTasks() {
  const tasks = getTasksFromStorage();
  renderTasks(tasks);
}
