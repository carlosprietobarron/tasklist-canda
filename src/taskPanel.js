import { domUtils } from './domUtils'
import { DBproject } from './project'
import { DBTasks } from './task'

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

    function callSaveTask(evt){
      let newTsk = {
        name: document.getElementById("tsk-Name-in").value,
        notes: document.getElementById("tsk-notes-in").value,
        priority: document.querySelector('input[name = "tskRadios"]:checked').value,
        dueDate: document.getElementById("tsk-Due-in").value,
        tskId: evt.target.tskId,
        prjId: evt.target.prjId,
        state: evt.target.state
      }
  
      DBTasks.newTask(newTsk);
      
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
      element = document.getElementById("tsk-Due-in");
      element.value = task.dueDate;
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
      const btn = document.getElementById("saveBtnTsk");
      btn.onclick = callSaveTask;
      btn.prjId = task.prjId;
      btn.tskId = task.id;
      btn.state = 'existent'
      
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
      element = document.getElementById("tsk-state-in");
      element.value = 'new';
      element = document.getElementById("tsk-Due-in");
      element.value = '';

      const rbs = document.querySelectorAll('input[name="tskRadios"]');
      for (const rb of rbs) {
        
          rb.checked = false;
      };

      const btn = document.getElementById("saveBtnTsk");
      btn.onclick = callSaveTask;
      btn.prjId = prjId;
      btn.tskId = taskId;
      btn.state = 'new'
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
     anchorItem.id = task.id;
     resetTaskForm();
     return anchorItem;
    }

    function deleteAddBtn(){
      console.log("deleting add btn");
      const listOfTask = document.getElementById("listOfTask");
      listOfTask.removeChild(listOfTask.lastChild);
    }

    function createAddBtn(tskId, prjId) {   
      const anchorItem = document.createElement("a");
       domUtils.setAttributes(anchorItem, {
          id: "tsk-link-id",
          class: "nav-link tsk-link",
          href: "#",
       });
       anchorItem.textContent = "New Task";
       anchorItem.onclick = createTaskForm;
       anchorItem.prjId = prjId;
       //anchorItem.id = `btn-${tskId}`
       anchorItem.tskId = tskId;
       resetTaskForm();
       return anchorItem;
    }

    function AddTheNewTask(task) {
      const listOfTask = document.getElementById("listOfTask");
      const liItem = document.createElement("li");
      domUtils.setAttributes(liItem, {
        class: "nav-item"
      });
      liItem.appendChild(createTaskBtn(task));
      listOfTask.appendChild(liItem);
    }

    function AddTheActionBtn(tskId, prjId) {
      const listOfTask = document.getElementById("listOfTask");
      const liItem = document.createElement("li");
      liItem.appendChild(createAddBtn(tskId, prjId));
      
      listOfTask.appendChild(liItem);
    }

   function putListOfTask(taskList,project){
     const listOfTask = document.getElementById("listOfTask");
     let currentTaskId = "tsk-link-id";
     if (Array.isArray(taskList)) {
       taskList.forEach(task => {
          const liItem = document.createElement("li");
          domUtils.setAttributes(liItem, {
            class: "nav-item"
          });
          liItem.appendChild(createTaskBtn(task));
          listOfTask.appendChild(liItem);
       });
       if (taskList.length > 0) {
         currentTaskId = taskList[0].id;
       }
    }
    const liItem = document.createElement("li");
      domUtils.setAttributes(liItem, {
        class: "nav-item"
      });
      let prjId = project.id;
      let idx = project.tasks.length;
      let tskId = project.id+"-tsk-" + idx;
      //let newIx = DBproject.getNextTaskId(prjId);
      liItem.appendChild(createAddBtn(tskId, prjId));
      listOfTask.appendChild(liItem);
      const ele = document.getElementById(currentTaskId);
      domUtils.eventFire(currentTaskId,'click');
   }

     return { AddTheNewTask, AddTheActionBtn, resetTaskPanel, deleteAddBtn, createAddBtn ,createTaskBtn, putListOfTask };
  
})();

export { taskPanel };