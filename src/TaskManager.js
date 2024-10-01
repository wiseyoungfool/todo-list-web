import Todo from "./todo-item.js";

export default class TaskManager {
    constructor() {
        this.todoList = [];
        this.projects = []

        this.projects.push("Default");
    }

    addProject(project) {
        this.projects.push(project);
    }

    getProjectsList() {
        return this.projects;
    }

    addTask(task) {
        this.todoList.push(task);
    }

    getListAll() {
        return this.todoList;
    }

    getListProject(project) {
        return this.todoList.filter()
    }

    deleteTask(task) {
        this.todoList.pop(task);
    }

    createTask(title, description, dueDate, project="Default", priority, completed=false) {
        const task = new Todo(title, description, dueDate, project, priority, completed);
        this.addTask(task);
        console.log("Task Added!");
    }
}