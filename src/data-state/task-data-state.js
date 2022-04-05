import { getTasks } from "../helpers";

let tasks = getTasks();

const setTasks = newTasks => {
  tasks = newTasks;
};

export { tasks, setTasks };
