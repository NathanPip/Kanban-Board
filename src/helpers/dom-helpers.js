function insertAfter(newElement, existingElement) {
  existingElement.parentNode.insertBefore(
    newElement,
    existingElement.nextSibling
  );
}
const createElement = (type, classNames, attributes) => {
  const element = document.createElement(type);
  if(typeof classNames === "string") {
    element.classList.add(classNames)
  } else if (typeof classNames === "object") {
    for (let c of classNames) {
      element.classList.add(c);
    }
  }
  if(attributes) {
    for(let a in attributes) {
      element.setAttribute(a, attributes[a])
    }
  }
  return element;
};

const appendChildren = (element, children) => {
  for (let el of children) {
    element.appendChild(el);
  }
};

export { insertAfter, createElement, appendChildren };
