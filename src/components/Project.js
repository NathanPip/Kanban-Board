import { v4 as uuidv4 } from "uuid";
import { createElement } from "../helpers";

export class Project {
  constructor({ name, id, tasks, createdBy, canAssign, canEdit }) {
    this._id = id || uuidv4();
    this._name = name;
    this._tasks = tasks || [];
    this._colors = ["#82AECA", "#F6D285", "#ec7c7c", "#99DA75"];
    this._urgencyDictatesColor = true;
    this._taskUrgencies = [
      { name: "low", color: this._colors[0] },
      { name: "medium", color: this._colors[1] },
      { name: "high", color: this._colors[2] },
    ];
    this._createdBy = createdBy;
    this._canAssign = canAssign ? [createdBy, ...canAssign] : [createdBy];
    this._canEdit = canEdit ? [createdBy, ...canEdit] : [createdBy];
    this._canDelete = [createdBy];
  }

  get taskUrgencies() {
    return this._taskUrgencies;
  }

  get getID() {
    return this._id;
  }

  get getName() {
    return this._name;
  }

  set setName(name) {
    this._name = name;
  }

  get urgencyDictatesColor() {
    return this._urgencyDictatesColor;
  }

  instProjectButton() {
    const listItem = createElement("li", "projects__container__list__item");
    const button = createElement("button");
    listItem.dataset.projectId = this._id;
    button.dataset.projectId = this._id;
    button.innerText = this._name;
    listItem.appendChild(button);
    return listItem;
  }
}
