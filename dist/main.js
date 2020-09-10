/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/domUtils.js":
/*!*************************!*\
  !*** ./src/domUtils.js ***!
  \*************************/
/*! exports provided: domUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"domUtils\", function() { return domUtils; });\nconst domUtils = ( function() { \r\n    function deleteEleContent(elementId) {\r\n        const tabContent = document.getElementById(elementId);\r\n        while (tabContent.firstChild) {\r\n          tabContent.firstChild.remove();\r\n        }\r\n        tabContent.innerHTML = '';\r\n      }\r\n\r\n      function setAttributes(el, attrs) {\r\n        for (var key in attrs) {\r\n          el.setAttribute(key, attrs[key]);\r\n        }\r\n      }\r\n\r\n      /* setAttributes(sectionElem, {\r\n        class: \"main_body\",\r\n        id: \"nameid\"\r\n      }) */\r\n\r\n      function eventFire(el, etype){\r\n       const element = document.getElementById(el);\r\n       // const bool = elem.dispatchEvent(\"onclick\");\r\n       \r\n       element.dispatchEvent(new Event(\"click\"));\r\n      }\r\n\r\n      //eventFire(document.getElementById('mytest1'), 'click');\r\n\r\n    return { deleteEleContent, setAttributes, eventFire };\r\n})();\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/domUtils.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n\r\n\r\n\r\n\r\n const retrieveCollection = async (pathToCol) => {\r\n  let results =[];\r\n  const docs = await db.collection(pathToCol).get() \r\n  console.log(docs);\r\n  docs.forEach(doc => {\r\n    let id = doc.id;\r\n    let name = doc.data().name;\r\n    let description = doc.data().description;\r\n    let dueDt = doc.data().dueDate;\r\n    let priority = doc.data().priority;\r\n    results.push (\r\n      {\r\n        \"id\": id,\r\n        \"name\": name,\r\n        \"description\": description,\r\n        \"dueDt\": dueDt,\r\n        \"priority\": priority\r\n      }\r\n    )\r\n    \r\n  })\r\n  //  console.log(`return ${results}`);\r\n  return results;\r\n} \r\n\r\nconst retrieveCollTask = async (pathToCol) => {\r\n  let results =[];\r\n  const docs = await db.collection(pathToCol).get() \r\n  console.log(docs);\r\n  docs.forEach(doc => {\r\n    //let id = doc.id;\r\n    // let name = doc.data().name;\r\n    // let description = doc.data().description;\r\n    // let dueDt = doc.data().dueDate;\r\n    // let priority = doc.data().priority;\r\n    results.push (\r\n      {\r\n        \"id\": doc.id,\r\n        \"name\": doc.data().name,\r\n        \"notes\": doc.data().notes,\r\n        \"priority\": doc.data().priority,\r\n        \"prjId\": doc.data().prjId\r\n      }\r\n    )\r\n    \r\n  })\r\n  //  console.log(`return ${results}`);\r\n  return results;\r\n} \r\n\r\n\r\nconst getTasks = async (prjId) => {\r\n    let pathToCol = `projects/${prjId}/tasks`\r\n    let arrTsk = await retrieveCollTask(pathToCol);\r\n   \r\n    return arrTsk;\r\n}\r\n\r\n\r\nconst getDatabase = async () => {\r\n  let pathToCol = 'projects';\r\n  let arrRaw = await retrieveCollection(pathToCol);\r\n  console.log(arrRaw);\r\n  arrRaw.forEach(doc => {\r\n   // console.log(doc);\r\n    _project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].addProject(doc);\r\n  })\r\n  \r\n  await Promise.all( _project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].projectCollection.map(async (project) => {\r\n    let arrTask = [];\r\n    arrTask = await getTasks(project.id);\r\n    project.tasks = arrTask;\r\n    console.log(project.tasks);\r\n  }));\r\n\r\n  // DBproject.projectCollection.forEach( async (project) =>{\r\n  //   let arrTask = [];\r\n  //   arrTask = await getTasks(project.id);\r\n  //   project.tasks = arrTask;\r\n  //   console.log(project.tasks);\r\n  // })\r\n\r\n\r\n  console.log(\"ahora a poner los tabs\");\r\n  _project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].retrieveProjects();\r\n}\r\n\r\ngetDatabase();\r\n\r\n\r\n\r\n/*\r\ndb.collection('projects').get().then(\r\n    (snaptshot) => {\r\n        snaptshot.docs.forEach(doc => {\r\n          console.log(doc.data());\r\n          let idx = DBproject.addProject(doc);\r\n          db.collection(`projects/${doc.id}/tasks`) \r\n            .get()\r\n            .then((snap) => {\r\n              snap.docs.forEach((proj) => {\r\n                console.log(proj.data());\r\n                let pos = DBproject.getProject(proj.data().prjId)\r\n                DBproject.projectCollection[pos].addTask(proj);\r\n              });\r\n             \r\n            })\r\n        });\r\n       // DBproject.seedProject();\r\n        DBproject.retrieveProjects();\r\n        \r\n});\r\n\r\n*/\r\n\r\n//retrieveCollection( );\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/*! exports provided: Project, DBproject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Project\", function() { return Project; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DBproject\", function() { return DBproject; });\n/* harmony import */ var _projectTab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectTab */ \"./src/projectTab.js\");\n/* harmony import */ var _domUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domUtils */ \"./src/domUtils.js\");\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n/* harmony import */ var _taskPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./taskPanel */ \"./src/taskPanel.js\");\n\r\n\r\n\r\n\r\n\r\nclass Project {\r\n    constructor(id, name, description, dueDt, priority , progress) {\r\n        this.id = id;\r\n        this.name = name;\r\n        this.description = description;\r\n        this.dueDt = dueDt;\r\n        this.priority = priority;\r\n        //this.progress = progress;\r\n        this.tasks = [];\r\n    }\r\n\r\n    getId() {\r\n        return this.id;\r\n    }\r\n\r\n    getName() {\r\n        return this.name;\r\n    }\r\n\r\n    getDescription() {\r\n        return this.description;\r\n    }\r\n\r\n    getdueDt() {\r\n        return this.endDt;\r\n    }\r\n\r\n    getpriority() {\r\n        return this.priority;\r\n    }\r\n\r\n    setpriority( priority ) {\r\n        this.progress = priority;\r\n    }\r\n\r\n    getTasks() {\r\n        return tasks;\r\n    }\r\n    \r\n    addTask(doc) {\r\n        this.tasks.push(new _task__WEBPACK_IMPORTED_MODULE_2__[\"Task\"](doc.id,this.id, doc.data().name,doc.data().notes,doc.data().priority));\r\n        //this.tasks.push(new Task(doc));\r\n      }\r\n\r\n    setTaskList( taskList ) {\r\n        if ( Array.isArray(taskList)) {\r\n          this.tasks = taskList;\r\n        }\r\n    }\r\n\r\n   // return {getId, getDescription, getName, getdueDt, getprogress, setprogress}\r\n};\r\n\r\n\r\nconst DBproject = ( function dbp(){\r\n    const projectCollection = [];\r\n\r\n    function addProject(doc) {\r\n      //projectCollection.push(new Project(doc.id,doc.data().name,doc.data().description,doc.data().dueDate,\"0%\"));\r\n      projectCollection.push(new Project(doc.id, doc.name, doc.description, doc.dueDt,doc.priority));\r\n      projectCollection[projectCollection.length - 1].tasks = [];\r\n      return projectCollection.length - 1;\r\n    }\r\n\r\n    function getProject(id) {\r\n      var pos = projectCollection.findIndex(i => i.id === id);\r\n      return pos;\r\n    }\r\n\r\n    function newProject(params){\r\n        let lastPrj=projectCollection[projectCollection.length-1];\r\n        const lastNumber = lastPrj.id.substring(3);\r\n        const ipNew = 'pr-'+ (parseInt(lastNumber)+1);\r\n        projectCollection.push(new Project(ipNew,params.name, params.description, params.priority, \"0%\"));\r\n\r\n        db.collection('projects').doc(ipNew).set({\r\n            name: params.name,\r\n            description: params.description,\r\n            dueDate: \"01/01/2020\",\r\n            priority: params.priority \r\n        }).then( function() {\r\n            _projectTab__WEBPACK_IMPORTED_MODULE_0__[\"tabProject\"].deletAddTab();\r\n            lastPrj=projectCollection[projectCollection.length-1];\r\n            _projectTab__WEBPACK_IMPORTED_MODULE_0__[\"tabProject\"].createTab(lastPrj);\r\n            _projectTab__WEBPACK_IMPORTED_MODULE_0__[\"tabProject\"].createAddTab();\r\n            _domUtils__WEBPACK_IMPORTED_MODULE_1__[\"domUtils\"].eventFire(ipNew,'click');\r\n        })\r\n        \r\n\r\n    }\r\n\r\n    function seedProject(){\r\n      \r\n      projectCollection.push(new Project(\"pr-3\",\"General-tasks\",\"This it's the default group for unsorted task\"\r\n                            ,\"\",\"0%\"));\r\n      projectCollection.push(new Project(\"pr-4\",\"Project TdoList\",\"Project to construct a task manager\"\r\n                            ,\"\",\"0%\"));\r\n      projectCollection.push(new Project(\"pr-7\",\"Project weather\",\"This is an app for climate forecasting service\"\r\n                            ,\"\",\"0%\"));\r\n   }\r\n\r\n   function seedTasks() {\r\n       projectCollection[0].tasks.push(new _task__WEBPACK_IMPORTED_MODULE_2__[\"Task\"](\"pr-0-tsk-0\",\"Task 0\",\"Review all the projects tasks daily\",\"important\"));\r\n       projectCollection[0].tasks.push(new _task__WEBPACK_IMPORTED_MODULE_2__[\"Task\"](\"pr-0-tsk-1\",\"daily meeting\",\"Team daily meeting\",\"important\"));\r\n       projectCollection[0].tasks.push(new _task__WEBPACK_IMPORTED_MODULE_2__[\"Task\"](\"pr-0-tsk-2\",\"programming\",\"Excute scheduled programming tasks\",\"important\"));\r\n       projectCollection[1].tasks.push(new _task__WEBPACK_IMPORTED_MODULE_2__[\"Task\"](\"pr-1-tsk-0\",\"Requirements gathering\",\"Discover project's requirements\",\"important\"));\r\n       projectCollection[1].tasks.push(new _task__WEBPACK_IMPORTED_MODULE_2__[\"Task\"](\"pr-1-tsk-1\",\"programming\",\"Excute scheduled programming tasks\",\"important\"));\r\n       projectCollection[2].tasks.push(new _task__WEBPACK_IMPORTED_MODULE_2__[\"Task\"](\"pr-2-tsk-0\",\"Requirements gathering\",\"Discover project's requirements\",\"important\"));\r\n       projectCollection[2].tasks.push(new _task__WEBPACK_IMPORTED_MODULE_2__[\"Task\"](\"pr-2-tsk-1\",\"programming\",\"Excute scheduled programming tasks\",\"important\"));\r\n       projectCollection[1].tasks.push(new _task__WEBPACK_IMPORTED_MODULE_2__[\"Task\"](\"pr-2-tsk-2\",\"Database design\",\"Discover project's requirements\",\"important\"));\r\n       projectCollection[1].tasks.push(new _task__WEBPACK_IMPORTED_MODULE_2__[\"Task\"](\"pr-2-tsk-3\",\"Test\",\"Excute scheduled programming tasks\",\"important\"));\r\n   }\r\n\r\n   function retrieveProjects() {\r\n      projectCollection.forEach(function (item, index) {\r\n        //console.log(item);\r\n        _projectTab__WEBPACK_IMPORTED_MODULE_0__[\"tabProject\"].createTab(item);     \r\n     });\r\n      _projectTab__WEBPACK_IMPORTED_MODULE_0__[\"tabProject\"].createAddTab();\r\n      _domUtils__WEBPACK_IMPORTED_MODULE_1__[\"domUtils\"].eventFire('pr-0','click');\r\n\r\n   }\r\n\r\n   function projectTasks() {\r\n     \r\n   }\r\n\r\n   return { addProject, getProject ,newProject, seedProject, seedTasks, retrieveProjects, projectCollection }\r\n\r\n})();\r\n\r\n\n\n//# sourceURL=webpack:///./src/project.js?");

/***/ }),

