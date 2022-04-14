import { currentProject, projects } from "../data-state";
import { mainContainerElement, ProjectsListElement, ProjectTitleElement } from "../dom-state";

const clearProjects = () => {
  while (ProjectsListElement.firstChild) {
    ProjectsListElement.firstChild.remove();
  }
};

const renderProjects = () => {
  clearProjects();
  for (let project in projects) {
    ProjectsListElement.appendChild(projects[project].renderProjectButton());
  }
};

const renderNewCurrentProject = newProj => {
  ProjectTitleElement.innerText = newProj.getName;
};

const setInitialState = () => {
  if(currentProject) {
    ProjectTitleElement.innerText = currentProject.getName;
    mainContainerElement.classList.remove('hide');
    return
  }
  ProjectTitleElement.innerText = 'Add a Project';
  mainContainerElement.classList.add("hide");
};

const renderProjectAlert = message => {
  const alert = document.createElement("p");
  alert.classList.add("projects__modal__alert");
  alert.innerText = message;
  return alert;
};

const clearProjectAlert = () => {
  const alert = document.querySelector(".projects__modal__alert");
  if (alert) alert.remove();
};

export {
  renderProjects,
  clearProjects,
  renderNewCurrentProject,
  renderProjectAlert,
  clearProjectAlert,
  setInitialState
};
