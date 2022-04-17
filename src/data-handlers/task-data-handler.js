import { Task } from "../components";
import { boards, currentProject, setTasks, tasks } from "../data-state";
import { getTaskObjectIndex, updateTaskStorage } from "../helpers";

export const addNewTask = (board, list) => {
  let newTask = new Task("", board, currentProject.getID, null, null);
  tasks.push(newTask);
  updateTaskStorage(tasks);
  list.appendChild(newTask.renderTask());
};

//remove task element from board and updates data
export const removeTask = task => {
  let id = task.dataset.taskID;
  setTasks(
    tasks.filter(task => {
      return task.getTaskID.toString() !== id;
    })
  );
  task.remove();
  updateTaskStorage(tasks);
};

export const setTaskRemove = task => {
  const taskID = task.dataset.taskID;
  const index = getTaskObjectIndex(taskID);
  tasks[index].setRemoveStandby = true;
};

export const unsetTaskRemove = task => {
  const taskID = task.dataset.taskID;
  const index = getTaskObjectIndex(taskID);
  tasks[index].setRemoveStandby = false;
};

export const updateTaskBoard = (board, task) => {
  const taskID = task.dataset.taskID;
  const index = getTaskObjectIndex(taskID);
  tasks[index].setBoard = board;
  updateTaskStorage(tasks);
};

export const updateTaskDesc = (desc, id) => {
  const index = getTaskObjectIndex(id);
  tasks[index].setDesc = desc;
  updateTaskStorage(tasks);
};

export const updateTaskOrder = () => {
  for (let board of boards) {
    let boardElement = document.querySelector(`ul[data-board=${board}]`);
    for (let i = 0; i < boardElement.children.length; i++) {
      let id = boardElement.children[i].dataset.taskID;
      let index = getTaskObjectIndex(id);
      tasks[index].setOrder = i;
    }
  }
};

export const updateTaskColor = (newColor, task) => {
  const index = getTaskObjectIndex(task.getTaskID);
  tasks[index].setColor = newColor;
  updateTaskStorage(tasks);
};

