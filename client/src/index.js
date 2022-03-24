import Task from "./components/Task.js";
import { getLocalStorage, setTasks } from "./utils/storage.js";

// const TaskBoards = document.querySelectorAll(".list__container");
const TaskLists = document.querySelectorAll(".list");
const boards = ['todo', 'in__progress', 'completed'];
// let projects = getLocalStorage("projects", { name: "first-project", id: 0 });
let tasks = setTasks();

//task - desc, projID, boardID
//get localStorage Projects and tasks - if none - set localStorage Projects and Tasks

const renderTasks = () => {
    for(let task in tasks) {
       let index = boards.indexOf(tasks[task].board);
       TaskLists[index].appendChild(tasks[task].renderTask());
    }
}

renderTasks();