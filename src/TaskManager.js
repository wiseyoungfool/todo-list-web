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
}