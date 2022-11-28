 const todoForm = document.getElementById("todo-form");
const priorityForm = document.getElementById("priority-form");
const todoList = document.getElementById("todo-list");

let todoItems = JSON.parse(localStorage.getItem("todo"));
if (!todoItems) todoItems = [];
renderTodos(todoItems);

let currentFilter = "all";

priorityForm.addEventListener("change", (e) => {
    currentFilter = e.target.value;

    let todos = todoItems;
    if (currentFilter === "medium") {
        todos = todos.filter((todo) => todo.priority === "medium");
    } else if (currentFilter === "high") {
        todos = todos.filter((todo) => todo.priority === "high");
    } else if (currentFilter === "low") {
        todos = todos.filter((todo) => todo.priority === "low");
    }

    renderTodos(todos);
});

// Adding a todo
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const priority = e.target.priority.value;
    const title = e.target.todo.value;

    todoItems.push({
        priority,
        title,
        checked: false,
        id: Date.now()
    });

    localStorage.setItem("todo", JSON.stringify(todoItems));
    renderTodos(todoItems);
});

// Set Checked a Todo
todoList.addEventListener("click", (event) => {
    const todoItem = event.target;
    const todoId = todoItem.id;
    todoItem.classList.toggle("checked");



    todoItems.forEach((todo) => {
    if (todo.id === Number(todoId)) {
        todo.checked = !todo.checked;
    }
    });
    localStorage.setItem("todo", JSON.stringify(todoItems));
});

function renderTodos(todos) {
    todoList.innerHTML = "";
    if (!todos) return;

    todos.map(
        (todo) =>
        (todoList.innerHTML += `
        <div id="${todo.id}" class="todo ${todo.checked ? "checked" : ""} ${
            todo.priority
        }">${todo.title} 
        <button class = "Delete">Delete</button> </div> 
        `)
    );
}

todoList.addEventListener("click",(e)=>{
    if(e.target.classList.contains("Delete")){
        let targetDiv = e.target.parentNode;
        targetDiv.remove();
        todoItems.splice(e.target.parentNode,1);
        localStorage.setItem("todo",JSON.stringify(todoItems));
    }
})

function clearAll(){
    localStorage.clear;
    renderTodos();
    todoItems = [];
    localStorage.setItem("todo", JSON.stringify(todoItems));
}




