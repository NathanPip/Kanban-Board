import { rootElement } from "../dom-state";
import { animateAndDelete, animateElement, appendChildren, createElement } from "../helpers"

const createAlertBase = (message, animationClass) => {
    const body = createElement('div', ['alert__body']);
    const text = createElement('p', ['alert__text']);
    text.innerText = message;
    body.appendChild(text);
    return body;
}


export const createProjectDeleteAlert = (message) => {
    const container = createElement('div', ['alert__container']);
    const body = createAlertBase(message);
    const deleteBtn = createElement('button', ['alert__button', 'alert__button__delete'])
    const cancelBtn = createElement('button', ['alert__button', 'alert__button__cancel'])
    deleteBtn.innerText = 'Delete';
    cancelBtn.innerText = 'Cancel';
    container.appendChild(body);
    appendChildren(body, [deleteBtn, cancelBtn]);
    return container;
}

export const renderTempAlert = (message) => {
    const base = createAlertBase(message);
    rootElement.appendChild(base);
    animateElement(base, "fadein", 250)
    animateAndDelete(base, 'fadeout', 800, 2000)
}

export const removeAlert = () => {
    const alert = document.querySelector('.alert__container');
    animateAndDelete(alert, 'fadeout', 250)
}