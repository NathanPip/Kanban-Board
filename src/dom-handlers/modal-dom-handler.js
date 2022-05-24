import { currentProject } from "../data-state";
import { headerElement } from "../dom-state";
import { animateElement, appendChildren, createElement } from "../helpers";

const createBaseModal = () => {
  const modal = createElement("div", "projects__modal");
  const modalBody = createElement("div", "projects__modal__body");
  const modalCloseBtn = createElement(
    "button",
    "projects__modal__close__button"
  );
  const modalTitle = createElement("h3", [
    "projects__modal__head__text",
    "projects__modal__title",
  ]);

  modalCloseBtn.innerText = "X";

  modal.appendChild(modalBody);
  appendChildren(modalBody, [modalCloseBtn, modalTitle]);
  return { modal, modalBody, modalTitle };
};

export const renderAddProjectModal = () => {
  const { modal, modalBody, modalTitle } = createBaseModal();
  const modalTitleInput = createElement(
    "input",
    ["projects__modal__main__input", "projects__modal__title__input"],
    { placeholder: "enter project name" }
  );
  const modalAddProjectBtn = createElement("button", [
    "projects__main__button",
    "project__add__new__button",
  ]);
  appendChildren(modalBody, [modalTitleInput, modalAddProjectBtn]);

  modalTitle.innerText = "Enter Project Name";
  modalAddProjectBtn.innerText = "Add Project";

  modalTitleInput.type = "text";
  headerElement.appendChild(modal);
  animateElement(modal, "fadein", 300);
};

export const renderProjectSettingsModal = () => {
  const { modal, modalBody, modalTitle } = createBaseModal();
  const modalTitleInput = createElement(
    "input",
    ["projects__modal__main__input", "projects__modal__title__input"],
    { type: "text", placeholder: "change project name" }
  );
  const modalFinishChangesBtn = createElement("button", [
    "projects__main__button",
    "project__settings__done__button",
  ]);
  const modalDeleteProjectBtn = createElement(
    "button",
    "project__delete__button"
  );
  appendChildren(modalBody, [
    modalTitleInput,
    modalDeleteProjectBtn,
    modalFinishChangesBtn,
  ]);

  modalTitle.innerText = currentProject.getName;
  modalDeleteProjectBtn.innerText = "Delete Project";
  modalFinishChangesBtn.innerText = "Done";

  headerElement.appendChild(modal);
  animateElement(modal, "fadein", 300);
};

export const renderAccountModal = (type) => {
  const { modal, modalBody, modalTitle } = createBaseModal();

  const modalForm = createElement("form", ["account__login__form"]);
  const modalFormEmail = createElement(
    "input",
    ["projects__modal__main__input", "account__form__login__input", "account__login__form__email"],
    { type: "email", name: "email", placeholder: "enter email" }
  );
  const emailLabel = createElement(
    "label",
    ["account__login__form__label", "account__login__form__email__label"],
    { for: "email" }
  );
  const modalFormUsername = createElement(
    "input",
    ["projects__modal__main__input", "account__form__login__input", "account__login__form__username"],
    { type: "text", name: "username", placeholder: "enter username" }
  );
  const userNameLabel = createElement(
    "label",
    ["account__login__form__label", "account__login__form__username__label"],
    { for: "username" }
  );
  const modalFormPassword = createElement(
    "input",
    ["projects__modal__main__input", "account__form__login__input", "account__login__form__password"],
    { type: "password", name: "password", placeholder: "enter password" }
  );
  const passwordLabel = createElement(
    "label",
    ["account__login__form__label", "account__login__form__password__label"],
    { for: "password" }
  );
  const accountSubmit = createElement(
    "input",
    ["projects__main__button", "account__submit__button", `${type}__button`],
    { type: "submit" }
  );

  modalTitle.innerText = type === "signup" ? "Signup" : "Login";
  accountSubmit.innerText = type === "signup" ? "Signup" : "Login";
  emailLabel.innerText = "email";
  userNameLabel.innerText = "username";
  passwordLabel.innerText = "password";
  if (type === "signup") {
    appendChildren(modalForm, [
      emailLabel,
      modalFormEmail,
      userNameLabel,
      modalFormUsername,
      passwordLabel,
      modalFormPassword,
      accountSubmit
    ]);
  } else {
    appendChildren(modalForm, [
      emailLabel,
      modalFormEmail,
      passwordLabel,
      modalFormPassword,
      accountSubmit
    ]);
  }
  modalBody.appendChild(modalForm);
  headerElement.appendChild(modal);
  animateElement(modal, "fadein", 300);
};

export const renderModalAlert = (message) => {
  const ProjectModalButton = document.querySelector(
    ".projects__main__button"
  );
  const parent = ProjectModalButton.parentNode;
  const alert = document.createElement("p");
  alert.classList.add("projects__modal__alert");
  alert.innerText = message;
  parent.insertBefore(alert, ProjectModalButton);
};

