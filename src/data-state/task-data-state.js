import { getTasks } from "../storage-helpers";

let tasks = getTasks();
let taskEditTimer;

const setTasks = newTasks => {
  tasks = newTasks;
};

const setTaskEditTimer = timer => {
  taskEditTimer = timer;
};

export { tasks, setTasks, taskEditTimer, setTaskEditTimer };
