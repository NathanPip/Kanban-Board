import { colorClasses, tasks } from "../data-state";
import { trashElement } from "../dom-state";
import {
  changeTaskColor,
  exitTaskEditing,
  renderTaskEditing,
  updateTaskElements,
  renderTempTask,
  renderTaskDragging,
  updateTempDraggingTask,
  toggleDetails
} from "../dom-handlers";
import {
  removeTask,
  updateTaskDesc,
  updateTaskDetails,
  updateTaskOrder,
  updateTaskUrgency
} from "../data-handlers";
import { getTaskObjectFromElement,  } from "../helpers";
import { updateTaskStorage } from "../storage-helpers";
let mousePosX = undefined;
let mousePosY = undefined;
let startingPos = undefined;

export function dragStart(element) {
  const e = window.event;
  mousePosX = e.clientX;
  mousePosY = e.clientY;
  startingPos = element.getBoundingClientRect();
  renderTaskDragging(element, e);
  renderTempTask(element);
  trashElement.classList.remove("hide");
}

export function dragging(element) {
  updateTempDraggingTask(startingPos, mousePosX, mousePosY);
}

export function dragEnd(element) {
  const tempElement = document.querySelector('.dragging__temp');
  tempElement.remove();
  trashElement.classList.add("hide");
  if (element.classList.contains("dragging")) {
    const taskObject = getTaskObjectFromElement(element);
    if (taskObject.getRemoveStandby) {
      removeTask(element);
      updateTaskElements();
      return;
    }
    console.log(element);
    changeTaskColor(element, element.dataset.color);
    updateTaskOrder();
    updateTaskStorage(tasks);
    element.classList.remove("dragging");
  }
}

export function deleteTask(element) {
  let task = element.parentNode;
  removeTask(task);
  updateTaskElements();
  updateTaskOrder();
}

export function editBtnClickEvent(element) {
  const task = element.parentNode;
  renderTaskEditing(task);
}

export function detailsBtnClickEvent(element) {
  const task = element.parentNode;
  toggleDetails(task);
}

export function exitTaskEditingEvent(element) {
  const task = element.parentNode;
  exitTaskEditing(task);
}

export function editTaskDescEvent(element) {
  const taskDesc = element.innerText;
  const taskID = element.parentNode.dataset.taskID;
  updateTaskDesc(taskDesc, taskID);
}

export function editTaskDetailsEvent(element) {
  const taskDetails = element.innerText;
  const taskID = element.parentNode.dataset.taskID;
  updateTaskDetails(taskDetails, taskID);
}

export function setUrgency(element) {
  const newUrgency = element.dataset.urgency;
  const taskElement = element.parentNode.parentNode;
  const taskObject = getTaskObjectFromElement(taskElement);
  for (let i = 0; i < colorClasses.length; i++) {
    if (taskElement.classList.contains(colorClasses[i])) {
      updateTaskUrgency(newUrgency, taskObject);
      changeTaskColor(taskElement, colorClasses[i]);
    }
  }
}