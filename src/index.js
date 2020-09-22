import { DBproject } from './project';
import { Task } from './task';

const retrieveCollection = async (pathToCol) => {
  const results = [];
  const docs = await db.collection(pathToCol).get();
  docs.forEach((doc) => {
    const { id } = doc;
    const { name } = doc.data();
    const { description } = doc.data();
    const dueDt = doc.data().dueDate;
    const { priority } = doc.data();
    const { nextTask } = doc.data();
    results.push(

      {
        id,
        name,
        description,
        dueDt,
        priority,
        nextTask,
      },
    );
  });

  return results;
};

const retrieveCollTask = async (pathToCol) => {
  const results = [];
  const docs = await db.collection(pathToCol).get();
  docs.forEach((doc) => {
    results.push(
      new Task(doc.id, doc.data().prjId, doc.data().name,
        doc.data().notes, doc.data().priority, doc.data().dueDate),
      // {
      //   "id": doc.id,
      //   "prjId": doc.data().prjId,
      //   "name": doc.data().name,
      //   "notes": doc.data().notes,
      //   "priority": doc.data().priority,
      //   "dueDate": doc.data().dueDate
      // }
    );
    results[results.length - 1].localStore();
  });

  return results;
};

const getTasks = async (prjId) => {
  const pathToCol = `projects/${prjId}/tasks`;
  const arrTsk = await retrieveCollTask(pathToCol);
  return arrTsk;
};

const getDatabase = async () => {
  const pathToCol = 'projects';
  const arrRaw = await retrieveCollection(pathToCol);
  arrRaw.forEach((doc) => {
    DBproject.addProject(doc);
  });

  await Promise.all(DBproject.projectCollection.map(async (project) => {
    let arrTask = [];
    arrTask = await getTasks(project.id);
    project.tasks = arrTask;
  }));

  DBproject.retrieveProjects();
};

getDatabase();
