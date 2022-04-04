import { projects, ProjectsListElement } from "../globals";

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

export { renderProjects, clearProjects };
