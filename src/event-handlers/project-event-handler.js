import { addProject } from "../data-handlers";
import { renderProjects, renderTasks } from "../dom-handlers";
import {
  currentProject,
  projectMenuTimer,
  ProjectModalElement,
  ProjectModalInput,
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

function toggleProjectModalClickEvent(e) {
  ProjectModalElement.classList.toggle('hide');
}

function addProjectClickEvent(e) {
  const projName = ProjectModalInput.value;
  addProject(projName);
  setCurrentProject(projects[projects.length-1]);
  updateCurrentProject(currentProject);
  ProjectModalElement.classList.toggle('hide');
  renderProjects();
  renderTasks();
}


export {
  showProjectsButtonClick,
  projectFocusIn,
  projectFocusOut,
  projectClickEvent,
  toggleProjectModalClickEvent,
  addProjectClickEvent
};
