import { renderTasks } from "../dom-handlers";
import {
  currentProject,
  projectMenuTimer,
  projects,
  ProjectsListElement,
  ProjectTitleElement,
  setCurrentProject,
  setProjectMenuTimer
} from "../globals";
import { updateCurrentProject } from "../helpers";

function showProjectsButtonClick(e) {
  ProjectsListElement.classList.toggle("hide");
}

function projectFocusOut(e) {
  let timeout = setTimeout(() => ProjectsListElement.classList.add("hide"), 0);
  setProjectMenuTimer(timeout);
}

function projectFocusIn(e) {
  clearTimeout(projectMenuTimer);
}

function projectClickEvent(e) {
  const newCurrent = projects.filter(
    project => project.getID === e.dataset.projectId
  )[0];
  setCurrentProject(newCurrent);
  updateCurrentProject(currentProject);
  ProjectTitleElement.innerText = currentProject.getName;
  renderTasks();
}

const renderProjects = () => {
  for (let project in projects) {
    ProjectsListElement.appendChild(projects[project].renderProjectButton());
  }
};

export {
  showProjectsButtonClick,
  projectFocusIn,
  projectFocusOut,
  projectClickEvent,
  renderProjects
};
