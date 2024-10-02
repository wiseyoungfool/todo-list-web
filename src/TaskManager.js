import Todo from "./todo-item.js";
import { isToday, startOfDay, isWithinInterval, addDays } from "date-fns";

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

    getListProject(projectName) {
        return this.todoList.filter(todo => todo.project === projectName);
    }

    getListToday() {
        return this.todoList.filter(todo => isToday(todo.dueDate));
    }

    getListThisWeek() {
        const now = new Date();
        const today = startOfDay(now);
        const endOfNext7Days = addDays(today, 7);
    
        return this.todoList.filter(todo => 
            isWithinInterval(todo.dueDate, { start: today, end: endOfNext7Days })
        );
    }

    deleteTask(task) {
        this.todoList.pop(task);
    }

    createTask(title, description, dueDate, project="Default", priority, completed=false) {
        const task = new Todo(title, description, dueDate, project, priority, completed);
        this.addTask(task);
        console.log("Task Added!");
    }

    editTask(task, title, description, dueDate, project="Default", priority, completed=false) {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.project = project;
        task.priority = priority;
        console.log("Task has been changed!");
    }
}