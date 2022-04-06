import { currentProject } from "./data-state";
import {
  mainContainerElement,
  ProjectTitleElement,
  rootElement,
  setProjectElements,
  setTaskElements
} from "./dom-state";

import { renderTasks, renderProjects } from "./dom-handlers";
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
  dragLeaveTrash
} from "./event-handlers";

import { delegateEvent } from "./helpers";

//inital function calls on page load
const init = () => {
  renderTasks();
  renderProjects();
  setTaskElements(document.querySelectorAll(".list__item"));
  setProjectElements(
    document.querySelectorAll(".projects__container__list__item")
  );
  if (currentProject) {
    ProjectTitleElement.innerText = currentProject.getName;
    mainContainerElement.classList.remove('hide');
  }

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
  delegateEvent(rootElement, 'click', 'list__item__edit', editBtnClickEvent)
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
    ".projects__modal__close__button",
    toggleProjectModalClickEvent
  );
  delegateEvent(
    rootElement,
    "click",
    ".project__add__new__button",
    addProjectClickEvent
  );
  delegateEvent(rootElement, "dragover", ".list", dragOver);
  delegateEvent(rootElement, "dragover", ".task__trash", dragOverTrash);
  delegateEvent(rootElement, "dragleave", ".task__trash", dragLeaveTrash);
  
  delegateEvent(rootElement, "dragstart", ".list__item", dragStart);
  delegateEvent(rootElement, "dragend", ".list__item", dragEnd);
  delegateEvent(
    rootElement,
    "DOMCharacterDataModified",
    ".list__item__desc",
    editTaskDescEvent
  );
};

init();
