import { TaskListsElements, setTaskElements } from "../dom-state";
import { boards, currentProject, tasks } from "../data-state";
import { getListItemAfterDrag } from "../helpers";

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

const insertTask = (element, listItem) => {
  const nextListItem = getListItemAfterDrag(element, event.clientY);
  if (!nextListItem) {
    element.appendChild(listItem);
  } else {
    element.insertBefore(listItem, nextListItem);
  }
};

export { updateTaskElements, clearTasks, renderTasks, insertTask };
