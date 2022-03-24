import Task from '../components/Task.js'

export const getLocalStorage = (key, initial) => {
  let item = localStorage.getItem(key);
  if (item) {
    item = JSON.parse(item);
    return item;
  }
  if (!initial) {
    localStorage.setItem(key, JSON.stringify([]));
    return [];
  }
  item = [initial];
  localStorage.setItem(key, JSON.stringify(item));
  return item;
};

export const updateProjectStorage = (projects) => {
    if(projects)
        localStorage.setItem('projects', JSON.stringify(projects));
}

export const updateTaskStorage = (tasks) => {

}

export const setTasks = () => {
    const taskList = getLocalStorage('tasks');
    const tasks = []
    if(taskList.length) {
        for(let task in taskList) {
            tasks.push(new Task(taskList[task].getDesc, taskList[task].getBoard))
        }
        return tasks;
    }
    tasks.push(new Task('Fix all these bugs crawlin about', 'todo'));
    return tasks;
}
