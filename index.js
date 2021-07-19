const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

// todosがtrue、つまり文字が入力されたらリストにtodoが追加される
if (todos) {
  todos.forEach((todo) => {
    add(todo);
  });
}

// Enterで項目追加
form.addEventListener("submit", function (event) {
  event.preventDefault();
  add();
});

// todo追加・削除の構成
function add(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const li = document.createElement("li");

    li.innerText = todoText;
    li.classList.add('list-group-item')

    // todo(ローカルストレージ)にデータがあってtodoのcompletedがtrueの時
    if (todo && todo.completed) {
      li.classList.add("text-decoration-line-through");
    }

    // 右クリックで削除
    li.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      li.remove();
      saveData();
    });

    // 左クリックで完了マーク
    li.addEventListener("click", function () {
      li.classList.toggle("text-decoration-line-through");
      saveData();
    });

    ul.appendChild(li);
    input.value = "";
    saveData();
  }
}

// ローカルストレージに保存
function saveData() {
  const lists = document.querySelectorAll("li");
  const todos = [];

  lists.forEach((li) => {
    todos.push({
      text: li.innerText,
      completed: li.classList.contains("text-decoration-line-through"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
