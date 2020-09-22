const domUtils = (function du() {
  const deleteEleContent = (elementId) => {
    const tabContent = document.getElementById(elementId);
    while (tabContent.firstChild) {
      tabContent.firstChild.remove();
    }
    tabContent.innerHTML = '';
  };

  const setAttributes = (el, attrs) => {
    for (const key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  };

    const eventFire = (el) => {
    const element = document.getElementById(el);
    
    element.dispatchEvent(new Event('click'));
  };

  
  return { deleteEleContent, setAttributes, eventFire };
}());

export { domUtils };
