const getOriginalAttributes = (element) => ({
  tagName: element.tagName.toLowerCase(),
  parent: element.parentNode,
  textContent: element.textContent,
  widgetAttr: element.getAttribute("widget"),
  // children: [...element.childNodes],
  /** TODO: implement original event handler restoring */
})

const widgetA = (target) => {
  const {
    tagName: originalTag,
    parent: originalParent,
    textContent: originalTextContent,
    widgetAttr,
    children: originalChildren,
  } = getOriginalAttributes(target)

  return {
    init: (done) => {
      console.log("widgetA:init")

      const anchorElement = document.createElement("a")
      anchorElement.setAttribute("widget", widgetAttr)

      // originalChildren.forEach((child) => anchorElement.appendChild(child))

      originalParent.replaceChild(anchorElement, target)
      target = anchorElement

      const eventHandler = () => console.log("Anchor clicked")
      target.addEventListener("click", eventHandler)

      done()
    },

    destroy: () => {
      console.log("widgetA:destroy")

      const restoredElement = document.createElement(originalTag)
      restoredElement.setAttribute("widget", widgetAttr)
      restoredElement.textContent = originalTextContent

      originalChildren.forEach((child) => restoredElement.appendChild(child))

      originalParent.replaceChild(restoredElement, target)
      target = restoredElement
    },
  }
}


const widgetButton = (target) => {
  const {
    tagName: originalTag,
    parent: originalParent,
    textContent: originalTextContent,
    widgetAttr,
  } = getOriginalAttributes(target)

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

const widgetLabel = (target) => {
  const {
    tagName: originalTag,
    parent: originalParent,
    textContent: originalTextContent,
    widgetAttr,
  } = getOriginalAttributes(target)

  return {
    init: (done) => {
      console.log("widgetLabel:init")

      const labelElement = document.createElement("label")
      labelElement.setAttribute("widget", widgetAttr)
      labelElement.textContent = "LABEL AFTER"

      originalParent.replaceChild(labelElement, target)
      target = labelElement

      const eventHandler = () => console.log("Label clicked")
      target.addEventListener("click", eventHandler)

      done()
    },
    destroy: () => {
      console.log("widgetLabel:destroy")

      const restoredElement = document.createElement(originalTag)
      restoredElement.setAttribute("widget", widgetAttr)
      restoredElement.textContent = originalTextContent

      originalParent.replaceChild(restoredElement, target)
      target = originalParent
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



