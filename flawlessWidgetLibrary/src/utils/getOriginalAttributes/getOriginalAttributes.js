const getOriginalAttributes = element => ({
  role: element.getAttribute("role"),
  textContent: element.textContent,
  innerText: element.innerText,
  innerHTML: element.innerHTML
});

export default getOriginalAttributes;
