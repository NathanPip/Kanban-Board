import { boards} from "../data-state";
import { TaskListsElements } from "../dom-state";
import {
  insertTask,
  renderTaskEditing,
  updateTaskElements,
} from "../dom-handlers";
import {
  addNewTask,
  updateTaskBoard,
  updateTaskOrder,
} from "../data-handlers";
import { animateElement } from "../helpers";


export function dragOver(element) {
    if (element.classList.contains("list")) {
      const board = element.parentNode.dataset.board;
      const listItem = document.querySelector(".dragging");
      insertTask(element, listItem);
      updateTaskBoard(board, listItem);
    }
  }

export function newTaskClick(element) {
    let currentBoard = element.dataset.board;
    let currentList = TaskListsElements[boards.indexOf(currentBoard)];
    let taskElement = addNewTask(currentBoard, currentList);
    currentList.appendChild(taskElement);
    animateElement(taskElement, 'fadein', 500);
    const newChild = currentList.lastChild;
    setTimeout(()=>{renderTaskEditing(newChild)}, 10);
    updateTaskElements();
    updateTaskOrder();
  }