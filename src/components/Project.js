import { v4 as uuidv4 } from "uuid";
import { createElement } from "../helpers";

export class Project {
  constructor({name, id, tasks, createdBy, canAssign, canEdit}) {
    this._id = id || uuidv4();
    this._name = name;
    this._tasks = tasks || [];
    this._createdBy = createdBy;
    this._canAssign = canAssign ? [createdBy, ...canAssign] : [createdBy];
    this._canEdit = canEdit ? [createdBy, ...canEdit] : [createdBy];
    this._canDelete = [createdBy];
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
