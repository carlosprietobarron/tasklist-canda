import { tabProject } from './projectTab';
import { domUtils } from './domUtils'

class Project {
    constructor(id, name, description, dueDt, progress) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dueDt = dueDt;
        this.progress = progress;
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

    getprogress() {
        return this.progress;
    }

    setprogress( progress ) {
        this.progress = progress;
    }

   // return {getId, getDescription, getName, getdueDt, getprogress, setprogress}
};



const DBproject = ( function dbp(){
    const projectCollection = [];

    function seedProject(){
      
      projectCollection.push(new Project("pr-0","General-tasks","This it's the default group for unsorted task"
                            ,"","0%"));
      projectCollection.push(new Project("pr-1","Project TdoList","Project to construct a task manager"
                            ,"","0%"));
      projectCollection.push(new Project("pr-2","Project weather","This it's the default group for unsorted task"
                            ,"","0%"));
   }

   function retrieveProjects() {
      projectCollection.forEach(function (item, index) {
        console.log(item);
        tabProject.createTab(item);      });
      tabProject.createAddTab();
      domUtils.eventFire('pr-0','click');

   }

   return { seedProject, retrieveProjects, projectCollection }

})();

export { Project, DBproject }