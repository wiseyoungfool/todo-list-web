export default class Todo {
    constructor(title, description, dueDate, project, priority, completed = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.project = project;
        this.priority = priority;
        this.completed = completed;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }

    // Method to convert Todo to a plain object for storage
    toJSON() {
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate.toISOString(), // Convert Date to string
            project: this.project,
            priority: this.priority,
            completed: this.completed
        };
    }
}