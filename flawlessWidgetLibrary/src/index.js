import widgetA from "./widgets/widgetA";
import widgetButton from "./widgets/widgetButton";
import widgetLabel from "./widgets/widgetLabel";
import "./index.css"

const WIDGETS = {
  a: widgetA,
  button: widgetButton,
  label: widgetLabel,
}

const flawlessWidgetLibrary = ({ target, callback }) => {
  console.log("flawlessWidgetLibrary:start")

  const widgets = new Map()

  const errors = []

  const queueWidgetInit = async (widget, done) => {
    try {
      await widget.init(done)
    } catch (error) {
      errors.push(error)
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

          if (createWidget && !widgets.has(node)) {
            try {
              const widgetInstance = createWidget(node)
              widgets.set(node, widgetInstance)

              await queueWidgetInit(widgetInstance, () => {
                widgetsInitialized++

                if (widgetsInitialized === widgets.size) {
                  console.log("All widgets initialized")
                  callback(errors.length ? errors : null)
                }
              })
            } catch (error) {
              errors.push(error)
            }
          }
        }

        Array.from(node.children).forEach(traverse)
      }

      await traverse(target)
    },
    destroy: () => {
      console.log("flawlessWidgetLibrary:destroy")

      const traverseDestroy = (node) => {
        Array.from(node.children).forEach(traverseDestroy)

        if (widgets.has(node)) {
          const widgetInstance = widgets.get(node)
          widgetInstance.destroy()
          widgets.delete(node)
        }
      }

      traverseDestroy(target)
    }
  }
}

export default flawlessWidgetLibrary

globalThis.flawlessWidgetLibrary = flawlessWidgetLibrary

