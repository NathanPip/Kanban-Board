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
    const tempDraggingItem = document.querySelector(".dragging__temp");
    listItem.classList.add("remove__ready");
    tempDraggingItem.classList.add("remove__ready");
    setTaskRemove(listItem);
  }
}

function dragLeaveTrash(element) {
  if (element.classList.contains("task__trash")) {
    setTimeout(() => {
      const listItem = document.querySelector(".dragging");
      const tempDraggingItem = document.querySelector(".dragging__temp");
      if (listItem) {
        listItem.classList.remove("remove__ready");
        tempDraggingItem.classList.remove("remove__ready");
        unsetTaskRemove(listItem);
      }
    }, 0);
  }
}

export { clickedOutside, dragOverTrash, dragLeaveTrash };