/***/ "./src/projectTab.js":
/*!***************************!*\
  !*** ./src/projectTab.js ***!
  \***************************/
/*! exports provided: tabProject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tabProject\", function() { return tabProject; });\n/* harmony import */ var _tabContent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabContent */ \"./src/tabContent.js\");\n\r\n\r\nconst tabProject = ( function(){\r\n  let currPrj = 0;\r\n  let tabsCount = 0;\r\n  let currTab = 0;\r\n\r\n  function createTab(project){\r\n    const navtabs = document.getElementById(\"navtabs\");\r\n    const anchor = document.createElement('a');\r\n    anchor.setAttribute('class', 'nav-link');\r\n    anchor.setAttribute('href', '#tab-content');\r\n    anchor.textContent = project.name;\r\n    anchor.onclick = _tabContent__WEBPACK_IMPORTED_MODULE_0__[\"tabContent\"].createTabPanel;\r\n    anchor.id=project.id;\r\n    anchor.prjId = project.id;\r\n    anchor.tabNumber = tabsCount; \r\n    navtabs.appendChild(anchor);\r\n    tabsCount +=1;\r\n  };\r\n\r\n  function deletAddTab() {\r\n    const navtabs = document.getElementById(\"navtabs\");\r\n    navtabs.removeChild(navtabs.lastChild);\r\n  }\r\n\r\n  function createAddTab() {\r\n    const navtabs = document.getElementById(\"navtabs\");\r\n    const anchor = document.createElement('a');\r\n    anchor.setAttribute('class', 'nav-link');\r\n    anchor.setAttribute('href', '#tab-content');\r\n    anchor.textContent = 'Add Project';\r\n    anchor.onclick = _tabContent__WEBPACK_IMPORTED_MODULE_0__[\"tabContent\"].toggleForm;\r\n    //anchor.prjId = `pr-${tabsCount}`;\r\n    anchor.tabNumber = tabsCount; \r\n    navtabs.appendChild(anchor);\r\n    tabsCount +=1;\r\n  }\r\n  \r\n  function setCurrentTab(t) {\r\n    currTab = t;\r\n  }\r\n\r\n  function getCurrentPrj() {\r\n    return currPrj;\r\n  }\r\n\r\n  function getTotalTabs() {\r\n    return tabsCount;\r\n  }\r\n\r\n  return { createTab, deletAddTab, createAddTab ,setCurrentTab, getCurrentPrj, getTotalTabs };\r\n\r\n})();\r\n\r\n\n\n//# sourceURL=webpack:///./src/projectTab.js?");

