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

const WIDGETS = {
  a: widgetA,
  b: widgetA,
  c: widgetA,
}

const flawlessWidgetLibrary = ({ target, callback }) => {
  console.log("flawlessWidgetLibrary:start")
  const widgets = []
  
  return {
    init: () => {
      let widgetsInitialized = 0
      const traverse = (node) => {

        console.log("flawlessWidgetLibrary:traverse")
        console.log("node", node)
        const widgetName = node.getAttribute("widget")

        if (widgetName) {
          const widgetName = node.getAttribute('widget').split("/")[1];
          const createWidget = WIDGETS[widgetName]
          const widget = createWidget(node)

          widget.init(() => {
            widgetsInitialized++
          })
          widgets.push(widget)
        }

        Array.from(node.children).forEach((child) => {
          traverse(child)
        })
      }

      traverse(target)

    },

    destroy: () => {

    }

  }

}


