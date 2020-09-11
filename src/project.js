import { tabProject } from './projectTab';
import { domUtils } from './domUtils'
import { Task, DBTasks } from './task'
import { taskPanel } from './taskPanel';

class Project {
    constructor(id, name, description, dueDt, priority , progress) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dueDt = dueDt;
        this.priority = priority;
        //this.progress = progress;
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

   // return {getId, getDescription, getName, getdueDt, getprogress, setprogress}
};


const DBproject = ( function dbp(){
    const projectCollection = [];

    function addProject(doc) {
      projectCollection.push(new Project(doc.id, doc.name, doc.description, doc.dueDt,doc.priority));
      projectCollection[projectCollection.length - 1].tasks = [];
      return projectCollection.length - 1;
    }

    function getProject(id) {
      var pos = projectCollection.findIndex(i => i.id === id);
      return pos;
    }

    function newProject(params){
        let lastPrj=projectCollection[projectCollection.length-1];
        const lastNumber = lastPrj.id.substring(3);
        const ipNew = 'pr-'+ (parseInt(lastNumber)+1);
        projectCollection.push(new Project(ipNew,params.name, params.description, params.priority, "0%"));

        db.collection('projects').doc(ipNew).set({
            name: params.name,
            description: params.description,
            dueDate: "01/01/2020",
            priority: params.priority 
        }).then( function() {
            tabProject.deletAddTab();
            lastPrj=projectCollection[projectCollection.length-1];
            tabProject.createTab(lastPrj);
            tabProject.createAddTab();
            domUtils.eventFire(ipNew,'click');
        })
        

    }

    function seedProject(){
      
      projectCollection.push(new Project("pr-3","General-tasks","This it's the default group for unsorted task"
                            ,"","0%"));
      projectCollection.push(new Project("pr-4","Project TdoList","Project to construct a task manager"
                            ,"","0%"));
      projectCollection.push(new Project("pr-7","Project weather","This is an app for climate forecasting service"
                            ,"","0%"));
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

   return { addProject, getProject ,newProject, seedProject, retrieveProjects, projectCollection }

})();

export { Project, DBproject }