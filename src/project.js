import { tabProject } from './projectTab';
import { domUtils } from './domUtils';
import { Task } from './task';

class Project {
  constructor(id, name, description, dueDt, priority, progress, nextTask) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.dueDt = dueDt;
    this.priority = priority;
    this.nextTask = nextTask;
    this.tasks = [];
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getdueDt() {
    return this.endDt;
  }

  getpriority() {
    return this.priority;
  }

  setpriority(priority) {
    this.progress = priority;
  }

  getTasks() {
    return this.tasks;
  }

  addTask(doc) {
    this.tasks.push(new Task(doc.id, this.id, doc.data().name,
      doc.data().notes, doc.data().priority));
  }

  setTaskList(taskList) {
    if (Array.isArray(taskList)) {
      this.tasks = taskList;
    }
  }

  localStore() {
    const projectSerialized = JSON.stringify(this);
    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem(this.id, projectSerialized);
    }
  }
}

const DBproject = (function dbp() {
  const projectCollection = [];

  const addProject = (doc) => {
    projectCollection.push(new Project(doc.id, doc.name, doc.description,
      doc.dueDt, doc.priority, doc.nextTask));
    projectCollection[projectCollection.length - 1].tasks = [];
    projectCollection[projectCollection.length - 1].localStore();
    return projectCollection.length - 1;
  };

  const getProject = (id) => {
    const pos = projectCollection.findIndex((i) => i.id === id);
    return pos;
  };

  const getTaskIdx = (prjIdx, taskId) => projectCollection[prjIdx].tasks.findIndex((i) => i.id === taskId);

  const delTaskItem = (tskId, prjId) => {
    const prjIdx = getProject(prjId);
    const tskIdx = getTaskIdx(prjIdx, tskId);
    projectCollection[prjIdx].tasks.splice(tskIdx, 1);
  };

  const getNextPrjId = async () => {
    const doc = await db.collection('parameters').doc('nextId').get();
    const nextId = doc.data().number;

    return nextId;
  };

  const updatePrjId = async (newId) => {
    const nextId = parseInt(newId, 10) + 1;
    await db.collection('parameters').doc('nextId').update({
      number: nextId,
    });
  };

  const getNextTaskId = async (prjId) => {
    const doc = await db.collection('projects').doc(prjId).get();
    const nextId = doc.data().nextTask;
    return nextId;
  };

  const newProject = async (params) => {
    let lastPrj = projectCollection[projectCollection.length - 1];
    const idNew = await new Promise((resolve) => {
      resolve(getNextPrjId());
    });
    const ipNew = `pr-${idNew}`;
    projectCollection.push(new Project(ipNew, params.name, params.description, params.dueDate, params.priority, '0%'));

    db.collection('projects').doc(ipNew).set({
      name: params.name,
      description: params.description,
      dueDate: params.dueDate,
      nextTask: 0,
      priority: params.priority,
    }).then(async () => {
      tabProject.deletAddTab();
      lastPrj = projectCollection[projectCollection.length - 1];
      tabProject.createTab(lastPrj);
      tabProject.createAddTab();
      domUtils.eventFire(ipNew, 'click');
      await new Promise(() => {
        updatePrjId(idNew);
      });
    });
  };

  const updateTaskId = async (prjId, nextTask) => {
    await db.collection('projects').doc(prjId).update({
      nextTask,
    });
  };

  const retrieveProjects = () => {
    projectCollection.forEach((item) => {
      tabProject.createTab(item);
    });
    tabProject.createAddTab();
    domUtils.eventFire('pr-0', 'click');
  };

  return {
    addProject,
    getProject,
    getTaskIdx,
    delTaskItem,
    getNextTaskId,
    updateTaskId,
    newProject,
    retrieveProjects,
    projectCollection,
  };
}());

export { Project, DBproject };
