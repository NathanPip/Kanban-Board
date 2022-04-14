import { projects, tasks } from "../data-state";

const getProjectIndex = projID => {
  for (let proj of projects) {
    if (proj.getID === projID) {
      return projects.indexOf(proj);
    }
  }
  console.error("project not found");
};

const getTaskObjectIndex = id => {
  let taskObject = tasks.filter(task => task.getTaskID.toString() === id);
  taskObject = taskObject[0];
  return tasks.indexOf(taskObject);
};

const getTaskObjectFromElement = element => {
  return tasks.filter(task => task.getTaskID.toString() === element.dataset.taskID)[0];
}

export { getProjectIndex, getTaskObjectFromElement, getTaskObjectIndex };
