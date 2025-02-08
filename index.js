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
const app = (target, callback) => {
  return {

    init: () => {
      const widgets = []
      let widgetsInitialized = 0

      const traverse = (node) => {

        const widgetName = node.getAttribute("widget")

        if (widgetName) {
          const widgetType = WIDGETS[widgetName]
          const widget = widgetType(node)
          widget.init(() => {
            widgetsInitialized++
          })
          widgets.push(widget)
        }

        for (let child in target.childNotes) {
          traverse(child)
        }
      }

      traverse(node)

    },

    destroy: () => {

    }

  }

}


const init = async ({ root, callback }) => {
  const traverse = (node) => {
    // Check if the current node is an element and has the 'widget' attribute
    if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('widget')) {
      const value = node.getAttribute('widget').split("/")[1];
      WIDGETS[value](node).init(() => {
        console.log("done", value)
      })
      console.log(value);
    }

    // Recursively traverse the child nodes
    node.childNodes.forEach((child) => {
      traverse(child);
    });
  };

  // Start traversal from the root node
  traverse(root);

  // Invoke the callback if defined
  if (callback) {
    callback();
  }
};


