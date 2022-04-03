import { boards, TaskListsElements } from "../globals";
import { getListItemAfterDrag } from "../helpers";
import { updateTaskElements } from "../dom-handlers";
import {
  addNewTask,
  removeTask,
  updateTaskBoard,
  updateTaskDesc
} from "../data-handlers";

function newTaskClick(e) {
  let currentBoard = e.dataset.board;
  let currentList = TaskListsElements[boards.indexOf(currentBoard)];
  addNewTask(currentBoard, currentList);
}

function dragStart(e) {
  e.classList.add("dragging");
}

function dragEnd(e) {
  e.classList.remove("dragging");
}

function dragOver(element, event) {
  if (element.classList.contains("list")) {
    console.log("called");
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
  }
}

function deleteTask(e) {
  let task = e.parentNode;
  removeTask(task);
  updateTaskElements();
}

function editTaskDescEvent(e) {
  const taskDesc = e.innerText;
  const taskID = e.parentNode.dataset.taskID;
  updateTaskDesc(taskDesc, taskID);
}

export {
  newTaskClick,
  dragStart,
  dragEnd,
  dragOver,
  deleteTask,
  editTaskDescEvent
};
