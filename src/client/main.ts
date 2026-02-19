import '../styles/main.scss';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const STORAGE_KEY = "simple_todos_v1";

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Basic sanity check
    return parsed.map((item) => ({
      id: String(item.id),
      text: String(item.text ?? ""),
      completed: Boolean(item.completed),
    }));
  } catch (err) {
    console.error("Failed to load todos:", err);
    return [];
  }
}

function saveTodos(todos: Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (err) {
    console.error("Failed to save todos:", err);
  }
}

function createTodo(text: string): Todo {
    return {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        text: text.trim(),
        completed: false 
    }
}


function renderTodos(todos: Todo[]): void {
  const listEl = document.getElementById("todo-list");
  const emptyMessageEl = document.getElementById("empty-message");

  if (!listEl || !emptyMessageEl) {
    console.error("Missing todo DOM elements");
    return;
  }

  listEl.innerHTML = "";

  if (todos.length === 0) {
    emptyMessageEl.removeAttribute("hidden");
    return;
  } else {
    emptyMessageEl.setAttribute("hidden", "true");
  }

  todos.forEach((todo) => {
    const li = document.createElement("li");
    if (todo.completed) {
      li.classList.add("completed");
    }

    const left = document.createElement("div");
    left.className = "todo-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos(todos);
      renderTodos(todos);
    });

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;

    left.appendChild(checkbox);
    left.appendChild(textSpan);

    const actions = document.createElement("div");
    actions.className = "todo-actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      const idx = todos.findIndex((t) => t.id === todo.id);
      if (idx >= 0) {
        todos.splice(idx, 1);
        saveTodos(todos);
        renderTodos(todos);
      }
    });

    actions.appendChild(deleteBtn);

    li.appendChild(left);
    li.appendChild(actions);

    listEl.appendChild(li);
  });
}

function setupTodoApp(): void {
  const form = document.getElementById("todo-form") as HTMLFormElement | null;
  const input = document.getElementById("todo-input") as HTMLInputElement | null;

  if (!form || !input) {
    console.error("Missing form or input element");
    return;
  }

  const todos = loadTodos();
  renderTodos(todos);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();
    if (!text) {
      return;
    }

    const newTodo = createTodo(text);
    todos.push(newTodo);
    saveTodos(todos);
    renderTodos(todos);

    input.value = "";
    input.focus();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupTodoApp();
});
