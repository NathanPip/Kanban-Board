import { currentProject } from "../data-state";
import { headerElement } from "../dom-state";
import { appendChildren, createElement } from "../helpers";

const renderAddProjectModal = () => {
  const modal = createElement("div", "projects__modal");
  const modalBody = createElement("div", "projects__modal__body");
  const modalCloseBtn = createElement(
    "button",
    "projects__modal__close__button"
  );
  const modalTitle = createElement("h3", [
    "projects__modal__head__text",
    "projects__modal__title"
  ]);
  const modalTitleInput = createElement("input", [
    "projects__modal__main__input",
    "projects__modal__title__input"
  ]);
  const modalAddProjectBtn = createElement("button", [
    "projects__main__button",
    "project__add__new__button"
  ]);
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
  headerElement.appendChild(modal);
};

const renderProjectSettingsModal = () => {
  const modal = createElement("div", "projects__modal");
  const modalBody = createElement("div", "projects__modal__body");
  const modalCloseBtn = createElement(
    "button",
    "projects__modal__close__button"
  );
  const modalTitle = createElement("h3", [
    "projects__modal__head__text",
    "projects__modal__title"
  ]);
  const modalTitleInput = createElement(
    "input",
    ["projects__modal__main__input", "projects__modal__title__input"],
    { type: "text", placeholder: "change project name" }
  );
  const modalFinishChangesBtn = createElement("button", [
    "projects__main__button",
    "project__settings__done__button"
  ]);
  const modalDeleteProjectBtn = createElement(
    "button",
    "project__delete__button"
  );
  modal.appendChild(modalBody);
  appendChildren(modalBody, [
    modalCloseBtn,
    modalTitle,
    modalTitleInput,
    modalDeleteProjectBtn,
    modalFinishChangesBtn
  ]);

  modalCloseBtn.innerText = "X";
  modalTitle.innerText = currentProject.name;
  modalDeleteProjectBtn.innerText = "Delete Project";
  modalFinishChangesBtn.innerText = "Done";

  headerElement.appendChild(modal);
};

export { renderAddProjectModal, renderProjectSettingsModal };
