export default class TaskManager {
    constructor() {
        this.todoList = [];
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
        task = new Todo(title, description, dueDate, project, priority, completed);
        this.addTask(task);
        console.log("Task Added!");
    }
}