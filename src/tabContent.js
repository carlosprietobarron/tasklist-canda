import { DBproject } from './project';
import { tabProject } from './projectTab';

const tabContent = (function () {

  function resetContent() {
    document.getElementById("prjName").textContent = '';
    document.getElementById("prjDesc").textContent = '';
    document.getElementById("begDate").textContent = '';
    document.getElementById("endDate").textContent = '';
  }

  function toggleForm() {

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
    panelDisplay.setAttribute("display", "block");
    panelForm.setAttribute("display","hidden");
    tabProject.setCurrentTab(currentTab);
    document.getElementById("prjName").textContent = project.name;
    document.getElementById("prjDesc").textContent = project.description;
    document.getElementById("begDate").textContent = project.begDate;
    document.getElementById("endDate").textContent = project.endDate;
      
};

  return { createTabPanel };

})();

export { tabContent };