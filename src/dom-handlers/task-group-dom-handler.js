import { TaskListsElements, setTaskElements } from "../dom-state";
import { boards, currentProject, tasks } from "../data-state";
import { animateElement } from "../helpers";

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
      let taskElement = task.instTaskObject();
      TaskListsElements[index].appendChild(taskElement);
      animateElement(taskElement, "fadein", 500);
    }
  }
};


export const updateTaskElements = () => {
  setTaskElements(document.querySelectorAll(".list__item"));
};
