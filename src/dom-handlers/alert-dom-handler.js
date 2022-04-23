import { animateAndDelete, appendChildren, createElement } from "../helpers"

const createAlertBase = (message) => {
    const container = createElement('div', ['alert__container', 'fadein']);
    const body = createElement('div', ['alert__body']);
    const text = createElement('p', ['alert__text']);
    text.innerText = message;
    container.appendChild(body);
    body.appendChild(text);
    return container;
}

export const createProjectDeleteAlert = (message) => {
    const base = createAlertBase(message);
    const body = base.firstChild;
    const deleteBtn = createElement('button', ['alert__button', 'alert__button__delete'])
    const cancelBtn = createElement('button', ['alert__button', 'alert__button__cancel'])
    deleteBtn.innerText = 'Delete';
    cancelBtn.innerText = 'Cancel';
    appendChildren(body, [deleteBtn, cancelBtn]);
    return base;
}

export const removeAlert = () => {
    const alert = document.querySelector('.alert__container');
    alert.remove();
}