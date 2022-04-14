import { Project } from "../components";
import { currentProject, projects, setCurrentProject } from "../data-state";
import {
  getProjectIndex,
  updateCurrentProjectStorage,
  updateProjectStorage
} from "../helpers";

const addProject = name => {
  const newProj = new Project(name);
  projects.push(newProj);
  updateProjectStorage(projects);
  return newProj;
};

const deleteProject = id => {
  const index = getProjectIndex(id);
  projects.splice(index, 1);
  updateProjectStorage(projects);
};

const deleteCurrentProject = () => {
  deleteProject(currentProject.getID);
  updateCurrentProject(projects[0] || null);
};

const updateExistingCurrentProject = newTitle => {
  const index = getProjectIndex(currentProject.getID);
  projects[index].setName = newTitle;
  updateProjectStorage(projects);
  updateCurrentProject(projects[index]);
};

const updateCurrentProject = newProj => {
  setCurrentProject(newProj);
  updateCurrentProjectStorage(newProj);
};

export {
  addProject,
  updateCurrentProject,
  updateExistingCurrentProject,
  deleteProject,
  deleteCurrentProject
};
