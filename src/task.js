import { DBproject } from './project';
import { taskPanel } from './taskPanel';
import { } from './domUtils';

class Task {
    constructor(id, prjId ,name, note, priority, dueDate ) {
        this.id =id;
        this.prjId = prjId;
        this.name = name;
        this.notes = note;
        this.priority = priority;
        this.dueDate = dueDate;
    }

    getId() {
        return id;
    }

    getname() {
        return name;
    }

    getNote() {
        return note;
    }

    setNote(note) {
        this.note = note;
    }

    localStore(){
        let projectSerialized = JSON.stringify(this);
        console.log(projectSerialized);

        if (typeof (Storage) !== "undefined") {
          localStorage.setItem(this.id,projectSerialized);
        }
    }
       
}

const DBTasks =( function(){
  let prjTaskList = [];
  
  function addTask(doc, idx) {
    DBproject.projectCollection[idx].tasks.push(new Task(doc.id,doc.data().name,doc.data().note,doc.data().priority));
    DBproject.projectCollection[idx].tasks[DBproject.projectCollection[idx].tasks.length-1].localStore();
}

  function updateTaskInPrjCol(prjId,params){
    let prjIdx = DBproject.getProject(prjId);
    let taskIdx = DBproject.getTaskIdx(prjIdx,params.tskId);
    DBproject.projectCollection[prjIdx].tasks[taskIdx].name = params.name;
    DBproject.projectCollection[prjIdx].tasks[taskIdx].notes = params.notes;
    DBproject.projectCollection[prjIdx].tasks[taskIdx].priority = params.priority;
    DBproject.projectCollection[prjIdx].tasks[taskIdx].dueDate = params.dueDate;
  }

  async function newTask(params){
    const pos = DBproject.getProject(params.prjId);
    let newTaskId = params.tskId;
    let idNew;
    const project =DBproject.projectCollection[pos];
    const state = params.state;
    let pathToCol = `projects/${project.id}/tasks`
    if (state ==='new') {
      idNew = await new Promise( resolve => {
        resolve( DBproject.getNextTaskId(project.id));
    } );
      newTaskId = project.id + "-tsk-" + idNew;
    } else {
      newTaskId = params.tskId;
      updateTaskInPrjCol(params.prjId, params);
    }

    db.collection(pathToCol).doc(newTaskId).set({
        prjId: params.prjId,
        name: params.name,
        notes: params.notes,
        priority: params.priority,
        dueDate: params.dueDate
    }).then( async  function() {
        if (state === 'new') { 0
          project.tasks.push(new Task(params.tskId, params.prjId, params.name, params.notes ,params.priority, params.dueDate));
          DBproject.projectCollection[idx].tasks[DBproject.projectCollection[idx].tasks.length-1].localStore();
          taskPanel.deleteAddBtn(); // pendiente
          let lastTsk = project.tasks[project.tasks.length-1];
          taskPanel.createTaskBtn(lastTsk);
          let idx = idNew + 1;
          await new Promise( async () => {
            DBproject.updateTaskId(params.prjId, idx);
          })
          //let newIx = DBproject.getNextTaskId(params.prjId);
          let nexttskId = project.id+"-tsk-" + idx;
          taskPanel.createAddBtn(nexttskId, params.prjId);
          domUtils.eventFire(newTaskId,'click');
        }  
    })
  }

  function getTasks(docId) {
    prjTaskList = [];
    db.collection('projects').doc(docId).collection('tasks').get().then(
        (snaptshot) => {
            snaptshot.docs.forEach(doc => {
              console.log(doc.data());
              addTask(doc);
            });
        
            
    });
  }

  function getTaskList(){
      return prjTaskList;
  }


  return { getTaskList, addTask, newTask }
})();

export { Task, DBTasks }