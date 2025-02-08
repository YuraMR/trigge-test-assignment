console.log('Happy developing ✨')

const widgetA = (target) => {
  return {
    init: (done) => {
      target.addEventListener("click", (e) => {})
      done()
    },
    destroy: () => {
      console.log("foo")
    }

  }
}

const widgetButton = (target) => {
  const originalTag = target.tagName.toLowerCase()
  const originalParent = target.parentNode
  const originalTextContent = target.textContent
  const widgetAttr = target.getAttribute("widget")
  /** TODO: implement original event handler restoring */

  return {
    init: (done) => {
      console.log("widgetButton:init")

      const buttonElement = document.createElement("button")
      buttonElement.setAttribute("widget", widgetAttr)
      buttonElement.textContent = "BUTTON AFTER"

      originalParent.replaceChild(buttonElement, target)
      target = buttonElement

      const eventHandler = () => console.log("Button clicked")
      target.addEventListener("click", eventHandler)

      done()
    },
    destroy: () => {
      console.log("widgetButton:destroy")
      const restoredElement = document.createElement(originalTag)

      restoredElement.setAttribute("widget", widgetAttr)
      restoredElement.textContent = originalTextContent

      originalParent.replaceChild(restoredElement, target)
      target = originalParent
    }
  }
}
const widgetC = (target) => {
  return {
    init: (done) => {
      target.addEventListener("click", (e) => {})
      done()
    },
    destroy: () => {
      console.log("foo")
    }

  }
}

const WIDGETS = {
  a: widgetA,
  button: widgetButton,
  c: widgetC,
}

const flawlessWidgetLibrary = ({ target, callback }) => {
  console.log("flawlessWidgetLibrary:start")

  const widgets = new Map()

  return {
    init: () => {
      let widgetsInitialized = 0

      const traverse = (node) => {
        console.log("flawlessWidgetLibrary:traverse", node)

        const widgetAttr = node.getAttribute("widget")

        if (widgetAttr) {
          const widgetName = widgetAttr.split("/")[1]
          const createWidget = WIDGETS[widgetName]

          if (createWidget) {
            const widgetInstance = createWidget(node)
            widgets.set(node, widgetInstance)

            widgetInstance.init(() => {
              widgetsInitialized++
              // if (widgetsInitialized === widgets.size) {
              //   console.log("All widgets initialized")
              //   callback()
              // }
            })
          }
        }

        Array.from(node.children).forEach(traverse)
      }

      traverse(target)
    },

    destroy: () => {
      widgets.forEach((widgetInstance, node) => {
        widgetInstance.destroy()
        widgets.delete(node)
      })
    }
  }
}



