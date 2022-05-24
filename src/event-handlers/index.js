export { dragOver, newTaskClick } from "./board-event-handlers";

export {
  showProjectsButtonClick,
  projectFocusIn,
  projectFocusOut,
  projectClickEvent,
  toggleProjectModalClickEvent,
  addProjectClickEvent,
  updateCurrentProjectClickEvent,
  deleteCurrentProjectClickEvent,
  projectModalTitleInputChange,
  showDeleteProjectAlert,
} from "./project-event-handler";
export {
  dragStart,
  dragEnd,
  dragging,
  deleteTask,
  editTaskDescEvent,
  editBtnClickEvent,
  exitTaskEditingEvent,
  setUrgency,
  detailsBtnClickEvent,
  editTaskDetailsEvent,
} from "./task-event-handler";

export {
  clickedOutside,
  dragOverTrash,
  dragLeaveTrash,
} from "./general-event-handler";
