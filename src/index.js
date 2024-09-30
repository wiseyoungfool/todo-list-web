import "./styles.css";
import Todo from "./todo-item.js";
import DOMController from "./DOMController.js";


const DOM = new DOMController();
let test = new Todo("test", "test description", "10/5", "Default", 0);
test.changePriority(1);

console.log(test);