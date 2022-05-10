//task dom elements
let TaskListsElements = document.querySelectorAll(".list");
let TaskElements;

//task dom accessors
const setTaskElements = newElements => {
  TaskElements = newElements;
};

export {TaskListsElements, TaskElements, setTaskElements}