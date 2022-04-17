import {Project, Task} from "../components";
//receives local storage and parses json data
//if no item with key exists, create item with key and inital value
//if no initial value set value to empty string
export const getLocalStorage = (key, initial) => {
  let item = localStorage.getItem(key);
  if (item) {
    item = JSON.parse(item);
    return item;
  }
  if (!initial) {
    localStorage.setItem(key, JSON.stringify([]));
    return null;
  }
  item = initial;
  localStorage.setItem(key, JSON.stringify(item));
  return item;
};

//parses array of Task objects to simplified object to be stored in local storage
//updates local storage with new array
export const updateTaskStorage = tasks => {
  let storedTasks = [];
  for (let task of tasks) {
    storedTasks.push({
      desc: task.getDesc,
      board: task.getBoard,
      id: task.getTaskID,
      order: task.getOrder,
      color: task.getColor,
      projectID: task.getProjectID
    });
  }
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
};

export const updateProjectStorage = projects => {
  let storedProjects = []
  for (let proj of projects) {
    storedProjects.push({name: proj.getName, id: proj.getID})
  }
  localStorage.setItem("projects", JSON.stringify(storedProjects));
}

export const updateCurrentProjectStorage = proj => {
  localStorage.setItem("currentProject", JSON.stringify(proj));
  return proj;
};

//gets tasks from local storage and creates and returns an array of Task objects from local storage data
export const getTasks = () => {
  const taskList = getLocalStorage("tasks", []);
  const tasks = [];
  if (taskList.length) {
    for (let task in taskList) {
      tasks.push(
        new Task(
          taskList[task].desc,
          taskList[task].board,
          taskList[task].projectID,
          taskList[task].order,
          taskList[task].color,
          taskList[task].id
        )
      );
    }
    return tasks;
  }
  return tasks;
};

export const getProjects = () => {
  const projectList = getLocalStorage("projects", []);
  const projects = [];
  if (projectList.length) {
    for (let project in projectList) {
      projects.push(
        new Project(projectList[project].name, projectList[project].id)
      );
    }
    return projects;
  }
  return projects;
};

export const getCurrentProject = () => {
  const currentProjectStorage = getLocalStorage("currentProject", null);
  if (currentProjectStorage)
    return new Project(currentProjectStorage.name, currentProjectStorage.id);
  return null;
};
