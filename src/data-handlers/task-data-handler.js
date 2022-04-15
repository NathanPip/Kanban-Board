import { Task } from "../components";
import { boards, currentProject, setTasks, tasks } from "../data-state";
import { getTaskObjectIndex, updateTaskStorage } from "../helpers";

const addNewTask = (board, list) => {
  let newTask = new Task("", board, null, null, currentProject.getID);
  tasks.push(newTask);
  updateTaskStorage(tasks);
  list.appendChild(newTask.renderTask());
};

//remove task element from board and updates data
const removeTask = task => {
  let id = task.dataset.taskID;
  setTasks(
    tasks.filter(task => {
      return task.getTaskID.toString() !== id;
    })
  );
  task.remove();
  updateTaskStorage(tasks);
};

const setTaskRemove = task => {
  const taskID = task.dataset.taskID;
  const index = getTaskObjectIndex(taskID);
  tasks[index].setRemoveStandby = true;
};

const unsetTaskRemove = task => {
  const taskID = task.dataset.taskID;
  const index = getTaskObjectIndex(taskID);
  tasks[index].setRemoveStandby = false;
};

const updateTaskBoard = (board, task) => {
  const taskID = task.dataset.taskID;
  const index = getTaskObjectIndex(taskID);
  tasks[index].setBoard = board;
  updateTaskStorage(tasks);
};

const updateTaskDesc = (desc, id) => {
  const index = getTaskObjectIndex(id);
  tasks[index].setDesc = desc;
  updateTaskStorage(tasks);
};

const updateTaskOrder = () => {
  for (let board of boards) {
    let boardElement = document.querySelector(`ul[data-board=${board}]`);
    for (let i = 0; i < boardElement.children.length; i++) {
      let id = boardElement.children[i].dataset.taskID;
      let index = getTaskObjectIndex(id);
      tasks[index].setOrder = i;
    }
  }
};

const updateTaskColor = (newColor, task) => {
  const index = getTaskObjectIndex(task.getTaskID);
  tasks[index].setColor = newColor;
  updateTaskStorage(tasks);
};

export {
  addNewTask,
  removeTask,
  getTaskObjectIndex,
  updateTaskBoard,
  updateTaskDesc,
  setTaskRemove,
  updateTaskOrder,
  unsetTaskRemove,
  updateTaskColor
};
