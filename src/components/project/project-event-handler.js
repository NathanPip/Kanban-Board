import {
  animateAndDelete,
  animateElement,
  getArrayOfProjNames,
} from "../../helpers";
import { mainContainerElement, rootElement } from "../../global";
import {
  addProject,
  clearProjectAlert,
  currentProject,
  deleteCurrentProject,
  projectMenuTimer,
  projects,
  ProjectsListElement,
  renderNewCurrentProject,
  renderProjects,
  setInitialState,
  setProjectMenuTimer,
  updateCurrentProject,
  updateExistingCurrentProject,
  updateTitleText,
  getProjectIndex,
} from ".";
import {
  createProjectDeleteAlert,
  removeAlert,
  renderTempAlert,
} from "../alert";
import {
  renderAccountModal,
  renderAddProjectModal,
  renderModalAlert,
  renderProjectSettingsModal,
} from "../modal";
import { renderTasks } from "../Task";

export function showProjectsButtonClick() {
  const addProjectButton = document.querySelector(
    ".projects__container__add__new__button"
  );
  ProjectsListElement.classList.toggle("hide");
  if (addProjectButton.classList.contains("hide")) {
    addProjectButton.classList.remove("hide");
  } else {
    addProjectButton.classList.add("hide");
  }
}

export function projectFocusOut() {
  const addProjectButton = document.querySelector(
    ".projects__container__add__new__button"
  );
  let timeout = setTimeout(() => {
    ProjectsListElement.classList.add("hide");
    addProjectButton.classList.add("hide");
  }, 0);
  setProjectMenuTimer(timeout);
}

export function projectFocusIn() {
  clearTimeout(projectMenuTimer);
}

export function projectModalTitleInputChange(element) {
  updateTitleText(element);
}

export function projectClickEvent(element) {
  const index = getProjectIndex(element.dataset.projectId);
  const newCurrent = projects[index];
  renderNewCurrentProject(newCurrent);
  updateCurrentProject(newCurrent);
  renderTasks();
}

export function toggleProjectModalClickEvent(element) {
  let modal = document.querySelector(".projects__modal");
  if (!modal) {
    if (element.classList.contains("projects__container__add__new__button")) {
      renderAddProjectModal();
      clearProjectAlert();
    } else if (
      element.classList.contains("projects__container__settings__button")
    ) {
      if (currentProject) {
        renderProjectSettingsModal();
        clearProjectAlert();
      } else {
        renderTempAlert("Choose or add a project to edit settings");
      }
    } else if (element.classList.contains("account__button__login")) {
      renderAccountModal("signup");
    }
  } else {
    animateAndDelete(modal, 250);
  }
}

export function updateCurrentProjectClickEvent() {
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

export function deleteCurrentProjectClickEvent() {
  deleteCurrentProject();
  currentProject ? renderNewCurrentProject(currentProject) : setInitialState();
  renderProjects();
  toggleProjectModalClickEvent();
  removeAlert();
}

export function showDeleteProjectAlert() {
  const alert = createProjectDeleteAlert(
    "Are you sure you want to delete the project?"
  );
  rootElement.appendChild(alert);
  animateElement(alert, "fadein", 250);
}

export function addProjectClickEvent() {
  const ProjectModalTitleInput = document.querySelector(
    ".projects__modal__title__input"
  );
  const projName = ProjectModalTitleInput.value;
  const allProjNames = getArrayOfProjNames(projects);
  clearProjectAlert();
  if (projName.length && !allProjNames.includes(projName)) {
    const newProj = addProject(projName);
    renderNewCurrentProject(newProj);
    updateCurrentProject(newProj);
    renderProjects();
    renderTasks();
    toggleProjectModalClickEvent();
    mainContainerElement.classList.remove("hide");
    return;
  }
  if (projName.length <= 0) {
    renderModalAlert("must enter a project name");
    return;
  }
  if (allProjNames.includes(projName)) {
    renderModalAlert("You already have a project with that name");
    return;
  }
}
