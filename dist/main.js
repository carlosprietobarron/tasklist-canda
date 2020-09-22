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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"domUtils\", function() { return domUtils; });\nconst domUtils = (function du() {\n  const deleteEleContent = (elementId) => {\n    const tabContent = document.getElementById(elementId);\n    while (tabContent.firstChild) {\n      tabContent.firstChild.remove();\n    }\n    tabContent.innerHTML = '';\n  };\n\n  const setAttributes = (el, attrs) => {\n    for (const key in attrs) {\n      el.setAttribute(key, attrs[key]);\n    }\n  };\n\n  /* setAttributes(sectionElem, {\n        class: \"main_body\",\n        id: \"nameid\"\n      }) */\n\n  const eventFire = (el) => {\n    const element = document.getElementById(el);\n    // const bool = elem.dispatchEvent(\"onclick\");\n\n    element.dispatchEvent(new Event('click'));\n  };\n\n  // eventFire(document.getElementById('mytest1'), 'click');\n\n  return { deleteEleContent, setAttributes, eventFire };\n}());\n\n\n\n\n//# sourceURL=webpack:///./src/domUtils.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n\n\n\nconst retrieveCollection = async (pathToCol) => {\n  const results = [];\n  const docs = await db.collection(pathToCol).get();\n  docs.forEach((doc) => {\n    const { id } = doc;\n    const { name } = doc.data();\n    const { description } = doc.data();\n    const dueDt = doc.data().dueDate;\n    const { priority } = doc.data();\n    const { nextTask } = doc.data();\n    results.push(\n\n      {\n        id,\n        name,\n        description,\n        dueDt,\n        priority,\n        nextTask,\n      },\n    );\n  });\n\n  return results;\n};\n\nconst retrieveCollTask = async (pathToCol) => {\n  const results = [];\n  const docs = await db.collection(pathToCol).get();\n  docs.forEach((doc) => {\n    results.push(\n      new _task__WEBPACK_IMPORTED_MODULE_1__[\"Task\"](doc.id, doc.data().prjId, doc.data().name,\n        doc.data().notes, doc.data().priority, doc.data().dueDate),\n      // {\n      //   \"id\": doc.id,\n      //   \"prjId\": doc.data().prjId,\n      //   \"name\": doc.data().name,\n      //   \"notes\": doc.data().notes,\n      //   \"priority\": doc.data().priority,\n      //   \"dueDate\": doc.data().dueDate\n      // }\n    );\n    results[results.length - 1].localStore();\n  });\n\n  return results;\n};\n\nconst getTasks = async (prjId) => {\n  const pathToCol = `projects/${prjId}/tasks`;\n  const arrTsk = await retrieveCollTask(pathToCol);\n  return arrTsk;\n};\n\nconst getDatabase = async () => {\n  const pathToCol = 'projects';\n  const arrRaw = await retrieveCollection(pathToCol);\n  arrRaw.forEach((doc) => {\n    _project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].addProject(doc);\n  });\n\n  await Promise.all(_project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].projectCollection.map(async (project) => {\n    let arrTask = [];\n    arrTask = await getTasks(project.id);\n    project.tasks = arrTask;\n  }));\n\n  _project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].retrieveProjects();\n};\n\ngetDatabase();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/*! exports provided: Project, DBproject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Project\", function() { return Project; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DBproject\", function() { return DBproject; });\n/* harmony import */ var _projectTab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectTab */ \"./src/projectTab.js\");\n/* harmony import */ var _domUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domUtils */ \"./src/domUtils.js\");\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n\n\n\n\nclass Project {\n  constructor(id, name, description, dueDt, priority, progress, nextTask) {\n    this.id = id;\n    this.name = name;\n    this.description = description;\n    this.dueDt = dueDt;\n    this.priority = priority;\n    // this.progress = progress;\n    this.nextTask = nextTask;\n    this.tasks = [];\n  }\n\n  getId() {\n    return this.id;\n  }\n\n  getName() {\n    return this.name;\n  }\n\n  getDescription() {\n    return this.description;\n  }\n\n  getdueDt() {\n    return this.endDt;\n  }\n\n  getpriority() {\n    return this.priority;\n  }\n\n  setpriority(priority) {\n    this.progress = priority;\n  }\n\n  getTasks() {\n    return this.tasks;\n  }\n\n  addTask(doc) {\n    this.tasks.push(new _task__WEBPACK_IMPORTED_MODULE_2__[\"Task\"](doc.id, this.id, doc.data().name,\n      doc.data().notes, doc.data().priority));\n  }\n\n  setTaskList(taskList) {\n    if (Array.isArray(taskList)) {\n      this.tasks = taskList;\n    }\n  }\n\n  localStore() {\n    const projectSerialized = JSON.stringify(this);\n    if (typeof (Storage) !== 'undefined') {\n      localStorage.setItem(this.id, projectSerialized);\n    }\n  }\n}\n\nconst DBproject = (function dbp() {\n  const projectCollection = [];\n\n  const addProject = (doc) => {\n    projectCollection.push(new Project(doc.id, doc.name, doc.description,\n      doc.dueDt, doc.priority, doc.nextTask));\n    projectCollection[projectCollection.length - 1].tasks = [];\n    projectCollection[projectCollection.length - 1].localStore();\n    // addstorage\n    return projectCollection.length - 1;\n  };\n\n  const getProject = (id) => {\n    const pos = projectCollection.findIndex((i) => i.id === id);\n    return pos;\n  };\n\n  const getTaskIdx = (prjIdx, taskId) => projectCollection[prjIdx].tasks.findIndex((i) => i.id === taskId);\n\n  const delTaskItem = (tskId, prjId) => {\n    const prjIdx = getProject(prjId);\n    const tskIdx = getTaskIdx(prjIdx, tskId);\n    projectCollection[prjIdx].tasks.splice(tskIdx, 1);\n  };\n\n  const getNextPrjId = async () => {\n    const doc = await db.collection('parameters').doc('nextId').get();\n    const nextId = doc.data().number;\n\n    return nextId;\n  };\n\n  const updatePrjId = async (newId) => {\n    const nextId = parseInt(newId, 10) + 1;\n    await db.collection('parameters').doc('nextId').update({\n      number: nextId,\n    });\n  };\n\n  const getNextTaskId = async (prjId) => {\n    const doc = await db.collection('projects').doc(prjId).get();\n    const nextId = doc.data().nextTask;\n    return nextId;\n  };\n\n  const newProject = async (params) => {\n    let lastPrj = projectCollection[projectCollection.length - 1];\n    const idNew = await new Promise((resolve) => {\n      resolve(getNextPrjId());\n    });\n    const ipNew = `pr-${idNew}`;\n    projectCollection.push(new Project(ipNew, params.name, params.description, params.dueDate, params.priority, '0%'));\n\n    db.collection('projects').doc(ipNew).set({\n      name: params.name,\n      description: params.description,\n      dueDate: params.dueDate,\n      nextTask: 0,\n      priority: params.priority,\n    }).then(async () => {\n      _projectTab__WEBPACK_IMPORTED_MODULE_0__[\"tabProject\"].deletAddTab();\n      lastPrj = projectCollection[projectCollection.length - 1];\n      _projectTab__WEBPACK_IMPORTED_MODULE_0__[\"tabProject\"].createTab(lastPrj);\n      _projectTab__WEBPACK_IMPORTED_MODULE_0__[\"tabProject\"].createAddTab();\n      _domUtils__WEBPACK_IMPORTED_MODULE_1__[\"domUtils\"].eventFire(ipNew, 'click');\n      await new Promise(() => {\n        updatePrjId(idNew);\n      });\n    });\n  };\n\n  const updateTaskId = async (prjId, nextTask) => {\n    await db.collection('projects').doc(prjId).update({\n      nextTask,\n    });\n  };\n\n  const retrieveProjects = () => {\n    projectCollection.forEach((item) => {\n      _projectTab__WEBPACK_IMPORTED_MODULE_0__[\"tabProject\"].createTab(item);\n    });\n    _projectTab__WEBPACK_IMPORTED_MODULE_0__[\"tabProject\"].createAddTab();\n    _domUtils__WEBPACK_IMPORTED_MODULE_1__[\"domUtils\"].eventFire('pr-0', 'click');\n  };\n\n  return {\n    addProject,\n    getProject,\n    getTaskIdx,\n    delTaskItem,\n    getNextTaskId,\n    updateTaskId,\n    newProject,\n    retrieveProjects,\n    projectCollection,\n  };\n}());\n\n\n\n\n//# sourceURL=webpack:///./src/project.js?");

