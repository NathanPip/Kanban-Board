import { appendChildren, createElement } from "../helpers";

const renderAddProjectModal = () => {
  const modal = createElement("div", "projects__modal");
  const modalBody = createElement("div", "projects__modal__body");
  const modalCloseBtn = createElement(
    "button",
    "projects__modal__close__button"
  );
  const modalTitle = createElement("h3", "projects__modal__title");
  const modalTitleInput = createElement(
    "input",
    "projects__modal__title__input"
  );
  const modalAddProjectBtn = createElement(
    "button",
    "project__add__new__button"
  );
  modal.appendChild(modalBody);
  appendChildren(modalBody, [
    modalCloseBtn,
    modalTitle,
    modalTitleInput,
    modalAddProjectBtn
  ]);

  modalCloseBtn.innerText = "X";
  modalTitle.innerText = "Enter Project Name";
  modalAddProjectBtn.innerText = "Add Project";

  modalTitleInput.type = "text";
  return modal;
};


export { renderAddProjectModal };
