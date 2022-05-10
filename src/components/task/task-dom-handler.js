import {
  animateElement,
  getListItemAfterDrag,
  insertAfter,
} from "../../helpers";
import { setTaskElements, TaskListsElements } from ".";
import { currentProject } from "../Project";
import { boards } from "../../global";
import { tasks, getTaskObjectFromElement } from "./task-data-state";
import { clickedOutside } from "../../global/general-event-handler";

export const updateTaskElements = () => {
  setTaskElements(document.querySelectorAll(".list__item"));
};

export const clearTasks = () => {
  for (let i = 0; i < TaskListsElements.length; i++) {
    while (TaskListsElements[i].firstChild) {
      TaskListsElements[i].firstChild.remove();
    }
  }
};

export const renderTasks = () => {
  clearTasks();
  for (let board of boards) {
    let taskList = [];
    for (let task of tasks) {
      if (
        currentProject &&
        task.getProjectID === currentProject.getID &&
        task.getBoard === board
      ) {
        taskList.push(task);
      }
    }
    taskList.sort((a, b) => (a.order > b.order ? 1 : -1));
    for (let task of taskList) {
      let index = boards.indexOf(task.getBoard);
      let taskElement = task.renderTask();
      TaskListsElements[index].appendChild(taskElement);
      animateElement(taskElement, "fadein", 500);
    }
  }
};

export const insertTask = (element, listItem) => {
  const nextListItem = getListItemAfterDrag(element, event.clientY);
  if (!nextListItem) {
    element.appendChild(listItem);
  } else {
    element.insertBefore(listItem, nextListItem);
  }
};

export const changeTaskColor = (task, oldColor) => {
  const taskObject = getTaskObjectFromElement(task);
  const currentColorButton = task.querySelector(
    `.list__item__color__btn.${oldColor}`
  );
  const newCurrentColorButton = task.querySelector(
    `.list__item__color__btn.${taskObject.getColor}`
  );
  currentColorButton
    ? currentColorButton.classList.remove("current__task__color")
    : null;
  newCurrentColorButton
    ? newCurrentColorButton.classList.add("current__task__color")
    : null;
  task.classList.remove(oldColor);
  task.classList.add(taskObject.getColor);
  task.dataset.color = taskObject.getColor;
};

export const renderTaskDragging = (task, e) => {
  task.classList.add("dragging");
  e.dataTransfer.setDragImage(task, window.outerWidth, window.outerHeight);
};

export const updateTempDraggingTask = (
  elementStartingPos,
  startingX,
  startingY
) => {
  const tempElement = document.querySelector(".dragging__temp");
  if (tempElement) {
    let e = window.event;
    let offsetX = e.clientX - startingX;
    let offsetY = e.clientY - startingY;
    tempElement.style.top = `${elementStartingPos.top + offsetY + scrollY}px`;
    tempElement.style.left = `${elementStartingPos.left + offsetX}px`;
  }
};

export const renderTempTask = (task) => {
  const taskObj = getTaskObjectFromElement(task);
  const taskBoundingBox = task.getBoundingClientRect();
  const element = taskObj.renderTask();
  element.classList.add("dragging__temp");
  element.style.top = `${taskBoundingBox.top}px`;
  element.style.left = `${taskBoundingBox.left}px`;
  element.style.width = `${taskBoundingBox.right - taskBoundingBox.left}px`;
  insertAfter(element, task);
};

export const exitTaskEditing = (task) => {
  const editBtn = task.querySelector(".list__item__edit");
  const deleteBtn = task.querySelector(".list__item__delete");
  const taskInput = task.querySelector(".list__item__desc");
  const taskDetails = task.querySelector(".list__item__details");
  const taskDetailsButton = task.querySelector(".list__item__btn__details");
  const buttonGroup = task.querySelector(".list__item__color__container");
  task.setAttribute("draggable", true);
  taskInput.contentEditable = false;
  taskDetails.contentEditable = false;
  taskDetailsButton.innerText = "Details";
  deleteBtn.classList.add("hide");
  buttonGroup.classList.add("hide");
  taskDetails.classList.add("hide");
  taskDetailsButton.classList.remove("hide");
  editBtn.classList.remove("hide");
};

export const renderTaskEditing = (task) => {
  const editBtn = task.querySelector(".list__item__edit");
  const deleteBtn = task.querySelector(".list__item__delete");
  const taskInput = task.querySelector(".list__item__desc");
  const taskDetails = task.querySelector(".list__item__details");
  const taskDetailsButton = task.querySelector(".list__item__btn__details");
  const taskButtonGroup = task.querySelector(".list__item__color__container");
  const taskInputText = taskInput.innerText;
  let range = document.createRange();
  let sel = window.getSelection();
  taskInput.contentEditable = true;
  taskDetails.contentEditable = true;
  deleteBtn.classList.remove("hide");
  taskButtonGroup.classList.remove("hide");
  taskDetails.classList.remove("hide");
  editBtn.classList.add("hide");
  taskDetailsButton.classList.add("hide");
  document.addEventListener("click", (e) =>
    clickedOutside(e, task, exitTaskEditing)
  );
  task.setAttribute("draggable", false);
  taskInput.click();
  if (taskInputText.length > 0) {
    range.setStart(taskInput.childNodes[0], taskInputText.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
  task.firstChild.focus();
};

export const toggleDetails = (task) => {
  const details = task.querySelector(".list__item__details");
  const detailsButton = task.querySelector(".list__item__btn__details");
  if (details.classList.contains("hide")) {
    details.classList.remove("hide");
    detailsButton.innerText = "Collapse";
  } else {
    details.classList.add("hide");
    detailsButton.innerText = "Details";
  }
};
