import { boards } from "../data-state";
import { TaskListsElements, trashElement } from "../dom-state";
import {
  exitTaskEditing,
  insertTask,
  renderTaskEditing,
  updateTaskElements
} from "../dom-handlers";
import {
  addNewTask,
  getTaskObjectFromElement,
  removeTask,
  updateTaskBoard,
  updateTaskDesc
} from "../data-handlers";

function newTaskClick(element) {
  let currentBoard = element.dataset.board;
  let currentList = TaskListsElements[boards.indexOf(currentBoard)];
  addNewTask(currentBoard, currentList);
  updateTaskElements();
}

function dragStart(element) {
    element.classList.add("dragging");
    trashElement.classList.remove('hide');
}

function dragEnd(element) {
  trashElement.classList.add('hide');
  if(element.classList.contains('dragging')) {
    const taskObject = getTaskObjectFromElement(element);
    if(taskObject.getRemoveStandby) {
      removeTask(element)
      updateTaskElements();
      return
    }
    element.classList.remove("dragging");
  }
}

function dragOver(element) {
  if (element.classList.contains("list")) {
    const listItem = document.querySelector(".dragging");
    const board = element.parentNode.dataset.board;
    insertTask(element, listItem);
    updateTaskBoard(board, listItem);
  }
}

function deleteTask(element) {
  let task = element.parentNode;
  removeTask(task);
  updateTaskElements();
}

function editBtnClickEvent(element) {
  const task = element.parentNode;
  renderTaskEditing(task);
  task.firstChild.focus();
}

function exitTaskEditingEvent(element) {
  const task = element.parentNode;
  exitTaskEditing(task);
}

function editTaskDescEvent(element) {
  const taskDesc = element.innerText;
  const taskID = element.parentNode.dataset.taskID;
  updateTaskDesc(taskDesc, taskID);
}

export {
  newTaskClick,
  dragStart,
  dragEnd,
  dragOver,
  deleteTask,
  editTaskDescEvent,
  editBtnClickEvent,
  exitTaskEditingEvent
};
