import { DBproject } from './project';
import { taskPanel } from './taskPanel';
import { domUtils } from './domUtils';

class Task {
  constructor(id, prjId, name, note, priority, dueDate) {
    this.id = id;
    this.prjId = prjId;
    this.name = name;
    this.notes = note;
    this.priority = priority;
    this.dueDate = dueDate;
  }

  getId() {
    return this.id;
  }

  getname() {
    return this.name;
  }

  getNote() {
    return this.notes;
  }

  setNote(note) {
    this.note = note;
  }

  localStore() {
    const projectSerialized = JSON.stringify(this);

    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem(this.id, projectSerialized);
    }
  }
}

const DBTasks = (function dbt() {
  const prjTaskList = [];

  const addTask = (doc, idx) => {
    DBproject.projectCollection[idx].tasks.push(new Task(doc.id, doc.data().name, doc.data().note, doc.data().priority));
    DBproject.projectCollection[idx].tasks[DBproject.projectCollection[idx].tasks.length - 1].localStore();
  };

  const updateTaskInPrjCol = (prjId, params) => {
    const prjIdx = DBproject.getProject(prjId);
    const taskIdx = DBproject.getTaskIdx(prjIdx, params.tskId);
    DBproject.projectCollection[prjIdx].tasks[taskIdx].name = params.name;
    DBproject.projectCollection[prjIdx].tasks[taskIdx].notes = params.notes;
    DBproject.projectCollection[prjIdx].tasks[taskIdx].priority = params.priority;
    DBproject.projectCollection[prjIdx].tasks[taskIdx].dueDate = params.dueDate;
  };

  const newTask = async (params) => {
    const pos = DBproject.getProject(params.prjId);
    let newTaskId = params.tskId;
    let idNew;
    const project = DBproject.projectCollection[pos];
    const { state } = params;
    const pathToCol = `projects/${project.id}/tasks`;
    if (state === 'new') {
      idNew = await new Promise((resolve) => {
        resolve(DBproject.getNextTaskId(project.id));
      });
      newTaskId = `${project.id}-tsk-${idNew}`;
    } else {
      newTaskId = params.tskId;
      updateTaskInPrjCol(params.prjId, params);
    }

    db.collection(pathToCol).doc(newTaskId).set({
      prjId: params.prjId,
      name: params.name,
      notes: params.notes,
      priority: params.priority,
      dueDate: params.dueDate,
    }).then(async () => {
      if (state === 'new') {
        project.tasks.push(new Task(params.tskId, params.prjId, params.name, params.notes, params.priority, params.dueDate));
        project.tasks[project.tasks.length - 1].localStore();
        taskPanel.deleteAddBtn(); // pendiente
        const lastTsk = project.tasks[project.tasks.length - 1];
        // taskPanel.createTaskBtn(lastTsk);
        taskPanel.AddTheNewTask(lastTsk);
        const idx = idNew + 1;
        const nexttskId = `${project.id}-tsk-${idx}`;
        taskPanel.AddTheActionBtn(nexttskId, params.prjId);

        domUtils.eventFire(newTaskId, 'click');
        await new Promise(() => {
          DBproject.updateTaskId(params.prjId, idx);
        });
      }
    });
  };

  const delFromFireB = async (taskId, prjId) => {
    const pathToCol = `projects/${prjId}/tasks`;

    await new Promise((resolve) => {
      resolve(db.collection(pathToCol).doc(taskId).delete());
    });
  };

  const deleteTask = (params) => {
    // borrar de firebase
    delFromFireB(params.tskId, params.prjId);
    DBproject.delTaskItem(params.tskId, params.prjId);
    domUtils.eventFire(params.prjId, 'click');
  };

  /* const getTasks = (docId) => {
    prjTaskList = [];
    db.collection('projects').doc(docId).collection('tasks').get()
      .then(
        (snaptshot) => {
          snaptshot.docs.forEach((doc) => {
            console.log(doc.data());
            addTask(doc);
          });
        },
      );
  }; */

  const getTaskList = () => prjTaskList;

  return {
    getTaskList, addTask, newTask, deleteTask,
  };
}());

export { Task, DBTasks };
