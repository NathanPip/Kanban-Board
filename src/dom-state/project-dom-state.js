const ProjectTitleElement = document.querySelector(".project__title");
let ProjectsListElement = document.querySelector(".projects__container__list");
let AddProjectButtonElement = document.querySelector(
  ".projects__container__add__new__button"
);
const ProjectModalElement = document.querySelector(".projects__modal");
const ProjectModalInput = document.querySelector(
  ".projects__modal__title__input"
);
const ProjectModalTitle = document.querySelector(".projects__modal__title");
let ProjectElements;

const setProjectElements = newElements => {
  ProjectElements = newElements;
};

export {
  ProjectTitleElement,
  ProjectsListElement,
  AddProjectButtonElement,
  ProjectModalElement,
  ProjectModalInput,
  ProjectModalTitle,
  ProjectElements,
  setProjectElements
};
