import { v4 as uuidv4 } from "uuid";
import { createElement } from "../../helpers";

export class Project {
  constructor({name, id, tasks, createdBy, canAssign, canEdit}) {
    this.id = id || uuidv4();
    this.name = name;
    this.tasks = tasks || [];
    this.createdBy = createdBy;
    this.canAssign = canAssign ? [createdBy, ...canAssign] : [createdBy];
    this.canEdit = canEdit ? [createdBy, ...canEdit] : [createdBy];
    this.canDelete = [createdBy];
  }

  get getID() {
    return this.id;
  }

  get getName() {
    return this.name;
  }

  set setName(name) {
    this.name = name;
  }

  renderProjectButton() {
    const listItem = createElement("li", "projects__container__list__item");
    const button = createElement("button");
    listItem.dataset.projectId = this.id;
    button.dataset.projectId = this.id;
    button.innerText = this.name;
    listItem.appendChild(button);
    return listItem;
  }
}
