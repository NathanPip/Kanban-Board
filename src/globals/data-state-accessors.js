import { getCurrentProject, getProjects, getTasks } from "../helpers";

//board ids
const boards = ["todo", "in__progress", "completed"];
let projects = getProjects();
let currentProject = getCurrentProject() || projects[0];

//task objects
let tasks = getTasks();
let projectMenuTimer;

const setTasks = newTasks => {
  tasks = newTasks;
};

const setCurrentProject = newProj => {
  currentProject = newProj;
};

const setProjects = newProjs => {
  projects = newProjs;
};

const setProjectMenuTimer = newTimer => {
  projectMenuTimer = newTimer;
};

//getters
export {
  boards,
  projects,
  currentProject,
  tasks,
  projectMenuTimer,
  setTasks,
  setCurrentProject,
  setProjects,
  setProjectMenuTimer
};