/***/ }),

/***/ "./src/tabContent.js":
/*!***************************!*\
  !*** ./src/tabContent.js ***!
  \***************************/
/*! exports provided: tabContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tabContent\", function() { return tabContent; });\n/* harmony import */ var _taskPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskPanel */ \"./src/taskPanel.js\");\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n/* harmony import */ var _projectTab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projectTab */ \"./src/projectTab.js\");\n/* harmony import */ var _domUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domUtils */ \"./src/domUtils.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst tabContent = (function () {\r\n\r\n  function resetContent() {\r\n    document.getElementById(\"prjName\").textContent = '';\r\n    document.getElementById(\"prjDesc\").textContent = '';\r\n    document.getElementById(\"begDate\").textContent = '';\r\n    document.getElementById(\"endDate\").textContent = '';\r\n    _taskPanel__WEBPACK_IMPORTED_MODULE_0__[\"taskPanel\"].resetTaskPanel();\r\n  }\r\n\r\n  function callSaveProject() {\r\n    let newPrj = {\r\n      name: document.getElementById(\"prj-Name-in\").value,\r\n      description: document.getElementById(\"prj-Desc-in\").value,\r\n      priority: document.querySelector('input[name = gridRadios]:checked').value\r\n    }\r\n\r\n    _project__WEBPACK_IMPORTED_MODULE_1__[\"DBproject\"].newProject(newPrj);\r\n    let panelDisplay = document.getElementById(\"dispPrj\");\r\n    let panelForm = document.getElementById(\"newForm\");\r\n    panelDisplay.hidden = false;\r\n    panelForm.hidden = true;\r\n    \r\n  }\r\n\r\n  function toggleForm(evt) {\r\n    const currentTab = evt.target.tabNumber;\r\n    const panelDisplay = document.getElementById(\"dispPrj\");\r\n    const panelForm = document.getElementById(\"newForm\");\r\n    panelDisplay.hidden = true;\r\n    panelForm.hidden = false;\r\n    _projectTab__WEBPACK_IMPORTED_MODULE_2__[\"tabProject\"].setCurrentTab(currentTab);\r\n    const setbtn = document.getElementById(\"saveBtn\");\r\n    setbtn.onclick = callSaveProject;\r\n   \r\n  }\r\n\r\n  function createTabPanel(evt) {\r\n    //here code to create each project panel\r\n    const projectId = evt.target.prjId;\r\n    const currentTab = evt.target.tabNumber;\r\n    let pos = _project__WEBPACK_IMPORTED_MODULE_1__[\"DBproject\"].projectCollection.findIndex(i => i.id === projectId);\r\n    const project = _project__WEBPACK_IMPORTED_MODULE_1__[\"DBproject\"].projectCollection[pos];\r\n    resetContent();\r\n    const panelDisplay = document.getElementById(\"dispPrj\");\r\n    const panelForm = document.getElementById(\"newForm\");\r\n    panelDisplay.hidden = false;\r\n    panelForm.hidden = true;\r\n    _projectTab__WEBPACK_IMPORTED_MODULE_2__[\"tabProject\"].setCurrentTab(currentTab);\r\n    document.getElementById(\"prjName\").textContent = project.name;\r\n    document.getElementById(\"prjDesc\").textContent = project.description;\r\n    document.getElementById(\"begDate\").textContent = project.begDate;\r\n    document.getElementById(\"endDate\").textContent = project.endDate; \r\n    _taskPanel__WEBPACK_IMPORTED_MODULE_0__[\"taskPanel\"].putListOfTask(project.tasks);\r\n};\r\n  \r\n   function displayList(project) {\r\n     const panel = document.getElementById(\"col-list\");\r\n     _domUtils__WEBPACK_IMPORTED_MODULE_3__[\"domUtils\"].deleteEleContent(panel);\r\n\r\n     const ulNav = document.createElement(\"ul\");\r\n     _domUtils__WEBPACK_IMPORTED_MODULE_3__[\"domUtils\"].setAttributes(ulNav, {\r\n        class: \"flex-column\"\r\n     });\r\n     panel.appendChild(ulNav);\r\n\r\n     project.tasks.forEach(function (task) {\r\n       let liTask = document.createElement(\"li\");\r\n       _domUtils__WEBPACK_IMPORTED_MODULE_3__[\"domUtils\"].setAttributes(liTask, {\r\n        class: \"nav-item\"\r\n       });\r\n       ulNav.appendChild(liTask);\r\n\r\n       let anchor=document.createElement(\"a\");\r\n       _domUtils__WEBPACK_IMPORTED_MODULE_3__[\"domUtils\"].setAttributes(anchor, {\r\n        class: \"nav-link\",\r\n        href: \"#\",\r\n        textContent: task.name,\r\n       });\r\n\r\n     });\r\n   }\r\n\r\n  return { createTabPanel, toggleForm };\r\n\r\n})();\r\n\r\n\n\n//# sourceURL=webpack:///./src/tabContent.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/*! exports provided: Task, DBTasks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Task\", function() { return Task; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DBTasks\", function() { return DBTasks; });\n//import { DBproject } from './project'\r\n\r\nclass Task {\r\n    constructor(id, prjId ,name, note, priority, ) {\r\n        this.prjId = prjId;\r\n        this.name = name;\r\n        this.id =id;\r\n        this.note = note;\r\n        this.priority = priority;\r\n    }\r\n\r\n    getId() {\r\n        return id;\r\n    }\r\n\r\n    getname() {\r\n        return name;\r\n    }\r\n\r\n    getNote() {\r\n        return note;\r\n    }\r\n\r\n    setNote(note) {\r\n        this.note = note;\r\n    }\r\n\r\n       \r\n}\r\n\r\nconst DBTasks =( function(){\r\n  let prjTaskList = [];\r\n  \r\n  function addTask(doc, idx) {\r\n    DBproject.projectCollection[idx].tasks.push(new Task(doc.id,doc.data().name,doc.data().note,doc.data().priority));\r\n  }\r\n\r\n  function getTasks(docId) {\r\n    prjTaskList = [];\r\n    db.collection('projects').doc(docId).collection('tasks').get().then(\r\n        (snaptshot) => {\r\n            snaptshot.docs.forEach(doc => {\r\n              console.log(doc.data());\r\n              addTask(doc);\r\n            });\r\n        \r\n            \r\n    });\r\n  }\r\n\r\n  function getTaskList(){\r\n      return prjTaskList;\r\n  }\r\n\r\n\r\n  return { getTaskList, addTask }\r\n})();\r\n\r\n\n\n//# sourceURL=webpack:///./src/task.js?");

