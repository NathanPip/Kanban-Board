import {v4 as uuidv4} from 'uuid';

export default class Project {
    constructor(name, id) {
        this.id = id || uuidv4();
        this.name = name;
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
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        listItem.classList.add('projects__container__list__item');
        listItem.dataset.projectId = this.id;
        button.dataset.projectId = this.id;
        button.innerText = this.name;
        listItem.appendChild(button);
        return listItem;
    }
}