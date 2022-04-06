import {Task} from "../components";
import { currentProject, setTasks, tasks } from "../data-state";
import { updateTaskStorage } from "../helpers";


const getTaskObjectIndex = id => {
  let taskObject = tasks.filter(task => task.getTaskID.toString() === id);
  taskObject = taskObject[0];
  return tasks.indexOf(taskObject);
};

const getTaskObjectFromElement = element => {
  return tasks.filter(task => task.getTaskID.toString() === element.dataset.taskID)[0];
}

const addNewTask = (board, list) => {
  let newTask = new Task("", board, currentProject.getID);
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

const setTaskRemove = (task) => {
  const taskID = task.dataset.taskID;
  const index = getTaskObjectIndex(taskID);
  tasks[index].setRemoveStandby = true;
}

const unsetTaskRemove = (task) => {
  const taskID = task.dataset.taskID;
  const index = getTaskObjectIndex(taskID);
  tasks[index].setRemoveStandby = false;
}

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

export {
  addNewTask,
  removeTask,
  getTaskObjectIndex,
  updateTaskBoard,
  updateTaskDesc,
  setTaskRemove,
  unsetTaskRemove,
  getTaskObjectFromElement
};
