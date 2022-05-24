import { getListItemAfterDrag } from "../helpers";

export const insertTask = (element, listItem) => {
    const nextListItem = getListItemAfterDrag(element, event.clientY);
    if (!nextListItem) {
      element.appendChild(listItem);
    } else {
      element.insertBefore(listItem, nextListItem);
    }
  };