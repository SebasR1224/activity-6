const date = document.getElementById("date");
const newDate = new Date();
const list = document.getElementById("list");
const input = document.getElementById("input");
const sendButton = document.getElementById("send-button");

const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";

let data;
let id;

date.innerHTML = newDate.toLocaleDateString("es-MX", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

function addTask(task, id, checked, deleted) {
  const checkClass = checked ? check : uncheck;
  const lineClass = checked ? lineThrough : "";

  if (deleted) return;
  const element = `<li>
                        <i class="far ${checkClass}" data="checked" id="${id}"></i>
                        <p class="text ${lineClass}">${id + 1}) ${task}</p>
                        <i class="fas fa-trash de" data="deleted" id="${id}"></i>
                   </li>`;

  list.insertAdjacentHTML("afterbegin", element);
}

function checkTask(target) {
  target.classList.toggle(check);
  target.classList.toggle(uncheck);
  target.parentNode.querySelector(".text").classList.toggle(lineThrough);
  data[target.id].checked = data[target.id].checked ? false : true;
}

function deleteTask(target) {
  target.parentNode.parentNode.removeChild(target.parentNode);
  data[target.id].deleted = true;
}

function handleTaskAddition() {
  const task = input.value;
  if (task) {
    addTask(task, id, false, false);
    data.push({
      task,
      id,
      checked: false,
      deleted: false,
    });
    localStorage.setItem("listTask", JSON.stringify(data));

    input.value = "";
    id++;
  }
}

sendButton.addEventListener("click", handleTaskAddition);
document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    handleTaskAddition();
  }
});

list.addEventListener("click", ({ target }) => {
  const elementData = target.attributes.data?.value;
  if (elementData && elementData === "checked") checkTask(target);
  else if (elementData === "deleted") deleteTask(target);
  localStorage.setItem("listTask", JSON.stringify(data));
});

let getData = localStorage.getItem("listTask");
if (getData) {
  data = JSON.parse(getData);
  id = data.length;
  loadList(data);
} else {
  data = [];
  id = 0;
}

function loadList(data) {
  data.forEach(({ task, id, checked, deleted }) => {
    addTask(task, id, checked, deleted);
  });
}
