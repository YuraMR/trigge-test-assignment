const getOriginalAttributes = (element) => ({
  role: element.getAttribute("role"),
  textContent: element.textContent,
})

const widgetA = (target) => {
  const {
    role: originalRole,
  } = getOriginalAttributes(target)

  const className = "widget-link";

  const eventHandler = () => console.log("Link clicked")

  return {
    init: (done) => {
      console.log("widgetA:init")

      target.setAttribute("role", "link")
      target.classList.add(className)
      target.addEventListener("click", eventHandler)

      done()
    },

    destroy: () => {
      console.log("widgetA:destroy")

      target.setAttribute("role", originalRole)
      target.removeAttribute("class")
      target.classList.remove(className)
      target.removeEventListener("click", eventHandler)
    },
  }
}

const widgetButton = (target) => {
  const {
    role: originalRole,
    textContent: originalTextContent,
  } = getOriginalAttributes(target)

  const className = "widget-button";
  const eventHandler = () => console.log("Button clicked")

  return {
    init: (done) => {
      console.log("widgetButton:init")

      target.setAttribute("role", "button")
      target.textContent = "BUTTON AFTER"
      target.classList.add(className)
      target.addEventListener("click", eventHandler)

      done()
    },
    destroy: () => {
      console.log("widgetButton:destroy")

      target.setAttribute("role", originalRole)
      target.textContent = originalTextContent
      target.classList.remove(className)
      target.removeEventListener("click", eventHandler)
    }
  }
}

const widgetLabel = (target) => {
  const {
    role: originalRole,
    textContent: originalTextContent,
  } = getOriginalAttributes(target)

  const className = "widget-label";
  const eventHandler = () => console.log("Label clicked")

  return {
    init: (done) => {
      console.log("widgetLabel:init")

      target.setAttribute("role", "label")
      target.textContent = "LABEL AFTER"
      target.classList.add(className)
      target.addEventListener("click", eventHandler)

      done()
    },

    destroy: () => {
      console.log("widgetLabel:destroy")

      target.setAttribute("role", originalRole)
      target.textContent = originalTextContent
      target.classList.remove(className)
      target.removeEventListener("click", eventHandler)
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
