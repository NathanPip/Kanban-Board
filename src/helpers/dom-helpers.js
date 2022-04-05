function insertAfter(newElement, existingElement) {
    existingElement.parentNode.insertBefore(newElement, existingElement.nextSibling);
}
export {insertAfter}