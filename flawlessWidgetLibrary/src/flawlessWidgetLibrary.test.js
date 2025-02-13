import flawlessWidgetLibrary from "./index";

describe("flawlessWidgetLibrary", () => {
  let root, initButton, destroyButton;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="root">
        <div widget="widgets/a">
          <div widget="widgets/button">Button before</div>
        </div>
        <div widget="widgets/label">Label Before</div>
      </div>
      <button id="init">Init</button>
      <button id="destroy">Destroy</button>
    `;

    root = document.getElementById("root");
    initButton = document.getElementById("init");
    destroyButton = document.getElementById("destroy");
  });

  test("should initialize and apply attributes to all widgets", () => {
    const libraryInstance = flawlessWidgetLibrary({
      target: root,
      callback: (errors) => {
        expect(errors).toBeNull();
      },
    });

    libraryInstance.init();

    const linkElement = root.querySelector("[widget='widgets/a']");
    const labelElement = root.querySelector("[widget='widgets/label']");

    expect(linkElement.getAttribute("role")).toBe("link");
    expect(linkElement.classList.contains("widget-link")).toBe(true);

    expect(labelElement.getAttribute("role")).toBe("label");
    expect(labelElement.classList.contains("widget-label")).toBe(true);
    expect(labelElement.textContent).toBe("LABEL AFTER");
  });

  test("should correctly destroy all widgets and restore original content", () => {
    const libraryInstance = flawlessWidgetLibrary({
      target: root,
      callback: (errors) => {
        expect(errors).toBeNull();
      },
    });

    libraryInstance.init();
    libraryInstance.destroy();

    const linkElement = root.querySelector("[widget='widgets/a']");
    const buttonElement = root.querySelector("[widget='widgets/button']");
    const labelElement = root.querySelector("[widget='widgets/label']");

    expect(linkElement.getAttribute("role")).toBeNull();
    expect(linkElement.classList.contains("widget-link")).toBe(false);

    expect(buttonElement.getAttribute("role")).toBeNull();
    expect(buttonElement.classList.contains("widget-button")).toBe(false);
    expect(buttonElement.textContent).toBe("Button before");

    expect(labelElement.getAttribute("role")).toBeNull();
    expect(labelElement.classList.contains("widget-label")).toBe(false);
  });
});
