import restoreOriginalAttributes from "./restoreOriginalAttributes";

describe("restoreOriginalAttributes", () => {
  test("should restore original attributes and remove added ones", () => {
    document.body.innerHTML = `<div id="test" role="button" class="old-class">Original</div>`;
    const element = document.getElementById("test");

    const originalAttributes = {
      role: "button",
      textContent: "Original",
      innerText: "Original",
      innerHTML: "Original"
    };

    restoreOriginalAttributes(element, {
      originalAttributes,
      className: "new-class",
      eventListeners: []
    });

    expect(element.getAttribute("role")).toBe("button");
    expect(element.classList.contains("new-class")).toBe(false);
    expect(element.classList.contains("old-class")).toBe(true);
  });
});
