import {Project, Task, User} from "./components";
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
      details: task.getDetails,
      board: task.getBoard,
      id: task.getTaskID,
      order: task.getOrder,
      urgency: task.getUrgency,
      color: task.getColor,
      projectID: task.getProjectID
    });
  }
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
};

export const updateProjectStorage = projects => {
  let storedProjects = []
  for (let proj of projects) {
    console.log(proj)
    storedProjects.push({name: proj.getName, id: proj.getID})
  }
  localStorage.setItem("projects", JSON.stringify(storedProjects));
}

export const updateCurrentProjectStorage = proj => {
  localStorage.setItem("currentProject", JSON.stringify(proj));
  return proj;
};

export const getCurrentUser = () => {
  const currentUser = getLocalStorage("user", null);
  return currentUser;
}

//gets tasks from local storage and creates and returns an array of Task objects from local storage data
export const getTasks = () => {
  const taskList = getLocalStorage("tasks", []);
  const tasks = [];
  if (taskList.length) {
    for (let task in taskList) {
      tasks.push(
        new Task({
          desc: taskList[task].desc,
          details: taskList[task].details,
          board: taskList[task].board,
          projectID: taskList[task].projectID,
          order: taskList[task].order,
          color: taskList[task].color,
          urgency: taskList[task].urgency,
          id: taskList[task].id
        })
      );
    }
    return tasks;
  }
  return tasks;
};

const demoProj = new Project({name: 'Demo', createdBy:getCurrentUser()});
export const getProjects = () => {
  const projectList = getLocalStorage("projects", [demoProj]);
  const projects = [];
  if (projectList.length) {
    for (let project in projectList) {
      projects.push(
        new Project({name: projectList[project].name, id: projectList[project].id})
      );
    }
    return projects;
  }
  return projects;
};

export const getCurrentProject = () => {
  const currentProjectStorage = getLocalStorage("currentProject", demoProj);
  if (currentProjectStorage)
    return new Project({name: currentProjectStorage._name, id: currentProjectStorage._id});
  return null;
};
