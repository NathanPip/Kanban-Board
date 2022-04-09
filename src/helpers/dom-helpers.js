function insertAfter(newElement, existingElement) {
  existingElement.parentNode.insertBefore(
    newElement,
    existingElement.nextSibling
  );
}
const createElement = (type, ...classNames) => {
  const element = document.createElement(type);
  for (let c of classNames) {
    element.classList.add(c);
  }
  return element;
};

const appendChildren = (element, children) => {
  for (let el of children) {
    element.appendChild(el);
  }
};

export { insertAfter, createElement, appendChildren };
