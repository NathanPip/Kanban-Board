import { TaskListsElements, setTaskElements } from "../dom-state";
import { boards, currentProject, tasks } from "../data-state";
import { getListItemAfterDrag } from "../helpers";
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

const exitTaskEditing = (task) => {
  const editBtn = task.querySelector('.list__item__edit');
  const deleteBtn = task.querySelector('.list__item__delete');
  const taskInput = task.querySelector('.list__item__desc');
  taskInput.contentEditable = false;
  deleteBtn.classList.remove('hide')
  editBtn.classList.remove('hide')
}

const renderTaskEditing = (task) => {
  const editBtn = task.querySelector('.list__item__edit');
  const deleteBtn = task.querySelector('.list__item__delete');
  const taskInput = task.querySelector('.list__item__desc');
  taskInput.contentEditable = true;
  deleteBtn.classList.add('hide')
  editBtn.classList.add('hide')
  document.addEventListener('click', (e) => clickedOutside(e, task, exitTaskEditing))
}

export { updateTaskElements, clearTasks, renderTasks, insertTask, renderTaskEditing, exitTaskEditing };
