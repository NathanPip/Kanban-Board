import { renderTasks } from "./dom-handlers";
import {
  projectClickEvent,
  projectFocusIn,
  projectFocusOut,
  renderProjects,
  showProjectsButtonClick,
  deleteTask,
  dragEnd,
  dragOver,
  dragStart,
  editTaskDescEvent,
  newTaskClick
} from "./event-handlers";

import {
  currentProject,
  ProjectTitleElement,
  rootElement,
  setProjectElements,
  setTaskElements
} from "./globals";
import { delegateEvent } from "./helpers";

//inital function calls on page load
const init = () => {
  renderTasks();
  renderProjects();
  setTaskElements(document.querySelectorAll(".list__item"));
  setProjectElements(
    document.querySelectorAll(".projects__container__list__item")
  );
  ProjectTitleElement.innerText = currentProject.getName;

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
  delegateEvent(rootElement, "click", ".list__item__delete", deleteTask);
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

  delegateEvent(rootElement, "dragover", ".list", dragOver);
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
