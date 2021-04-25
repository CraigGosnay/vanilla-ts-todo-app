// selectors
document.querySelector("form")?.addEventListener("submit", handleSubmitForm);
document
  .querySelector("ul")
  ?.addEventListener("click", handleClickDeleteOrCheck);
document.getElementById('clearAll')?.addEventListener('click', handleClearAll)

// event handlers
function handleSubmitForm(event: Event): void {
  event.preventDefault();
  const input = document.querySelector("input");
  if (input && input.value != "") {
    addTodo(input.value);
    input.value = "";
  }
}

function handleClickDeleteOrCheck(event: Event): void {
  const elem = (event.target as HTMLInputElement).parentElement;
  const name = (elem as HTMLInputElement).name;
  const li = elem?.parentElement;

  if (!li) {
    return;
  }

  if (name === "checkButton") {
    checkTodo(li);
  }
  if (name === "deleteButton") {
    deleteTodo(li);
  }
}

function handleClearAll(event: Event): void {
  const ul = document.querySelector('ul');
  if (ul) {
    ul.innerHTML = '';
  }
}

// helper
function addTodo(text: string): void {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");

  li.innerHTML = `
        <span class="todo-item">${text}</span>
        <button name="checkButton"><i class="fas fa-check-square"></i></button>
        <button name="deleteButton"><i class="fas fa-trash"></i></button>
    `;
  li.classList.add("todo-list-item");
  ul?.appendChild(li);
}

function checkTodo(elem: HTMLElement) {
  if (elem && elem.style.textDecoration === "line-through") {
    elem.style.textDecoration = "none";
  } else {
    elem.style.textDecoration = "line-through";
  }
}

function deleteTodo(elem: HTMLElement) {

  elem.addEventListener('transitionend', () => {
    elem.remove();
  })

  elem.classList.add('todo-list-item-fall');
}
