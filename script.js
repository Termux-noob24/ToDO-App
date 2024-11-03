const add = document.getElementById("add");
const task = document.getElementById("newTask");
const ul = document.getElementById("todo-list");

const editTask = (task) => {
  const myModal = document.getElementById("edit-task");
  const input = document.getElementById("edited-task");
  const done = document.getElementById("done-btn");
  const cancel = document.getElementById("cancel-btn");

  myModal.style.display = "flex";
  input.value = task.textContent;
  done.addEventListener("click", () => {
    task.textContent = input.value;
    saveTasks();
    myModal.style.display = "none";
  });
  cancel.addEventListener("click", () => {
    myModal.style.display = "none";
  });
};
const addTask = () => {
  if (task.value) {
    const noTaskMessage = document.getElementById("no-task-message");
    noTaskMessage.style.display = "none";
    const div = document.createElement("div");
    const li = document.createElement("li");
    const mod = document.createElement("button");
    const mod2 = document.createElement("button");
    const i = document.createElement("i");
    const i2 = document.createElement("i");
    i.setAttribute("class", "material-icons");
    i.textContent = "delete";
    i2.setAttribute("class", "material-icons");
    i2.textContent = "edit";
    li.textContent = task.value;
    mod.appendChild(i2);
    mod2.appendChild(i);
    mod.addEventListener("click", () => editTask(li));
    mod2.addEventListener("click", () => removeTask(div));
    div.appendChild(li);
    div.appendChild(mod);
    div.appendChild(mod2);
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
  const mod2 = document.createElement("button");
  const i = document.createElement("i");
  const i2 = document.createElement("i");
  i.setAttribute("class", "material-icons");
  i.textContent = "delete";
  i2.setAttribute("class", "material-icons");
  i2.textContent = "edit";
  li.textContent = taskText;
  mod.appendChild(i2);
  mod2.appendChild(i);
  mod.addEventListener("click", () => editTask(li));
  mod2.addEventListener("click", () => removeTask(div));
  div.appendChild(li);
  div.appendChild(mod);
  div.appendChild(mod2);
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
