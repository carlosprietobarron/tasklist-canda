import { taskPanel } from './taskPanel';
import { DBproject } from './project';
import { tabProject } from './projectTab';
import { domUtils } from './domUtils'


const tabContent = (function () {

  function resetContent() {
    document.getElementById("prjName").textContent = '';
    document.getElementById("prjDesc").textContent = '';
    document.getElementById("begDate").textContent = '';
    document.getElementById("endDate").textContent = '';
    taskPanel.resetTaskPanel();
  }

  function callSaveProject() {
    let newPrj = {
      name: document.getElementById("prj-Name-in").value,
      description: document.getElementById("prj-Desc-in").value,
      priority: document.querySelector('input[name = gridRadios]:checked').value
    }

    DBproject.newProject(newPrj);
    let panelDisplay = document.getElementById("dispPrj");
    let panelForm = document.getElementById("newForm");
    panelDisplay.hidden = false;
    panelForm.hidden = true;
    
  }

  function toggleForm(evt) {
    const currentTab = evt.target.tabNumber;
    const panelDisplay = document.getElementById("dispPrj");
    const panelForm = document.getElementById("newForm");
    panelDisplay.hidden = true;
    panelForm.hidden = false;
    tabProject.setCurrentTab(currentTab);
    const setbtn = document.getElementById("saveBtn");
    setbtn.onclick = callSaveProject;
   
  }

  function createTabPanel(evt) {
    //here code to create each project panel
    const projectId = evt.target.prjId;
    const currentTab = evt.target.tabNumber;
    let pos = DBproject.projectCollection.findIndex(i => i.id === projectId);
    const project = DBproject.projectCollection[pos];
    resetContent();
    const panelDisplay = document.getElementById("dispPrj");
    const panelForm = document.getElementById("newForm");
    panelDisplay.hidden = false;
    panelForm.hidden = true;
    tabProject.setCurrentTab(currentTab);
    document.getElementById("prjName").textContent = project.name;
    document.getElementById("prjDesc").textContent = project.description;
    document.getElementById("begDate").textContent = project.begDate;
    document.getElementById("endDate").textContent = project.endDate; 
    taskPanel.putListOfTask(project.tasks);
};
  
   function displayList(project) {
     const panel = document.getElementById("col-list");
     domUtils.deleteEleContent(panel);

     const ulNav = document.createElement("ul");
     domUtils.setAttributes(ulNav, {
        class: "flex-column"
     });
     panel.appendChild(ulNav);

     project.tasks.forEach(function (task) {
       let liTask = document.createElement("li");
       domUtils.setAttributes(liTask, {
        class: "nav-item"
       });
       ulNav.appendChild(liTask);

       let anchor=document.createElement("a");
       domUtils.setAttributes(anchor, {
        class: "nav-link",
        href: "#",
        textContent: task.name,
       });

     });
   }

  return { createTabPanel, toggleForm };

})();

export { tabContent };