const ProjectTitleElement = document.querySelector(".project__title");
let ProjectsListElement = document.querySelector(".projects__container__list");
let AddProjectButtonElement = document.querySelector(
  ".projects__container__add__new__button"
);
let ProjectElements;

const setProjectElements = newElements => {
  ProjectElements = newElements;
};

export {
  ProjectTitleElement,
  ProjectsListElement,
  AddProjectButtonElement,
  ProjectElements,
  setProjectElements
};
