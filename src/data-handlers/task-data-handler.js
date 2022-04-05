import {Task} from "../components";
import { currentProject, setTasks, tasks } from "../data-state";
import { updateTaskStorage } from "../helpers";

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

const getTaskObjectIndex = id => {
  let taskObject = tasks.filter(task => task.getTaskID.toString() === id);
  taskObject = taskObject[0];
  return tasks.indexOf(taskObject);
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

export {
  addNewTask,
  removeTask,
  getTaskObjectIndex,
  updateTaskBoard,
  updateTaskDesc
};
