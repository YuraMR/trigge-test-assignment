import getOriginalAttributes from "../../utils/getOriginalAttributes/getOriginalAttributes";
import setNewAttributes from "../../utils/setNewAttributes/setNewAttributes";
import restoreOriginalAttributes from "../../utils/restoreOriginalAttributes/restoreOriginalAttributes";

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

export default widgetButton