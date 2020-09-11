import { domUtils } from './domUtils'
import { DBproject } from './project'

const taskPanel = ( function () {

    function resetTaskPanel() {
        const listOfTask = document.getElementById("listOfTask");
        while (listOfTask.firstChild) {
            listOfTask.removeChild(listOfTask.lastChild);
        };  
    }

    function resetTaskForm(){
      let element = document.getElementById("tsk-Name-in");
      element.value = "";
      element = document.getElementById("tsk-notes-in");
      element.value = "";
      const rbs = document.querySelectorAll('input[name="tskRadios"]');
      
      for (const rb of rbs) {
       
          rb.checked = false;       
      }
    }

    function getTask(project, id) {
      var pos = project.tasks.findIndex(i => i.id === id);
      return pos;
    }
  
    function openTaskForm(evt) {
      //get the project
      resetTaskForm();
      let prjPos = DBproject.getProject(evt.target.prjId);
      let taskId = evt.target.tskId;
      let project = DBproject.projectCollection[prjPos];
      let taskPos = getTask(project,taskId);
      let task = project.tasks[taskPos];
      let element = document.getElementById("tsk-Name-in");
      element.value = task.name;
      element = document.getElementById("tsk-notes-in");
      element.value = task.notes;
      element = document.getElementById("tsk-tskid-in");
      element.value = task.id;
      element = document.getElementById("tsk-prjid-in");
      element.value = task.prjId;

      const rbs = document.querySelectorAll('input[name="tskRadios"]');
      for (const rb of rbs) {
        if (task.priority === rb.value) {
          rb.checked = true;
          break;
        }
      }

      
    }

    function createTaskForm(evt) {
      //get the project
      resetTaskForm();
      let prjId = evt.target.prjId;
      let taskId = evt.target.tskId;
      
      let element = document.getElementById("tsk-Name-in");
      element.value = "";
      element = document.getElementById("tsk-notes-in");
      element.value = "";
      element = document.getElementById("tsk-tskid-in");
      element.value = taskId;
      element = document.getElementById("tsk-prjid-in");
      element.value = prjId;

      const rbs = document.querySelectorAll('input[name="tskRadios"]');
      for (const rb of rbs) {
        
          rb.checked = true;
          break;
        
      }
    }

    

    function createTaskBtn(task) {   
    const anchorItem = document.createElement("a");
     domUtils.setAttributes(anchorItem, {
        class: "nav-link tsk-link",
        href: "#",
     });
     anchorItem.textContent = task.name;
     anchorItem.onclick = openTaskForm;
     anchorItem.prjId = task.prjId;
     anchorItem.tskId = task.id;
     resetTaskForm();
     return anchorItem;
    }

    function createAddBtn(tskId, prjId) {   
      const anchorItem = document.createElement("a");
       domUtils.setAttributes(anchorItem, {
          class: "nav-link tsk-link",
          href: "#",
       });
       anchorItem.textContent = "New Task";
       anchorItem.onclick = createTaskForm;
       anchorItem.prjId = prjId;
       anchorItem.tskId = tskId;
       resetTaskForm();
       return anchorItem;
      }

   function putListOfTask(taskList,project){
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
    const liItem = document.createElement("li");
      domUtils.setAttributes(liItem, {
        class: "nav-item"
      });
      let prjId = project.id;
      let idx = project.tasks.length;
      let tskId = project.id+"-tsk" + idx;
      liItem.appendChild(createAddBtn(tskId, prjId));
      listOfTask.appendChild(liItem);
   }

     return { resetTaskPanel, createTaskBtn, putListOfTask };
  
})();

export { taskPanel };