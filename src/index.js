import { DBproject } from './project';
import { Task } from './task';

 const retrieveCollection = async (pathToCol) => {
  let results =[];
  const docs = await db.collection(pathToCol).get() 
  console.log(docs);
  docs.forEach(doc => {
    let id = doc.id;
    let name = doc.data().name;
    let description = doc.data().description;
    let dueDt = doc.data().dueDate;
    let priority = doc.data().priority;
    let nextTask = doc.data().nextTask;
    results.push (
      
      {
        "id": id,
        "name": name,
        "description": description,
        "dueDt": dueDt,
        "priority": priority,
        "nextTask": nextTask
      }
    )
    
  })

  return results;
} 

const retrieveCollTask = async (pathToCol) => {
  let results =[];
  const docs = await db.collection(pathToCol).get() 
  console.log(docs);
  docs.forEach(doc => {
    results.push (
      new Task( doc.id, doc.data().prjId, doc.data().name, doc.data().notes, doc.data().priority, doc.data().dueDate)
      // {
      //   "id": doc.id,
      //   "prjId": doc.data().prjId,
      //   "name": doc.data().name,
      //   "notes": doc.data().notes,
      //   "priority": doc.data().priority,
      //   "dueDate": doc.data().dueDate
      // }
    )
    results[results.length-1].localStore();
  })
  
  return results;
} 


const getTasks = async (prjId) => {
    let pathToCol = `projects/${prjId}/tasks`
    let arrTsk = await retrieveCollTask(pathToCol);
    return arrTsk;
}


const getDatabase = async () => {
  let pathToCol = 'projects';
  let arrRaw = await retrieveCollection(pathToCol);
  console.log(arrRaw);
  arrRaw.forEach(doc => {
   // console.log(doc);
    DBproject.addProject(doc);
  })
  
  await Promise.all( DBproject.projectCollection.map(async (project) => {
    let arrTask = [];
    arrTask = await getTasks(project.id);
    project.tasks = arrTask;
    console.log(project.tasks);
  }));

  console.log("ahora a poner los tabs");
  DBproject.retrieveProjects();
}

getDatabase();


