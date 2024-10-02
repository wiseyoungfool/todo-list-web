import Todo from "./todo-item.js";
import TaskManager from "./TaskManager.js";
import { parseISO } from 'date-fns';

export default class DOMController {
    constructor(taskManager) {
        this.taskManager = new TaskManager();
        this.CreateNewTask = this.CreateNewTask.bind(this);
        this.CreateNewProject = this.CreateNewProject.bind(this);
        this.renderList = this.renderList.bind(this);
        this.renderProjects = this.renderProjects.bind(this);

        let test = new Todo("test", "test description", new Date(), "Default", 0);
        let test2 = new Todo("test2", "test description", new Date(), "Default", 0);
        let test3 = new Todo("test3", "test description", new Date(), "Default", 0);

        this.taskManager.addTask(test);
        this.taskManager.addTask(test2);
        this.taskManager.addTask(test3);

        test.changePriority(1);

        this.currentProject = "All";
        this.content = document.getElementById("content");
        this.projectTitle = document.getElementById("project-title");
        this.tasksList = document.getElementById("tasks-list");

        this.allBtn = document.getElementById("all-btn");
        this.todayBtn = document.getElementById("today-btn");
        this.weekBtn = document.getElementById("week-btn");

        this.projectList = document.getElementById("project-list");
        this.newProjectBtn = document.getElementById("new-project-btn");
        this.newTaskBtn = document.getElementById("new-task-btn");

        this.newProjectDialog = document.getElementById("new-project-dialog");
        this.newTaskDialog = document.getElementById("new-task-dialog");

        this.projectCancelButton = document.getElementById("project-cancel-button");
        this.taskCancelButton = document.getElementById("task-cancel-button");

        this.projectSubmit = document.getElementById("project-submit");
        this.taskSubmit = document.getElementById("task-submit");

        this.newProjectForm = document.getElementById("new-project-form");
        this.newTaskForm = document.getElementById("new-task-form");

        this.projectCancelButton.addEventListener("click", () => {
            this.newProjectDialog.close();
        })
        this.taskCancelButton.addEventListener("click", () => {
            this.newTaskDialog.close();
        })

        this.newProjectForm.addEventListener("submit", this.CreateNewProject);
        this.newTaskForm.addEventListener("submit", this.CreateNewTask);

        this.allBtn.addEventListener("click", () => {
            this.ChangeCurrentProject("All Tasks");
        });

        this.todayBtn.addEventListener("click", () => {
            this.ChangeCurrentProject("Today");
        });

        this.weekBtn.addEventListener("click", () => {
            this.ChangeCurrentProject("This Week");
        });

        this.newProjectBtn.addEventListener("click", () => {
            this.newProjectDialog.show();
        });

        this.newTaskBtn.addEventListener("click", () => {
            const projectSelector = document.getElementById("new-task-project");
            projectSelector.innerHTML = "";
            this.taskManager.getProjectsList().forEach(project => {
                const projectOption = document.createElement("option");
                projectOption.value = project;
                projectOption.textContent = project;
                if (project==="Default") {
                    //Make default selected
                }

                projectSelector.appendChild(projectOption);
            });
            this.newTaskDialog.show();
        });

        this.renderList(this.taskManager.getListAll());
        this.renderProjects();
    }

    CreateNewTask(event) {
        if (document.querySelector("#new-task-form").checkValidity()) {
            event.preventDefault();
            const title = document.getElementById("new-task-title").value;
            document.getElementById("new-task-title").value = "";
            const desc = document.getElementById("new-task-desc").value;
            document.getElementById("new-task-desc").value = "";
            const dueDateStr = document.getElementById("new-task-date").value;
            document.getElementById("new-task-date").value = "";
            const priority = document.getElementById("new-task-priority").value;
            document.getElementById("new-task-priority").value = "";
            const project = document.getElementById("new-task-project").value;

            const dueDate = parseISO(dueDateStr);
            this.taskManager.createTask(title, desc, dueDate, project, priority, false);
            console.log("Created new task!");
            document.getElementById("new-task-dialog").close();

            this.renderList(this.taskManager.getListAll());
        }
    }

    CreateNewProject(event) {
        if (document.querySelector("#new-project-form").checkValidity()) {
            event.preventDefault();
            const title = document.getElementById("new-project-title").value;
            document.getElementById("new-project-title").value = "";
            this.taskManager.addProject(title);
            console.log(`Created new project: ${title}`);
            document.getElementById("new-project-dialog").close();

            this.renderProjects();
        }
    }

    ChangeCurrentProject(title) {
        this.currentProject = title;
        this.projectTitle.textContent = title;

        switch (title) {
            case "All Tasks": this.renderList(this.taskManager.getListAll()); break;
            case "Today": this.renderList(this.taskManager.getListToday()); break;
            case "This Week": this.renderList(this.taskManager.getListThisWeek()); break;
            default: this.renderList(this.taskManager.getListProject(title)); break;
        }
    }

    renderProjects() {
        this.projectList.innerHTML = "";
        const projects = this.taskManager.getProjectsList();

        projects.forEach(project => {
            const projectButton = document.createElement("button");
            projectButton.textContent = project;

            projectButton.addEventListener("click", () => {
                this.renderList(this.taskManager.getListProject(project));
            })
            this.projectList.append(projectButton);
        })
    }

    renderList(list) {
        this.tasksList.innerHTML="";
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
                this.taskManager.deleteTask(task);
                this.renderList(this.taskManager.getListAll());
            });
            taskElement.append(deleteBtn);

            this.tasksList.append(taskElement);
        });
    }
}