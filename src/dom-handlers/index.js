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
} from "./task-dom-handler";
export {
  setInitialState,
  renderProjects,
  renderNewCurrentProject,
  renderProjectAlert,
  clearProjectAlert,
  updateTitleText,
} from "./project-dom-handler";
export {
  renderAddProjectModal,
  renderProjectSettingsModal,
} from "./modal-dom-handler";
export { createProjectDeleteAlert, removeAlert } from "./alert-dom-handler";