/***/ }),

/***/ "./src/projectTab.js":
/*!***************************!*\
  !*** ./src/projectTab.js ***!
  \***************************/
/*! exports provided: tabProject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tabProject\", function() { return tabProject; });\n/* harmony import */ var _tabContent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabContent */ \"./src/tabContent.js\");\n\n\nconst tabProject = (function tbp() {\n  const currPrj = 0;\n  let tabsCount = 0;\n\n  const createTab = (project) => {\n    const navtabs = document.getElementById('navtabs');\n    const anchor = document.createElement('a');\n    anchor.setAttribute('class', 'nav-link');\n    anchor.setAttribute('href', '#tab-content');\n    anchor.textContent = project.name;\n    anchor.onclick = _tabContent__WEBPACK_IMPORTED_MODULE_0__[\"tabContent\"].createTabPanel;\n    anchor.id = project.id;\n    anchor.prjId = project.id;\n    anchor.tabNumber = tabsCount;\n    navtabs.appendChild(anchor);\n    tabsCount += 1;\n  };\n\n  const deletAddTab = () => {\n    const navtabs = document.getElementById('navtabs');\n    navtabs.removeChild(navtabs.lastChild);\n  };\n\n  const createAddTab = () => {\n    const navtabs = document.getElementById('navtabs');\n    const anchor = document.createElement('a');\n    anchor.setAttribute('class', 'nav-link');\n    anchor.setAttribute('href', '#tab-content');\n    anchor.textContent = 'Add Project';\n    anchor.onclick = _tabContent__WEBPACK_IMPORTED_MODULE_0__[\"tabContent\"].toggleForm;\n    // anchor.prjId = `pr-${tabsCount}`;\n    anchor.tabNumber = tabsCount;\n    navtabs.appendChild(anchor);\n    tabsCount += 1;\n  };\n\n  const getCurrentPrj = () => currPrj;\n\n  const getTotalTabs = () => tabsCount;\n\n  return {\n    createTab, deletAddTab, createAddTab, getCurrentPrj, getTotalTabs,\n  };\n}());\n\n\n\n\n//# sourceURL=webpack:///./src/projectTab.js?");

