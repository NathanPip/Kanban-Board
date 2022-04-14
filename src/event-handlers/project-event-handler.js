import {
  headerElement,
  mainContainerElement,
  ProjectsListElement
} from "../dom-state";
import {
  currentProject,
  projectMenuTimer,
  projects,
  setProjectMenuTimer
} from "../data-state";

import {
  addProject,
  deleteCurrentProject,
  updateCurrentProject,
  updateExistingCurrentProject
} from "../data-handlers";
import {
  clearProjectAlert,
  renderAddProjectModal,
  renderNewCurrentProject,
  renderProjectAlert,
  renderProjects,
  renderProjectSettingsModal,
  renderTasks,
  setInitialState
} from "../dom-handlers";
import { getProjectIndex, insertAfter } from "../helpers";

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
  const index = getProjectIndex(element.dataset.projectId);
  const newCurrent = projects[index];
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
    } else if (
      element.classList.contains("projects__container__settings__button") &&
      currentProject
    ) {
      renderProjectSettingsModal();
      clearProjectAlert();
    }
  } else {
    modal.remove();
  }
}

function updateCurrentProjectClickEvent() {
  const projectTitle = document.querySelector(".projects__modal__title");
  const ProjectModalTitleInput = document.querySelector(
    ".projects__modal__title__input"
  );
  const projName = ProjectModalTitleInput.value;
  if (projName.length && projName != projectTitle) {
    updateExistingCurrentProject(projName);
    renderNewCurrentProject(currentProject);
    renderProjects();
    toggleProjectModalClickEvent();
  }
}

function deleteCurrentProjectClickEvent() {
  deleteCurrentProject();
  currentProject ? renderNewCurrentProject(currentProject) : setInitialState();
  renderProjects();
  toggleProjectModalClickEvent();
}

function addProjectClickEvent() {
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
    toggleProjectModalClickEvent();
    mainContainerElement.classList.remove("hide");
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
  addProjectClickEvent,
  updateCurrentProjectClickEvent,
  deleteCurrentProjectClickEvent
};
