import { getTasks } from "../../helpers";

export const getTaskObjectIndex = id => {
  let taskObject = tasks.filter(task => task.getTaskID.toString() === id);
  taskObject = taskObject[0];
  return tasks.indexOf(taskObject);
};

export const getTaskObjectFromElement = element => {
  return tasks.filter(task => task.getTaskID.toString() === element.dataset.taskID)[0];
}

let tasks = getTasks();
let taskEditTimer;

const setTasks = newTasks => {
  tasks = newTasks;
};

const setTaskEditTimer = timer => {
  taskEditTimer = timer;
};

export { tasks, setTasks, taskEditTimer, setTaskEditTimer };
