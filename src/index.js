import Task from "./components/Task.js";
import {
  updateTaskStorage,
  getTasks,
  getProjects,
  getCurrentProject,
  updateCurrentProject
} from "./utils/storage.js";

//dom elements
let TaskBoards = document.querySelectorAll(".list__container");
let TaskLists = document.querySelectorAll(".list");
let ProjectTitle = document.querySelector(".project__title");
let ProjectsButton = document.querySelector(".projects__container__button");
let ProjectsList = document.querySelector(".projects__container__list");
let ProjectElements;
let TaskElements;
//board ids
const boards = ["todo", "in__progress", "completed"];
let projects = getProjects();
let currentProject = getCurrentProject() || projects[0];

//task objects
let tasks = getTasks();
let projectMenuTimer;

//add a new task and update local storage
const addNewTask = board => {
  let newTask = new Task("", board, currentProject.getID);
  tasks.push(newTask);
  updateTaskStorage(tasks);
  return newTask;
};

//remove task element from board and updates data
const removeTask = id => {
  tasks = tasks.filter(task => {
    return task.getTaskID.toString() !== id;
  });
  updateTaskStorage(tasks);
};

const getTaskObjectIndex = (id) => {
  let taskObject = tasks.filter(task => task.getTaskID.toString() === id);
  taskObject = taskObject[0];
  return tasks.indexOf(taskObject);
}

const updateTaskBoard = (board, task) => {
  const taskID = task.dataset.taskID;
  const index = getTaskObjectIndex(taskID);
  tasks[index].setBoard = board;
  updateTaskStorage(tasks);
};

//updates data whenever content of task changes
const editTaskDescEvent = e => {
  const taskDesc = e.target.parentNode.innerText;
  const taskID = e.target.parentNode.parentNode.dataset.taskID;
  const index = getTaskObjectIndex(taskID);
  tasks[index].setDesc = taskDesc;
  updateTaskStorage(tasks);
};

//event functions for board events
const taskBoardClickEvents = e => {
  let element = e.target;
  let currentBoard = element.dataset.board;
  //calls addNewTask and adds new task element to dom
  if (element.dataset.newTaskBtn) {
    let currentList = TaskLists[boards.indexOf(currentBoard)];
    let newTask = addNewTask(currentBoard);
    currentList.appendChild(newTask.renderTask());
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
    const board = list.parentNode.dataset.board;
    if (!nextListItem) {
      console.log(board);
      list.appendChild(listItem);
      updateTaskBoard(board, listItem);
    } else {
      list.insertBefore(listItem, nextListItem);
      updateTaskBoard(board, listItem);
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

const projectsEvents = {
  showProjectsButtonClick: e => {
    ProjectsList.classList.toggle("hide");
  },
  projectFocusOut: e => {
    projectMenuTimer = setTimeout(() => ProjectsList.classList.add("hide"), 0);
  },
  projectFocusIn: e => {
    clearTimeout(projectMenuTimer);
  },
  projectClickEvent: e => {
    console.log(e.target);
    currentProject = projects.filter(
      project => project.getID === e.target.dataset.projectId
    )[0];
    updateCurrentProject(currentProject);
    console.log(currentProject);
    renderTasks();
    updateEventListeners();
  }
};

//adds event listeners to elements on dom
//called whenever dom is updated with new elements that have events
const updateEventListeners = () => {
  const { dragStart, dragEnd, dragOver } = taskDragEvents;
  const { projectClickEvent } = projectsEvents;
  TaskElements = document.querySelectorAll(".list__item");
  ProjectElements = document.querySelectorAll(
    ".projects__container__list__item"
  );
  ProjectTitle.innerText = currentProject.getName;
  for (let i = 0; i < TaskBoards.length; i++) {
    TaskBoards[i].addEventListener("click", taskBoardClickEvents);
  }

  for (let i = 0; i < TaskLists.length; i++) {
    TaskLists[i].addEventListener("dragover", e => dragOver(e, TaskLists[i]));
  }

  for (let i = 0; i < TaskElements.length; i++) {
    TaskElements[i].addEventListener(
      "DOMCharacterDataModified",
      editTaskDescEvent
    );
    TaskElements[i].addEventListener("dragstart", dragStart);
    TaskElements[i].addEventListener("dragend", dragEnd);
  }

  for (let i = 0; i < ProjectElements.length; i++) {
    ProjectElements[i].addEventListener("click", projectClickEvent);
  }

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
  const {
    projectFocusIn,
    projectFocusOut,
    showProjectsButtonClick
  } = projectsEvents;
  renderTasks();
  renderProjects();
  TaskElements = document.querySelectorAll(".list__item");
  ProjectElements = document.querySelectorAll(
    ".projects__container__list__item"
  );
  ProjectTitle.innerText = currentProject.getName;
  ProjectsButton.addEventListener("click", showProjectsButtonClick);
  ProjectsButton.addEventListener("focusin", projectFocusIn);
  ProjectsButton.addEventListener("focusout", projectFocusOut);
  ProjectsList.addEventListener("focusin", projectFocusIn);
  ProjectsList.addEventListener("focusout", projectFocusOut);
  // ProjectTitle.addEventListener("DOMCharacterDataModified", () =>
  //   localStorage.setItem("projectTitle", ProjectTitle.innerText)
  // );
  updateEventListeners();
};

init();
