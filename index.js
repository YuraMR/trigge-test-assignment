const root = document.getElementById('root')
let library = null

const callback = (errors) => {
  if (errors) {
    console.error("Errors:", errors)
  } else {
    console.log("All widgets initialized")
  }
}

document.getElementById("init").addEventListener("click", async () => {
  if (!library) {
    library = flawlessWidgetLibrary({ target: root, callback })
  }
  await library.init()
})

document.getElementById("destroy").addEventListener("click", () => {
  if (library) {
    library.destroy()
    library = null
  }
})