import {
  headerElement,
  mainContainerElement,
  ProjectsListElement
} from "../dom-state";
import { projectMenuTimer, projects, setProjectMenuTimer } from "../data-state";

import { addProject, updateCurrentProject } from "../data-handlers";
import {
  clearProjectAlert,
  renderAddProjectModal,
  renderNewCurrentProject,
  renderProjectAlert,
  renderProjects,
  renderProjectSettingsModal,
  renderTasks
} from "../dom-handlers";
import { insertAfter } from "../helpers";

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
  updateCurrentProject(newCurrent);
  renderTasks();
}

function toggleProjectModalClickEvent(element) {
  let modal = document.querySelector(".projects__modal");
  if (!modal) {
    if (element.classList.contains("projects__container__add__new__button")) {
      renderAddProjectModal();
      clearProjectAlert();
    } else if (element.classList.contains('projects__container__settings__button')) {
      renderProjectSettingsModal();
      clearProjectAlert();
    }
  } else {
    modal.remove();
  }
}

function addProjectClickEvent() {
  const modal = document.querySelector(".projects__modal");
  const ProjectModalTitleInput = document.querySelector(
    ".projects__modal__title__input"
  );
  const projName = ProjectModalTitleInput.value;
  if (projName.length) {
    const newProj = addProject(projName);
    renderNewCurrentProject(newProj);
    updateCurrentProject(newProj);
    renderProjects();
    renderTasks();
    mainContainerElement.classList.remove("hide");
    modal.remove();
    return;
  }
  const alert = renderProjectAlert("must enter a project name");
  insertAfter(alert, ProjectModalTitleInput);
}

export {
  showProjectsButtonClick,
  projectFocusIn,
  projectFocusOut,
  projectClickEvent,
  toggleProjectModalClickEvent,
  addProjectClickEvent
};
