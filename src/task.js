//import { DBproject } from './project'

class Task {
    constructor(id, prjId ,name, note, priority, ) {
        this.prjId = prjId;
        this.name = name;
        this.id =id;
        this.note = note;
        this.priority = priority;
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

       
}

const DBTasks =( function(){
  let prjTaskList = [];
  
  function addTask(doc, idx) {
    DBproject.projectCollection[idx].tasks.push(new Task(doc.id,doc.data().name,doc.data().note,doc.data().priority));
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


  return { getTaskList, addTask }
})();

export { Task, DBTasks }