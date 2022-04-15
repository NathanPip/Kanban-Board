import { v4 as uuidv4 } from "uuid";
import { appendChildren, createElement } from "../helpers";

export class Task {
  constructor(desc, board, projectID, order, id) {
    this.desc = desc;
    this.board = board;
    this.projectID = projectID;
    this.order = order;
    this.taskID = id || uuidv4();
    this.removeStandby = false;
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

  get getRemoveStandby() {
    return this.removeStandby;
  }
  
  set setRemoveStandby(newState) {
    this.removeStandby = newState;
  }

  get getOrder() {
    return this.order;
  }

  set setOrder(newOrder) {
    this.order = newOrder; 
  }

  get getTaskID() {
    return this.taskID;
  }

  get getProjectID() {
    return this.projectID;
  }

  renderTask() {
    const task = createElement("li", ["list__item", `${this.board}__item`], {
      draggable: "true"
    });
    const taskDesc = createElement(
      "p",
      ["list__item__desc", `${this.board}__item__desc`],
      { placeholder: "enter task" }
    );
    const deleteBtn = createElement("button", [
      "list__item__btn",
      "list__item__delete",
      `${this.board}__delete`,
      "hide"
    ]);
    const editBtn = createElement("button", [
      "list__item__btn",
      "list__item__edit",
      `${this.board}__edit`
    ]);
    task.dataset.taskID = this.taskID;
    task.dataset.board = this.board;
    taskDesc.innerText = this.desc;
    deleteBtn.innerText = "Done";
    editBtn.innerText = "Edit";
    appendChildren(task, [taskDesc, editBtn, deleteBtn]);
    return task;
  }
}
