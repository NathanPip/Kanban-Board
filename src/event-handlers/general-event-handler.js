import { setTaskRemove, unsetTaskRemove } from "../data-handlers";

function clickedOutside(event, targetElement, func) {
  let clicked = event.target;
  do {
    if (clicked === targetElement) {
      return;
    }
    clicked = clicked.parentNode;
  } while (clicked);
  {
    func(targetElement);
  }
}

function dragOverTrash(element) {
  if (element.classList.contains("task__trash")) {
    const listItem = document.querySelector(".dragging");
    listItem.classList.add("remove__ready");
    setTaskRemove(listItem);
  }
}

function dragLeaveTrash(element) {
  if (element.classList.contains("task__trash")) {
    setTimeout(() => {
      const listItem = document.querySelector(".dragging");
      if (listItem) {
        listItem.classList.remove("remove__ready");
        unsetTaskRemove(listItem);
      }
    }, 0);
  }
}

export { clickedOutside, dragOverTrash, dragLeaveTrash };
