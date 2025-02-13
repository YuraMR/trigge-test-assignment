import widgetLabel from "./widgetLabel";

describe("widgetLabel", () => {
  let element;

  beforeEach(() => {
    document.body.innerHTML = `<div id="test">Label Before</div>`;
    element = document.getElementById("test");
  });

  test("should initialize and add label attributes", () => {
    const widget = widgetLabel(element);

    widget.init(() => {}); // Simulating initialization

    expect(element.getAttribute("role")).toBe("label"); // Should be set to label
    expect(element.classList.contains("widget-label")).toBe(true); // Class should be added
    expect(element.textContent).toBe("LABEL AFTER"); // Text should change
  });

  test("should add and trigger click event", () => {
    const widget = widgetLabel(element);
    widget.init(() => {});

    const clickSpy = jest.spyOn(console, "log");
    element.click(); // Simulate a click

    expect(clickSpy).toHaveBeenCalledWith("Label clicked");
  });

  test("should restore original attributes when destroyed", () => {
    const widget = widgetLabel(element);
    widget.init(() => {});

    widget.destroy(); // Simulating destroy

    expect(element.getAttribute("role")).toBeNull(); // Role should be removed
    expect(element.classList.contains("widget-label")).toBe(false); // Class should be removed
    expect(element.textContent).toBe("Label Before"); // Text should revert
  });
});
