import { projects } from "../data-state";
import { ProjectsListElement, ProjectTitleElement } from "../dom-state";


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

export { renderProjects, clearProjects, renderNewCurrentProject};
