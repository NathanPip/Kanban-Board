import { TaskListsElements, setTaskElements } from "../dom-state";
import { boards, currentProject, tasks } from "../data-state";
import {
  appendChildren,
  createElement,
  getListItemAfterDrag,
  getTaskObjectFromElement
} from "../helpers";
import { clickedOutside } from "../event-handlers";

const updateTaskElements = () => {
  setTaskElements(document.querySelectorAll(".list__item"));
};

const clearTasks = () => {
  for (let i = 0; i < TaskListsElements.length; i++) {
    while (TaskListsElements[i].firstChild) {
      TaskListsElements[i].firstChild.remove();
    }
  }
};

const renderTasks = () => {
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
      TaskListsElements[index].appendChild(task.renderTask());
    }
  }
};

const insertTask = (element, listItem) => {
  const nextListItem = getListItemAfterDrag(element, event.clientY);
  if (!nextListItem) {
    element.appendChild(listItem);
  } else {
    element.insertBefore(listItem, nextListItem);
  }
};

const changeTaskColor = (task, newColor) => {
  const taskObject = getTaskObjectFromElement(task)
  task.classList.remove(taskObject.getColor);
  task.classList.add(newColor);
};

const exitTaskEditing = task => {
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

const renderTaskEditing = task => {
  const editBtn = task.querySelector(".list__item__edit");
  const deleteBtn = task.querySelector(".list__item__delete");
  const taskInput = task.querySelector(".list__item__desc");
  const taskButtonGroup = task.querySelector(".list__item__color__container");
  const taskInputText = taskInput.innerText;
  taskInput.contentEditable = true;
  deleteBtn.classList.remove("hide");
  editBtn.classList.add("hide");
  taskButtonGroup.classList.remove("hide");
  document.addEventListener("click", e =>
    clickedOutside(e, task, exitTaskEditing)
  );
  task.setAttribute("draggable", false);
  taskInput.click();
  taskInput.innerText = "";
  taskInput.innerText = taskInputText;
};

export {
  updateTaskElements,
  clearTasks,
  renderTasks,
  insertTask,
  renderTaskEditing,
  exitTaskEditing,
  changeTaskColor
};
