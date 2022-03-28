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
  let newTask = new Task("", board);
  tasks.push(newTask);
  updateTaskStorage(tasks);
  return newTask;
};

//remove task element from board and updates data
const removeTask = id => {
  console.log(tasks);
  tasks = tasks.filter(task => {
    return task.getTaskID.toString() !== id;
  });
  updateTaskStorage(tasks);
};

//updates data whenever content of task changes
const editTaskDescEvent = e => {
  const taskDesc = e.target.parentNode.innerText;
  const taskID = e.target.parentNode.parentNode.dataset.taskID;
  const taskObject = tasks.filter(task => task.getTaskID.toString() === taskID);
  const taskObjectIndex = tasks.indexOf(taskObject[0]);
  console.log(taskObjectIndex);
  taskObject[0].setDesc = taskDesc;
  tasks[taskObjectIndex] = taskObject[0];
  updateTaskStorage(tasks);
};

const updateTaskBoard = (board, task) => {
  let taskID = task.dataset.taskID;
  let taskObject = tasks.filter(task => task.getTaskID.toString() === taskID);
  let taskObjectIndex = tasks.indexOf(taskObject[0]);
  taskObject[0].setBoard = board;
  tasks[taskObjectIndex] = taskObject[0];
  updateTaskStorage(tasks);
};

//event functions for board events
const taskBoardClickEvents = e => {
  let element = e.target;
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
    removeTask(taskID);
    task.remove();
  }
};

// all drag event handlers
const taskDragEvents = {
  dragStart: e => {
    e.target.classList.add("dragging");
  },
  dragEnd: e => {
    e.target.classList.remove("dragging");
  },
  dragOver: (e, list) => {
    e.preventDefault();
    const listItem = document.querySelector(".dragging");
    const nextListItem = getListItemAfterDrag(list, e.clientY);
    if (!nextListItem) {
      const board = list.parentNode.dataset.board;
      console.log(board);
      list.appendChild(listItem);
      updateTaskBoard(board, listItem)
    } else {
      list.insertBefore(listItem, nextListItem);
    }
  }
};

const getListItemAfterDrag = (container, mouseY) => {
  const listItems = [
    ...container.querySelectorAll(".list__item:not(.dragging)")
  ];

  return listItems.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const boxOffset = mouseY - (box.top + box.height / 2);
      if (boxOffset < 0 && boxOffset > closest.offset) {
        return { offset: boxOffset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};

//adds event listeners to elements on dom
//called whenever dom is updated with new elements that have events
const updateEventListeners = () => {
  const { dragStart, dragEnd, dragOver } = taskDragEvents;
  for (let i = 0; i < TaskBoards.length; i++) {
    TaskBoards[i].addEventListener("click", taskBoardClickEvents);
  }

  for (let i = 0; i < TaskLists.length; i++) {
    TaskLists[i].addEventListener("dragover", e => dragOver(e, TaskLists[i]));
  }

  for (let i = 0; i < taskElements.length; i++) {
    taskElements[i].addEventListener("DOMCharacterDataModified", editTaskDescEvent);
    taskElements[i].addEventListener("dragstart", dragStart);
    taskElements[i].addEventListener("dragend", dragEnd);
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
