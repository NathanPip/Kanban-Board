export default class Task {
  constructor(desc, board) {
    this.desc = desc;
    this.board = board;
    this.taskID = Date.now() * Math.random();
  }

  get getBoard() {
    return this.board;
  }

  set setBoard(newBoard) {
    this.board = newBoard;
  }

  get getDesc() {
    return this.desc;
  }

  set setDesc(newDesc) {
    this.desc = newDesc;
  }

  get getTaskID() {
    return this.taskID;
  }

  renderTask() {
    const task = document.createElement("li");
    const taskDesc = document.createElement("p");
    const deleteBtn = document.createElement("button");
    task.classList.add("list__item", `${this.board}__item`);
    taskDesc.classList.add('list__item__desc', `${this.board}__item__desc`)
    deleteBtn.classList.add('list__item__btn', 'list__item__delete', `${this.board}__delete`)
    task.dataset.taskID = this.taskID;
    task.draggable = "true";
    taskDesc.placeholder = "enter task";
    taskDesc.innerText = this.desc;
    taskDesc.contentEditable = true;
    deleteBtn.innerText = 'D';
    deleteBtn.dataset.deleteBtn = 'true';
    task.appendChild(taskDesc);
    task.appendChild(deleteBtn);
    return task;
  }
}
