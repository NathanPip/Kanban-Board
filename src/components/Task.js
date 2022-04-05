import { v4 as uuidv4 } from "uuid";

export class Task {
  constructor(desc, board, projectID, id) {
    this.desc = desc;
    this.board = board;
    this.projectID = projectID;
    this.taskID = id || uuidv4();
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

  get getProjectID() {
    return this.projectID;
  }

  renderTask() {
    const task = document.createElement("li");
    const taskDesc = document.createElement("p");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    task.classList.add("list__item", `${this.board}__item`);
    taskDesc.classList.add("list__item__desc", `${this.board}__item__desc`);
    deleteBtn.classList.add(
      "list__item__btn",
      "list__item__delete",
      `${this.board}__delete`
    );
    editBtn.classList.add(
      "list__item__btn",
      "list__item__edit",
      `${this.board}__edit`
    );
    task.dataset.taskID = this.taskID;
    task.draggable = "true";
    task.dataset.board = this.board;
    taskDesc.placeholder = "enter task";
    taskDesc.innerText = this.desc;
    deleteBtn.innerText = "D";
    editBtn.innerText = 'E';
    task.appendChild(taskDesc);
    task.appendChild(editBtn);
    task.appendChild(deleteBtn);
    return task;
  }
}
