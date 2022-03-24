export default class Task {
  constructor(desc, board) {
    this.desc = desc;
    this.board = board;
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

  renderTask() {
    const task = document.createElement("li");
    // const taskTitle = document.createElement("h3");
    const taskDesc = document.createElement("p");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    task.classList.add("list__item", `${this.board}__item`);
    // taskTitle.classList.add('list__item__title', `${this.board}__item__title`);
    taskDesc.classList.add('list__item__desc', `${this.board}__item__desc`)
    editBtn.classList.add('list__item__btn', 'list__item__edit', `${this.board}__edit`)
    deleteBtn.classList.add('list__item__btn', 'list__item__delete', `${this.board}__delete`)
    taskDesc.innerText = this.desc;
    editBtn.innerText = 'E';
    deleteBtn.innerText = 'D';
    // task.appendChild(taskTitle);
    task.appendChild(taskDesc);
    task.appendChild(editBtn);
    task.appendChild(deleteBtn);
    return task;
  }
}
