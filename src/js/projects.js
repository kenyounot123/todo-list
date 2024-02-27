import { populateStorage, clearFormInputs, clearInnerHtml } from "./miscellaneous"
//Project Factory 
const projectFactory = (name, todo = []) => {
  return { name, todos: todo }
}
//Add or edit project 
const submitProject = (arr, name) => {
  const newProject = projectFactory(name)
  arr.push(newProject)
  populateStorage('projects', JSON.stringify(arr))
  clearFormInputs()
}
//Append todo to project on todo creation 
const addTodoToProject = (arr, name, todo) => {
  const project = getProject(arr, name)
  const projectTodos = project.todos
  projectTodos.push(todo) 
  populateStorage('projects', JSON.stringify(arr))
}
// Remove todo from project on todo deletion 
// const deleteTodoFromProject = (arr, name, todo) => {
//   const projectIndex = findProjectIndex(arr, name)
//   const project = getProject(arr, projectIndex)
//   const projectTodos = project.todos
//   projectTodos.pop(projectIndex) 
// }
//Returns a list of all loaded project htmls
function displayProjects(arr) {
  let elements = []
  arr.forEach((project) => {
    elements.push(loadProject(project))
  });
  return elements
}
//Project html creation
const loadProject = (currentProject) => {
  return `
  <button class="project-btn ms-3 col-auto btn btn-info">
    <img id="folder-icon" src="./assets/folder.svg" alt="Folder Icon"> ${currentProject.name}
  </button>
  `
}
const getProject = (projects, name) => {
  name = name.trim();
  const index = findProjectIndex(projects, name)
  return projects[index]
}
const findProjectIndex = (projects, name) => {
  return projects.findIndex(project => project.name === name); 
}
//Generate project options for todo form
function generateProjectOptions(modal, projects, currentProject) {
  const selectElement = modal.querySelector('#project') 
  clearInnerHtml(selectElement)
  //Generate select options for each project
  projects.forEach((project) => {
    const projectName = project.name
    const option = document.createElement('option')
    option.value = projectName
    option.textContent = projectName
    if (projectName === currentProject.name) {
      option.selected = true;
    }
    selectElement.append(option)
  })
}
function getCurrentProjectDisplayName() {
  const currentProjectBtn = document.querySelector('#currentProject')
  const projectName = currentProjectBtn.textContent
  return projectName
}
//Create and append current project to DOM for display
function createCurrentProjectDisplay(project) {
  const currentProjectDisplay = document.createElement('div')
  currentProjectDisplay.classList.add('row', 'gap-3')
  currentProjectDisplay.innerHTML += loadCurrentProjectDisplay(project)
  return currentProjectDisplay;
}
//Generate current project folder to DOM 
function loadCurrentProjectDisplay(project) {
  return `
    <button id="currentProject" class="col-3 ms-3 btn btn-info">
      <img id="folder-icon" src="./assets/folder.svg" alt="Folder Icon"> ${project.name}
    </button>
  `
}
export { loadProject, generateProjectOptions, submitProject, displayProjects, projectFactory, addTodoToProject, getProject, createCurrentProjectDisplay, getCurrentProjectDisplayName } 