import { getCurrentProject, getProjects } from "../../helpers";

export const getProjectIndex = projID => {
  for (let proj of projects) {
    if (proj.getID === projID) {
      return projects.indexOf(proj);
    }
  }
  console.error("project not found");
};

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
