import {
  boards,
  currentProject,
  TaskListsElements,
  tasks,
  setTaskElements
} from "../globals";

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
  for (let task in tasks) {
    if (tasks[task].getProjectID === currentProject.getID) {
      let index = boards.indexOf(tasks[task].getBoard);
      TaskListsElements[index].appendChild(tasks[task].renderTask());
    }
  }
};

export { updateTaskElements, clearTasks, renderTasks };
