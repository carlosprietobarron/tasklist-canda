import { taskPanel } from './taskPanel';
import { DBproject } from './project';
import { tabProject } from './projectTab';

const tabContent = (function tc() {
  const resetContent = () => {
    document.getElementById('prjName').textContent = '';
    document.getElementById('prjDesc').textContent = '';
    document.getElementById('begDate').textContent = '';
    document.getElementById('endDate').textContent = '';
    taskPanel.resetTaskPanel();
  };

  const resetProjectForm = () => {
    let element = document.getElementById('prj-Name-in');
    element.value = '';
    element = document.getElementById('prj-Desc-in');
    element.value = '';
    const rbs = document.querySelectorAll('input[name="gridRadios"]');

    for (const rb of rbs) {
      rb.checked = false;
    }
  };

  const callSaveProject = () => {
    const newPrj = {
      name: document.getElementById('prj-Name-in').value,
      description: document.getElementById('prj-Desc-in').value,
      priority: document.querySelector('input[name = gridRadios]:checked').value,
      dueDate: document.getElementById('prj-Due-in').value,
    };

    DBproject.newProject(newPrj);
    const panelDisplay = document.getElementById('dispPrj');
    const panelForm = document.getElementById('newForm');
    panelDisplay.hidden = false;
    panelForm.hidden = true;
  };

  const toggleForm = (evt) => {
    const currentTab = evt.target.tabNumber;
    const panelDisplay = document.getElementById('dispPrj');
    const panelForm = document.getElementById('newForm');
    const panelTask = document.getElementById('row-tasks');
    panelDisplay.hidden = true;
    panelForm.hidden = false;
    panelTask.hidden = true;
    tabProject.setCurrentTab(currentTab);
    const setbtn = document.getElementById('saveBtn');
    setbtn.onclick = callSaveProject;
  };

  const createTabPanel = (evt) => {
    const projectId = evt.target.prjId;
    const pos = DBproject.projectCollection.findIndex((i) => i.id === projectId);
    const project = DBproject.projectCollection[pos];
    resetContent();
    const panelDisplay = document.getElementById('dispPrj');
    const panelForm = document.getElementById('newForm');
    const panelTask = document.getElementById('row-tasks');
    panelDisplay.hidden = false;
    panelForm.hidden = true;
    panelTask.hidden = false;
    resetProjectForm();
    document.getElementById('prjName').textContent = project.name;
    document.getElementById('prjDesc').textContent = project.description;
    document.getElementById('begDate').textContent = project.dueDt;

    taskPanel.putListOfTask(project.tasks, project);
  };

  return { createTabPanel, toggleForm };
}());

export { tabContent };
