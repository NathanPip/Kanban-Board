import { projects } from "../data-state";
import { ProjectModalInput, ProjectsListElement, ProjectTitleElement } from "../dom-state";
import { insertAfter } from "../helpers";


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

const renderNewCurrentProject = (newProj) => {
  ProjectTitleElement.innerText = newProj.getName;
}

const renderProjectAlert = (message) => {
  const alert = document.createElement('p');
  alert.classList.add('projects__modal__alert');
  alert.innerText = message;
  insertAfter(alert, ProjectModalInput);
}

const clearProjectAlert = () => {
  const alert = document.querySelector('.projects__modal__alert');
  if(alert)
    alert.remove();
}

export { renderProjects, clearProjects, renderNewCurrentProject, renderProjectAlert, clearProjectAlert};
