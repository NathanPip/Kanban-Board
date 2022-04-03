function delegateEvent(parent, event, childClassSelector, callback) {
  let currentTarget;
  const listener = e => {
    let element = e.target;
    if (!element.classList) element = element.parentNode;
    if (!element.classList.contains(childClassSelector)) {
      currentTarget = element.closest(childClassSelector);
    } else {
      currentTarget = e.target;
    }
    if (!currentTarget) {
      return;
    }
    const newEvent = {};
    for (const i in e) {
      newEvent[i] = e[i];
    }
    newEvent.innerEvent = e;
    newEvent.currentTarget = currentTarget;
    callback(currentTarget, newEvent);
  };
  parent.addEventListener(event, listener, false);
  return () => {
    parent.removeEventListener(event, listener, false);
  };
}

const getListItemAfterDrag = (container, mouseY) => {
  const listItems = [
    ...container.querySelectorAll(".list__item:not(.dragging)")
  ];

  return listItems.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const boxOffset = mouseY - (box.top + box.height / 2);
      if (boxOffset < 0 && boxOffset > closest.offset) {
        return { offset: boxOffset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};

export { delegateEvent, getListItemAfterDrag };
