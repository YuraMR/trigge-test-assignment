import restoreOriginalAttributes from "../utils/restoreOriginalAttributes";
import setNewAttributes from "../utils/setNewAttributes";
import getOriginalAttributes from "../utils/getOriginalAttributes";

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

export default widgetLabel