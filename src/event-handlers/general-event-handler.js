function clickedOutside(event, targetElement, func) {
  let clicked = event.target;
  do {
    if (clicked === targetElement) {
      return;
    }
    clicked = clicked.parentNode;
  } while (clicked);
  {
    func(targetElement);
  }
}

export { clickedOutside };
