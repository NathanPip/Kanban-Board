import { TaskListsElements, setTaskElements, rootElement } from "../dom-state";
import { boards, currentProject, tasks } from "../data-state";
import {
  animateElement,
  getListItemAfterDrag,
  getTaskObjectFromElement,
  insertAfter,
} from "../helpers";
import { clickedOutside } from "../event-handlers";

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
        task.getProjectID === currentProject.getID &&
        task.getBoard === board
      ) {
        taskList.push(task);
      }
    }
    taskList.sort((a, b) => (a.order > b.order ? 1 : -1));
    for (let task of taskList) {
      let index = boards.indexOf(task.getBoard);
      let taskElement = task.renderTask()
      TaskListsElements[index].appendChild(taskElement);
      animateElement(taskElement, 'fadein', 500)
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

export const changeTaskColor = (task, newColor) => {
  const taskObject = getTaskObjectFromElement(task);
  const currentColorButton = task.querySelector(`.list__item__color__btn.${taskObject.getColor}`);
  const newCurrentColorButton = task.querySelector(`.list__item__color__btn.${newColor}`);
  console.log(document.querySelector(`.list__item__color__btn.${taskObject.getColor}`))
  console.log(newCurrentColorButton)
  currentColorButton.classList.remove('current__task__color');
  newCurrentColorButton.classList.add('current__task__color');
  task.classList.remove(taskObject.getColor);
  task.classList.add(newColor);
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
  const buttonGroup = task.querySelector(".list__item__color__container");
  task.setAttribute("draggable", true);
  taskInput.contentEditable = false;
  deleteBtn.classList.add("hide");
  editBtn.classList.remove("hide");
  buttonGroup.classList.add("hide");
};

export const renderTaskEditing = (task) => {
  const editBtn = task.querySelector(".list__item__edit");
  const deleteBtn = task.querySelector(".list__item__delete");
  const taskInput = task.querySelector(".list__item__desc");
  const taskButtonGroup = task.querySelector(".list__item__color__container");
  const taskInputText = taskInput.innerText;
  let range = document.createRange();
  let sel = window.getSelection();
  taskInput.contentEditable = true;
  deleteBtn.classList.remove("hide");
  editBtn.classList.add("hide");
  taskButtonGroup.classList.remove("hide");
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
  task.addEventListener("keydown", (e) => {
    e.code === "Enter" ? exitTaskEditing(task) : console.log(e.code);
  });
  task.firstChild.focus();
};