/***/ }),

/***/ "./src/tabContent.js":
/*!***************************!*\
  !*** ./src/tabContent.js ***!
  \***************************/
/*! exports provided: tabContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tabContent\", function() { return tabContent; });\n/* harmony import */ var _taskPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskPanel */ \"./src/taskPanel.js\");\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n/* harmony import */ var _projectTab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projectTab */ \"./src/projectTab.js\");\n\n\n\n\nconst tabContent = (function tc() {\n  const resetContent = () => {\n    document.getElementById('prjName').textContent = '';\n    document.getElementById('prjDesc').textContent = '';\n    document.getElementById('begDate').textContent = '';\n    document.getElementById('endDate').textContent = '';\n    _taskPanel__WEBPACK_IMPORTED_MODULE_0__[\"taskPanel\"].resetTaskPanel();\n  };\n\n  const resetProjectForm = () => {\n    let element = document.getElementById('prj-Name-in');\n    element.value = '';\n    element = document.getElementById('prj-Desc-in');\n    element.value = '';\n    const rbs = document.querySelectorAll('input[name=\"gridRadios\"]');\n\n    for (const rb of rbs) {\n      rb.checked = false;\n    }\n  };\n\n  const callSaveProject = () => {\n    const newPrj = {\n      name: document.getElementById('prj-Name-in').value,\n      description: document.getElementById('prj-Desc-in').value,\n      priority: document.querySelector('input[name = gridRadios]:checked').value,\n      dueDate: document.getElementById('prj-Due-in').value,\n    };\n\n    _project__WEBPACK_IMPORTED_MODULE_1__[\"DBproject\"].newProject(newPrj);\n    const panelDisplay = document.getElementById('dispPrj');\n    const panelForm = document.getElementById('newForm');\n    panelDisplay.hidden = false;\n    panelForm.hidden = true;\n  };\n\n  const toggleForm = (evt) => {\n    const currentTab = evt.target.tabNumber;\n    const panelDisplay = document.getElementById('dispPrj');\n    const panelForm = document.getElementById('newForm');\n    const panelTask = document.getElementById('row-tasks');\n    panelDisplay.hidden = true;\n    panelForm.hidden = false;\n    panelTask.hidden = true;\n    _projectTab__WEBPACK_IMPORTED_MODULE_2__[\"tabProject\"].setCurrentTab(currentTab);\n    const setbtn = document.getElementById('saveBtn');\n    setbtn.onclick = callSaveProject;\n  };\n\n  const createTabPanel = (evt) => {\n    // here code to create each project panel\n    const projectId = evt.target.prjId;\n    const pos = _project__WEBPACK_IMPORTED_MODULE_1__[\"DBproject\"].projectCollection.findIndex((i) => i.id === projectId);\n    const project = _project__WEBPACK_IMPORTED_MODULE_1__[\"DBproject\"].projectCollection[pos];\n    resetContent();\n    const panelDisplay = document.getElementById('dispPrj');\n    const panelForm = document.getElementById('newForm');\n    const panelTask = document.getElementById('row-tasks');\n    panelDisplay.hidden = false;\n    panelForm.hidden = true;\n    panelTask.hidden = false;\n    resetProjectForm();\n    document.getElementById('prjName').textContent = project.name;\n    document.getElementById('prjDesc').textContent = project.description;\n    document.getElementById('begDate').textContent = project.dueDt;\n\n    _taskPanel__WEBPACK_IMPORTED_MODULE_0__[\"taskPanel\"].putListOfTask(project.tasks, project);\n  };\n\n  // const displayList = (project) => {\n  //   const panel = document.getElementById('col-list');\n  //   domUtils.deleteEleContent(panel);\n\n  //   const ulNav = document.createElement('ul');\n  //   domUtils.setAttributes(ulNav, {\n  //     class: 'flex-column',\n  //   });\n  //   panel.appendChild(ulNav);\n\n  //   project.tasks.forEach((task) => {\n  //     const liTask = document.createElement('li');\n  //     domUtils.setAttributes(liTask, {\n  //       class: 'nav-item',\n  //     });\n  //     ulNav.appendChild(liTask);\n\n  //     const anchor = document.createElement('a');\n  //     domUtils.setAttributes(anchor, {\n  //       class: 'nav-link',\n  //       href: '#',\n  //       textContent: task.name,\n  //     });\n  //   });\n  // };\n\n  return { createTabPanel, toggleForm };\n}());\n\n\n\n\n//# sourceURL=webpack:///./src/tabContent.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/*! exports provided: Task, DBTasks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Task\", function() { return Task; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DBTasks\", function() { return DBTasks; });\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n/* harmony import */ var _taskPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskPanel */ \"./src/taskPanel.js\");\n/* harmony import */ var _domUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domUtils */ \"./src/domUtils.js\");\n\n\n\n\nclass Task {\n  constructor(id, prjId, name, note, priority, dueDate) {\n    this.id = id;\n    this.prjId = prjId;\n    this.name = name;\n    this.notes = note;\n    this.priority = priority;\n    this.dueDate = dueDate;\n  }\n\n  getId() {\n    return this.id;\n  }\n\n  getname() {\n    return this.name;\n  }\n\n  getNote() {\n    return this.notes;\n  }\n\n  setNote(note) {\n    this.note = note;\n  }\n\n  localStore() {\n    const projectSerialized = JSON.stringify(this);\n\n    if (typeof (Storage) !== 'undefined') {\n      localStorage.setItem(this.id, projectSerialized);\n    }\n  }\n}\n\nconst DBTasks = (function dbt() {\n  const prjTaskList = [];\n\n  const addTask = (doc, idx) => {\n    _project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].projectCollection[idx].tasks.push(new Task(doc.id, doc.data().name, doc.data().note, doc.data().priority));\n    _project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].projectCollection[idx].tasks[_project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].projectCollection[idx].tasks.length - 1].localStore();\n  };\n\n  const updateTaskInPrjCol = (prjId, params) => {\n    const prjIdx = _project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].getProject(prjId);\n    const taskIdx = _project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].getTaskIdx(prjIdx, params.tskId);\n    _project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].projectCollection[prjIdx].tasks[taskIdx].name = params.name;\n    _project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].projectCollection[prjIdx].tasks[taskIdx].notes = params.notes;\n    _project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].projectCollection[prjIdx].tasks[taskIdx].priority = params.priority;\n    _project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].projectCollection[prjIdx].tasks[taskIdx].dueDate = params.dueDate;\n  };\n\n  const newTask = async (params) => {\n    const pos = _project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].getProject(params.prjId);\n    let newTaskId = params.tskId;\n    let idNew;\n    const project = _project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].projectCollection[pos];\n    const { state } = params;\n    const pathToCol = `projects/${project.id}/tasks`;\n    if (state === 'new') {\n      idNew = await new Promise((resolve) => {\n        resolve(_project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].getNextTaskId(project.id));\n      });\n      newTaskId = `${project.id}-tsk-${idNew}`;\n    } else {\n      newTaskId = params.tskId;\n      updateTaskInPrjCol(params.prjId, params);\n    }\n\n    db.collection(pathToCol).doc(newTaskId).set({\n      prjId: params.prjId,\n      name: params.name,\n      notes: params.notes,\n      priority: params.priority,\n      dueDate: params.dueDate,\n    }).then(async () => {\n      if (state === 'new') {\n        project.tasks.push(new Task(params.tskId, params.prjId, params.name, params.notes, params.priority, params.dueDate));\n        project.tasks[project.tasks.length - 1].localStore();\n        _taskPanel__WEBPACK_IMPORTED_MODULE_1__[\"taskPanel\"].deleteAddBtn(); // pendiente\n        const lastTsk = project.tasks[project.tasks.length - 1];\n        // taskPanel.createTaskBtn(lastTsk);\n        _taskPanel__WEBPACK_IMPORTED_MODULE_1__[\"taskPanel\"].AddTheNewTask(lastTsk);\n        const idx = idNew + 1;\n        const nexttskId = `${project.id}-tsk-${idx}`;\n        _taskPanel__WEBPACK_IMPORTED_MODULE_1__[\"taskPanel\"].AddTheActionBtn(nexttskId, params.prjId);\n\n        _domUtils__WEBPACK_IMPORTED_MODULE_2__[\"domUtils\"].eventFire(newTaskId, 'click');\n        await new Promise(() => {\n          _project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].updateTaskId(params.prjId, idx);\n        });\n      }\n    });\n  };\n\n  const delFromFireB = async (taskId, prjId) => {\n    const pathToCol = `projects/${prjId}/tasks`;\n\n    await new Promise((resolve) => {\n      resolve(db.collection(pathToCol).doc(taskId).delete());\n    });\n  };\n\n  const deleteTask = (params) => {\n    // borrar de firebase\n    delFromFireB(params.tskId, params.prjId);\n    _project__WEBPACK_IMPORTED_MODULE_0__[\"DBproject\"].delTaskItem(params.tskId, params.prjId);\n    _domUtils__WEBPACK_IMPORTED_MODULE_2__[\"domUtils\"].eventFire(params.prjId, 'click');\n  };\n\n  /* const getTasks = (docId) => {\n    prjTaskList = [];\n    db.collection('projects').doc(docId).collection('tasks').get()\n      .then(\n        (snaptshot) => {\n          snaptshot.docs.forEach((doc) => {\n            console.log(doc.data());\n            addTask(doc);\n          });\n        },\n      );\n  }; */\n\n  const getTaskList = () => prjTaskList;\n\n  return {\n    getTaskList, addTask, newTask, deleteTask,\n  };\n}());\n\n\n\n\n//# sourceURL=webpack:///./src/task.js?");

