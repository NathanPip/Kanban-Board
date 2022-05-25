export { insertTask } from "./board-dom-handler";
export { updateTaskElements, clearTasks, renderTasks, } from "./task-group-dom-handler";
export {
  renderTaskEditing,
  exitTaskEditing,
  changeTaskColor,
  renderTempTask,
  renderTaskDragging,
  updateTempDraggingTask,
  toggleDetails,
  changeTaskUrgency,
} from "./task-dom-handler";
export {
  setInitialState,
  renderProjects,
  renderNewCurrentProject,
  clearProjectAlert,
  updateTitleText,
} from "./project-dom-handler";
export {
  renderAddProjectModal,
  renderProjectSettingsModal,
  renderAccountModal,
  renderModalAlert
} from "./modal-dom-handler";
export {
  createProjectDeleteAlert,
  renderTempAlert,
  removeAlert,
} from "./alert-dom-handler";
