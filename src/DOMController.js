import Todo from "./todo-item.js";
import TaskManager from "./TaskManager.js";

export default class DOMController {
    constructor(taskManager) {
        this.taskManager = taskManager;
        this.content = document.getElementById("content");
        this.projectTitle = document.getElementById("project-title");
        this.tasksList = document.getElementById("tasks-list");

        this.allBtn = document.getElementById("all-btn");
        this.todayBtn = document.getElementById("today-btn");
        this.weekBtn = document.getElementById("week-btn");

        this.projectButtons = document.getElementById("project-buttons");
        this.newProjectBtn = document.getElementById("new-project-btn");

        this.allBtn.addEventListener("click", () => {
            this.ChangeTitle("All Tasks");
        });

        this.todayBtn.addEventListener("click", () => {
            this.ChangeTitle("Today");
        });

        this.weekBtn.addEventListener("click", () => {
            this.ChangeTitle("This Week");
        });

    }

    ChangeTitle(title) {
        this.projectTitle.textContent = title;
    }

    renderList(list) {
        list.forEach((task, index) => {
            const taskElement = document.createElement("div");
            taskElement.classList.add("task");

            const taskTitle = document.createElement("div");
            taskTitle.classList.add("task-title");
            taskTitle.textContent = task.title;
            taskElement.append(taskTitle);

            const taskDesc = document.createElement("div");
            taskDesc.classList.add("task-desc");
            taskDesc.textContent = task.description;
            taskElement.append(taskDesc);

            const dueDate = document.createElement("div");
            dueDate.classList.add("due-date");
            dueDate.textContent = "Due: " + task.dueDate;
            taskElement.append(dueDate);

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            taskElement.append(editBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            taskElement.append(deleteBtn);

            this.tasksList.append(taskElement);
        });
    }
}