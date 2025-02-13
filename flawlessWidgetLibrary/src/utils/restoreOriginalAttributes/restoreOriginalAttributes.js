const restoreOriginalAttributes = (
  element,
  { originalAttributes, className, eventListeners }
) => {
  const {
    role: originalRole,
    textContent: originalTextContent,
    innerText: originalInnerText,
    innerHTML: originalInnerHTML
  } = originalAttributes;

  if (originalRole) {
    element.setAttribute("role", originalRole);
  } else {
    element.removeAttribute("role");
  }

  const shouldRestoreTextContent =
    originalTextContent === originalInnerText &&
    originalTextContent &&
    originalInnerHTML;

  if (shouldRestoreTextContent) {
    element.textContent = originalTextContent;
  }

  if (className) {
    element.classList.remove(className);
  }

  if (element.classList.length === 0) {
    element.removeAttribute("class");
  }

  eventListeners.forEach(({ type, listener }) => {
    element.removeEventListener(type, listener);
  });
};

export default restoreOriginalAttributes;
