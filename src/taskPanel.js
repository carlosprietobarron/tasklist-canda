import { domUtils } from './domUtils'

const taskPanel = ( function () {

    function resetTaskPanel(){
        const listOfTask = document.getElementById("listOfTask");
        while (listOfTask.firstChild) {
            listOfTask.removeChild(listOfTask.lastChild);
        };  
    }
  
    function createTaskBtn(task) {
    
    const anchorItem = document.createElement("a");
     domUtils.setAttributes(anchorItem, {
        class: "nav-link",
        href: "#",
     });
     anchorItem.textContent = task.name
     return anchorItem;
    }

   function putListOfTask(taskList){
     const listOfTask = document.getElementById("listOfTask");
     if (Array.isArray(taskList)) {
       taskList.forEach(task => {
          const liItem = document.createElement("li");
          domUtils.setAttributes(liItem, {
            class: "nav-item"
          });
          liItem.appendChild(createTaskBtn(task));
          listOfTask.appendChild(liItem);
       });
    }
   }

     return { resetTaskPanel, createTaskBtn, putListOfTask };
  
})();

export { taskPanel };