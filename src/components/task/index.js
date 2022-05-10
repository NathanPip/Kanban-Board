export {
  addNewTask,
  removeTask,
  updateTaskBoard,
  updateTaskDesc,
  setTaskRemove,
  updateTaskOrder,
  unsetTaskRemove,
  updateTaskColor,
  updateTaskUrgency,
  updateTaskDetails,
} from "./task-data-handler";

export {
  tasks,
  setTasks,
  taskEditTimer,
  setTaskEditTimer,
  getTaskObjectIndex,
  getTaskObjectFromElement,
} from "./task-data-state";
export {
  updateTaskElements,
  clearTasks,
  renderTasks,
  insertTask,
  renderTaskEditing,
  exitTaskEditing,
  changeTaskColor,
  renderTempTask,
  renderTaskDragging,
  updateTempDraggingTask,
  toggleDetails,
} from "./task-dom-handler";

export {
  TaskListsElements,
  TaskElements,
  setTaskElements,
} from "./task-dom-state";
