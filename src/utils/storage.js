import Task from '../components/Task.js'

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
    return [];
  }
  item = [initial];
  localStorage.setItem(key, JSON.stringify(item));
  return item;
};

//parses array of Task objects to simplified object to be stored in local storage
//updates local storage with new array
export const updateTaskStorage = (tasks) => {
    let storedTasks = [];
    for (let task of tasks) {
        storedTasks.push({desc: task.getDesc, board: task.getBoard, id: task.getTaskID})
    }
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

//gets tasks from local storage and creates and returns an array of Task objects from local storage data
export const getTasks = () => {
    const taskList = getLocalStorage('tasks');
    const tasks = []
    if(taskList.length) {
        for(let task in taskList) {
            tasks.push(new Task(taskList[task].desc, taskList[task].board, taskList[task].id))
        }
        return tasks;
    }
    return tasks;
}
