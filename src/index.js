import "./styles.css";
import DOMController from "./DOMController.js";
import TaskManager from "./TaskManager.js";
import Todo from "./todo-item.js";


const taskManager = new TaskManager();
const DOM = new DOMController(taskManager);

let test = new Todo("test", "test description", "10/5", "Default", 0);
let test2 = new Todo("test2", "test description", "10/5", "Default", 0);
let test3 = new Todo("test3", "test description", "10/5", "Default", 0);

taskManager.addTask(test);
taskManager.addTask(test2);
taskManager.addTask(test3);

test.changePriority(1);
console.log(taskManager.getList());
DOM.renderList(taskManager.getList());