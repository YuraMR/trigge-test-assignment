
const root = document.getElementById('root');
console.log('Script executed after body, root element:', root);

const callback = () => {
  console.log('Traversal complete');
};

if (root) {
  const { init, destroy } = flawlessWidgetLibrary({ target: root, callback });
  setTimeout(async () => {
    await init({ root, callback });

    setTimeout(() => {
      destroy();
    }, 2000);
  }, 2000);
} else {
  console.error('Root element not found');
}