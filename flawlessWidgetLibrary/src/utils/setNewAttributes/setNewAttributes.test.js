import setNewAttributes from "./setNewAttributes";

describe("setNewAttributes", () => {
  test("should set attributes and event listeners on an element", () => {
    document.body.innerHTML = `<div id="test"></div>`;
    const element = document.getElementById("test");

    const mockClickHandler = jest.fn();

    setNewAttributes(element, {
      className: "test-class",
      role: "button",
      textContent: "Updated",
      eventListeners: [{ type: "click", listener: mockClickHandler }]
    });

    expect(element.classList.contains("test-class")).toBe(true);
    expect(element.getAttribute("role")).toBe("button");
    expect(element.textContent).toBe("Updated");

    element.click(); // Simulate a click event
    expect(mockClickHandler).toHaveBeenCalled();
  });
});
