import { getCurrentProject, getProjects } from "../storage-helpers";

let projects = getProjects();
let currentProject = getCurrentProject() || projects[0];
let projectMenuTimer;

const setCurrentProject = newProj => {
  currentProject = newProj;
};

const setProjects = newProjs => {
  projects = newProjs;
};

const setProjectMenuTimer = newTimer => {
  projectMenuTimer = newTimer;
};

export {
  projects,
  currentProject,
  projectMenuTimer,
  setCurrentProject,
  setProjects,
  setProjectMenuTimer
};
