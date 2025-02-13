import getOriginalAttributes from "../utils/getOriginalAttributes";
import setNewAttributes from "../utils/setNewAttributes";
import restoreOriginalAttributes from "../utils/restoreOriginalAttributes";

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

export default widgetA