import Task from "./components/Task.js";
import { updateTaskStorage, getTasks } from "./utils/storage.js";

//dom elements
let TaskBoards = document.querySelectorAll(".list__container");
let TaskLists = document.querySelectorAll(".list");
let taskElements;
//board ids
const boards = ["todo", "in__progress", "completed"];
//task objects
let tasks = getTasks();

//add a new task and update local storage
const addNewTask = board => {
  let newTask = new Task("enter task", board);
  tasks.push(newTask);
  updateTaskStorage(tasks);
  console.log(taskElements);
  return newTask;
};

//remove task element from board and updates data
const removeTask = id => {
  console.log(tasks);
  tasks = tasks.filter(task => {
    console.log("taskID: " + task.getTaskID);
    console.log("localTaskID: " + id);
    return task.getTaskID.toString() !== id;
  });
  console.log(tasks);
  updateTaskStorage(tasks);
};

//updates data whenever content of task changes
const editTaskEvent = e => {
  const taskDesc = e.target.parentNode.innerText;
  const taskID = e.target.parentNode.parentNode.dataset.taskID;
  const taskObject = tasks.filter(task => task.getTaskID.toString() === taskID);
  console.log(taskObject[0]);
  const taskObjectIndex = tasks.indexOf(taskObject[0]);
  console.log(taskObjectIndex);
  taskObject[0].setDesc = taskDesc;
  tasks[taskObjectIndex] = taskObject[0];
  updateTaskStorage(tasks);
};

//event functions for board events
const taskBoardEvents = e => {
  e.stopPropagation();
  let element = e.target;
  console.log(e.target.dataset);
  //calls addNewTask and adds new task element to dom
  if (element.dataset.newTaskBtn) {
    let currentBoard = element.parentNode.dataset.board;
    let currentList = TaskLists[boards.indexOf(currentBoard)];
    let newTask = addNewTask(currentBoard);
    currentList.appendChild(newTask.renderTask());
    taskElements = document.querySelectorAll(".list__item");
    updateEventListeners();
  }
  //deletes task from dom and calls removeTask
  if (element.dataset.deleteBtn) {
    let task = element.parentNode;
    let taskID = task.dataset.taskID;
    console.log(element);
    removeTask(taskID);
    task.remove();
  }
};

//adds event listeners to elements on dom
//called whenever dom is updated with new elements that have events
const updateEventListeners = () => {
  for (let i = 0; i < TaskBoards.length; i++) {
    TaskBoards[i].addEventListener("click", taskBoardEvents);
  }
  for (let i = 0; i < taskElements.length; i++) {
    taskElements[i].addEventListener("DOMCharacterDataModified", editTaskEvent);
  }
};

//initial render of all tasks on page load
const renderTasks = () => {
  for (let task in tasks) {
    console.log(tasks[task].getBoard);
    let index = boards.indexOf(tasks[task].getBoard);
    TaskLists[index].appendChild(tasks[task].renderTask());
  }
};

//inital function calls on page load
const init = () => {
  renderTasks();
  taskElements = document.querySelectorAll(".list__item");
  updateEventListeners();
};

init();