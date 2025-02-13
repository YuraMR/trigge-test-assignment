import getOriginalAttributes from "./getOriginalAttributes";

describe("getOriginalAttributes", () => {
  test("should extract attributes from an element", () => {
    document.body.innerHTML = `<div id="test" role="button">Click Me</div>`;
    const element = document.getElementById("test");

    const attributes = getOriginalAttributes(element);

    expect(attributes).toEqual({
      role: "button",
      textContent: "Click Me",
      innerText: "Click Me",
      innerHTML: "Click Me",
    });
  });
});
