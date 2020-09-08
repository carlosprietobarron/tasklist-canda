import { DBproject } from './project';

db.collection('projects').get().then(
    (snaptshot) => {
        snaptshot.docs.forEach(doc => {
          console.log(doc.data());
          DBproject.addProject(doc);
        });
    
        DBproject.seedProject();
        DBproject.seedTasks();
        DBproject.retrieveProjects();
});


//console.log("kick off");