/***/ }),

/***/ "./src/taskPanel.js":
/*!**************************!*\
  !*** ./src/taskPanel.js ***!
  \**************************/
/*! exports provided: taskPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"taskPanel\", function() { return taskPanel; });\n/* harmony import */ var _domUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domUtils */ \"./src/domUtils.js\");\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n\n\n\n\nconst taskPanel = (function tkp() {\n  const resetTaskPanel = () => {\n    const listOfTask = document.getElementById('listOfTask');\n    while (listOfTask.firstChild) {\n      listOfTask.removeChild(listOfTask.lastChild);\n    }\n  };\n\n  const resetTaskForm = () => {\n    let element = document.getElementById('tsk-Name-in');\n    element.value = '';\n    element = document.getElementById('tsk-notes-in');\n    element.value = '';\n    const rbs = document.querySelectorAll('input[name=\"tskRadios\"]');\n\n    rbs.forEach(rb => {\n      rb.checked = false;\n    });\n\n    // for (const rb of rbs) {\n    //   rb.checked = false;\n    // }\n  };\n\n  const getTask = (project, id) => {\n    const pos = project.tasks.findIndex((i) => i.id === id);\n    return pos;\n  };\n\n  const callSaveTask = (evt) => {\n    const newTsk = {\n      name: document.getElementById('tsk-Name-in').value,\n      notes: document.getElementById('tsk-notes-in').value,\n      priority: document.querySelector('input[name = \"tskRadios\"]:checked').value,\n      dueDate: document.getElementById('tsk-Due-in').value,\n      tskId: evt.target.tskId,\n      prjId: evt.target.prjId,\n      state: evt.target.state,\n    };\n\n    _task__WEBPACK_IMPORTED_MODULE_2__[\"DBTasks\"].newTask(newTsk);\n  };\n\n  const callDelTask = (evt) => {\n    const Tsk = {\n      name: document.getElementById('tsk-Name-in').value,\n      notes: document.getElementById('tsk-notes-in').value,\n      priority: document.querySelector('input[name = \"tskRadios\"]:checked').value,\n      dueDate: document.getElementById('tsk-Due-in').value,\n      tskId: evt.target.tskId,\n      prjId: evt.target.prjId,\n      state: evt.target.state,\n    };\n\n    _task__WEBPACK_IMPORTED_MODULE_2__[\"DBTasks\"].deleteTask(Tsk);\n  };\n\n  const openTaskForm = (evt) => {\n    // get the project\n    resetTaskForm();\n    const prjPos = _project__WEBPACK_IMPORTED_MODULE_1__[\"DBproject\"].getProject(evt.target.prjId);\n    const taskId = evt.target.tskId;\n    const project = _project__WEBPACK_IMPORTED_MODULE_1__[\"DBproject\"].projectCollection[prjPos];\n    const taskPos = getTask(project, taskId);\n    const task = project.tasks[taskPos];\n    let element = document.getElementById('tsk-Name-in');\n    element.value = task.name;\n    element = document.getElementById('tsk-notes-in');\n    element.value = task.notes;\n    element = document.getElementById('tsk-Due-in');\n    element.value = task.dueDate;\n    element = document.getElementById('tsk-tskid-in');\n    element.value = task.id;\n    element = document.getElementById('tsk-prjid-in');\n    element.value = task.prjId;\n    element = document.getElementById('delBtn');\n    element.disabled = false;\n\n    const rbs = document.querySelectorAll('input[name=\"tskRadios\"]');\n\n    for (const rb of rbs) {\n      if (task.priority === rb.value) {\n        rb.checked = true;\n        break;\n      }\n    }\n\n    const btn = document.getElementById('saveBtnTsk');\n    btn.onclick = callSaveTask;\n    btn.prjId = task.prjId;\n    btn.tskId = task.id;\n    btn.state = 'existent';\n\n    const dbtn = document.getElementById('delBtn');\n    dbtn.onclick = callDelTask;\n    dbtn.prjId = task.prjId;\n    dbtn.tskId = task.id;\n    dbtn.state = 'existent';\n  };\n\n  const createTaskForm = (evt) => {\n    // get the project\n    resetTaskForm();\n    const { prjId } = evt.target;\n    const taskId = evt.target.tskId;\n\n    let element = document.getElementById('tsk-Name-in');\n    element.value = '';\n    element = document.getElementById('tsk-notes-in');\n    element.value = '';\n    element = document.getElementById('tsk-tskid-in');\n    element.value = taskId;\n    element = document.getElementById('tsk-prjid-in');\n    element.value = prjId;\n    element = document.getElementById('tsk-state-in');\n    element.value = 'new';\n    element = document.getElementById('tsk-Due-in');\n    element.value = '';\n    element = document.getElementById('delBtn');\n    element.disabled = true;\n\n    const rbs = document.querySelectorAll('input[name=\"tskRadios\"]');\n    for (const rb of rbs) {\n      rb.checked = false;\n    }\n\n    const btn = document.getElementById('saveBtnTsk');\n    btn.onclick = callSaveTask;\n    btn.prjId = prjId;\n    btn.tskId = taskId;\n    btn.state = 'new';\n  };\n\n  const createTaskBtn = (task) => {\n    const anchorItem = document.createElement('a');\n    _domUtils__WEBPACK_IMPORTED_MODULE_0__[\"domUtils\"].setAttributes(anchorItem, {\n      class: 'nav-link tsk-link',\n      href: '#',\n    });\n    anchorItem.textContent = task.name;\n    anchorItem.onclick = openTaskForm;\n    anchorItem.prjId = task.prjId;\n    anchorItem.tskId = task.id;\n    anchorItem.id = task.id;\n    resetTaskForm();\n    return anchorItem;\n  };\n\n  const deleteAddBtn = () => {\n    const listOfTask = document.getElementById('listOfTask');\n    listOfTask.removeChild(listOfTask.lastChild);\n  };\n\n  const createAddBtn = (tskId, prjId) => {\n    const anchorItem = document.createElement('a');\n    _domUtils__WEBPACK_IMPORTED_MODULE_0__[\"domUtils\"].setAttributes(anchorItem, {\n      id: 'tsk-link-id',\n      class: 'nav-link tsk-link',\n      href: '#',\n    });\n    anchorItem.textContent = 'New Task';\n    anchorItem.onclick = createTaskForm;\n    anchorItem.prjId = prjId;\n    // anchorItem.id = `btn-${tskId}`\n    anchorItem.tskId = tskId;\n    resetTaskForm();\n    return anchorItem;\n  };\n\n  const AddTheNewTask = (task) => {\n    const listOfTask = document.getElementById('listOfTask');\n    const liItem = document.createElement('li');\n    _domUtils__WEBPACK_IMPORTED_MODULE_0__[\"domUtils\"].setAttributes(liItem, {\n      class: 'nav-item',\n    });\n    liItem.appendChild(createTaskBtn(task));\n    listOfTask.appendChild(liItem);\n  };\n\n  const AddTheActionBtn = (tskId, prjId) => {\n    const listOfTask = document.getElementById('listOfTask');\n    const liItem = document.createElement('li');\n    liItem.appendChild(createAddBtn(tskId, prjId));\n\n    listOfTask.appendChild(liItem);\n  };\n\n  const putListOfTask = (taskList, project) => {\n    const listOfTask = document.getElementById('listOfTask');\n    let currentTaskId = 'tsk-link-id';\n    if (Array.isArray(taskList)) {\n      taskList.forEach((task) => {\n        const liItem = document.createElement('li');\n        _domUtils__WEBPACK_IMPORTED_MODULE_0__[\"domUtils\"].setAttributes(liItem, {\n          class: 'nav-item',\n        });\n        liItem.appendChild(createTaskBtn(task));\n        listOfTask.appendChild(liItem);\n      });\n      if (taskList.length > 0) {\n        currentTaskId = taskList[0].id;\n      }\n    }\n    const liItem = document.createElement('li');\n    _domUtils__WEBPACK_IMPORTED_MODULE_0__[\"domUtils\"].setAttributes(liItem, {\n      class: 'nav-item',\n    });\n    const prjId = project.id;\n    const idx = project.tasks.length;\n    const tskId = `${project.id}-tsk-${idx}`;\n    // let newIx = DBproject.getNextTaskId(prjId);\n    liItem.appendChild(createAddBtn(tskId, prjId));\n    listOfTask.appendChild(liItem);\n    _domUtils__WEBPACK_IMPORTED_MODULE_0__[\"domUtils\"].eventFire(currentTaskId, 'click');\n  };\n\n  return {\n    AddTheNewTask, AddTheActionBtn, resetTaskPanel, deleteAddBtn, createAddBtn, createTaskBtn, putListOfTask,\n  };\n}());\n\n\n\n\n//# sourceURL=webpack:///./src/taskPanel.js?");

/***/ })

/******/ });