/***/ }),

/***/ "./src/taskPanel.js":
/*!**************************!*\
  !*** ./src/taskPanel.js ***!
  \**************************/
/*! exports provided: taskPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"taskPanel\", function() { return taskPanel; });\n/* harmony import */ var _domUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domUtils */ \"./src/domUtils.js\");\n\r\n\r\nconst taskPanel = ( function () {\r\n\r\n    function resetTaskPanel(){\r\n        const listOfTask = document.getElementById(\"listOfTask\");\r\n        while (listOfTask.firstChild) {\r\n            listOfTask.removeChild(listOfTask.lastChild);\r\n        };  \r\n    }\r\n  \r\n    function createTaskBtn(task) {\r\n    \r\n    const anchorItem = document.createElement(\"a\");\r\n     _domUtils__WEBPACK_IMPORTED_MODULE_0__[\"domUtils\"].setAttributes(anchorItem, {\r\n        class: \"nav-link\",\r\n        href: \"#\",\r\n     });\r\n     anchorItem.textContent = task.name\r\n     return anchorItem;\r\n    }\r\n\r\n   function putListOfTask(taskList){\r\n     const listOfTask = document.getElementById(\"listOfTask\");\r\n     if (Array.isArray(taskList)) {\r\n       taskList.forEach(task => {\r\n          const liItem = document.createElement(\"li\");\r\n          _domUtils__WEBPACK_IMPORTED_MODULE_0__[\"domUtils\"].setAttributes(liItem, {\r\n            class: \"nav-item\"\r\n          });\r\n          liItem.appendChild(createTaskBtn(task));\r\n          listOfTask.appendChild(liItem);\r\n       });\r\n    }\r\n   }\r\n\r\n     return { resetTaskPanel, createTaskBtn, putListOfTask };\r\n  \r\n})();\r\n\r\n\n\n//# sourceURL=webpack:///./src/taskPanel.js?");

/***/ })

/******/ });