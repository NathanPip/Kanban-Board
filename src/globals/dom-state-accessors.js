//dom elements
const rootElement = document.querySelector(".wrapper");
let TaskListsElements = document.querySelectorAll(".list");
const ProjectTitleElement = document.querySelector(".project__title");
let ProjectsListElement = document.querySelector(".projects__container__list");
let AddProjectButtonElement = document.querySelector(
  ".projects__container__add__new__button"
);
const ProjectModalElement = document.querySelector(".projects__modal");
let TaskElements;
let ProjectElements;

const setTaskElements = newElements => {
  TaskElements = newElements;
};
const setProjectElements = newElements => {
  ProjectElements = newElements;
};

export {
  rootElement,
  TaskListsElements,
  ProjectTitleElement,
  ProjectsListElement,
  AddProjectButtonElement,
  ProjectModalElement,
  TaskElements,
  ProjectElements,
  setTaskElements,
  setProjectElements
};
