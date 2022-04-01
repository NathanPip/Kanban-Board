import Task from "./components/Task.js";
import {
  updateTaskStorage,
  getTasks,
  getProjects,
  getCurrentProject,
  updateCurrentProject
} from "./utils/storage.js";

//dom elements
const rootElement = document.querySelector(".wrapper");
let TaskLists = document.querySelectorAll(".list");
let ProjectTitle = document.querySelector(".project__title");
let ProjectsList = document.querySelector(".projects__container__list");
let AddProjectButton = document.querySelector(
  ".projects__container__add__new__button"
);
let ProjectModal = document.querySelector(".projects__modal");
let TaskElements;
let ProjectElements;
//board ids
const boards = ["todo", "in__progress", "completed"];
let projects = getProjects();
let currentProject = getCurrentProject() || projects[0];

//task objects
let tasks = getTasks();
let projectMenuTimer;

//add a new task and update local storage
const addNewTask = (board, list) => {
  let newTask = new Task("", board, currentProject.getID);
  tasks.push(newTask);
  updateTaskStorage(tasks);
  list.appendChild(newTask.renderTask());
  updateTaskElements();
};

//remove task element from board and updates data
const removeTask = task => {
  let id = task.dataset.taskID;
  tasks = tasks.filter(task => {
    return task.getTaskID.toString() !== id;
  });
  task.remove();
  updateTaskStorage(tasks);
  updateTaskElements();
};

const getTaskObjectIndex = id => {
  let taskObject = tasks.filter(task => task.getTaskID.toString() === id);
  taskObject = taskObject[0];
  return tasks.indexOf(taskObject);
};

const updateTaskBoard = (board, task) => {
  const taskID = task.dataset.taskID;
  const index = getTaskObjectIndex(taskID);
  tasks[index].setBoard = board;
  updateTaskStorage(tasks);
};

//updates data whenever content of task changes
const editTaskDescEvent = e => {
  const taskDesc = e.parentNode.innerText;
  const taskID = e.parentNode.parentNode.dataset.taskID;
  const index = getTaskObjectIndex(taskID);
  tasks[index].setDesc = taskDesc;
  updateTaskStorage(tasks);
};

function delegateEvent(parent, event, childClassSelector, callback) {
  let currentTarget;
  const listener = e => {
    if (!e.target.classList.contains(childClassSelector)) {
      currentTarget = e.target.closest(childClassSelector);
    } else {
      currentTarget = e.target;
    }
    if (!currentTarget) {
      return;
    }
    const newEvent = {};
    for (const i in e) {
      newEvent[i] = e[i];
    }
    newEvent.innerEvent = e;
    newEvent.currentTarget = currentTarget;
    callback(currentTarget, newEvent);
  };
  parent.addEventListener(event, listener, false);
  return () => {
    parent.removeEventListener(event, listener, false);
  };
}

//event functions for board events

const taskBoardEvents = {
  newTaskClick: function(e) {
    let currentBoard = e.dataset.board;
    let currentList = TaskLists[boards.indexOf(currentBoard)];
    addNewTask(currentBoard, currentList);
  }
};

// all drag event handlers
const taskEvents = {
  dragStart: function(e) {
    e.classList.add("dragging");
  },
  dragEnd: function(e) {
    e.classList.remove("dragging");
  },
  dragOver: function(element, event) {
    const listItem = document.querySelector(".dragging");
    const nextListItem = getListItemAfterDrag(element, event.clientY);
    const board = element.parentNode.dataset.board;
    if (!nextListItem) {
      element.appendChild(listItem);
      updateTaskBoard(board, listItem);
    } else {
      element.insertBefore(listItem, nextListItem);
      updateTaskBoard(board, listItem);
    }
  },
  removeTask: function(e) {
    let task = e.parentNode;
    removeTask(task);
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

const projectsEvents = {
  showProjectsButtonClick: function(e) {
    ProjectsList.classList.toggle("hide");
  },
  projectFocusOut: function(e) {
    projectMenuTimer = setTimeout(() => ProjectsList.classList.add("hide"), 0);
  },
  projectFocusIn: function(e) {
    clearTimeout(projectMenuTimer);
  },
  projectClickEvent: function(e) {
    currentProject = projects.filter(
      project => project.getID === e.dataset.projectId
    )[0];
    updateCurrentProject(currentProject);
    ProjectTitle.innerText = currentProject.getName;
    renderTasks();
    updateEventListeners();
  }
};

//adds event listeners to elements on dom
//called whenever dom is updated with new elements that have events

const updateTaskElements = () => {
  TaskElements = document.querySelectorAll(".list__item");
};

const clearTasks = () => {
  for (let i = 0; i < TaskLists.length; i++) {
    while (TaskLists[i].firstChild) {
      TaskLists[i].firstChild.remove();
    }
  }
};

//initial render of all tasks on page load
const renderTasks = () => {
  clearTasks();
  for (let task in tasks) {
    if (tasks[task].getProjectID === currentProject.getID) {
      console.log(tasks[task]);
      let index = boards.indexOf(tasks[task].getBoard);
      TaskLists[index].appendChild(tasks[task].renderTask());
    }
  }
};
const renderProjects = () => {
  for (let project in projects) {
    ProjectsList.appendChild(projects[project].renderProjectButton());
  }
};

//inital function calls on page load
const init = () => {
  const { newTaskClick } = taskBoardEvents;
  const { projectClickEvent } = projectsEvents;
  const {
    projectFocusIn,
    projectFocusOut,
    showProjectsButtonClick
  } = projectsEvents;
  const { dragStart, dragEnd, removeTask, dragOver } = taskEvents;
  renderTasks();
  renderProjects();
  TaskElements = document.querySelectorAll(".list__item");
  ProjectElements = document.querySelectorAll(
    ".projects__container__list__item"
  );
  ProjectTitle.innerText = currentProject.getName;

  delegateEvent(
    rootElement,
    "focusin",
    ".projects__container__button",
    projectFocusIn
  );
  delegateEvent(
    rootElement,
    "focusout",
    ".projects__container__button",
    projectFocusOut
  );
  delegateEvent(
    rootElement,
    "focusin",
    ".projects__container__list",
    projectFocusIn
  );
  delegateEvent(
    rootElement,
    "focusout",
    ".projects__container__list",
    projectFocusOut
  );
  delegateEvent(rootElement, "click", ".list__new__task__button", newTaskClick);
  delegateEvent(rootElement, "click", ".list__item__delete", removeTask);
  delegateEvent(
    rootElement,
    "click",
    ".projects__container__button",
    showProjectsButtonClick
  );
  delegateEvent(
    rootElement,
    "click",
    ".projects__container__list__item",
    projectClickEvent
  );

  delegateEvent(rootElement, "dragover", ".list", dragOver);
  delegateEvent(rootElement, "dragstart", ".list__item", dragStart);
  delegateEvent(rootElement, "dragend", ".list__item", dragEnd);
  delegateEvent(
    rootElement,
    "DOMCharacterDataModified",
    ".list__item__desc",
    editTaskDescEvent
  );
};

init();
