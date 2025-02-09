const getOriginalAttributes = (element) => ({
  role: element.getAttribute("role"),
  textContent: element.textContent,
  innerText: element.innerText,
  innerHTML: element.innerHTML,
})

const setNewAttributes = (element, { className, eventListeners, role, textContent }) => {
  if (role) {
    element.setAttribute("role", role)
  }

  if (className) {
    element.classList.add(className)
  }

  if (textContent) {
    element.textContent = textContent
  }

  if (eventListeners) {
    eventListeners.forEach(({ type, listener }) => element.addEventListener(type, listener))
  }
}

const restoreOriginalAttributes = (element, { originalAttributes, className, eventListeners }) => {
  const {
    role: originalRole,
    textContent: originalTextContent,
    innerText: originalInnerText,
    innerHTML: originalInnerHTML,
  } = originalAttributes

  if (originalRole) {
    element.setAttribute("role", originalRole)
  } else {
    element.removeAttribute("role")
  }

  const shouldRestoreTextContent = originalTextContent === originalInnerText && originalTextContent && originalInnerHTML;

  if (shouldRestoreTextContent) {
    element.textContent = originalTextContent
  }

  if (className) {
    element.classList.remove(className)
  }

  if (element.classList.length === 0) {
    element.removeAttribute("class")
  }

  eventListeners.forEach(({ type, listener }) => {
    element.removeEventListener(type, listener)
  })
}

const widgetA = (target) => {
  const originalAttributes = getOriginalAttributes(target)

  const className = "widget-link";
  const handleClick = () => console.log("Link clicked")
  const eventListeners = [{ type: "click", listener: handleClick }]

  return {
    init: (done) => {
      console.log("widgetA:init")

      setNewAttributes(target, { className, eventListeners, role: "link" })

      done()
    },

    destroy: () => {
      console.log("widgetA:destroy")

      restoreOriginalAttributes(target, { originalAttributes, className, eventListeners })
    },
  }
}

const widgetButton = (target) => {
  const originalAttributes = getOriginalAttributes(target)

  const className = "widget-button";
  const handleClick = () => console.log("Button clicked")
  const eventListeners = [{ type: "click", listener: handleClick }]

  return {
    init: (done) => {
      console.log("widgetButton:init")

      setNewAttributes(target, { className, eventListeners, role: "button", textContent: "BUTTON AFTER" })

      done()
    },
    destroy: () => {
      console.log("widgetButton:destroy")

      restoreOriginalAttributes(target, { originalAttributes, className, eventListeners })
    }
  }
}

const widgetLabel = (target) => {
  const originalAttributes = getOriginalAttributes(target)

  const className = "widget-label";
  const handleClick = () => console.log("Label clicked")
  const eventListeners = [{ type: "click", listener: handleClick }]

  return {
    init: (done) => {
      console.log("widgetLabel:init")

      setNewAttributes(target, { className, eventListeners, role: "label", textContent: "LABEL AFTER" })

      done()
    },

    destroy: () => {
      console.log("widgetLabel:destroy")

      restoreOriginalAttributes(target, { originalAttributes, className, eventListeners })
    },
  }
}

const WIDGETS = {
  a: widgetA,
  button: widgetButton,
  label: widgetLabel,
}

const flawlessWidgetLibrary = ({ target, callback }) => {
  console.log("flawlessWidgetLibrary:start")

  const widgets = new Map()

  const initQueue = []

  const processInitQueue = async () => {
    while (initQueue.length > 0) {
      const { widget, done } = initQueue.shift()
      await widget.init(done)
    }
  }

  const queueWidgetInit = async (widget, done) => {
    initQueue.push({ widget, done })

    if (initQueue.length === 1) {
      await processInitQueue()
    }
  }

  return {
    init: async () => {
      let widgetsInitialized = 0

      const traverse = async (node) => {
        const widgetAttr = node.getAttribute("widget")
        if (widgetAttr) {
          const widgetName = widgetAttr.split("/")[1]
          const createWidget = WIDGETS[widgetName]

          if (createWidget) {
            const widgetInstance = createWidget(node)
            widgets.set(node, widgetInstance)

            await queueWidgetInit(widgetInstance, () => {
              widgetsInitialized++
              if (widgetsInitialized === widgets.size) {
                console.log("All widgets initialized")
                callback()
              }
            })
          }
        }

        Array.from(node.children).forEach(traverse)
      }

      await traverse(target)
    },

    destroy: () => {
      widgets.forEach((widgetInstance, node) => {
        widgetInstance.destroy()
        widgets.delete(node)
      })
    },
  }
}
