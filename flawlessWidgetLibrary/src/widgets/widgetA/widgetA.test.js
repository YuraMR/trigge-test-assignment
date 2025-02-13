import widgetA from "./widgetA";

describe("widgetA", () => {
  test("should initialize and restore widgetA", () => {
    document.body.innerHTML = `<div id="test">Link</div>`;
    const element = document.getElementById("test");

    const widget = widgetA(element);

    widget.init(() => {});
    expect(element.getAttribute("role")).toBe("link");
    expect(element.classList.contains("widget-link")).toBe(true);

    widget.destroy();
    expect(element.getAttribute("role")).toBeNull();
  });
});
