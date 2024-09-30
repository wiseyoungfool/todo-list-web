export default class Todo {
    constructor(title, description, dueDate, project="Default", priority, completed=false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.completed = completed;
    }

    changePriority(newPriority) {
        this.priority = newPriority;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }

    editTodo(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}