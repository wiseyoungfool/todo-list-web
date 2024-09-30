export default class DOMController {
    constructor() {
        this.content = document.getElementById("content");
        this.projectTitle = document.getElementById("project-title");
        this.tasksList = document.getElementById("tasks-list");

        this.allBtn = document.getElementById("all-btn");
        this.todayBtn = document.getElementById("today-btn");
        this.weekBtn = document.getElementById("week-btn");

        this.projectButtons = document.getElementById("project-buttons");
        this.newProjectBtn = document.getElementById("new-project-btn");

        this.allBtn.addEventListener("click", () => {
            this.ChangeTitle("All Tasks");
        });

        this.todayBtn.addEventListener("click", () => {
            this.ChangeTitle("Today");
        });

        this.weekBtn.addEventListener("click", () => {
            this.ChangeTitle("This Week");
        });

    }

    ChangeTitle(title) {
        this.projectTitle.textContent = title;
    }
}