// HTML elements ko pakro
const todoInput = document.getElementById("todo-Input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Page load hote hi purane tasks load karo
document.addEventListener("DOMContentLoaded", loadTasks);

// Button click pe addTodo function chalao
addBtn.addEventListener("click", addTodo);

// Enter key se bhi add ho jaye
todoInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTodo();
    }
});

function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText === "") {
        alert("Pehle koi task likho!");
        return;
    }

    // Task ko screen pe dikhao
    createTodoElement(todoText);
    
    // Task ko localStorage mein save karo
    saveToLocalStorage(todoText);
    
    todoInput.value = "";
}

// Task ko HTML mein banane ka function
function createTodoElement(todoText) {
    const li = document.createElement("li");
    li.textContent = todoText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function() {
        li.remove();
        removeFromLocalStorage(todoText); // Storage se bhi delete karo
    });

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

// localStorage mein save karne ka function
function saveToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Page load pe localStorage se tasks load karo
function loadTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task) {
        createTodoElement(task);
    });
}

// localStorage se delete karne ka function
function removeFromLocalStorage(taskToDelete) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks = tasks.filter(task => task !== taskToDelete);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}