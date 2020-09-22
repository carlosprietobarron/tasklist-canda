import { tabContent } from './tabContent';

const tabProject = (function tbp() {
  const currPrj = 0;
  let tabsCount = 0;

  const createTab = (project) => {
    const navtabs = document.getElementById('navtabs');
    const anchor = document.createElement('a');
    anchor.setAttribute('class', 'nav-link');
    anchor.setAttribute('href', '#tab-content');
    anchor.textContent = project.name;
    anchor.onclick = tabContent.createTabPanel;
    anchor.id = project.id;
    anchor.prjId = project.id;
    anchor.tabNumber = tabsCount;
    navtabs.appendChild(anchor);
    tabsCount += 1;
  };

  const deletAddTab = () => {
    const navtabs = document.getElementById('navtabs');
    navtabs.removeChild(navtabs.lastChild);
  };

  const createAddTab = () => {
    const navtabs = document.getElementById('navtabs');
    const anchor = document.createElement('a');
    anchor.setAttribute('class', 'nav-link');
    anchor.setAttribute('href', '#tab-content');
    anchor.textContent = 'Add Project';
    anchor.onclick = tabContent.toggleForm;
    // anchor.prjId = `pr-${tabsCount}`;
    anchor.tabNumber = tabsCount;
    navtabs.appendChild(anchor);
    tabsCount += 1;
  };

  const getCurrentPrj = () => currPrj;

  const getTotalTabs = () => tabsCount;

  return {
    createTab, deletAddTab, createAddTab, getCurrentPrj, getTotalTabs,
  };
}());

export { tabProject };
