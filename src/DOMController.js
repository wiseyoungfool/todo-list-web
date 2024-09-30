import Todo from "./todo-item.js";
import TaskManager from "./TaskManager.js";

export default class DOMController {
    constructor(taskManager) {
        this.taskManager = new TaskManager();

        let test = new Todo("test", "test description", "10/5", "Default", 0);
        let test2 = new Todo("test2", "test description", "10/5", "Default", 0);
        let test3 = new Todo("test3", "test description", "10/5", "Default", 0);

        this.taskManager.addTask(test);
        this.taskManager.addTask(test2);
        this.taskManager.addTask(test3);

        test.changePriority(1);

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

        this.renderList(this.taskManager.getListAll());
    }

    ChangeTitle(title) {
        this.projectTitle.textContent = title;
    }

    renderList(list) {
        list.forEach((task, index) => {
            const taskElement = document.createElement("div");
            taskElement.classList.add("task");

            const check = document.createElement("input");
            check.type = "checkbox";
            check.addEventListener("click", () => { 
                task.toggleCompleted();
                if (task.completed) taskElement.classList.add("completed");
                else taskElement.classList.remove("completed");
            });
            taskElement.append(check);

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
            deleteBtn.addEventListener("click", () => {
                
            });
            taskElement.append(deleteBtn);

            this.tasksList.append(taskElement);
        });
    }
}