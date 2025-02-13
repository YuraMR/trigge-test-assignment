import widgetButton from "./widgetButton";

describe("widgetButton", () => {
  let element;

  beforeEach(() => {
    document.body.innerHTML = `<div id="test">Button before</div>`;
    element = document.getElementById("test");
  });

  test("should initialize and add button attributes", () => {
    const widget = widgetButton(element);

    widget.init(() => {}); // Simulating initialization

    expect(element.getAttribute("role")).toBe("button"); // Should be set to button
    expect(element.classList.contains("widget-button")).toBe(true); // Class should be added
    expect(element.textContent).toBe("BUTTON AFTER"); // Text should change
  });

  test("should add and trigger click event", () => {
    const widget = widgetButton(element);
    widget.init(() => {});

    const clickSpy = jest.spyOn(console, "log");
    element.click(); // Simulate a click

    expect(clickSpy).toHaveBeenCalledWith("Button clicked");
  });

  test("should restore original attributes when destroyed", () => {
    const widget = widgetButton(element);
    widget.init(() => {});

    widget.destroy(); // Simulating destroy

    expect(element.getAttribute("role")).toBeNull(); // Role should be removed
    expect(element.classList.contains("widget-button")).toBe(false); // Class should be removed
    expect(element.textContent).toBe("Button before"); // Text should revert
  });
});
