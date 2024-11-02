const add = document.getElementById("add");
const task = document.getElementById("newTask");
const ul = document.getElementById("todo-list");

const addTask = () => {
  if (task.value) {
    const noTaskMessage = document.getElementById("no-task-message");
    noTaskMessage.style.display = "none";
    const div = document.createElement("div");
    const li = document.createElement("li");
    const mod = document.createElement("button");
    const i = document.createElement("i");
    mod.appendChild(i);
    i.setAttribute("class", "fa fa-ellipsis-v");
    mod.addEventListener("click", () => removeTask(div));
    li.textContent = task.value;
    div.appendChild(li);
    div.appendChild(mod);
    ul.appendChild(div);
    saveTasks();
    task.value = "";
  }
};
const removeTask = (taskElement) => {
  taskElement.remove();
  saveTasks();
};

function addTaskToList(taskText) {
  const noTaskMessage = document.getElementById("no-task-message");
  noTaskMessage.style.display = "none";
  const div = document.createElement("div");
  const li = document.createElement("li");
  const mod = document.createElement("button");
  const i = document.createElement("i");
  i.setAttribute("class", "fa fa-ellipsis-v");
  li.textContent = taskText;
  mod.appendChild(i);
  mod.addEventListener("click", () => removeTask(div));
  div.appendChild(li);
  div.appendChild(mod);
  ul.appendChild(div);
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach((task) => addTaskToList(task)); // Load each saved task
  }
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#todo-list li").forEach((li) => {
    tasks.push(li.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function deleteAllTask() {
  ul.innerHTML = "";
  localStorage.removeItem("tasks");
}

add.addEventListener("click", addTask);
loadTasks();
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("ServiceWorker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed:", error);
      });
  });
}
