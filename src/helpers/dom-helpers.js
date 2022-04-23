export function insertAfter(newElement, existingElement) {
  existingElement.parentNode.insertBefore(
    newElement,
    existingElement.nextSibling
  );
}
export const createElement = (type, classNames, attributes) => {
  const element = document.createElement(type);
  if (typeof classNames === "string") {
    element.classList.add(classNames);
  } else if (typeof classNames === "object") {
    for (let c of classNames) {
      element.classList.add(c);
    }
  }
  if (attributes) {
    for (let a in attributes) {
      element.setAttribute(a, attributes[a]);
    }
  }
  return element;
};

export const appendChildren = (element, children) => {
  for (let el of children) {
    element.appendChild(el);
  }
};

export const animateAndDelete = (element, className, duration, delay) => {
  function animation() {
    element.classList.add(className);
    setTimeout(() => {
      element.remove();
    }, duration);
  }
  if(delay) {
    setTimeout(animation, delay);
  } else {
    animation();
  }
};

export const animateElement = (element, className, duration) => {
  element.classList.add(className);
  setTimeout(() => {
    element.classList.remove(className);
  }, duration);
};
