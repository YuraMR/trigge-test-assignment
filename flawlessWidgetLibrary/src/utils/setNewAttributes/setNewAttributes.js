const setNewAttributes = (
  element,
  { className, eventListeners, role, textContent }
) => {
  if (role) {
    element.setAttribute("role", role);
  }

  if (className) {
    element.classList.add(className);
  }

  if (textContent) {
    element.textContent = textContent;
  }

  if (eventListeners) {
    eventListeners.forEach(({ type, listener }) =>
      element.addEventListener(type, listener)
    );
  }
};

export default setNewAttributes;
