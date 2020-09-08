import { tabContent } from './tabContent'

const tabProject = ( function(){
  let currPrj = 0;
  let tabsCount = 0;
  let currTab = 0;

  function createTab(project){
    const navtabs = document.getElementById("navtabs");
    const anchor = document.createElement('a');
    anchor.setAttribute('class', 'nav-link');
    anchor.setAttribute('href', '#tab-content');
    anchor.textContent = project.name;
    anchor.onclick = tabContent.createTabPanel;
    anchor.id=project.id;
    anchor.prjId = project.id;
    anchor.tabNumber = tabsCount; 
    navtabs.appendChild(anchor);
    tabsCount +=1;
  };

  function deletAddTab() {
    const navtabs = document.getElementById("navtabs");
    navtabs.removeChild(navtabs.lastChild);
  }

  function createAddTab() {
    const navtabs = document.getElementById("navtabs");
    const anchor = document.createElement('a');
    anchor.setAttribute('class', 'nav-link');
    anchor.setAttribute('href', '#tab-content');
    anchor.textContent = 'Add Project';
    anchor.onclick = tabContent.toggleForm;
    //anchor.prjId = `pr-${tabsCount}`;
    anchor.tabNumber = tabsCount; 
    navtabs.appendChild(anchor);
    tabsCount +=1;
  }
  
  function setCurrentTab(t) {
    currTab = t;
  }

  function getCurrentPrj() {
    return currPrj;
  }

  function getTotalTabs() {
    return tabsCount;
  }

  return { createTab, deletAddTab, createAddTab ,setCurrentTab, getCurrentPrj, getTotalTabs };

})();

export { tabProject };