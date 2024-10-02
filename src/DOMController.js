import Todo from "./todo-item.js";
import TaskManager from "./TaskManager.js";
import { parseISO , format } from 'date-fns';

export default class DOMController {
    constructor(taskManager) {
        this.taskManager = new TaskManager();
        this.CreateNewTask = this.CreateNewTask.bind(this);
        this.CreateNewProject = this.CreateNewProject.bind(this);
        this.renderList = this.renderList.bind(this);
        this.renderProjects = this.renderProjects.bind(this);

        let test = new Todo("test", "test description", new Date(), "Default", "Medium");
        let test2 = new Todo("test2", "test description", new Date(), "Default", "Low");
        let test3 = new Todo("test3", "test description", new Date(), "Default", "High");
        let test4 = new Todo("Finish Todo List", "Finish the todo list for the odin project", new Date(2024, 9, 4), "Coding", "High");

        this.taskManager.addProject("Coding");

        this.taskManager.addTask(test);
        this.taskManager.addTask(test2);
        this.taskManager.addTask(test3);
        this.taskManager.addTask(test4);

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
            this.ShowNewTaskDialog();
        });

        this.renderList(this.taskManager.getListAll());
        this.renderProjects();
    }

    ShowNewTaskDialog() {
        const projectSelector = document.getElementById("new-task-project");
            projectSelector.innerHTML = "";
            document.getElementById("new-task-title").value = "";
            document.getElementById("new-task-desc").value = "";
            this.taskManager.getProjectsList().forEach(project => {
                const projectOption = document.createElement("option");
                projectOption.value = project;
                projectOption.textContent = project;
                if (project==="Default") {
                    //Make default selected
                }

                projectSelector.appendChild(projectOption);
            });
            document.getElementById("task-submit").textContent = "Add Task";
            this.newTaskForm.removeEventListener("submit", this.EditTask);
            this.newTaskForm.addEventListener("submit", this.CreateNewTask);
            this.newTaskDialog.show();
    }

    ShowEditTaskDialog(task) {
        this.ShowNewTaskDialog();
        event.stopPropagation();
        this.taskSubmit.textContent = "Save Changes";
        document.getElementById("new-task-title").value = task.title;
        document.getElementById("new-task-desc").value = task.description;
        document.getElementById("new-task-date").value = format(task.dueDate, 'yyyy-MM-dd')
        document.getElementById("new-task-project").value = task.project;
        document.getElementById("new-task-priority").value = task.priority;
        this.newTaskForm.removeEventListener("submit", this.CreateNewTask);
        this.newTaskForm.addEventListener("submit", (event) => this.EditTask(event, task));
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

            this.renderList(this.taskManager.getListProject(this.currentProject));
        }
    }

    EditTask(event, task) {
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
            this.taskManager.editTask(task, title, desc, dueDate, project, priority, false);
            console.log("Edited task!");
            document.getElementById("new-task-dialog").close();

            this.renderCurrentList(this.currentProject);
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

        this.renderCurrentList(title);
    }

    renderCurrentList(title) {
        switch (title) {
            case "All Tasks":
            case "All": this.renderList(this.taskManager.getListAll()); break;
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
                this.ChangeCurrentProject(project);
            })
            this.projectList.append(projectButton);
        })
    }

    toggleCompleted(task, taskElement) {
        task.toggleCompleted();
        if (task.completed) taskElement.classList.add("completed");
        else taskElement.classList.remove("completed");
    }

    renderList(list) {
        this.tasksList.innerHTML="";
        list.forEach((task, index) => {
            const taskElement = document.createElement("div");
            taskElement.classList.add("task");

            const check = document.createElement("input");
            check.type = "checkbox";
            check.addEventListener("click", () => { 
                this.toggleCompleted(task, taskElement);
            });
            taskElement.append(check);

            taskElement.addEventListener("click", () => {
                this.toggleCompleted(task, taskElement);
                check.checked = task.completed;
            });

            // Title
            const taskTitle = document.createElement("div");
            taskTitle.classList.add("task-title");
            taskTitle.textContent = task.title;
            taskElement.append(taskTitle);

            // Description
            const taskDesc = document.createElement("div");
            taskDesc.classList.add("task-desc");
            taskDesc.textContent = task.description;
            taskElement.append(taskDesc);

            // Priority
            const priority = document.createElement("div");
            priority.classList.add("priority");
            priority.textContent = "Priority: " + task.priority;
            taskElement.append(priority);
            switch (task.priority) {
                case "High": taskElement.classList.add("High"); break;
                case "Medium": taskElement.classList.add("Medium"); break;
            }

            // Due Date
            const dueDate = document.createElement("div");
            dueDate.classList.add("due-date");
            dueDate.textContent = "Due: " + format(task.dueDate, 'yyyy-MM-dd');
            taskElement.append(dueDate);

            // Edit Button
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => {
                this.ShowEditTaskDialog(task);
            });
            taskElement.append(editBtn);

            // Delete Button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                this.taskManager.deleteTask(task);
                this.renderCurrentList(this.currentProject);
            });
            taskElement.append(deleteBtn);

            this.tasksList.append(taskElement);
        });
    }
}