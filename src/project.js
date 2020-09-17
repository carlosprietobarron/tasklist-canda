import { tabProject } from './projectTab';
import { domUtils } from './domUtils'
import { Task, DBTasks } from './task'
import { taskPanel } from './taskPanel';

class Project {
    constructor(id, name, description, dueDt, priority , progress, nextTask) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dueDt = dueDt;
        this.priority = priority;
        //this.progress = progress;
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

    setpriority( priority ) {
        this.progress = priority;
    }

    getTasks() {
        return tasks;
    }
    
    addTask(doc) {
        this.tasks.push(new Task(doc.id,this.id, doc.data().name,doc.data().notes,doc.data().priority));
        //this.tasks.push(new Task(doc));
      }

    setTaskList( taskList ) {
        if ( Array.isArray(taskList)) {
          this.tasks = taskList;
        }
    }


    localStore(){
        let projectSerialized = JSON.stringify(this);
        console.log(projectSerialized);

        if (typeof (Storage) !== "undefined") {
          localStorage.setItem(this.id,projectSerialized);
        }
    }

 
};


const DBproject = ( function dbp(){
    const projectCollection = [];
    
    function addProject(doc) {
      projectCollection.push(new Project(doc.id, doc.name, doc.description, doc.dueDt, doc.priority, doc.nextTask));
      projectCollection[projectCollection.length - 1].tasks = [];
      projectCollection[projectCollection.length - 1].localStore();
      //addstorage
      return projectCollection.length - 1;
    }

    function getProject(id) {
      let pos = projectCollection.findIndex(i => i.id === id);
      return pos;
    }

    function getTaskIdx(prjIdx,taskId) {
     return projectCollection[prjIdx].tasks.findIndex(i => i.id === taskId);
    }

    async function  getNextPrjId(){
      let nextId;
      const doc = await db.collection("parameters").doc("nextId").get();
      console.log(doc.data());
      nextId = doc.data().number;
      
      return nextId;
    }

    async function updatePrjId(newId){
      let nextId = parseInt(newId) + 1;
      const done = await db.collection("parameters").doc("nextId").update({
          "number": nextId
      });
      console.log(done);
    }
    
    async function getNextTaskId(prjId){
      let nextId;
      //const docRef = db.collection("projects").doc(prjId);
      const doc = await db.collection("projects").doc(prjId).get()
      nextId = doc.data().nextTask;
      console.log('inside getNextTaskId');
      return nextId;
    }

    async function newProject(params){
        let lastPrj=projectCollection[projectCollection.length-1];
        const lastNumber = lastPrj.id.substring(3);
        //const ipNew = 'pr-'+ (parseInt(lastNumber)+1);
        let idNew = await new Promise( resolve => {
            resolve( getNextPrjId());
        } )
        const ipNew = 'pr-'+ (idNew);
        projectCollection.push(new Project(ipNew,params.name, params.description, params.dueDate ,params.priority, "0%"));

        db.collection('projects').doc(ipNew).set({
            name: params.name,
            description: params.description,
            dueDate: params.dueDate,
            nextTask: 0,
            priority: params.priority 
        }).then( async function() {
            tabProject.deletAddTab();
            lastPrj=projectCollection[projectCollection.length-1];
            tabProject.createTab(lastPrj);
            tabProject.createAddTab();
            domUtils.eventFire(ipNew,'click');
            await new Promise( async () => {
                updatePrjId(idNew);
            })
            
        })
        

    }

    async function updateTaskId(prjId, nextTask){
        let nextId = parseInt(nextTask) + 1;
        const done = await db.collection("projects").doc(prjId).update({
            "nextTask": nextTask
        });
        console.log(nextTask);
      }

    function retrieveProjects() {
      projectCollection.forEach(function (item, index) {
        //console.log(item);
        tabProject.createTab(item);     
     });
      tabProject.createAddTab();
      domUtils.eventFire('pr-0','click');

   }

   function projectTasks() {
     
   }

   return { addProject, getProject, getTaskIdx, getNextTaskId, updateTaskId ,newProject, retrieveProjects, projectCollection }

})();

export { Project, DBproject }