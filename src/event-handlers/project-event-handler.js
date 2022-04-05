import {
  ProjectModalElement,
  ProjectModalInput,
  ProjectsListElement
} from "../dom-state";
import { projectMenuTimer, projects, setProjectMenuTimer } from "../data-state";

import { addProject, updateCurrentProject } from "../data-handlers";
import {
  clearProjectAlert,
  renderNewCurrentProject,
  renderProjectAlert,
  renderProjects,
  renderTasks
} from "../dom-handlers";

function showProjectsButtonClick() {
  ProjectsListElement.classList.toggle("hide");
}

function projectFocusOut() {
  let timeout = setTimeout(() => ProjectsListElement.classList.add("hide"), 0);
  setProjectMenuTimer(timeout);
}

function projectFocusIn() {
  clearTimeout(projectMenuTimer);
}

function projectClickEvent(element) {
  const newCurrent = projects.filter(
    project => project.getID === element.dataset.projectId
  )[0];
  renderNewCurrentProject(newCurrent);
  updateCurrentProject(newProj);
  renderTasks();
}

function toggleProjectModalClickEvent() {
  ProjectModalElement.classList.toggle("hide");
  clearProjectAlert();
}

function addProjectClickEvent() {
  const projName = ProjectModalInput.value;
  if (projName.length) {
    const newProj = addProject(projName);
    renderNewCurrentProject(newProj);
    updateCurrentProject(newProj);
    renderProjects();
    renderTasks();
    ProjectModalElement.classList.toggle("hide");
    return;
  }
  renderProjectAlert("must enter a project name");
}

export {
  showProjectsButtonClick,
  projectFocusIn,
  projectFocusOut,
  projectClickEvent,
  toggleProjectModalClickEvent,
  addProjectClickEvent
};
