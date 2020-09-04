const domUtils = ( function() { 
    function deleteEleContent(elementId) {
        const tabContent = document.getElementById(elementId);
        while (tabContent.firstChild) {
          tabContent.firstChild.remove();
        }
        tabContent.innerHTML = '';
      }

      function setAttributes(el, attrs) {
        for (var key in attrs) {
          el.setAttribute(key, attrs[key]);
        }
      }

      /* setAttributes(sectionElem, {
        class: "main_body",
        id: "nameid"
      }) */

      function eventFire(el, etype){
       const element = document.getElementById(el);
       // const bool = elem.dispatchEvent("onclick");
       
       element.dispatchEvent(new Event("click"));
      }

      //eventFire(document.getElementById('mytest1'), 'click');

    return { deleteEleContent, setAttributes, eventFire };
})();

export { domUtils };
