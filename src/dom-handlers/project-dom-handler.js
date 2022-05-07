import { currentProject, projects } from "../data-state";
import {
  mainContainerElement,
  ProjectsListElement,
  ProjectTitleElement,
  rootElement,
} from "../dom-state";
import { animateElement, insertAfter } from "../helpers";

export const clearProjects = () => {
  while (ProjectsListElement.firstChild) {
    ProjectsListElement.firstChild.remove();
  }
};

export const renderProjects = () => {
  clearProjects();
  for (let project in projects) {
    ProjectsListElement.appendChild(projects[project].renderProjectButton());
  }
};

export const renderNewCurrentProject = (newProj) => {
  ProjectTitleElement.innerText = newProj.getName;
};

export const setInitialState = () => {
  if (currentProject) {
    ProjectTitleElement.innerText = currentProject.getName;
    mainContainerElement.classList.remove("hide");
    return;
  }
  ProjectTitleElement.innerText = "Add a Project";
  mainContainerElement.classList.add("hide");
};

export const updateTitleText = (input) => {
  const title = document.querySelector(".projects__modal__head__text");
  if (input.value) {
    title.innerText = input.value;
  } else {
    title.innerText = "Ener Project Name";
  }
};

export const clearProjectAlert = () => {
  const alert = document.querySelector(".projects__modal__alert");
  if (alert) alert.remove();
};
