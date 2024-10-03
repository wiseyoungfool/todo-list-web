import Todo from "./todo-item.js";
import { isToday, startOfDay, isWithinInterval, addDays } from "date-fns";

export default class TaskManager {
    constructor() {
        try {
            const savedTodoList = localStorage.getItem("todoList");
            const savedProjects = localStorage.getItem("projects");

            if (savedTodoList !== null && savedProjects !== null) {
                // Parse the JSON strings back into arrays
                const todoData = JSON.parse(savedTodoList);
                this.projects = JSON.parse(savedProjects);
                
                // Reconstruct Todo objects from plain objects
                this.todoList = todoData.map(task => {
                    return new Todo(
                        task.title,
                        task.description,
                        new Date(task.dueDate),
                        task.project,
                        task.priority,
                        task.completed
                    );
                });
            } else {
                this.initializeDefaultData();
            }
        } catch (error) {
            console.error("Error loading from localStorage:", error);
            this.initializeDefaultData();
        }
    }

    initializeDefaultData() {
        this.todoList = [];
        this.projects = [];

        this.addProject("Default");

        let test = new Todo("test", "test description", new Date(), "Default", "Medium");
        let test2 = new Todo("test2", "test description", new Date(), "Default", "Low");
        let test3 = new Todo("test3", "test description", new Date(), "Default", "High");
        let test4 = new Todo("Finish Todo List", "Finish the todo list for the odin project", new Date(2024, 9, 4), "Coding", "High");

        this.addProject("Coding");

        this.addTask(test);
        this.addTask(test2);
        this.addTask(test3);
        this.addTask(test4);
    }

    addProject(project) {
        this.projects.push(project);
        this.saveToLocalStorage();
    }

    getProjectsList() {
        return this.projects;
    }

    addTask(task) {
        this.todoList.push(task);
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem("todoList", JSON.stringify(this.todoList));
            localStorage.setItem("projects", JSON.stringify(this.projects));
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
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
        this.todoList = this.todoList.filter(t => t !== task);
        this.saveToLocalStorage();
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
        task.completed = completed;
        this.saveToLocalStorage();
        console.log("Task has been changed!");
    }
}