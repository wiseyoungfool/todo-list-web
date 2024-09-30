export default class TaskManager {
    constructor() {
        this.todoList = [];
    }

    addTask(task) {
        this.todoList.push(task);
    }

    getList() {
        return this.todoList;
    }
}