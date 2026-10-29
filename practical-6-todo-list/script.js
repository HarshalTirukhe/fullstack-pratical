// Get HTML elements

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearCompletedBtn = document.getElementById("clearCompleted");


// Get tasks from localStorage

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Display tasks when page loads

displayTasks();


// Add task when button is clicked

addBtn.addEventListener("click", addTask);


// Add task when Enter key is pressed

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Function to add task

function addTask() {

    const taskText = taskInput.value.trim();

    // Don't add empty task

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }


    // Create task object

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };


    // Add task to array

    tasks.push(task);


    // Save tasks

    saveTasks();


    // Display tasks

    displayTasks();


    // Clear input

    taskInput.value = "";

    taskInput.focus();
}


// Function to display tasks

function displayTasks() {

    // Clear existing list

    taskList.innerHTML = "";


    // Show empty message

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <li class="empty-message">
                No tasks yet. Add your first task!
            </li>
        `;

        updateTaskCount();

        return;
    }


    // Create each task

    tasks.forEach(function(task) {

        const li = document.createElement("li");

        li.className = "task";


        // Add completed class

        if (task.completed) {
            li.classList.add("completed");
        }


        li.innerHTML = `

            <div class="task-left">

                <input 
                    type="checkbox"
                    class="task-checkbox"
                    ${task.completed ? "checked" : ""}
                >

                <span class="task-text">
                    ${task.text}
                </span>

            </div>

            <button class="delete-btn">
                Delete
            </button>

        `;


        // Checkbox

        const checkbox = li.querySelector(".task-checkbox");

        checkbox.addEventListener("change", function() {

            toggleTask(task.id);

        });


        // Delete button

        const deleteBtn = li.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", function() {

            deleteTask(task.id);

        });


        // Add task to list

        taskList.appendChild(li);

    });


    updateTaskCount();
}


// Mark task completed/uncompleted

function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };

        }

        return task;

    });


    saveTasks();

    displayTasks();
}


// Delete task

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });


    saveTasks();

    displayTasks();
}


// Clear all completed tasks

clearCompletedBtn.addEventListener("click", function() {

    tasks = tasks.filter(function(task) {

        return !task.completed;

    });


    saveTasks();

    displayTasks();

});


// Update task counter

function updateTaskCount() {

    const remainingTasks = tasks.filter(function(task) {

        return !task.completed;

    }).length;


    if (remainingTasks === 1) {

        taskCount.textContent = "1 task remaining";

    } else {

        taskCount.textContent =
            remainingTasks + " tasks remaining";

    }
}


// Save tasks to localStorage

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}