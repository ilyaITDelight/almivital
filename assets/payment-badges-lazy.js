(() => {
  const badgeList = '.htusb-payment-badges--multicolor__list';
  const selector = `${badgeList} img:not([loading])`;

  function update(root) {
    if (root.nodeType !== 1) return;
    if (root.matches('img:not([loading])') && root.closest(badgeList)) {
      root.setAttribute('loading', 'lazy');
    }
    const images = root.closest(badgeList)
      ? root.querySelectorAll('img:not([loading])')
      : root.querySelectorAll(selector);
    images.forEach(image => image.setAttribute('loading', 'lazy'));
  }

  update(document.body);
  // Hextom inserts the badges dynamically. Observe additions, not attribute changes.
  new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(update));
  }).observe(document.body, { childList: true, subtree: true });
})();
