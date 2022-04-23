import { currentProject } from "./data-state";
import {
  rootElement,
  setProjectElements,
  setTaskElements
} from "./dom-state";

import { renderTasks, renderProjects, setInitialState, removeAlert } from "./dom-handlers";
import {
  projectClickEvent,
  projectFocusIn,
  projectFocusOut,
  showProjectsButtonClick,
  dragEnd,
  dragOver,
  dragStart,
  editTaskDescEvent,
  newTaskClick,
  toggleProjectModalClickEvent,
  addProjectClickEvent,
  editBtnClickEvent,
  exitTaskEditingEvent,
  dragOverTrash,
  dragLeaveTrash,
  updateCurrentProjectClickEvent,
  deleteCurrentProjectClickEvent,
  changeColor,
  dragging,
  projectModalTitleInputChange,
  showDeleteProjectAlert
} from "./event-handlers";

import { delegateEvent } from "./helpers";

//inital function calls on page load
const init = () => {
  setInitialState();
  renderTasks();
  renderProjects();
  setTaskElements(document.querySelectorAll(".list__item"));
  setProjectElements(
    document.querySelectorAll(".projects__container__list__item")
  );
  delegateEvent(
    rootElement,
    "focusin",
    ".projects__container__button",
    projectFocusIn
  );
  delegateEvent(
    rootElement,
    "focusout",
    ".projects__container__button",
    projectFocusOut
  );
  delegateEvent(
    rootElement,
    "focusin",
    ".projects__container__list",
    projectFocusIn
  );
  delegateEvent(
    rootElement,
    "focusout",
    ".projects__container__list",
    projectFocusOut
  );
  delegateEvent(rootElement, "click", ".list__new__task__button", newTaskClick);
  delegateEvent(rootElement, "click", ".list__item__delete", exitTaskEditingEvent);
  delegateEvent(rootElement, 'click', '.list__item__edit', editBtnClickEvent)
  //lazy I know, I'll fix later
  delegateEvent(rootElement, 'click', '.color-btn-1', changeColor)
  delegateEvent(rootElement, 'click', '.color-btn-2', changeColor)
  delegateEvent(rootElement, 'click', '.color-btn-3', changeColor)
  delegateEvent(rootElement, 'click', '.color-btn-4', changeColor)
  delegateEvent(
    rootElement,
    "click",
    ".projects__container__button",
    showProjectsButtonClick
  );
  delegateEvent(
    rootElement,
    "click",
    ".projects__container__list__item",
    projectClickEvent
  );
  delegateEvent(
    rootElement,
    "click",
    ".projects__container__add__new__button",
    toggleProjectModalClickEvent
  );
  delegateEvent(
    rootElement,
    "click",
    ".projects__container__settings__button",
    toggleProjectModalClickEvent
  );
  delegateEvent(
    rootElement,
    "click",
    ".projects__modal__close__button",
    toggleProjectModalClickEvent
  );
  delegateEvent(
    rootElement,
    "click",
    ".project__add__new__button",
    addProjectClickEvent
  );
  delegateEvent(
    rootElement,
    "click",
    ".project__settings__done__button",
    updateCurrentProjectClickEvent
  );
  delegateEvent(
    rootElement,
    "click",
    ".project__delete__button",
    showDeleteProjectAlert
  );
  delegateEvent(
    rootElement,
    "click",
    ".alert__button__delete",
    deleteCurrentProjectClickEvent
  );
  delegateEvent(
    rootElement,
    "click",
    ".alert__button__cancel",
    removeAlert
  );
  delegateEvent(rootElement, "dragover", ".list", dragOver);
  delegateEvent(rootElement, "dragover", ".task__trash", dragOverTrash);
  delegateEvent(rootElement, "dragleave", ".task__trash", dragLeaveTrash);
  
  delegateEvent(rootElement, "dragstart", ".list__item", dragStart);
  delegateEvent(rootElement, "drag", ".list__item", dragging);
  delegateEvent(rootElement, "dragend", ".list__item", dragEnd);
  delegateEvent(
    rootElement,
    "DOMCharacterDataModified",
    ".list__item__desc",
    editTaskDescEvent
  );
  delegateEvent(
    rootElement,
    "input",
    ".projects__modal__main__input",
    projectModalTitleInputChange
  );
};

init();
